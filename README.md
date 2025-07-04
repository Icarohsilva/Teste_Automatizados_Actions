# Projeto de Automação de Testes (QA On-Fly)

Este repositório contém uma suíte de automação de testes para validar funcionalidades de front-end (E2E) e de uma API pública. O projeto foi estruturado para ser robusto, de fácil manutenção e integrado com um fluxo de Integração Contínua (CI) usando GitHub Actions.

---

## 🧪 Tecnologias Utilizadas

- **Testes E2E (Front-end):** [Cypress](https://www.cypress.io/)
- **Testes de API:** [Postman](https://www.postman.com/) / [Newman](https://github.com/postmanlabs/newman)
- **Gerenciador de Pacotes:** [Node.js](https://nodejs.org/) / [npm](https://www.npmjs.com/)
- **Integração Contínua (CI/CD):** [GitHub Actions](https://github.com/features/actions)

---

## 📂 Estrutura do Projeto

O projeto está dividido nas seguintes pastas principais:

- **`/Api`**: Contém a coleção e o ambiente do Postman, além das dependências (`newman`, `htmlextra`) para executar os testes de API.
- **`/Cypress`**: Contém toda a estrutura de testes E2E com Cypress, incluindo os arquivos de teste, page objects e configurações.
- **`/.github/workflows`**: Contém o arquivo `ci.yml` que define o fluxo de trabalho da Integração Contínua.
- **`/Docs`**: Contém a documentação de casos de uso e outros artefatos.

---

## ⚙️ Configuração do Ambiente Local

Siga os passos abaixo para configurar e executar o projeto na sua máquina.

### Pré-requisitos

- **Node.js**: Versão 20.x ou superior.
- **Git**: Para clonar o repositório.

### Passo 1: Clonar o Repositório

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd qa-case-onfly
```

### Passo 2: Configuração dos Testes de API (`/Api`)

1.  **Navegue até a pasta da API:**
    ```bash
    cd Api
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure seu token de acesso:**
    - O arquivo `gorest_environment.json` requer um token de acesso da API **GoRest**.
    - Acesse [gorest.co.in](https://gorest.co.in/), faça login e copie seu *Access Token*.
    - Cole o token no valor da chave `"token"` dentro do arquivo `gorest_environment.json`.
    > **Atenção:** Este arquivo está no `.gitignore` e não deve ser enviado para o repositório por segurança.

### Passo 3: Configuração dos Testes E2E (`/Cypress`)

1.  **Navegue até a pasta do Cypress (a partir da raiz do projeto):**
    ```bash
    cd Cypress
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure suas credenciais de teste:**
    - Crie um arquivo chamado `.env` dentro da pasta `/Cypress`.
    - Adicione suas credenciais de login para o ambiente de teste neste arquivo:
      ```env
      CYPRESS_USER="seu_email_de_teste@exemplo.com"
      CYPRESS_PASSWORD="sua_senha"
      ```
    > **Atenção:** O arquivo `.env` também está no `.gitignore` para proteger suas credenciais.

---

## ▶️ Executando os Testes

### Testes de API (Newman)

1.  **Navegue até a pasta `/Api`.**
2.  Execute o seguinte comando para rodar os testes e gerar o relatório:
    ```bash
    npm test
    ```
    - Isso irá executar a coleção e, ao final, um relatório HTML será gerado em `Api/reports/relatorio.html`.

### Testes E2E com Cypress

1.  **Navegue até a pasta `/Cypress`.**

2.  **Para abrir a interface interativa do Cypress:**
    ```bash
    npx cypress open
    ```

3.  **Para rodar todos os testes em modo headless (no terminal):**
    ```bash
    npx cypress run
    ```
    - Os vídeos e screenshots de testes que falharem serão salvos em `Cypress/cypress/screenshots` e `Cypress/cypress/videos`.

---

## 🚀 Integração Contínua (CI)

Este projeto usa **GitHub Actions** para executar todos os testes automaticamente a cada `push` ou `pull request` para a branch `main`.

### Configuração de Secrets

Para que o workflow de CI funcione, é necessário configurar os seguintes **secrets** nas configurações do seu repositório no GitHub (`Settings > Secrets and variables > Actions`):

- `GOREST_TOKEN`: Seu token de acesso da API GoRest.
- `CYPRESS_USER`: Seu e-mail de login para os testes E2E.
- `CYPRESS_PASSWORD`: Sua senha para os testes E2E.

### Acessando os Relatórios de Teste (Artifacts)

Ao final de cada execução do workflow no GitHub Actions, os relatórios gerados são disponibilizados como **artefatos**. Você pode encontrá-los na página de resumo da execução do workflow e fazer o download do:
- `relatorio-testes-api`: Contém o relatório HTML dos testes de API.
- `resultados-testes-cypress`: Contém os screenshots e vídeos dos testes E2E que falharam.