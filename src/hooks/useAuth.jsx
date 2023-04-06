import ky from 'ky'
import { BASE_URL } from '../constants'
import { useState } from 'react'
import { removeAuthCookie } from '../utils/coookies'

export default function useAuth() {
  const [isLoading, setIsLoading] = useState(false)

  const login = async ({ email, password }) => {
    try {
      setIsLoading(true)
      const response = await ky
        .post(`${BASE_URL}/login`, {
          json: { email, password },
        })
        .json()

      return response
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    removeAuthCookie()
  }

  return {
    login,
    logout,
    isLoading,
  }
}
