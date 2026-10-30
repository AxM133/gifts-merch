import { BrowserRouter } from 'react-router'
import { AppProviders } from './providers/AppProviders'
import { AppRoutes } from './AppRoutes'

export default function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <AppRoutes />
      </AppProviders>
    </BrowserRouter>
  )
}
