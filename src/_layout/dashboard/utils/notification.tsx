import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useMessagesStore } from '@/store/notify-event'
import { Bell, BellRing, X } from 'lucide-react'
import { useState } from 'react'

export function Notification() {
  const messages = useMessagesStore((state) => state.messages)
  const clearMessage = useMessagesStore((state) => state.clearMessage)
  const [checkedMessages, setCheckedMessages] = useState(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          onClick={() => setCheckedMessages(true)}
          className={`${messages.length > 1 && !checkedMessages ? 'animate-pulse text-blue-500' : ''}`}
        >
          {messages.length > 1 ? <BellRing /> : <Bell />}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px]">
        <DropdownMenuLabel className="text-center">
          Notificações
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {messages &&
          messages.map((message, index) => {
            return (
              <div
                key={index}
                className="mb-2 flex cursor-pointer items-center justify-between gap-2 rounded p-2 text-sm hover:bg-accent"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground">
                    {message.title}
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
          })}
        {messages.length >= 5 && (
          <DropdownMenuItem className="font-semibold text-emerald-500">
            + 5 mensagens
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
