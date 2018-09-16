const gapi = window.gapi
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']

let isAuthorized = false

export default {
  initialize () {
    return new Promise((resolve, reject) => {
      gapi.load('client:auth2', () => {
        initClient().then(resolve, reject)
      })
    })
  },
  signIn () {
    return gapi.auth2.getAuthInstance().signIn()
  },
  isSignedIn () {
    return isAuthorized
  },
  getSheet () {
    return gapi.client.sheets.spreadsheets.values.get({ spreadsheetId: '1Wmec3s1vFFCFeaKW5WSlArr0jHx1uY722Ye_YKgwf4Y', range: 'A:Z' })
  }
}

function initClient () {
  const credentials = require('../credentials.json')
  const { apiKey, clientId } = credentials.installed
  return gapi.client.init({
    apiKey,
    discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    clientId,
    scope: SCOPES[0]
  }).then(function () {
    console.log('gapi configured')
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus)
    const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get()
    updateSigninStatus(isSignedIn)
    return isSignedIn
  })
}

function updateSigninStatus (isSignedIn) {
  console.log('Is Logged in: ' + isSignedIn)

  isAuthorized = isSignedIn
}
