const packagejson = require('../../package.json')

export const environment = {
  production: true,

  // Fill in your own online server API url here
  apiUrl: 'https://localhost:7277/api/',

  version: packagejson.version
}
