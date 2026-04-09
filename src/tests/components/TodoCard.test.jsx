import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import TodoCard from '../../components/TodoCard'

const wrap = (props) =>
  render(
    <ChakraProvider>
      <TodoCard {...props} />
    </ChakraProvider>
  )

const baseTodo = {
  id: 42,
  title: 'Fazer deploy',
  note: 'Lembrar de testar antes',
  urgency: 'media',
  done: false,
  createdAt: '2026-01-15T14:30:00.000Z',
}

describe('TodoCard — renderização', () => {
  it('exibe o título da tarefa', () => {
    wrap({ todo: baseTodo, onDelete: vi.fn(), onToggleDone: vi.fn() })
    expect(screen.getByTestId('todo-card-title')).toHaveTextContent('Fazer deploy')
  })

  it('exibe a nota quando fornecida', () => {
    wrap({ todo: baseTodo, onDelete: vi.fn(), onToggleDone: vi.fn() })
    expect(screen.getByTestId('todo-card-note')).toHaveTextContent('Lembrar de testar antes')
  })

  it('não exibe a nota quando ausente', () => {
    wrap({ todo: { ...baseTodo, note: '' }, onDelete: vi.fn(), onToggleDone: vi.fn() })
    expect(screen.queryByTestId('todo-card-note')).not.toBeInTheDocument()
  })

  it('exibe a data de criação', () => {
    wrap({ todo: baseTodo, onDelete: vi.fn(), onToggleDone: vi.fn() })
    expect(screen.getByTestId('todo-card-date')).toBeInTheDocument()
  })
})

describe('TodoCard — badge de urgência', () => {
  const urgencies = [
    { urgency: 'baixa', label: 'Baixa' },
    { urgency: 'media', label: 'Média' },
    { urgency: 'alta', label: 'Alta' },
    { urgency: 'urgente', label: 'Urgente' },
  ]

  urgencies.forEach(({ urgency, label }) => {
    it(`exibe badge "${label}" para urgência "${urgency}"`, () => {
      wrap({ todo: { ...baseTodo, urgency }, onDelete: vi.fn(), onToggleDone: vi.fn() })
      expect(screen.getByTestId('todo-card-urgency')).toHaveTextContent(label)
    })
  })

  it('define o atributo data-urgency corretamente', () => {
    wrap({ todo: { ...baseTodo, urgency: 'alta' }, onDelete: vi.fn(), onToggleDone: vi.fn() })
    expect(screen.getByTestId('todo-card')).toHaveAttribute('data-urgency', 'alta')
  })
})

describe('TodoCard — estado "done"', () => {
  it('define data-done="false" quando não concluída', () => {
    wrap({ todo: { ...baseTodo, done: false }, onDelete: vi.fn(), onToggleDone: vi.fn() })
    expect(screen.getByTestId('todo-card')).toHaveAttribute('data-done', 'false')
  })

  it('define data-done="true" quando concluída', () => {
    wrap({ todo: { ...baseTodo, done: true }, onDelete: vi.fn(), onToggleDone: vi.fn() })
    expect(screen.getByTestId('todo-card')).toHaveAttribute('data-done', 'true')
  })

  it('exibe ícone ✅ quando tarefa está pendente', () => {
    wrap({ todo: { ...baseTodo, done: false }, onDelete: vi.fn(), onToggleDone: vi.fn() })
    expect(screen.getByRole('button', { name: 'toggle done' })).toHaveTextContent('✅')
  })

  it('exibe ícone ↩️ quando tarefa está concluída', () => {
    wrap({ todo: { ...baseTodo, done: true }, onDelete: vi.fn(), onToggleDone: vi.fn() })
    expect(screen.getByRole('button', { name: 'toggle done' })).toHaveTextContent('↩️')
  })
})

describe('TodoCard — interações', () => {
  it('chama onToggleDone com o id da tarefa ao clicar em toggle', () => {
    const onToggleDone = vi.fn()
    wrap({ todo: baseTodo, onDelete: vi.fn(), onToggleDone })
    fireEvent.click(screen.getByRole('button', { name: 'toggle done' }))
    expect(onToggleDone).toHaveBeenCalledOnce()
    expect(onToggleDone).toHaveBeenCalledWith(42)
  })

  it('chama onDelete com o id da tarefa ao clicar em excluir', () => {
    const onDelete = vi.fn()
    wrap({ todo: baseTodo, onDelete, onToggleDone: vi.fn() })
    fireEvent.click(screen.getByRole('button', { name: 'delete todo' }))
    expect(onDelete).toHaveBeenCalledOnce()
    expect(onDelete).toHaveBeenCalledWith(42)
  })

  it('não chama onDelete ao clicar em toggle', () => {
    const onDelete = vi.fn()
    wrap({ todo: baseTodo, onDelete, onToggleDone: vi.fn() })
    fireEvent.click(screen.getByRole('button', { name: 'toggle done' }))
    expect(onDelete).not.toHaveBeenCalled()
  })

  it('não chama onToggleDone ao clicar em excluir', () => {
    const onToggleDone = vi.fn()
    wrap({ todo: baseTodo, onDelete: vi.fn(), onToggleDone })
    fireEvent.click(screen.getByRole('button', { name: 'delete todo' }))
    expect(onToggleDone).not.toHaveBeenCalled()
  })
})
