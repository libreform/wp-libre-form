import log from '../lib/log'

class Storage {
  prefix

  constructor(prefix = 'wplf') {
    this.prefix = prefix
  }

  get(key, defaultValue) {
    const data = localStorage.getItem(this.prefix + key)

    if (data !== null) {
      const value = data ? JSON.parse(data) : data

      return value
    } else {
      log.notice(`No value found for ${key}, falling back to default`, defaultValue)

      return defaultValue
    }
  }

  set(key, value) {
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(value))
    } catch (e) {
      log.error(e, key, value)

      return false
    }
  }
}


export default new Storage