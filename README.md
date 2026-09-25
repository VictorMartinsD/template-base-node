# Template base Node.js

Template reutilizável para APIs HTTP com Node.js puro e JavaScript moderno. Ele foi pensado para projetos de estudo, exercícios de curso e APIs pequenas que podem evoluir sem carregar configurações de frontend.

O template não inclui Vite, Webpack, Babel, HTML, CSS ou framework HTTP. O Node atual já executa módulos ES e recursos modernos do JavaScript, então adicionar um bundler apenas para gerar mais arquivos de configuração não traz ganho prático para uma API simples.

## Stack

- Node.js com `node:http`
- Módulos ES com `type: "module"`
- ESLint para qualidade do JavaScript
- Prettier para formatação
- Husky e lint-staged para verificações nos arquivos staged
- `.env.example` como referência de variáveis locais

## Requisitos

- Node.js 20 ou superior
- npm

## Começar um projeto novo

1. Copie este repositório ou use-o como template.
2. Atualize `name`, `version`, `description` e `author` no `package.json`.
3. Instale as dependências:

   ```bash
   npm ci
   ```

4. Defina a porta no ambiente, se quiser alterar a padrão:

   PowerShell:

   ```powershell
   $env:PORT = "3333"
   ```

   Bash:

   ```bash
   PORT=3333 npm run dev
   ```

5. Inicie a API:

   ```bash
   npm run dev
   ```

6. Teste a rota inicial em `http://localhost:3333/health`.

O arquivo `.env.example` documenta a variável esperada, mas o Node não carrega arquivos `.env` automaticamente em todos os cenários. Para este template, use variáveis do ambiente do processo. Se um projeto precisar carregar `.env` diretamente, adicione uma biblioteca como `dotenv` ou use o suporte de `--env-file` da versão do Node adotada e documente essa escolha.

## Comandos

| Comando            | Uso                                                                                                       |
| ------------------ | --------------------------------------------------------------------------------------------------------- |
| `npm run dev`      | Inicia a API com `node --watch` durante o desenvolvimento.                                                |
| `npm start`        | Inicia a API sem watch, adequado para execução normal.                                                    |
| `npm run lint`     | Verifica o JavaScript.                                                                                    |
| `npm run lint:fix` | Corrige automaticamente problemas que o ESLint consegue resolver.                                         |
| `npm run check`    | Executa ESLint e Prettier em todo o projeto.                                                              |
| `npm run format`   | Formata os arquivos com Prettier.                                                                         |
| `npm test`         | Placeholder que não falha enquanto testes ainda não foram configurados. Substitua ao adicionar um runner. |

O hook do Husky roda o `lint-staged` antes do commit e atua somente sobre arquivos staged. Ainda assim, rode `npm run check` antes de entregar uma tarefa para validar o projeto inteiro.

Para adicionar uma dependência, use `npm install pacote` e versione `package.json` junto com `package-lock.json`. Para reproduzir exatamente as dependências existentes, use `npm ci`.

## Estrutura inicial

```text
.
├── .github/                 # Workflows de CI, quando forem necessários
├── .husky/                  # Hooks locais do Git
├── .vscode/                 # Preferências compartilhadas do editor
├── src/
│   ├── app.js               # Tratamento HTTP e roteamento inicial
│   └── server.js            # Cria o servidor e inicia o processo
├── .env.example             # Referência de variáveis de ambiente
├── eslint.config.mjs        # Regras de qualidade do JavaScript
├── package.json             # Scripts e dependências
└── README.md                # Documentação do projeto
```

O endpoint `GET /health` é uma verificação neutra de disponibilidade. Ele pode ser mantido, adaptado ou removido quando o projeto tiver uma estratégia própria de health check.

## Como evoluir para uma API de tickets

Para a API de suporte descrita no enunciado, crie somente as camadas que a implementação realmente precisar. Uma evolução possível é:

```text
src/
├── app.js
├── server.js
├── controllers/             # Orquestram entrada, resposta e chamada do service
├── database/                # Persistência em memória, arquivo ou banco
├── routes/                  # Mapeamento de métodos e URLs
├── services/                # Regras de negócio dos tickets
└── utils/                   # Funções genéricas compartilhadas
```

A API poderia separar as rotas `POST /tickets`, `GET /tickets`, `PUT /tickets/:id`, `PATCH /tickets/:id/status` e `DELETE /tickets/:id`. A validação do corpo, o tratamento de UUID e a persistência devem ser adicionados conforme forem ensinados ou necessários; não fazem parte deste template porque seriam regras do domínio de tickets.

## O que manter, adicionar ou remover

**Sempre manter:** `package.json`, `package-lock.json`, `src/server.js`, `src/app.js`, `eslint.config.mjs`, `.prettierrc`, `.gitignore`, `.editorconfig`, `.gitattributes` e `.husky/`.

**Adicionar quando houver necessidade:** `routes/` ao ter mais de uma rota, `controllers/` quando o tratamento das requisições crescer, `services/` quando existir regra de negócio, `database/` quando houver persistência, `middlewares/` para autenticação ou validações compartilhadas, e testes quando houver comportamento para proteger.

**Remover quando não for usado:** qualquer camada adicionada ao projeto real que permaneça vazia ou sem responsabilidade clara. O Git não versiona pastas vazias, e uma estrutura menor facilita entender o projeto. Não é necessário criar `controllers`, `routes`, `database` ou `middlewares` no primeiro dia.

## Sobre `main` e `src/server.js`

Neste template, manter `"main": "src/server.js"` é coerente. O campo informa o entrypoint principal do pacote Node e também deixa explícita a convenção adotada no curso. O script `start` é o que efetivamente inicia o processo neste projeto; `main` não substitui esse script nem controla sozinho como o Node executa a aplicação.

Se você escolher outro nome, como `src/index.js`, atualize juntos:

- o campo `main`;
- os scripts `dev` e `start`;
- os comandos de deploy ou documentação que apontem para `server.js`;
- eventuais imports, testes e configurações de ferramentas.

O risco não está no nome em si, mas em deixar referências divergentes.

## Frontend, Webpack e Babel

Este template deve permanecer separado dos seus templates frontend. Vite e Webpack resolvem problemas de navegador e empacotamento de assets; esta API roda diretamente no Node. Babel também não é necessário enquanto o runtime alvo suportar o JavaScript usado.

Se um projeto futuro precisar de TypeScript, framework HTTP, banco, validação com Zod ou build com `tsup`, adicione essas ferramentas no projeto derivado ou crie um template especializado. Não coloque todas as opções no template base por antecipação.

## CI e deploy

Não há workflow de GitHub Pages porque Pages hospeda arquivos estáticos e não executa uma API Node. Quando houver CI, prefira um workflow que rode `npm ci`, `npm run check` e os testes. O deploy deve ser feito em uma plataforma que execute processos Node, conforme o projeto exigir.

## Pastas vazias e `.gitkeep`

O Git não versiona diretórios vazios. Portanto, uma pasta vazia não aparecerá no GitHub nem será recriada ao clonar o projeto.

Este template não usa `.gitkeep` para `controllers`, `routes`, `services`, `database` ou `middlewares`, porque essas camadas são opcionais. Crie cada pasta quando ela tiver arquivos e uma responsabilidade real. Se um projeto específico precisar entregar uma estrutura vazia por exigência do curso ou por uma convenção da equipe, adicione um `.gitkeep` temporariamente; nesse caso, remova-o assim que o primeiro arquivo real entrar na pasta.

## Licença

MIT. Consulte [LICENSE](LICENSE).

---

Desenvolvido por [Victor Martins](https://github.com/VictorMartinsD)
