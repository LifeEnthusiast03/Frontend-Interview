import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from "@/components/theme-provider"
import { BlogProvider } from './context/BlogContext.tsx'

 const queryclinet= new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryclinet}>
            <BlogProvider>
                <App />
            </BlogProvider>
                
          
        </QueryClientProvider>
      </ThemeProvider>
   
      
  </StrictMode>,
)
