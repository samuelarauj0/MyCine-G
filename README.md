
# MyCine G

Um site gamificado de avaliação de filmes e séries construído com Next.js, Nest.js, Prisma e MySQL.

## 🚀 Funcionalidades

- **Autenticação**: Sistema completo de login/registro com JWT
- **Avaliações**: Usuários podem avaliar filmes e séries (1-5 estrelas) 
- **Gamificação**: Sistema de XP, níveis e ranks
- **Desafios**: Desafios diários, semanais e únicos
- **Administração**: Painel admin para gerenciar conteúdo
- **Leaderboard**: Ranking dos usuários mais ativos

## 🛠️ Tecnologias

### Backend
- **Nest.js 10** - Framework Node.js
- **Prisma ORM** - ORM para banco de dados
- **MySQL 8** - Banco de dados
- **JWT** - Autenticação
- **Swagger** - Documentação da API

### Frontend
- **Next.js 14** - Framework React (App Router)
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes de UI

## 📦 Estrutura do Projeto

```
mycine-g/
├── backend/          # API Nest.js
│   ├── src/
│   │   ├── auth/     # Autenticação
│   │   ├── users/    # Usuários
│   │   ├── titles/   # Filmes/Séries
│   │   ├── reviews/  # Avaliações
│   │   ├── challenges/ # Desafios
│   │   ├── gamification/ # Sistema de XP/Níveis
│   │   └── admin/    # Administração
│   └── prisma/       # Schema e migrations
└── frontend/         # App Next.js
    └── src/
        ├── app/      # Páginas (App Router)
        ├── components/ # Componentes React
        ├── hooks/    # Custom hooks
        └── lib/      # Utilitários
```

## 🔧 Configuração

### Pré-requisitos
- Node.js 18+
- npm ou pnpm

### Instalação

1. **Clone o repositório:**
```bash
git clone <repository-url>
cd mycine-g
```

2. **Instale as dependências:**
```bash
# Raiz do projeto
npm install

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. **Configure as variáveis de ambiente:**

Backend (`.env`):
```env
DATABASE_URL="mysql://user:password@localhost:3306/mycine_g"
JWT_SECRET="your-super-secret-jwt-key"
JWT_REFRESH_SECRET="your-super-secret-refresh-key"
```

### Banco de Dados

O projeto está configurado para usar SQLite em desenvolvimento (não precisa de MySQL local):

```bash
cd backend

# Gerar cliente Prisma
npx prisma generate

# Aplicar schema ao banco
npx prisma db push

# Popular banco com dados de exemplo
npm run db:seed
```

### Executar o Projeto

#### Opção 1: Backend apenas (Recomendado para teste inicial)
```bash
# Clique no botão "Run" ou execute:
cd backend && npm install && npx prisma generate && npx prisma db push && npm run db:seed && npm run start:dev
```

#### Opção 2: Full Stack
```bash
# Backend (Terminal 1)
cd backend
npm run start:dev

# Frontend (Terminal 2) 
cd frontend
npm run dev
```

### URLs de Acesso

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Documentação API**: http://localhost:3001/docs

### Usuários de Teste

Após executar o seed:
- **Admin**: admin@mycine-g.com / admin123
- **Usuário**: user@mycine-g.com / user123

## 📚 API Endpoints

### Autenticação
- `POST /auth/register` - Registrar usuário
- `POST /auth/login` - Fazer login
- `POST /auth/refresh` - Renovar token

### Títulos (Filmes/Séries)
- `GET /titles` - Listar títulos
- `GET /titles/:id` - Obter título
- `POST /titles` - Criar título (ADMIN)
- `PUT /titles/:id` - Editar título (ADMIN)
- `DELETE /titles/:id` - Excluir título (ADMIN)

### Avaliações
- `GET /reviews/title/:titleId` - Listar avaliações de um título
- `POST /reviews` - Criar avaliação
- `PATCH /reviews/:id` - Editar avaliação
- `DELETE /reviews/:id` - Excluir avaliação

### Gamificação
- `GET /gamification/leaderboard` - Ranking de usuários
- `GET /gamification/stats` - Estatísticas do usuário
- `GET /challenges` - Listar desafios
- `GET /challenges/user` - Progresso dos desafios do usuário

### Admin
- `GET /admin/dashboard` - Dashboard administrativo
- `GET /admin/users` - Listar usuários
- `DELETE /admin/users/:id` - Excluir usuário
- `DELETE /admin/reviews/:id` - Excluir avaliação

## 🧪 Testes

```bash
# Backend
cd backend

# Testes unitários
npm run test

# Testes e2e
npm run test:e2e

# Coverage
npm run test:cov
```

## 🎯 Sistema de Gamificação

### Níveis
- **Cálculo**: Nível = XP ÷ 100 + 1
- **Máximo**: Ilimitado

### Ranks
- **Bronze**: 0-99 XP
- **Prata**: 100-499 XP  
- **Ouro**: 500-999 XP
- **Platina**: 1000-2499 XP
- **Diamante**: 2500-4999 XP
- **Mestre**: 5000-9999 XP
- **Grão-Mestre**: 10000+ XP

### XP Rewards
- **Avaliação**: 10 XP
- **Comentário**: 5 XP
- **Desafios**: 30-500 XP

## 🎨 Tema Visual

O projeto usa um tema **DARK** com:
- **Primárias**: Roxo (#8B5CF6) e Azul escuro (#1E40AF)
- **Background**: Preto/Cinza escuro
- **Acentos**: Gradientes roxo/azul

## 📄 Licença

Este projeto é licenciado sob a MIT License.

## 🤝 Contribuição

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

**MyCine G** - Descubra, avalie e conquiste! 🎬✨
