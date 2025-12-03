const TOKEN_KEY = 'fa_token'

export function saveToken(user) {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(user))
}

export function getToken() {
  const raw = localStorage.getItem(TOKEN_KEY)
  return raw ? JSON.parse(raw) : null
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
}

export function isAuthenticated() {
  return !!getToken()
}
