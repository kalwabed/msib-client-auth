import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const RootLayout = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleOnLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="container">
      <header>
        <nav>
          <ul>
            <li>
              <strong>Logo</strong>
            </li>
          </ul>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
          </ul>
          <ul>
            <li>
              <button onClick={handleOnLogout} className="secondary outline">
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </div>
  )
}

export default RootLayout
