export default ((window) => ({
  ...window.wplfData // Exposed from WP
}))(window) // TODO: Maybe add Node compatibility?
