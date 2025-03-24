
export const AUTH_TOKEN = 'token'
export const IS_ADMIN = 'admin'
export const LSK_IS_LOGGED = 'isLogged'
export const REFRESH_TOKEN = 'refreshToken'



export function getList(key: string) {
  let result: string | null = localStorage.getItem(key)
  try {
    let list = JSON.parse(result ?? '')
    return list ? list : []
  } catch (e) {
    return []
  }
}

export function getItem(key: string, isSession: boolean = false) {
  let result: string | null = isSession ? sessionStorage.getItem(key) : localStorage.getItem(key)
  if (result !== "") {
    try {
      return JSON.parse(result ?? '')
    }
    catch {
      return null
    }

  }
  return null
}

export function setItem(key: string, data: any, isSession: boolean = false) {
  if (data !== null)
    isSession ? sessionStorage.setItem(key, JSON.stringify(data)) : localStorage.setItem(key, JSON.stringify(data))
}

export function removeItem(key: string) {
  localStorage.removeItem(key)
}

export function getToken() {
  return getItem(AUTH_TOKEN)
}

export function setToken(token: string) {
  return setItem(AUTH_TOKEN, token)
}

export function setIsAdmin(isAdmin: string) {
  return setItem(IS_ADMIN, isAdmin)
}

export function getIsAdmin() {
  return getItem(IS_ADMIN)
}


export function getRefreshToken() {
  return getItem(REFRESH_TOKEN)
}

export function setRefreshToken(token: string) {
  return setItem(REFRESH_TOKEN, token)
}
