import globalData from '../lib/global-data'
import createApiClient from '../lib/api-client'
import log from '../lib/log'
import { waitForNextTick } from '../lib/wait'
import isElementish from '../lib/is-elementish'

import { ApiResponseKind, Field, List, WPLF_EditorState } from '../types'
import getAttribute from '../lib/get-attribute'

import WPLF from './wplf'
import { WPLF_Form } from './wplf-form'

import React from 'react'
import ReactDOM from 'react-dom'
import SubmissionList from '../react/SubmissionList'

const { abort, request, signal } = createApiClient()
const { i18n } = globalData

const $ = window.jQuery
const _ = window._
const wp = window.wp

// const xyz = (implicitAny) => implicitAny.toString()

export default class WPLF_Editor {
  wplf: WPLF
  state: WPLF_EditorState

  formInstance: WPLF_Form | null = null
  inputs: List<Element>
  previewEl: Element // This SHOULD be a HTMLFormElement (as should the element itself), but that would cause nested forms inside wp-admin, and that would be bad.
  publishButton: Element
  fieldTemplate: Element

  // Codemirror instances:
  contentEditor: any
  successMessageEditor: any

  constructor(wplfInstance: WPLF) {
    const fields = document.querySelector('#wplfFields')
    const additionalFields = document.querySelector('#wplfAdditionalFields')
    const newFields = document.querySelector('#wplfNewFields')
    const deletedFields = document.querySelector('#wplfDeletedFields')
    const historyFields = document.querySelector('#wplfHistoryFields')
    const allowSave = document.querySelector('#wplfAllowSave')
    const submissionsEl = document.querySelector(
      '.wplf-editor .wplf-submissionList'
    )
    const editorEl = document.querySelector('.wplf-editor .wplf-cmEditor')
    const thankYouEl = document.querySelector(
      '.wplf-afterSubmission .wplf-cmEditor'
    )
    const previewEl = document.querySelector('.wplf-editor__preview')
    const publishButton = document.querySelector('#publish')
    const sidebarFieldTemplate = document.querySelector(
      '.wplf-formFields > .wplf-formFields__field'
    )

    if (
      isElementish(fields) &&
      isElementish(additionalFields) &&
      isElementish(newFields) &&
      isElementish(deletedFields) &&
      isElementish(historyFields) &&
      isElementish(allowSave) &&
      isElementish(submissionsEl) &&
      isElementish(editorEl) &&
      isElementish(thankYouEl) &&
      isElementish(previewEl) &&
      isElementish(publishButton) &&
      isElementish(sidebarFieldTemplate)
    ) {
      const editorIsReadonly = $(editorEl).attr('readonly') ? true : false
      const initialState = {
        historyFields: JSON.parse(
          // (historyFields && historyFields.getAttribute('value')) || null
          getAttribute(historyFields, 'value') || '{}'
        ), // "does not change"

        fields: JSON.parse(getAttribute(fields, 'value') || 'null'),
        additionalFields: JSON.parse(
          getAttribute(additionalFields, 'value') || 'null'
        ),
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
        historyFields,
        allowSave,
      }

      this.fieldTemplate = sidebarFieldTemplate.cloneNode(true) as Element
      this.fieldTemplate.removeAttribute('hidden')

      this.previewEl = previewEl
      this.publishButton = publishButton
      this.contentEditor = editorIsReadonly
        ? null
        : wp.codeEditor.initialize($(editorEl), globalData.codeMirror)
      this.successMessageEditor = wp.codeEditor.initialize(
        $(thankYouEl),
        globalData.codeMirror
      )
      this.handleContentChange = this.handleContentChange.bind(this)

      if (!editorIsReadonly) {
        // If the editor is in read-only mode, no need to refresh the preview as it can't change anyway.

        this.contentEditor.codemirror.on(
          'changes',
          _.debounce(this.handleContentChange, 1000)
        )

        this.handleContentChange(this.contentEditor.codemirror) // Triggers preview build
      } else {
        this.handleContentChange(editorEl.getAttribute('value'))
      }

      if (!globalData.settings.hasUnfilteredHtml) {
        this.tryToPreventEdit()
      }

      const formId = globalData.post?.ID || null

      if (formId) {
        ReactDOM.render(
          React.createElement(
            SubmissionList,
            {
              formId,
            },
            null
          ),
          submissionsEl
        )
      }
    } else {
      throw new Error(
        'Missing some or all of the required elements to run WPLF_Editor'
      )
    }
  }

