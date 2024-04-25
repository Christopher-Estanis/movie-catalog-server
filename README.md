# Movie Catalog Server

Bem-vindo ao Movie Catalog Server! Este servidor foi criado usando Express, Docker, PostgreSQL, TypeORM e Redis, e está hospedado na AWS EC2.

## Acesso ao Servidor

Você pode acessar o servidor através do seguinte endereço IP e porta:

- **Endereço IP**: 18.230.113.119
- **Porta**: 3000

Por favor, use essas informações para se conectar ao servidor.

## Estrutura

### Signin
![image](https://github.com/Christopher-Estanis/movie-catalog-server/assets/49492784/4d8f7d3a-30f9-4fe2-89f2-6b3fd7bd2241)

### Movie
![image](https://github.com/Christopher-Estanis/movie-catalog-server/assets/49492784/764ba356-7299-4263-bb3f-9d4e4d54d2b0)

## Rotas Disponíveis

### Rota de Autenticação

- **POST /authentications/signin**: Esta rota é usada para fazer login no sistema. Você pode usar a seguinte conta padrão para fazer login:

```
"email": "desafio@gmail.com",
"password": "Senha@123"
```

### Rotas Autenticadas

As rotas abaixo requerem autenticação com um token JWT válido.

- **POST /movies**: Cria um novo filme no sistema.
- **GET /movies**: Lista todos os filmes cadastrados.
- **GET /movies/:id**: Busca um filme específico pelo ID.
- **PUT /movies/:id**: Atualiza as informações de um filme existente.
- **DELETE /movies/:id**: Remove um filme do sistema.

## Sobre a Aplicação

A aplicação Movie Catalog Server foi desenvolvida por um desenvolvedor com uma quantidade significativa de experiência em cada uma das ferramentas utilizadas, incluindo Express, Docker, PostgreSQL, TypeORM e Redis. Este servidor oferece uma maneira fácil de gerenciar um catálogo de filmes, com operações de criação, leitura, atualização e exclusão disponíveis através de uma API RESTful.