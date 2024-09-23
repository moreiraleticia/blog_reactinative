# FAST Aceleração - Projeto de Conclusão do Módulo React

## Descrição do Projeto

### Configuração de rotas e tema (App.jsx)

criação de uma rota para o endereço "/contato" que renderizará o componente `Contact`.

### Lista de Publicações (pages/Posts/index.jsx)

criação de uma página que exibirá uma lista de publicações.

- Renderização condicionalmente do componente "Loading" com base no estado `isLoading`.

- criação de um estado chamado `posts` e inicializá-lo com um array vazio `[]`.

- Utilização do hook `useEffect` para, assim que a página carregar, executar o método `getPosts`.

- Renderização uma lista de posts utilizando o método `map`, exibindo o título, a data de criação e um link para visualizar o post completo.

### Visualização de Publicação (pages/Post/index.jsx)

 criação de uma página que permitirá a visualização de uma única publicação.

- Renderização condicionalmente do componente "Loading" com base no estado `isLoading`.

- Criação de um estado chamado `post` e um estado chamado `postCreator`, ambos inicializados com `null`.

- Utilização do hook `useEffect` para, assim que o ID do post estiver disponível, executar o método `getPost`.

- Utilização do outro hook `useEffect` para, assim que o post estiver disponível, executar o método `getPostCreator`.

- Renderização dos valores `title`, `photo_url` e `content_html` nos locais apropriados da página.

- Renderização dos créditos do post chamando o método `getCredits` no local apropriado.

### Formulário de Contato (pages/Contact/index.jsx)

- Renderização condicionalmente o componente "Loading" com base no estado `isLoading`.

- Adicionei o atributo `name` e o evento `onChange` aos componentes `TextField` para que funcionem com o método `handleChange`.

- Desabilitação o componente `Button` condicionalmente com a prop `disabled` quando `isLoading` for verdadeiro ou o formulário não estiver válido.

- Correção do método `getAlert` com renderização condicional baseada no valor de `errorMessage`.

- Execução o método `sendData` quando o botão "Enviar" for clicado.

## Como Iniciar o Projeto

1. Baixe este projeto para sua máquina local.

2. Navegue até a pasta do projeto usando o terminal.

3. Instale as dependências do projeto com o comando `npm install`.

4. Execute o projeto com o comando `npm run dev`.

5. Acesse o projeto no seu navegador em `http://localhost:5173`.
