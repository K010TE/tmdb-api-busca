# TMDB Movie Search

Este é um projeto simples para buscar e exibir informações sobre filmes usando a API do TMDB.

![imagem da página inicial](image.png)

## Funcionalidades

- Busca de filmes pelo nome.
- Exibição dos resultados com nome, ano, país, diretor e foto de capa.
- Paginação dos resultados.

## Tecnologias utilizadas

- Vite v5.3.1
- React v18.3.1
- Axios v1.7.2
- CSS 3

### Pré-requisitos

- Node.js (https://nodejs.org)
- npm (geralmente vem com o Node.js)

## Como executar o projeto

### Passos

1. Clone este repositório:

   ```bash
   git clone https://github.com/seu-usuario/tmdb-movie-search.git

   ```

2. Navegue até a pasta do projeto:

   cd tmdb-search

3. Instale as dependências do projeto:

   npm install

4. Adicione a sua chave de API do TMDB:

   Crie um arquivo chamado .env na raiz do projeto (mesmo nível que package.json).

   Adicione a sua chave de API no arquivo .env no seguinte formato: VITE_API_KEY=SUA_CHAVE_AQUI

   Para obter uma chave da api (caso ainda não tenha) você deve começar por aqui: https://developer.themoviedb.org/docs/getting-started

5. Execute o projeto:

   npm run dev

6. Acesse o projeto em seu navegador:

   http://localhost:3000

## Sobre a configuração do arquivo .env

    O projeto está configurado para utilizar variáveis de ambiente armazenadas no arquivo .env por meio do Vite. Certifique-se de:

    Colocar o arquivo .env na raiz do projeto.

    Utilizar o prefixo VITE_ antes do nome das variáveis, como VITE_API_KEY.

    No código, a chave de API é acessada dinamicamente por meio da constante: const token = import.meta.env.VITE_API_KEY;

## Observações

    Garanta que o arquivo .env não seja enviado para o repositório adicionando-o ao arquivo .gitignore: .env

    Assim o projeto utiliza o arquivo .env para armazenar e acessar a chave de API de forma segura.
