import React from 'react'
import useAuth from '../hooks/useAuth'
import { setAuthCookie } from '../utils/coookies'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const { login, isLoading } = useAuth()
  const navigate = useNavigate()

  const handleOnSubmit = async event => {
    event.preventDefault()
    const formData = new FormData(event.target)

    const email = formData.get('email')
    const password = formData.get('password')

    const loginResponse = await login({ email, password })
    if (!loginResponse) {
      alert('error')
      return
    }

    setAuthCookie(loginResponse.token)
    navigate('/')
  }

  return (
    <div className="container" style={{ marginTop: '200px' }}>
      <hgroup>
        <h1>Welcome strangers! Do you know me?</h1>
        <p>Please login to continue.</p>
      </hgroup>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />

        <div className="grid">
          <button type="reset" className="secondary">
            Clear
          </button>
          <button type="submit" aria-busy={isLoading}>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
