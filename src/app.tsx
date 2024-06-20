import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { useAuthStore } from './store/auth'

export function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth)

  initializeAuth()

  return <RouterProvider router={router} />
}
