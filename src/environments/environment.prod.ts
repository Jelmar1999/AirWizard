const packagejson = require('../../package.json')

export const environment = {
  production: true,

  // Fill in your own online server API url here
  apiUrl: 'https://airwizardapi.azurewebsites.net/api/',

  version: packagejson.version
}
