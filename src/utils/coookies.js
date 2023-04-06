import cookies from 'js-cookie'
import { AUTH_NAMESPACE } from '../constants'

export function setAuthCookie(token) {
  cookies.set(AUTH_NAMESPACE, token, {
    expires: 7, // 7 days
  })
}

export function getAuthCookie() {
  const token = cookies.get(AUTH_NAMESPACE)
  return token
}

export function removeAuthCookie() {
  cookies.remove(AUTH_NAMESPACE)
}