  setState(
    fn = (currentState: WPLF_EditorState): Partial<WPLF_EditorState> => ({})
  ) {
    const currentState = this.state
    const newState = fn(currentState)

    if (!newState) {
      // no op
      return
    }

    this.state = {
      ...currentState,
      ...newState,
    }

    this.afterStateChange()
  }

  getState() {
    return this.state
  }

  writeState() {
    Object.entries(this.inputs).forEach(([key, el]) => {
      if (key in this.state) {
        // if (this.state[key] !== null) {
        const value = this.state[key]

        if (typeof value === 'boolean') {
          el.setAttribute('value', value ? '1' : '0')
        } else {
          // el.value = JSON.stringify(value)
          el.setAttribute('value', JSON.stringify(value))
        }
      }
    })
  }

  afterStateChange() {
    const state = this.getState()

    Object.entries(state).forEach(([k, v]) => {
      switch (k) {
        case 'allowSave': {
          this.writeState()

          if (v) {
            this.publishButton.removeAttribute('disabled')
          } else {
            this.publishButton.setAttribute('disabled', 'true')
          }
        }

        // no default
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
    $('#title').prop('disabled', true)
    $('#content').prop('disabled', true)
    $('#publish').remove()
    $('#save-post').remove()
  }

  // `editor` is a CodeMirror instance or a string
  async handleContentChange(editor: string | any) {
    let { wplf, formInstance } = this
    const content = typeof editor === 'string' ? editor : editor.getValue()

    try {
      if (formInstance) {
        wplf.detach(formInstance)
        formInstance = null
      }

      // Disable submit button when the fields change
      this.setState(() => ({ allowSave: false }))

      await this.updatePreview(content)
      await this.updateFormFieldsFromPreview()
      await this.removeProblematicAttributesFromPreview()

      this.writeState()
      formInstance = wplf.attach(this.previewEl)
    } catch (e) {
      log.error('Failed to get preview', e)
    }
  }

  async updatePreview(content: string) {
    const idEl = document.querySelector('input[name="post_ID"]') as Element
    const formId = parseInt(getAttribute(idEl, 'value') || '0', 10)
    const body = new FormData()
    body.append('content', content)
    body.append('formId', formId.toString())

    globalData.lang && body.append('lang', globalData.lang)

    let object: List<any> = {}
    body.forEach(function (value, key) {
      object[key] = value
    })

    const req = await request(
      '/render',
      {
        method: 'POST',
        body,
      },
      ApiResponseKind.Render
    )

    if (req.kind === ApiResponseKind.Render) {
      if ('error' in req.data) {
        this.previewEl.innerHTML = JSON.stringify(req.data)
      } else if ('html' in req.data) {
        const tmpEl = document.createElement('div')
        const { html } = req.data

        tmpEl.innerHTML = html

        await waitForNextTick()

        if (tmpEl) {
          const form = tmpEl.querySelector('form')
          this.previewEl.innerHTML = form ? form.innerHTML : ''
        }

        await waitForNextTick()
      }
    }
  }

  getDuplicateNames(names: string[]) {
    return _.unique(
      names.filter((name: string) => {
        return names.filter((n: string) => n === name).length > 1
      })
    )
  }

  createFieldElement(field: Field, errorMessage: string = '') {
    const element = this.fieldTemplate.cloneNode(true) as Element
    const { name, type, required } = field
    const nameEl = element.querySelector('strong') as HTMLElement
    const typeEl = element.querySelector(
      '.wplf-formFields__field__type em'
    ) as HTMLElement
    const alert = element.querySelector('.wplf-formFields__field__alert')

    if (isElementish(nameEl) && isElementish(typeEl) && isElementish(alert)) {
      nameEl.innerText = name
      typeEl.innerText = required ? `required ${type}` : type

      if (errorMessage) {
        alert.setAttribute('title', errorMessage)

        const messages = document.createElement('p')
        const message = `<strong>${i18n.problems}</strong>${errorMessage}`.replace(
          /(?:\r\n|\r|\n)/g,
          '<br>'
        )
        messages.innerHTML = message

        alert.insertAdjacentElement('afterend', messages)
      } else {
        isElementish(alert.parentNode) && alert.parentNode.removeChild(alert)
      }
    }

    return element
  }

  async updateFormFieldsFromPreview() {
    const { historyFields, additionalFields } = this.getState()
    const el = this.previewEl
    const fieldContainer = document.querySelector('.wplf-formFields')

    if (!isElementish(fieldContainer)) {
      console.warn('Field container does not exist')

      return
    }

    let allowSave = true

    // Get all inputs with a name attribute, yes, even button.
    const fields = Array.from(
      el.querySelectorAll('input, textarea, select, button')
    )
      .filter((el) => el.getAttribute('name'))
      .reduce<Field[]>((acc, el: Element) => {
        if (el && isElementish(el)) {
          const fieldName = el.getAttribute('name')

          if (!fieldName) {
            // return null
            return acc
          }

          /**
           * Remove brackets from the name, because they cause us grief.
           * The brackets are not visible in the actual data, which kinda breaks all comparisons.
           */
          const name = fieldName.replace('[]', '')
          const type = el.getAttribute('type') || el.tagName.toLowerCase()
          const required = el.getAttribute('required') !== null ? true : false
          const multiple = fieldName.endsWith('[]')

          acc.push({
            name,
            type,
            required,
            multiple,
          })

          return acc
        }

        return acc
      }, [])
    // .filter((n) => n !== null)

    const fieldNames = fields.map((field) => field.name)
    const duplicateNames = this.getDuplicateNames(fieldNames)

    fieldContainer.innerHTML = ''

    const fieldErrors = []

    fields.forEach((field) => {
      if (!field) {
        return
      }

      const { name, type } = field
      const historyField = Object.values(historyFields).find(
        (field) => field.name === name
      )
      let errorMessage = ''

      // names like fieldgroup[fieldname] are not supported yet
      if (name.match(/\w*\[\w*\]/)) {
        errorMessage = `${errorMessage}${i18n.groupedNamesNotSupportedYet}\n`
      }

      if (duplicateNames && duplicateNames.includes(name)) {
        // console.log('duplicates', duplicateNames, field)

        // Allow checkboxes etc to work normally
        if (!field.multiple) {
          errorMessage = `${errorMessage}${i18n.duplicateFieldName} ${name}\n`
        }
      }

      if (additionalFields.includes(name)) {
        errorMessage = `${errorMessage}${i18n.illegalName.replace(
          '{name}',
          name
        )}\n`
      }

      if (historyField && historyField.type !== type) {
        errorMessage = `${errorMessage}${i18n.fieldAlreadyExistsInDb.replace(
          '{type}',
          historyField.type
        )}\n`
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

    const newFields = fields.filter((field) => {
      if (!field) {
        return false
      }

      const fieldInInitialData = Object.values(historyFields).find(
        (x) => x.name === field.name
      )

      return fieldInInitialData ? false : true
    })

    const deletedFields = Object.values(historyFields).filter((field) => {
      return !fieldNames.includes(field.name)
    })

    const newState: Partial<WPLF_EditorState> = {
      // fields: fields as Field[],
      // After clearing the duplicates, an object will suit us better
      fields: fields.reduce<List<Field>>((acc, field) => {
        acc[field.name] = field

        return acc
      }, {}),
      newFields: newFields as Field[],
      deletedFields,
      allowSave,
    }

    this.setState(() => newState)

    await waitForNextTick()
  }

  async removeProblematicAttributesFromPreview() {
    // Names and required attributes cause problems when saving the form, remove
    const requiredEls = Array.from<Element>(
      this.previewEl.querySelectorAll('[required]')
    )
    const nameEls = Array.from<Element>(
      this.previewEl.querySelectorAll('[name]')
    )

    requiredEls.forEach((el: Element) => el.removeAttribute('required'))
    nameEls.forEach((el: Element) => el.removeAttribute('name'))

    await waitForNextTick()
  }
}
