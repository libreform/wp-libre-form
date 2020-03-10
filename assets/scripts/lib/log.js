import globalData from './global-data'

const { debugLevel } = globalData.settings

const console = window.console || { log() {}, error() {} } // noop fallback
const notice = (message, ...params) => debugLevel === 'all' && console.log(`WPLF: ${message}`, params)
const error = (message, ...params) => debugLevel !== 'none' && console.error(`WPLF error: ${message}`, params)

export default {
  notice,
  error,
}