import WPLF from './classes/wplf'
import '../styles/wplf-frontend.scss'

// Webpack exposes the instance in window.WPLF, do not load admin and frontend bundles at the same time.
export default new WPLF()