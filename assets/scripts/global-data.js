export default ((window) => ({
  ...window.WPLF_DATA // Exposed from WP
}))(window) // TODO: Maybe add Node compatibility?
