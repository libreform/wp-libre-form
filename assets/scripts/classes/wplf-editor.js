import globalData from '../lib/global-data'
import createApiClient from '../lib/api-client'
import log from '../lib/log'
import { waitForNextTick } from '../lib/wait'

const { abort, request, signal } = createApiClient()

const $ = window.jQuery
const _ = window._
const wp = window.wp

const extractFieldDataFromElement = (el) => {
  /**
   * Brackets in the field name are fun. They are not present in the submitted data,
   * which causes validation errors.
   */
  const name = el.getAttribute('name').replace('[]', '')
  const type = el.getAttribute('type') || el.tagName.toLowerCase()
  const required = el.getAttribute('required') !== null ? true : false
  const multiple = el.getAttribute('name').endsWith('[]')

  return ({
    name,
    type,
    required,
    multiple,
  })
}

export default class WPLF_Editor {
  wplf
  state
  contentEditor
  successMessageEditor
  formInstance
  inputs = {}
  previewEl
  publishButton
  fieldTemplate

  constructor(wplfInstance) {
    const fields = document.querySelector('#wplfFields')
    const additionalFields = document.querySelector('#wplfAdditionalFields')
    const newFields = document.querySelector('#wplfNewFields')
    const deletedFields = document.querySelector('#wplfDeletedFields')
    const editorEl = document.querySelector('.wplf-editor .wplf-cmEditor')
    const thankYouEl = document.querySelector('.wplf-afterSubmission .wplf-cmEditor')
    const previewEl = document.querySelector('.wplf-editor__preview')

    const initialState = {
      oldFields: JSON.parse(fields.value), // "does not change"

      fields: JSON.parse(fields.value),
      additionalFields: JSON.parse(additionalFields.value),
      newFields: [],
      deletedFields: [],
      allowSave: false,
    }

    this.wplf = wplfInstance
    this.state = initialState
    this.inputs = {
      fields,
      additionalFields,
      newFields,
      deletedFields,
    }
    this.previewEl = previewEl
    this.publishButton = document.querySelector('#publish')
    this.contentEditor = wp.codeEditor.initialize($(editorEl), globalData.codeMirror)
    this.successMessageEditor = wp.codeEditor.initialize($(thankYouEl), globalData.codeMirror)
    this.fieldTemplate = document.querySelector('.wplf-formFields > .wplf-formFields__field').cloneNode(true)
    this.handleContentChange = this.handleContentChange.bind(this)
    this.contentEditor.codemirror.on('changes', _.debounce(this.handleContentChange, 1000))
    this.handleContentChange(this.contentEditor.codemirror) // Triggers preview build

    if (!globalData.settings.hasUnfilteredHtml) {
      this.tryToPreventEdit();
    }
  }

  setState(fn = () => null) {
    const currentState = this.state
    const newState = fn(currentState)

    if (!newState) {
      // no op
      return
    }

    this.state = {
      ...currentState,
      ...newState
    }

    this.afterStateChange()
  }

  getState() {
    return this.state
  }

  writeState() {
    Object.entries(this.inputs).forEach(([key, el]) => {
      if (this.state[key] !== null) {
        el.value = JSON.stringify(this.state[key])
      }
    })
  }

  afterStateChange() {
    const state = this.getState()

    Object.entries(state).forEach(([k, v]) => {
      switch (k) {
        case 'allowSave': {
          if (v) {
            this.publishButton.removeAttribute('disabled')
          } else {
            this.publishButton.setAttribute('disabled', true)
          }
        }

        // no default, yet
      }
    })
  }

  /**
   * Disable bunch of things and remove the submit button,
   * backend will handle it if necessary but it's not pretty.
   * Backend should also print a notice above the form.
   */
  tryToPreventEdit() {
    // Might as well use the jQuery since it's wp-admin
    $('#title').prop('disabled', true);
    $('#content').prop('disabled', true);
    $('#publish').remove();
    $('#save-post').remove();
  }

