import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import { MatchesProvider } from './Contexts/MatchesContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MatchesProvider>
      <App />
    </MatchesProvider>
  </StrictMode>,
)
