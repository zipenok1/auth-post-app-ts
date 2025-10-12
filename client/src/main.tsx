import { createContext } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import UserStore from './store/userStore.ts'
import './index.css'

interface ContextValue {
  user: UserStore
}

export const Context = createContext<ContextValue | null>(null)

createRoot(document.getElementById('root')!).render(
  <Context.Provider value = {{
    user: new UserStore
  }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Context.Provider>
)
