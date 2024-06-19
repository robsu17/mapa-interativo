import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { useAuthStore } from './store/auth'

export function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth)

  initializeAuth()

  // useEffect(() => {
  //   if (eventSource) {
  //     eventSource.close()
  //   }

  //   const newEventSourceFill = new EventSourcePolyfill(
  //     `${env.VITE_API_URL}/notify/${tenantUuid}/events`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     },
  //   )

  //   newEventSourceFill.onmessage = (event) => {
  //     const data = JSON.parse(event.data)
  //   }

  //   newEventSourceFill.onerror = () => {
  //     newEventSourceFill.close()
  //   }

  //   setEventSource(newEventSourceFill)

  //   return () => {
  //     if (eventSource) {
  //       eventSource.close()
  //     }
  //   }
  // }, [tenantUuid])

  return <RouterProvider router={router} />
}
