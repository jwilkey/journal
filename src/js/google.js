const gapi = window.gapi
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
gapi.load('client:auth2', initClient)

let isAuthorized = false

export default {
  signIn () {
    gapi.auth2.getAuthInstance().signIn()
  },
  isAuthorized,
  getSheet () {
    return gapi.client.sheets.spreadsheets.values.get({ spreadsheetId: '1Wmec3s1vFFCFeaKW5WSlArr0jHx1uY722Ye_YKgwf4Y', range: 'A:Z' })
  }
}

function initClient () {
  const credentials = require('../credentials.json')
  const { apiKey, client_secret, clientId, redirect_uris } = credentials.installed
  gapi.client.init({
    apiKey,
    discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    clientId,
    scope: SCOPES[0]
  }).then(function () {
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus)
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
  })
}

function updateSigninStatus (isSignedIn) {
  console.log('Is Logged in: ' + isSignedIn)

  isAuthorized = isSignedIn
}
