const token_code = "@TCC_CARPEDIEM_TOKEN"

export function getToken(){
  return localStorage.getItem(token_code)
}
export function setToken(token: string) {
  localStorage.setItem(token_code, token)
}
export function removeToken(){
  localStorage.removeItem(token_code)
}