import { createBrowserRouter } from 'react-router-dom'

import { SignIn } from './pages/auth/sign-in'
import { Dashboard } from './pages/dashboard'
import { Products } from './pages/products'

export const router = createBrowserRouter([
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/',
    element: <Dashboard />,
    children: [
      {
        path: '/products',
        element: <Products />,
      },
    ],
  },
])
