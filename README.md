Welcome to the NextJS 13 base template bootstrapped using the `create-next-app`. This template supports TypeScript, but you can use normal JavaScript as well.

## Getting Started

Hit the run button to start the development server.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) allow you to create custom request handlers for a given route using the Web Request and Response APIs.

The `app/api` directory is mapped to `/api/*`. Folders in this directory with files named `route.ts` are treated as [Route handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) instead of pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Productionizing your Next App

To make your next App run smoothly in production make sure to deploy your project with [Repl Deployments](https://docs.replit.com/hosting/deployments/about-deployments)!

You can also produce a production build by running `npm run build` and [changing the run command](https://docs.replit.com/programming-ide/configuring-repl#run) to `npm run start`.
# MyCine G

Um site gamificado de avaliação de filmes e séries construído com Next.js, Nest.js, Prisma e MySQL.

## 🚀 Tecnologias

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Nest.js 10 + TypeScript + Prisma ORM
- **Banco de dados**: MySQL 8
- **Autenticação**: JWT (access + refresh tokens)
- **Containerização**: Docker + Docker Compose

## 🎮 Funcionalidades

- Sistema de autenticação completo (registro/login/refresh)
- CRUD de filmes e séries (apenas ADMIN)
- Sistema de avaliações e comentários
- Gamificação com XP, níveis e ranks
- Sistema de desafios (diários, semanais, únicos)
- Leaderboard de usuários
- Interface dark com tema roxo/azul

## 🏗️ Estrutura do Projeto

```
mycine-g/
├── backend/          # API Nest.js
├── frontend/         # App Next.js
├── docker-compose.yml
└── package.json
```

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js 18+
- Docker e Docker Compose
- npm ou pnpm

### 1. Clone e instale dependências
```bash
git clone <repo-url>
cd mycine-g
npm install
```

### 2. Configure variáveis de ambiente

**Backend (.env)**:
```env
DATABASE_URL="mysql://root:root@localhost:3306/mycineg"
JWT_SECRET="supersecretjwt"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_SECRET="superrefresh"
JWT_REFRESH_EXPIRES_IN="7d"
```

**Frontend (.env.local)**:
```env
NEXT_PUBLIC_API_BASE_URL="http://localhost:3001"
```

### 3. Execute o projeto
```bash
npm run dev
```

Este comando irá:
- Subir os containers Docker (MySQL + Adminer)
- Executar as migrations do Prisma
- Popular o banco com dados iniciais (seed)
- Iniciar o backend na porta 3001
- Iniciar o frontend na porta 3000

### 4. Acesse as aplicações
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Swagger/Docs**: http://localhost:3001/docs
- **Adminer (DB)**: http://localhost:8080

## 📝 Usuário Admin Padrão

- **Email**: admin@mycineg.com
- **Senha**: Admin@123

## 🎯 Gamificação

### Cálculo de XP e Níveis
- XP para nível L: `XP(L) = 100 * L * (L - 1) / 2`
- Exemplo: Nível 2 = 100 XP, Nível 3 = 300 XP, Nível 4 = 600 XP

### Ranks por Nível
- **BRONZE**: 1-4
- **SILVER**: 5-9  
- **GOLD**: 10-14
- **PLATINUM**: 15-19
- **DIAMOND**: 20-24
- **MASTER**: 25-29
- **GRANDMASTER**: 30-39
- **LEGEND**: 40+

### Fontes de XP
- Primeira avaliação de um título: +30 XP
- Nova avaliação em dias diferentes: +15 XP
- Avaliação extra no mesmo dia: +5 XP (máx. 2/dia)
- Completar perfil: +20 XP (única vez)
- Desafios diários: +40 XP
- Desafios semanais: +150 XP
- **Teto diário**: 300 XP
- **Cooldown**: 60s entre avaliações

## 🧪 Testes

```bash
# Backend
cd backend && npm run test

# Frontend  
cd frontend && npm run test
```

## 📚 API Endpoints

### Autenticação
- `POST /auth/register` - Registrar usuário
- `POST /auth/login` - Login
- `POST /auth/refresh` - Renovar token
- `GET /auth/me` - Dados do usuário logado

### Títulos
- `GET /titles` - Listar títulos
- `GET /titles/:id` - Detalhes do título
- `POST /titles` - Criar título (ADMIN)
- `PUT /titles/:id` - Editar título (ADMIN)
- `DELETE /titles/:id` - Excluir título (ADMIN)

### Avaliações
- `GET /titles/:id/reviews` - Listar avaliações
- `POST /titles/:id/reviews` - Criar avaliação
- `PUT /reviews/:id` - Editar avaliação
- `DELETE /reviews/:id` - Excluir avaliação

### Gamificação
- `GET /gamification/me` - Status de gamificação
- `GET /challenges` - Listar desafios
- `GET /challenges/me` - Progresso dos desafios
- `POST /challenges/:id/claim` - Reivindicar recompensa

## 🔧 Scripts Úteis

```bash
# Subir apenas o banco
npm run docker:up

# Executar migrations
npm run backend:migrate

# Popular banco com dados
npm run backend:seed

# Parar containers
npm run docker:down
```

## 📄 Licença

MIT License
