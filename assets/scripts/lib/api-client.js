import AbortController from 'abort-controller'
import globalData from './global-data'

/**
 * It's ok to create multiple API clients
 *
 * Usage: const { abort, request, getSignal } = createApiClient()
 */
function createApiClient() {
  let controller, signal;

  return {
    controller: null,
    signal: null,

    getSignal() {
      return signal
    },

    abort() {
      if (controller && controller.abort) {
        controller.abort()
      }
    },

    async request(target, options = {}) {
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
      }
    }
  }
}

export default () => createApiClient()