  async handleContentChange(editor) {
    let { wplf, formInstance } = this
    const content = editor.getValue()

    try {
      if (this.formInstance) {
        wplf.detach(formInstance)
      }

      await this.updatePreview(content)
      await this.updateFormFieldsFromPreview()
      await this.removeProblematicAttributesFromPreview()
      this.writeState()
      formInstance = wplf.attach(this.previewEl)
    } catch (e) {
      log.error('Failed to get preview', e)
    }
  }

  async updatePreview(content) {
    const tmpEl = document.createElement('div')
    const formId = parseInt(document.querySelector('input[name="post_ID"]').value, 10)
    const body = new FormData()
    body.append('content', content)
    body.append('formId', formId)

    const { data } = await request('/render', {
      method: 'POST',
      body,
    })
    const { html } = data

    tmpEl.innerHTML = html

    await waitForNextTick()

    this.previewEl.innerHTML = tmpEl.querySelector('form').innerHTML

    await waitForNextTick();
  }

  getDuplicateNames(names) {
    return _.unique(names.filter(name => {
      return names.filter(n => n === name).length > 1
    }))
  }

  createFieldElement(field, errorMessage) {
    const element = this.fieldTemplate.cloneNode(true)
    const { name, type } = field
    const n = element.querySelector('strong')
    const t = element.querySelector('.wplf-formFields__field__type em')
    const alert = element.querySelector('.wplf-formFields__field__alert')


    n.innerText = name
    t.innerText = type

    if (errorMessage) {
      alert.setAttribute('title', errorMessage)
    } else {
      alert.parentNode.removeChild(alert)
    }

    return element
  }

  async updateFormFieldsFromPreview() {
    const { oldFields, additionalFields } = this.getState()
    const el = this.previewEl
    const fieldContainer = document.querySelector('.wplf-formFields')

    let allowSave = true

    // Get all inputs with a name attribute, yes, even button.
    const fields = Array.from(el.querySelectorAll('input, textarea, select, button'))
      .filter(el => el.getAttribute('name'))
      .map(extractFieldDataFromElement)
    const fieldNames = fields.map(field => field.name)
    const duplicateNames = this.getDuplicateNames(fieldNames)

    // console.log('test', additionalFields, duplicateNames, fieldNames);

    fieldContainer.innerHTML = ''

    const fieldErrors = []
    fields.forEach(field => {
      const { name, type } = field
      const oldField = oldFields.find(field => field.name === name)
      let errorMessage = ''

      if (duplicateNames && duplicateNames.includes(name)) {
        errorMessage = `${errorMessage}Duplicate field name: ${name}\n`
      }

      if (additionalFields.includes(name)) {
        errorMessage = `${errorMessage}You can't use "${name}" as a name, as it conflicts with a core field name.\n`
      }

      if (oldField && oldField.type !== type) {
        errorMessage = `${errorMessage}Field already exists in the database with the type ${type}, use a different name or remove the field first.\n`
      }

      if (errorMessage) {
        fieldErrors.push(errorMessage)
      }

      fieldContainer.appendChild(this.createFieldElement(field, errorMessage))
    })

    if (!fieldErrors.length) {
      allowSave = true
    } else {
      allowSave = false
    }

    const newFields = fields.filter(field => {
      const fieldInInitialData = oldFields.find(x => x.name === field.name)

      return fieldInInitialData ? false : true;
    })


    const deletedFields = oldFields.filter(field => {
      return !fieldNames.includes(field.name)
    })

    this.setState(() => ({
      fields,
      newFields,
      deletedFields,
      allowSave
    }))

    console.log({ fields, newFields, deletedFields })

    await waitForNextTick();
  }

  async removeProblematicAttributesFromPreview() {
    // Names and required attributes cause problems when saving the form, remove
    const requiredEls = Array.from(this.previewEl.querySelectorAll('[required]'))
    const nameEls = Array.from(this.previewEl.querySelectorAll('[name]'))

    requiredEls.forEach(el => el.removeAttribute('required'))
    nameEls.forEach(el => el.removeAttribute('name'))

    await waitForNextTick()
  }
}