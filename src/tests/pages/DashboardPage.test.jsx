import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import DashboardPage from '../../pages/DashboardPage'

const wrap = () =>
  render(
    <MemoryRouter>
      <ChakraProvider>
        <DashboardPage />
      </ChakraProvider>
    </MemoryRouter>
  )

// Abre o drawer e preenche o formulário de nova tarefa
async function addTodo(title, urgency = 'media') {
  fireEvent.click(screen.getByTestId('btn-new-task'))
  const titleInput = await screen.findByTestId('input-task-title')
  fireEvent.change(titleInput, { target: { value: title } })
  if (urgency !== 'media') {
    fireEvent.change(screen.getByTestId('select-task-urgency'), {
      target: { value: urgency },
    })
  }
  fireEvent.click(screen.getByTestId('btn-submit-task'))
}

describe('DashboardPage — renderização inicial', () => {
  it('exibe o botão de nova tarefa', () => {
    wrap()
    expect(screen.getByTestId('btn-new-task')).toBeInTheDocument()
  })

  it('exibe o menu de usuário', () => {
    wrap()
    expect(screen.getByTestId('menu-user')).toBeInTheDocument()
  })

  it('exibe o estado vazio quando não há tarefas', () => {
    wrap()
    expect(screen.getByTestId('empty-state')).toBeInTheDocument()
    expect(screen.getByText('Nenhuma tarefa ainda')).toBeInTheDocument()
  })

  it('exibe todos os filtros disponíveis', () => {
    wrap()
    expect(screen.getByTestId('filter-all')).toBeInTheDocument()
    expect(screen.getByTestId('filter-pending')).toBeInTheDocument()
    expect(screen.getByTestId('filter-done')).toBeInTheDocument()
    expect(screen.getByTestId('filter-baixa')).toBeInTheDocument()
    expect(screen.getByTestId('filter-media')).toBeInTheDocument()
    expect(screen.getByTestId('filter-alta')).toBeInTheDocument()
    expect(screen.getByTestId('filter-urgente')).toBeInTheDocument()
  })
})

describe('DashboardPage — estatísticas', () => {
  it('exibe todos os contadores zerados inicialmente', () => {
    wrap()
    expect(screen.getByTestId('stat-total-value')).toHaveTextContent('0')
    expect(screen.getByTestId('stat-pending-value')).toHaveTextContent('0')
    expect(screen.getByTestId('stat-done-value')).toHaveTextContent('0')
    expect(screen.getByTestId('stat-urgent-value')).toHaveTextContent('0')
  })

  it('incrementa as estatísticas ao adicionar uma tarefa', async () => {
    wrap()
    await addTodo('Tarefa nova')

    expect(screen.getByTestId('stat-total-value')).toHaveTextContent('1')
    expect(screen.getByTestId('stat-pending-value')).toHaveTextContent('1')
    expect(screen.getByTestId('stat-done-value')).toHaveTextContent('0')
  })

  it('contabiliza corretamente tarefas urgentes', async () => {
    wrap()
    await addTodo('Tarefa urgente', 'urgente')

    expect(screen.getByTestId('stat-urgent-value')).toHaveTextContent('1')
  })

  it('carrega estatísticas salvas no localStorage', () => {
    localStorage.setItem(
      'whatsnext_todos',
      JSON.stringify([
        { id: 1, title: 'A', urgency: 'urgente', done: false, createdAt: '2026-01-01T10:00:00.000Z' },
        { id: 2, title: 'B', urgency: 'baixa', done: true, createdAt: '2026-01-01T11:00:00.000Z' },
      ])
    )
    wrap()
    expect(screen.getByTestId('stat-total-value')).toHaveTextContent('2')
    expect(screen.getByTestId('stat-pending-value')).toHaveTextContent('1')
    expect(screen.getByTestId('stat-done-value')).toHaveTextContent('1')
    expect(screen.getByTestId('stat-urgent-value')).toHaveTextContent('1')
  })
})

