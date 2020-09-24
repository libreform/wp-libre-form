import globalData from './global-data'

const { debugLevel } = globalData.settings

const console = window.console || { log() {}, error() {} } // noop fallback
const notice = (message: string, ...params: any[]) =>
  debugLevel === 'all' && console.log(`WPLF: ${message}`, params)
const error = (message: string, ...params: any[]) =>
  debugLevel !== 'none' && console.error(`WPLF error: ${message}`, params)

export default {
  notice,
  error,
}
