import ReactDOM from 'react-dom/client'
import './globals.css'
import { Helmet, HelmetProvider } from 'react-helmet-async'

import { Toaster } from 'sonner'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query.ts'
import { App } from './app.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <Helmet titleTemplate="%s | Mapa Interativo" />
    <Toaster richColors closeButton position="bottom-right" />
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </HelmetProvider>,
)
