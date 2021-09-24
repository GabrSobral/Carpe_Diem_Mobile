const token_code = "@TCC_CARPEDIEM_TOKEN"
const answered_code = "@TCC_CARPEDIEM_ANSWER"

export function getToken(){
  return localStorage.getItem(token_code)
}
export function setToken(token: string) {
  localStorage.setItem(token_code, token)
}
export function removeToken(){
  localStorage.removeItem(token_code)
}

export function getAuth(){
  return sessionStorage.getItem(token_code)
}
export function setAuth(){
  sessionStorage.setItem(token_code, 'ok')
}
export function removeAuth(){
  sessionStorage.removeItem(token_code)
}

export function getAnswered(){
  return sessionStorage.getItem(answered_code)
}
export function setAnswered(){
  sessionStorage.setItem(answered_code, 'ok')
}
export function removeAnswered(){
  sessionStorage.removeItem(answered_code)
}