describe('DashboardPage — adicionar tarefa', () => {
  it('abre o drawer ao clicar em "Nova tarefa"', async () => {
    wrap()
    fireEvent.click(screen.getByTestId('btn-new-task'))
    expect(await screen.findByTestId('form-new-task')).toBeInTheDocument()
  })

  it('exibe alerta ao tentar submeter sem título', async () => {
    wrap()
    fireEvent.click(screen.getByTestId('btn-new-task'))
    const form = await screen.findByTestId('form-new-task')
    fireEvent.submit(form)
    expect(await screen.findByTestId('alert-form-error')).toBeInTheDocument()
    expect(screen.getByText('O título é obrigatório.')).toBeInTheDocument()
  })

  it('adiciona tarefa e exibe na lista', async () => {
    wrap()
    await addTodo('Estudar testes unitários')
    expect(await screen.findByTestId('todo-list')).toBeInTheDocument()
    expect(screen.getByText('Estudar testes unitários')).toBeInTheDocument()
  })

  it('remove o estado vazio após adicionar uma tarefa', async () => {
    wrap()
    expect(screen.getByTestId('empty-state')).toBeInTheDocument()
    await addTodo('Primeira tarefa')
    await screen.findByTestId('todo-list')
    expect(screen.queryByTestId('empty-state')).not.toBeInTheDocument()
  })

  it('persiste a tarefa no localStorage', async () => {
    wrap()
    await addTodo('Tarefa persistida')

    const saved = JSON.parse(localStorage.getItem('whatsnext_todos'))
    expect(saved).toHaveLength(1)
    expect(saved[0].title).toBe('Tarefa persistida')
  })
})

describe('DashboardPage — filtros', () => {
  const preloadTodos = () =>
    localStorage.setItem(
      'whatsnext_todos',
      JSON.stringify([
        { id: 1, title: 'Pendente', note: '', urgency: 'media', done: false, createdAt: '2026-01-01T10:00:00.000Z' },
        { id: 2, title: 'Concluída', note: '', urgency: 'baixa', done: true, createdAt: '2026-01-01T11:00:00.000Z' },
        { id: 3, title: 'Alta urgência', note: '', urgency: 'alta', done: false, createdAt: '2026-01-01T12:00:00.000Z' },
      ])
    )

  it('filtro "Todas" exibe todas as tarefas', () => {
    preloadTodos()
    wrap()
    fireEvent.click(screen.getByTestId('filter-all'))
    expect(screen.getByText('Pendente')).toBeInTheDocument()
    expect(screen.getByText('Concluída')).toBeInTheDocument()
    expect(screen.getByText('Alta urgência')).toBeInTheDocument()
  })

  it('filtro "Pendentes" exibe apenas tarefas não concluídas', () => {
    preloadTodos()
    wrap()
    fireEvent.click(screen.getByTestId('filter-pending'))
    expect(screen.getByText('Pendente')).toBeInTheDocument()
    expect(screen.getByText('Alta urgência')).toBeInTheDocument()
    expect(screen.queryByText('Concluída')).not.toBeInTheDocument()
  })

  it('filtro "Concluídas" exibe apenas tarefas concluídas', () => {
    preloadTodos()
    wrap()
    fireEvent.click(screen.getByTestId('filter-done'))
    expect(screen.getByText('Concluída')).toBeInTheDocument()
    expect(screen.queryByText('Pendente')).not.toBeInTheDocument()
    expect(screen.queryByText('Alta urgência')).not.toBeInTheDocument()
  })

  it('filtro por urgência "Alta" exibe apenas tarefas alta', () => {
    preloadTodos()
    wrap()
    fireEvent.click(screen.getByTestId('filter-alta'))
    expect(screen.getByText('Alta urgência')).toBeInTheDocument()
    expect(screen.queryByText('Pendente')).not.toBeInTheDocument()
    expect(screen.queryByText('Concluída')).not.toBeInTheDocument()
  })

  it('exibe mensagem de categoria vazia quando filtro não tem resultados', () => {
    preloadTodos()
    wrap()
    fireEvent.click(screen.getByTestId('filter-urgente'))
    expect(screen.getByTestId('empty-state')).toBeInTheDocument()
    expect(screen.getByText('Nenhuma tarefa nessa categoria')).toBeInTheDocument()
  })
})

describe('DashboardPage — logout', () => {
  it('remove o token do localStorage ao fazer logout', async () => {
    localStorage.setItem('whatsnext_token', 'token-valido')
    wrap()
    fireEvent.click(screen.getByTestId('menu-user'))
    const logoutBtn = await screen.findByTestId('btn-logout')
    fireEvent.click(logoutBtn)
    expect(localStorage.getItem('whatsnext_token')).toBeNull()
  })

  it('remove o usuário do localStorage ao fazer logout', async () => {
    localStorage.setItem('whatsnext_token', 'token-valido')
    localStorage.setItem('whatsnext_user', 'admin')
    wrap()
    fireEvent.click(screen.getByTestId('menu-user'))
    const logoutBtn = await screen.findByTestId('btn-logout')
    fireEvent.click(logoutBtn)
    expect(localStorage.getItem('whatsnext_user')).toBeNull()
  })
})
