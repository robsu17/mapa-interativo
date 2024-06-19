import { createBrowserRouter } from 'react-router-dom'

import { SignIn } from './pages/auth/sign-in'
import { Dashboard } from './pages/dashboard'
import { Products } from './pages/products'
import { ProtectedRoute } from './pages/protected-route'
import { NotProtectedRoute } from './pages/not-protected-route'
import { Details } from './pages/products/details'

export const router = createBrowserRouter([
  {
    path: '/sign-in',
    element: <NotProtectedRoute element={<SignIn />} />,
  },
  {
    path: '/',
    element: <ProtectedRoute element={<Dashboard />} />,
    children: [
      {
        path: 'products',
        element: <ProtectedRoute element={<Products />} />,
      },
      {
        path: 'products/:id',
        element: <ProtectedRoute element={<Details />} />,
      },
    ],
  },
])
