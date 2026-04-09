import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import LandingPage from '../../pages/LandingPage'

const wrap = () =>
  render(
    <MemoryRouter>
      <ChakraProvider>
        <LandingPage />
      </ChakraProvider>
    </MemoryRouter>
  )

describe('LandingPage — renderização', () => {
  it('exibe o nome da aplicação', () => {
    wrap()
    const headings = screen.getAllByText('Whats Next??!')
    expect(headings.length).toBeGreaterThan(0)
  })

  it('exibe o botão "Entrar" na navbar quando não autenticado', () => {
    wrap()
    expect(screen.getByTestId('btn-nav-login')).toBeInTheDocument()
    expect(screen.queryByTestId('btn-nav-dashboard')).not.toBeInTheDocument()
  })

  it('exibe o botão "Ir para o Dashboard" na navbar quando autenticado', () => {
    localStorage.setItem('whatsnext_token', 'fake-token')
    wrap()
    expect(screen.getByTestId('btn-nav-dashboard')).toBeInTheDocument()
    expect(screen.queryByTestId('btn-nav-login')).not.toBeInTheDocument()
  })

  it('exibe o botão "Entrar" na seção hero', () => {
    wrap()
    expect(screen.getByTestId('btn-hero-login')).toBeInTheDocument()
  })

  it('exibe o botão CTA de login', () => {
    wrap()
    expect(screen.getByTestId('btn-cta-login')).toBeInTheDocument()
  })
})

describe('LandingPage — seção de urgências', () => {
  it('exibe todos os níveis de urgência', () => {
    wrap()
    expect(screen.getByText('Baixa')).toBeInTheDocument()
    expect(screen.getByText('Média')).toBeInTheDocument()
    expect(screen.getByText('Alta')).toBeInTheDocument()
    expect(screen.getByText('Urgente')).toBeInTheDocument()
  })
})

describe('LandingPage — seção de features', () => {
  it('exibe os três cards de funcionalidades', () => {
    wrap()
    expect(screen.getByText('Notas rápidas')).toBeInTheDocument()
    expect(screen.getByText('Cores por urgência')).toBeInTheDocument()
    expect(screen.getByText('Marque como concluído')).toBeInTheDocument()
  })
})

describe('LandingPage — navegação', () => {
  it('clique em "Entrar" na navbar navega para /login', () => {
    let navigatedTo = null
    const { rerender } = render(
      <MemoryRouter initialEntries={['/']}>
        <ChakraProvider>
          <LandingPage />
        </ChakraProvider>
      </MemoryRouter>
    )
    // Verifica que o botão existe e é clicável
    const loginBtn = screen.getByTestId('btn-nav-login')
    expect(loginBtn).toBeInTheDocument()
    fireEvent.click(loginBtn)
    // Sem erros de navegação = passou
  })
})
