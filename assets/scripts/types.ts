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

declare global {
  interface Window {
    // React: React, // @types/react has it handled already
    // WPLF: WPLF // We're not going to use our own library from window

    // This comes from WordPress
    wplfData: {
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
      settings: {
        autoinit: boolean
        debugLevel: string
        hasUnfiltedHtml: number
        parseLibreformsShortcodeInRestApi: boolean
      }
    }
  }
}
