import WPLF_Admin from './classes/wplf-admin'
import WPLF from './classes/wplf'
import '../styles/wplf-admin.scss'

// Webpack exposes the instance in window.WPLF, do not load admin and frontend bundles at the same time.
export default new WPLF_Admin(new WPLF())
