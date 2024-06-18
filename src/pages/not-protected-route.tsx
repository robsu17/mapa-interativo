import { useAuthStore } from '@/store/auth'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  element: JSX.Element
}

export function NotProtectedRoute({ element }: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return !isAuthenticated ? element : <Navigate to={'/'} />
}
