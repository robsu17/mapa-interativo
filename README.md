# Teste para Desenvolvedor Frontend (React)

## Objetivo do Projeto

Desenvolver uma interface do usuário utilizando React com Vite e TailwindCSS ou Shadcn/ui, que inclua navegação entre telas, gerenciamento de estado, validação de formulários, exibição de notificações e integração com um mapa interativo. O projeto deve ser escrito em TypeScript.

## Requisitos do Projeto

- **React**
- **TypeScript**
- **Vite** + **TailwindCSS** ou **Shadcn/ui**
- **Gerenciamento de estado** 
  - Zustand
- **Validação de formulários**
- **Docker**

## Funcionalidades e Telas

#### 1. Dashboard inicial

- [x] **Mapa Interativo**: Exibir um mapa com pontos dentro do viewport. Os pontos devem ser filtrados e exibidos com base nas coordenadas de latitude e longitude dos cantos do mapa.
- [x] **Clusters**: Os pontos no mapa devem ser agrupados em clusters para melhor visualização.

#### 2. Listagem de Produtos

- [x] **Tabela de Produtos**: Exibir uma tabela com a listagem de produtos paginada.
- **Detalhes do Produto**: Ao clicar em uma linha da tabela, redirecionar para uma tela de detalhes do produto, exibindo suas informações completas.
- [x] **Cadastro de Produto**: Incluir um botão para abrir um modal de cadastro de novo produto. No cadastro:
  - [x] Enviar de maneira transparente o tenant atual selecionado pelo usuário.
  - [x] Validar os campos do formulário:
    - [x] Nome não pode ser vazio.
    - [x] Descrição não pode ser vazia.
    - [x] Preço não pode ser vazio e deve ser maior que zero (os preços devem ser exibidos em formato de moeda REAL, mas enviados como CENTAVOS para a API).

#### 3. Tenants
- [x] **Dropdown de Tenants**: Listar e exibir os tenants (organizações) disponíveis em um dropdown. A seleção do tenant deve afetar a listagem de produtos, mas não os pontos no mapa.
- [x] **Chamada de API**: Os tenants devem ser listados via chamada de API.

### Notificações
- [x] **Conexão via SSE**: Após o login, estabelecer uma conexão via SSE (Server-Sent Events) para receber notificações do servidor.
- [x] **Tipos de Notificações**:
  - [x] Notificações periódicas enviadas pelo backend.
  - [x] Notificações sobre a criação de novos produtos.

### Configuração do Docker
- [x] **Dockerfile**: Criar um Dockerfile para configurar o ambiente de desenvolvimento.
- [x] **docker-compose.yml**: Incluir um arquivo docker-compose.yml para facilitar a orquestração do contêiner.

## Instruções Gerais

- [x] **Navegação**: Implementar um sistema de roteamento para navegar entre as telas.
- [x] **Gerenciamento de Estado**: Utilizar uma das ferramentas mencionadas (Zustand, Reducer, RTK) para o gerenciamento do estado global da aplicação.
- [x] **Validação de Formulários**: Assegurar que todos os formulários possuem validações adequadas conforme os requisitos especificados.