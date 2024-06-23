Documentação de requisitos da API do aplicativo freedom. Essa api permite que os usuários façam denúncias de agressão contra a mulher de acordo com a localização, podendo ainda criar posts e comentários no blog.

## Funcionalidades

- Criar conta
- Login
- Denunciar agressão
- Criar posts
- Criar comentários

## Requisitos Funcionais

- [ ] Cadastro de usuario
- [ ] Login de usuario
- [ ] Denunciar agressão de acordo com a localização
- [ ] Criar posts
- [ ] Criar comentários no posts

- [ ] Criar posts, comentários e denúncias
- [ ] Visualizar posts, comentários e denúncias
- [ ] Excluir posts, comentários e denúnciass
- [ ] Atualizar posts, comentários e denúncias

## Requisitos de Autorização e Autenticação

- [ ] Cadastro de usuário
- [ ] Login de usuário
- [ ] Logout de usuário

## Regras de Negócios

- O usuário deve ter um email válido
- O usuário deve ter uma senha com pelo menos 8 caracteres
- O usuário deve ter um nome e sobrenome
- O usuário deve ter um nmero de telefone válido
- O email e telefone devem ser nico
- Um post deve ter ao um titulo e ao menos 50 caracteres
- Um comentário deve ter ao menos 100 caracteres
- O usuario so pode fazer um denúncia,post ou comentario se estiver autenticado
- Todos os dados da API devem ser armazenados de forma segura e protegida
- As entradas do usuários devem ser validadas para evitar a inserção de dados inválidos

## Tecnologias

- Node.js
- Fastify
- PostgreSQL
- JWT
- Prisma