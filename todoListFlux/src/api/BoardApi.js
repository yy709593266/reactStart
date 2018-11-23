// const API_URL = 'http://kanbanapi.pro-react.com'//后端接口地址
const API_URL = '../../mock/cardsList.json'//后端接口地址
const API_HEADERS = {
  'Content-Type': 'application/json',
  Authorization: 'any-string-you-like'
}

let BoardAPI = {
  fetchCards(){
    return fetch(API_URL, {headers: API_HEADERS}).then(res=>res.json())
  }
}

export default BoardAPI