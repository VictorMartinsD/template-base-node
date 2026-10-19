# Template base Node.js

Template reutilizável para APIs Node.js com TypeScript, módulos ES e uma estrutura simples para evoluir o projeto conforme a necessidade.

## Stack

- Node.js 20+
- TypeScript
- `node:http` para o servidor HTTP inicial
- Express disponível como dependência para futuras rotas e middlewares
- ESLint, Prettier, Husky e lint-staged

## Requisitos

- Node.js 20 ou superior
- npm

## Uso

Instale as dependências:

```bash
npm ci
```

Inicie o servidor em desenvolvimento:

```bash
npm run dev
```

A API estará disponível em `http://localhost:3333`. A rota `GET /health` retorna o status da aplicação.

Para gerar a versão compilada e executá-la:

```bash
npm run build
npm start
```

A porta padrão é `3333` e pode ser alterada pela variável de ambiente `PORT`.

## Scripts

| Comando          | Descrição                                      |
| ---------------- | ---------------------------------------------- |
| `npm run dev`    | Executa a API com recarregamento usando `tsx`. |
| `npm run build`  | Compila o TypeScript para `dist/`.             |
| `npm start`      | Executa a versão compilada.                    |
| `npm run lint`   | Verifica o código com ESLint.                  |
| `npm run check`  | Executa lint e verifica a formatação.          |
| `npm run format` | Formata os arquivos com Prettier.              |
| `npm test`       | Placeholder para a configuração de testes.     |

## Estrutura

```text
src/
├── app.ts       # Rotas e tratamento das requisições
└── server.ts    # Inicialização do servidor
```

Adicione novas camadas, como `routes`, `controllers`, `services` e `database`, apenas quando o domínio do projeto exigir.

## Licença

MIT. Consulte [LICENSE](LICENSE).

Desenvolvido por [Victor Martins](https://github.com/VictorMartinsD).
