import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import LoginPage from '../../pages/LoginPage'

const wrap = () =>
  render(
    <MemoryRouter>
      <ChakraProvider>
        <LoginPage />
      </ChakraProvider>
    </MemoryRouter>
  )

describe('LoginPage — renderização', () => {
  it('exibe o formulário de login', () => {
    wrap()
    expect(screen.getByTestId('form-login')).toBeInTheDocument()
  })

  it('exibe o campo de usuário', () => {
    wrap()
    expect(screen.getByTestId('input-username')).toBeInTheDocument()
  })

  it('exibe o campo de senha', () => {
    wrap()
    expect(screen.getByTestId('input-password')).toBeInTheDocument()
  })

  it('exibe o botão de submit', () => {
    wrap()
    expect(screen.getByTestId('btn-login-submit')).toBeInTheDocument()
  })

  it('exibe o hint de credenciais', () => {
    wrap()
    expect(screen.getByTestId('credentials-hint')).toBeInTheDocument()
  })

  it('não exibe alerta de erro inicialmente', () => {
    wrap()
    expect(screen.queryByTestId('alert-login-error')).not.toBeInTheDocument()
  })
})

describe('LoginPage — visibilidade da senha', () => {
  it('campo de senha inicia com type="password"', () => {
    wrap()
    expect(screen.getByTestId('input-password')).toHaveAttribute('type', 'password')
  })

  it('alterna para type="text" ao clicar em toggle', () => {
    wrap()
    fireEvent.click(screen.getByTestId('btn-toggle-password'))
    expect(screen.getByTestId('input-password')).toHaveAttribute('type', 'text')
  })

  it('volta para type="password" ao clicar em toggle novamente', () => {
    wrap()
    fireEvent.click(screen.getByTestId('btn-toggle-password'))
    fireEvent.click(screen.getByTestId('btn-toggle-password'))
    expect(screen.getByTestId('input-password')).toHaveAttribute('type', 'password')
  })
})

describe('LoginPage — validação de credenciais', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('exibe alerta de erro com credenciais inválidas', async () => {
    wrap()
    fireEvent.change(screen.getByTestId('input-username'), { target: { value: 'errado' } })
    fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'errado' } })
    fireEvent.click(screen.getByTestId('btn-login-submit'))

    await act(async () => {
      vi.advanceTimersByTime(700)
    })

    expect(screen.getByTestId('alert-login-error')).toBeInTheDocument()
    expect(screen.getByText('Usuário ou senha incorretos.')).toBeInTheDocument()
  })

  it('exibe alerta de erro com senha correta mas usuário errado', async () => {
    wrap()
    fireEvent.change(screen.getByTestId('input-username'), { target: { value: 'errado' } })
    fireEvent.change(screen.getByTestId('input-password'), { target: { value: '1234' } })
    fireEvent.click(screen.getByTestId('btn-login-submit'))

    await act(async () => {
      vi.advanceTimersByTime(700)
    })

    expect(screen.getByTestId('alert-login-error')).toBeInTheDocument()
  })

  it('não exibe alerta de erro antes do delay terminar', () => {
    wrap()
    fireEvent.change(screen.getByTestId('input-username'), { target: { value: 'errado' } })
    fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'errado' } })
    fireEvent.click(screen.getByTestId('btn-login-submit'))

    // Não avança o timer — erro ainda não deve aparecer
    expect(screen.queryByTestId('alert-login-error')).not.toBeInTheDocument()
  })

  it('salva o token no localStorage com credenciais válidas', async () => {
    wrap()
    fireEvent.change(screen.getByTestId('input-username'), { target: { value: 'admin' } })
    fireEvent.change(screen.getByTestId('input-password'), { target: { value: '1234' } })
    fireEvent.click(screen.getByTestId('btn-login-submit'))

    await act(async () => {
      vi.advanceTimersByTime(700)
    })

    expect(localStorage.getItem('whatsnext_token')).toBe('fake-jwt-token-xyz-2026')
  })

  it('salva o usuário no localStorage com credenciais válidas', async () => {
    wrap()
    fireEvent.change(screen.getByTestId('input-username'), { target: { value: 'admin' } })
    fireEvent.change(screen.getByTestId('input-password'), { target: { value: '1234' } })
    fireEvent.click(screen.getByTestId('btn-login-submit'))

    await act(async () => {
      vi.advanceTimersByTime(700)
    })

    expect(localStorage.getItem('whatsnext_user')).toBe('admin')
  })

  it('não salva token com credenciais inválidas', async () => {
    wrap()
    fireEvent.change(screen.getByTestId('input-username'), { target: { value: 'errado' } })
    fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'errado' } })
    fireEvent.click(screen.getByTestId('btn-login-submit'))

    await act(async () => {
      vi.advanceTimersByTime(700)
    })

    expect(localStorage.getItem('whatsnext_token')).toBeNull()
  })
})
