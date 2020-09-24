import AbortController from 'abort-controller'
import globalData from './global-data'
import { List, ApiResponse, ApiResponseKind } from '../types'

/**
 * It's ok to create multiple API clients
 *
 * Usage: const { abort, request, getSignal } = createApiClient()
 */
function createApiClient() {
  let controller: AbortController | null = null
  let signal: AbortSignal | null = null

  console.log(globalData)

  return {
    // controller: null,
    // signal: null,

    controller,
    signal,

    getSignal() {
      return signal
    },

    abort() {
      if (controller && controller.abort) {
        controller.abort()
      }
    },

    async request(
      target: string,
      options: List<string | number | boolean | FormData | null> = {},
      responseKind: ApiResponseKind
    ): Promise<ApiResponse> {
      controller = new AbortController()
      signal = controller.signal

      try {
        const res = await fetch(globalData.backendUrl + target, {
          method: 'GET',
          signal,
          credentials: globalData.fetchCredentials || 'same-origin',
          headers: globalData.requestHeaders || {},
          ...options,
        })
        const { headers, status, statusText, url, ok } = res
        const data = await res.json()

        controller = null

        return {
          kind: responseKind,
          headers,
          status,
          statusText,
          url,
          ok,
          data,
        }
      } catch (e) {
        controller = null

        // If you want to do something when the request is aborted, use
        // signal.addEventListener('abort', ...)
        if (e.name !== 'AbortError') {
          throw e
        }

        return e
      }
    },
  }
}

export default () => createApiClient()
