# Whats Next??! — Front-end para Testes Automatizados

> ⚠️ **Este projeto foi criado exclusivamente como alvo (_target_) para testes automatizados de interface (UI automation). Não possui backend real, autenticação segura ou dados persistidos em servidor.**

---

## Sobre o projeto

**Whats Next??!** é uma aplicação web de gerenciamento de tarefas (to-do) desenvolvida em React, criada para servir como ambiente controlado de testes automatizados com ferramentas como **Selenium**, Cypress ou similares.

Todo o código foi gerado via **[Claude Code](https://claude.ai/code)** da Anthropic, utilizado como agente de desenvolvimento — desde a estrutura inicial da aplicação até a configuração do pipeline de CI/CD.

---

## Funcionalidades

- **Landing page** com apresentação da aplicação
- **Página de login** com credenciais fixas (sem backend)
- **Dashboard** com criação, filtragem e exclusão de tarefas
- **Classificação por urgência** com cores correspondentes (Baixa, Média, Alta, Urgente)
- **Token fake** armazenado no `localStorage` para simular sessão autenticada
- **Rota protegida** no dashboard (redireciona para login se não autenticado)

### Credenciais de acesso

| Campo | Valor |
|---|---|
| Usuário | `admin` |
| Senha | `1234` |

---

## Seletores para automação (`data-test-id`)

Todos os elementos interativos possuem o atributo `data-test-id` para facilitar a captura nos testes automatizados.

### Login (`/login`)

| Elemento | `data-test-id` |
|---|---|
| Formulário | `form-login` |
| Input usuário | `input-username` |
| Input senha | `input-password` |
| Botão mostrar/ocultar senha | `btn-toggle-password` |
| Botão entrar | `btn-login-submit` |
| Alerta de erro | `alert-login-error` |
| Dica de credenciais | `credentials-hint` |

### Landing page (`/`)

| Elemento | `data-test-id` |
|---|---|
| Botão login (navbar) | `btn-nav-login` |
| Botão dashboard (navbar, logado) | `btn-nav-dashboard` |
| Botão login (hero) | `btn-hero-login` |
| Botão login (CTA) | `btn-cta-login` |

### Dashboard (`/dashboard`)

| Elemento | `data-test-id` |
|---|---|
| Botão nova tarefa | `btn-new-task` |
| Menu do usuário | `menu-user` |
| Botão sair | `btn-logout` |
| Card de stat — Total | `stat-total` |
| Card de stat — Pendentes | `stat-pending` |
| Card de stat — Concluídas | `stat-done` |
| Card de stat — Urgentes | `stat-urgent` |
| Valor de cada stat | `stat-{nome}-value` |
| Botões de filtro | `filter-all`, `filter-pending`, `filter-done`, `filter-baixa`, `filter-media`, `filter-alta`, `filter-urgente` |
| Estado vazio (sem tarefas) | `empty-state` |
| Grid de cards | `todo-list` |

### Drawer — Nova tarefa

| Elemento | `data-test-id` |
|---|---|
| Formulário | `form-new-task` |
| Input título | `input-task-title` |
| Textarea nota | `input-task-note` |
| Select urgência | `select-task-urgency` |
| Botão cancelar | `btn-cancel-task` |
| Botão adicionar | `btn-submit-task` |
| Botão fechar drawer | `btn-close-drawer` |
| Alerta de erro | `alert-form-error` |

### Cards de tarefa

| Elemento | `data-test-id` |
|---|---|
| Container do card | `todo-card` |
| Badge de urgência | `todo-card-urgency` |
| Botão marcar como feito/pendente | `todo-card-toggle` |
| Botão excluir | `todo-card-delete` |
| Título | `todo-card-title` |
| Nota | `todo-card-note` |
| Data de criação | `todo-card-date` |

> Os cards também expõem os atributos `data-urgency` (baixa, media, alta, urgente) e `data-done` (true/false) para facilitar asserções.

---

## Stack

| Tecnologia | Versão | Função |
|---|---|---|
| [React](https://react.dev/) | 19 | UI |
| [Vite](https://vitejs.dev/) | 8 | Build e dev server |
| [Chakra UI](https://chakra-ui.com/) | 2 | Componentes e estilo |
| [React Router DOM](https://reactrouter.com/) | 7 | Roteamento SPA |
| [Framer Motion](https://www.framer.com/motion/) | 11 | Animações |

---

## Rodando localmente

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse em: [http://localhost:5173](http://localhost:5173)

---

## Deploy

O projeto é publicado automaticamente no **GitHub Pages** via GitHub Actions a cada push na branch `main`.

Para ativar no repositório: **Settings → Pages → Source → GitHub Actions**

URL pública: [https://kevinaryeldev.github.io/front-to-do/](https://kevinaryeldev.github.io/front-to-do/)

---

## Gerado com Claude Code

Todo o código desta aplicação foi criado utilizando o **[Claude Code](https://claude.ai/code)**, agente de desenvolvimento da Anthropic, por meio de instruções em linguagem natural — sem escrita manual de código.
