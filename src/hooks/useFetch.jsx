import { useState, useEffect } from 'react'
import ky from 'ky'
import { BASE_URL } from '../constants'
import { getAuthCookie } from '../utils/coookies'

export default function useFetch() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const requestHeadersWithToken = () => {
    const authToken = getAuthCookie()
    return {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'x-api-key': authToken,
      },
    }
  }

  const getUsers = async () => {
    const { data } = await ky.get(`${BASE_URL}/users`, requestHeadersWithToken()).json()
    setUsers(data)
  }

  const addNewUser = async ({ name, job }) => {
    const newUser = {
      id: Math.floor(Math.random() * 1000),
      first_name: name,
      job,
    }

    setIsLoading(true)
    const user = await ky
      .post(`${BASE_URL}/users`, {
        json: newUser,
        ...requestHeadersWithToken(),
      })
      .json()

    setIsLoading(false)
    setUsers(prev => [...prev, user])
  }

  const removeUser = async id => {
    await ky.delete(`${BASE_URL}/users/${id}`, requestHeadersWithToken())
    setUsers(prev => prev.filter(user => user.id !== id))
  }

  const updateUser = async ({ name, id }) => {
    setIsLoading(true)
    const user = await ky
      .put(`${BASE_URL}/users/${id}`, {
        json: { first_name: name },
        ...requestHeadersWithToken(),
      })
      .json()

    setIsLoading(false)
    const newUsers = users.map(user => {
      if (user.id === id) {
        return { ...user, first_name: name }
      }
      return user
    })
    console.log('🚀 ~ file: useFetch.jsx:55 ~ updateUser ~ newUsers:', newUsers)
    setUsers(newUsers)
  }

  useEffect(() => {
    getUsers()
  }, [])

  return { users, addNewUser, isLoading, removeUser, updateUser }
}
