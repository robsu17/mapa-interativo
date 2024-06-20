import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useMessagesStore } from '@/store/notify-event'
import { useTenantStore } from '@/store/tenant'
import { EventSourcePolyfill } from 'event-source-polyfill'
import { Bell, BellRing, X } from 'lucide-react'
import { env } from '@/env'
import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/auth'

export function Notification() {
  const messages = useMessagesStore((state) => state.messages)
  const clearMessage = useMessagesStore((state) => state.clearMessage)
  const [checkedMessages, setCheckedMessages] = useState(false)

  const tenantUuid = useTenantStore((state) => state.tenantUuid)
  const setMessages = useMessagesStore((state) => state.setMessage)
  const clearMessages = useMessagesStore((state) => state.clearMessages)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const accessToken = useAuthStore((state) => state.accessToken)

  const [eventSource, setEventSource] = useState<EventSourcePolyfill>()

  // useEffect(() => {
  //   if (eventSource) {
  //     eventSource.close()
  //     clearMessages(tenantUuid)
  //   }

  //   if (!isAuthenticated) {
  //     return
  //   }

  //   if (!tenantUuid) {
  //     return
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
  //     const message = {
  //       tenantUuid,
  //       title: data.event,
  //       text: data.message,
  //     }
  //     setMessages(message)
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
  // }, [tenantUuid, isAuthenticated])

  // const filteredMessages = messages
  //   .filter((message) => message.tenantUuid === tenantUuid)
  //   .slice(-5)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          onClick={() => setCheckedMessages(true)}
          className={`${messages.length > 1 && !checkedMessages ? 'animate-pulse text-blue-500' : ''}`}
        >
          {messages.length >= 1 ? <BellRing /> : <Bell />}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px]">
        <DropdownMenuLabel className="text-center">
          Notificações
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* {filteredMessages.map((message, index) => {
          if (message.tenantUuid === tenantUuid) {
            return (
              <div
                key={index}
                className="mb-2 flex cursor-pointer items-center justify-between gap-2 rounded p-2 text-sm hover:bg-accent"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground">
                    {message.title}
                  </span>
                  <span className="text-xs font-semibold text-emerald-500">
                    {message.tenantUuid}
                  </span>
                  <span className="">
                    {message.text.slice(1, 50).concat('...')}
                  </span>
                </div>
                <button
                  type="button"
                  className="p-1 text-destructive hover:bg-slate-200 hover:text-destructive/70"
                  onClick={() => clearMessage(message)}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )
          }
          return undefined
        })} */}
        {messages.filter((message) => message.tenantUuid === tenantUuid)
          .length >= 100 && (
          <DropdownMenuItem className="font-semibold text-yellow-500">
            + 100 novas mensagens
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
