import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home'
import Create from './pages/Create'
import Submit from './pages/Submit'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/create',
    element: <Create />,
  },
  {
    path: '/submit/:uid',
    element: <Submit />,
    loader: async ({ params }) => {
      const res = await fetch(`/api/v1/${params.uid}`)
      const data = await res.json()
      if (res.status === 404) {
        throw redirect('/')
      }
      return data
    },
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
