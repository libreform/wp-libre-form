import { WPLF_Form } from './classes/wplf-form'

export enum SubmitState {
  Unsubmitted,
  Submitting,
  Success,
  Error,
}
export type SubmitHandler = (event: Event) => Promise<void>
export type FormCallback = (wplfForm: WPLF_Form, params: List<any>) => void

export interface WPLF_Tabs {
  remember: boolean
  activeTab: null | string
  root: HTMLElement
  name: string
}

export interface List<T> {
  [k: string]: T
}

export enum ApiResponseKind {
  Submission = 'submission',
  Render = 'render',
  GetSubmissions = 'getsubmissions',
}

export interface RawApiResponse {
  headers: Headers
  status: number
  statusText: string
  url: string
  ok: boolean
  data: any
}

export interface SubmitApiResponse extends RawApiResponse {
  kind: ApiResponseKind.Submission
  data:
    | { error: string; data: string }
    | {
        submission: {
          ID: number
        }
      }
}

export interface GetSubmissionsApiResponse extends RawApiResponse {
  kind: ApiResponseKind.GetSubmissions
  data:
    | { error: string; data: string }
    | {
        submission: {
          ID: number
        }
      }
}

export interface RenderApiResponse extends RawApiResponse {
  kind: ApiResponseKind.Render
  data:
    | { error: string; data: string }
    | {
        html: string
        form: {
          ID: number
          postContainsFileInputs: true
          title: string
        }
      }
}

export type ApiResponse =
  | SubmitApiResponse
  | GetSubmissionsApiResponse
  | RenderApiResponse

export interface Field {
  name: string
  type: string
  required: boolean
  multiple: boolean
}

export interface WPLF_EditorState {
  historyFields: List<Field>
  fields: Field[]
  additionalFields: string[]
  newFields: Field[]
  deletedFields: Field[]
  allowSave: boolean
  [k: string]: any // and anything else your heart may desire
}

export interface WPLF_LocalizeData {
  backendUrl: string
  assetsDir: string
  // fetchCredentials: string
  fetchCredentials: 'same-origin' | 'include' | 'omit'
  i18n: List<string>
  lang?: string
  requestHeaders: {
    'X-WP-Nonce': string
    [k: string]: any
  }
  codeMirror: any
  settings: {
    autoinit: boolean
    debugLevel: string
    hasUnfilteredHtml: number
    parseLibreformsShortcodeInRestApi: boolean
  }
}

declare global {
  interface Window {
    // React: React, // @types/react has it handled already
    // WPLF: WPLF // We're not going to use our own library from window

    // This comes from WordPress
    wplfData: WPLF_LocalizeData

    // Some WP globals that we don't have types for
    jQuery: any // WP uses 1.12.4, there's no @types/jquery@1.12.4
    // _: any, // @types/underscore@1.8.3
    wp: any
  }
}
