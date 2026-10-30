import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { AppProviders } from '@/app/providers/AppProviders'
import { AppRoutes } from '@/app/AppRoutes'

export function renderApp(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppProviders>
        <AppRoutes />
      </AppProviders>
    </MemoryRouter>,
  )
}

export function renderWithRouter(ui, path = '/') {
  return render(<MemoryRouter initialEntries={[path]}>{ui}</MemoryRouter>)
}
