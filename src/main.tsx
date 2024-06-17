import ReactDOM from 'react-dom/client'
import './globals.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes.tsx'
import { Helmet, HelmetProvider } from 'react-helmet-async'

import { Toaster } from 'sonner'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <Helmet titleTemplate="%s | Mapa Interativo" />
    <Toaster expand richColors closeButton position="top-left" />
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </HelmetProvider>,
)
