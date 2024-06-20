import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { useAuthStore } from './store/auth'
import { useMessagesStore } from './store/notify-event'
import { useEffect, useState } from 'react'
import { EventSourcePolyfill } from 'event-source-polyfill'
import { env } from './env'
import { useTenantStore } from './store/tenant'

export function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const accessToken = useAuthStore((state) => state.accessToken)
  const tenantUuid = useTenantStore((state) => state.tenantUuid)
  const setMessages = useMessagesStore((state) => state.setMessage)
  const clearMessages = useMessagesStore((state) => state.clearMessages)

  const [eventSource, setEventSource] = useState<EventSourcePolyfill>()

  initializeAuth()

  useEffect(() => {
    if (eventSource) {
      eventSource.close()
      clearMessages()
    }

    if (!isAuthenticated) {
      return
    }

    const newEventSourceFill = new EventSourcePolyfill(
      `${env.VITE_API_URL}/notify/${tenantUuid}/events`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    newEventSourceFill.onmessage = (event) => {
      const data = JSON.parse(event.data)
      const message = {
        title: data.event,
        text: data.message,
      }
      setMessages(message)
    }

    newEventSourceFill.onerror = () => {
      newEventSourceFill.close()
    }

    setEventSource(newEventSourceFill)

    return () => {
      if (eventSource) {
        eventSource.close()
      }
    }
  }, [tenantUuid])

  return <RouterProvider router={router} />
}
