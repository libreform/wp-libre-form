import { WPLF_LocalizeData } from '../types'

export default ((window): WPLF_LocalizeData =>
  Object.assign(
    {
      backendUrl: null,
      fetchCredentials: 'same-origin',
      requestHeaders: {
        'X-WP-Nonce': null,
      },
      assetsDir: null,
      settings: {
        autoinit: true,
        parseLibreformShortcodeInRestApi: true,
        hasUnfilteredHtml: 1,
        debugLevel: 'all',
      },
      post: null,
      i18n: {
        problems: 'Problems: ',
        duplicateFieldName: 'Duplicate field name: ',
        illegalName:
          "You can't use {name} as a name, as it conflicts with a core field name.",
        fieldAlreadyExistsInDb:
          'Field already exists in the database with the type {type}, use a different name or remove the field first.',
        groupedNamesNotSupportedYet:
          'Field names like these are not supported yet. Try using camelCasing or under_scores for grouped names instead.',
      },
    },
    window.wplfData // wp_localize_script
  ))(window)
