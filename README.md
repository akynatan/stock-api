# Recuperação de senha

**Requisitos Funcionais**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**Requisitos Não Funcionais**

- Utilizar MailTrap para testar envios em ambiente de desenvolvimento;
- Utilizar o Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**Regras de Negócio**

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha para resetar sua senha;

# Atualização do perfil

**Requisitos Funcionais**

- O usuário deve poder atualizar seu nome, email e senha;

**Regras de Negócio**

- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

docker run --name redisstock -p 6379:6379 -d -t redis:alpine
docker run --name postgresstock -p 5432:5432 -e POSTGRES_PASSWORD=docker -d postgres
