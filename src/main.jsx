import React from 'react'
import ReactDOM from 'react-dom/client'
import '@picocss/pico/css/pico.min.css'
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import HomePage from './pages'
import AboutPage from './pages/about'
import RootLayout from './components/layout/root'
import LoginPage from './pages/login'
import { getAuthCookie } from './utils/coookies'
import { redirect } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    loader: () => {
      const token = getAuthCookie()
      if (!token) {
        return redirect('/login')
      }
      return null
    },
    children: [
      {
        element: <HomePage />,
        index: true,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
    loader: () => {
      const token = getAuthCookie()
      if (token) {
        return redirect('/')
      }
      return null
    },
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
