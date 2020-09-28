import WPLF from './classes/wplf'
import '../styles/wplf-frontend.scss'

import './types'

// console.log('React', window.React, window.ReactDOM)
// console.log('test', window.React)

// Webpack exposes the instance in window.WPLF, do not load admin and frontend bundles at the same time.
export default new WPLF()
