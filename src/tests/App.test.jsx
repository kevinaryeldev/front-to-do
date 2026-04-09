import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import App from '../App'

const wrap = (initialEntries = ['/']) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </MemoryRouter>
  )

describe('App — roteamento público', () => {
  it('renderiza a LandingPage em "/"', async () => {
    wrap(['/'])
    expect(await screen.findByTestId('btn-hero-login')).toBeInTheDocument()
  })

  it('renderiza a LoginPage em "/login"', async () => {
    wrap(['/login'])
    expect(await screen.findByTestId('form-login')).toBeInTheDocument()
  })

  it('redireciona rotas desconhecidas para "/"', async () => {
    wrap(['/rota-inexistente'])
    expect(await screen.findByTestId('btn-hero-login')).toBeInTheDocument()
  })
})

describe('App — ProtectedRoute', () => {
  it('redireciona "/dashboard" para login quando sem token', async () => {
    wrap(['/dashboard'])
    expect(await screen.findByTestId('form-login')).toBeInTheDocument()
  })

  it('renderiza o DashboardPage em "/dashboard" quando autenticado', async () => {
    localStorage.setItem('whatsnext_token', 'token-valido')
    wrap(['/dashboard'])
    expect(await screen.findByTestId('btn-new-task')).toBeInTheDocument()
  })
})
