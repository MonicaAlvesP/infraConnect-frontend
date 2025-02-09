# Frontend - Gerenciador de Posts

Este é o frontend do projeto **Gerenciador de Posts**, desenvolvido com **Next.js**. Ele permite que usuários autenticados visualizem, criem, editem e excluam posts, dependendo de seus privilégios.

## 🚀 Tecnologias Utilizadas
- **Next.js** - Framework React para aplicações server-side.
- **React.js** - Biblioteca JavaScript para interfaces dinâmicas.
- **React Modal** - Modal para edição de posts.
- **Sass** - Estilização modular com variáveis globais.
- **Axios** - Comunicação com a API do backend (Django).

## 🔧 Configuração e Execução
### 1️⃣ Instale as dependências:
```bash
npm install
```
### 2️⃣ Execute o servidor de desenvolvimento:
```bash
npm run dev
```

### 3️⃣ Acesse a aplicação:
Abra o navegador e vá para `http://localhost:3000`


## 🛠️ Funcionalidades
✅ Autenticação de Usuários: Login e registro de usuários com email e senha.\
✅ CRUD de Posts: Criação, leitura, atualização e exclusão de posts.\
✅ Interface Responsiva: Layout adaptável para diferentes dispositivos.\
✅ Modais de Edição: Edição de posts em modais.\
✅ Controle de Acesso: Somente administradores podem criar e editar posts.\
✅ Consumo de API: Requisições ao backend Django via Axios.\
✅ Estilização com Sass: Componentes estilizados com variáveis globais.

## 🔑 Autenticação
- O login é feito com email e senha.
- O token de autenticação é armazenado e incluído nas requisições autenticadas.

## 📌 Endpoints Consumidos

| Método | Endpoint       | Descrição                    |
|--------|----------------|------------------------------|
| GET    | /posts/        | Lista todos os posts         |
| POST   | /posts/        | Cria um novo post (admin)    |
| PUT    | /posts/{id}/   | Edita um post (admin)        |
| DELETE | /posts/{id}/   | Exclui um post (admin)       |

feito com 💜 por [MA](https://github.com/MonicaAlvesP).