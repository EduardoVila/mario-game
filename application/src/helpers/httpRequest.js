const xmlHttp = new XMLHttpRequest()
const apiUrl = 'http://localhost:3301'

const sendRequest = (method, route, body, callBack) => {
  xmlHttp.open(method, route, true)
  xmlHttp.setRequestHeader("Content-type", "application/json; charset=utf-8")

  xmlHttp.send(JSON.stringify(body))

  xmlHttp.onreadystatechange = () => {
    if (xmlHttp.readyState != 4 || (xmlHttp.status != 200 && xmlHttp.status != 201)) return

    callBack(JSON.parse(xmlHttp.responseText))
  }
}

exports.postAsync = (route, body, callBack) => {
  sendRequest('POST', `${apiUrl}/${route}`, body, callBack)
}

exports.getAsync = (route, body, callBack) => {
  body = body || {}

  sendRequest('GET', `${apiUrl}/${route}`, body, callBack)
}