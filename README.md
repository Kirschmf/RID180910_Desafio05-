# Catálogo de livros

Desafio acadêmico da DNC em Next.js e TypeScript. O projeto inclui uma listagem de livros, formulários de cadastro e edição e uma API REST de demonstração. A interface usa Tailwind CSS e componentes shadcn/ui.

| Arquivo | O que mostra |
| --- | --- |
| [Listagem](app/livros/page.tsx) | Busca inicial, carregamento e estado de catálogo vazio. |
| [Cadastro](app/livros/cadastro/page.tsx) | Formulário controlado, envio assíncrono e botão desabilitado durante o envio. |
| [Serviço de livros](lib/livros-service.ts) | Integração via `fetch`, verificação da resposta HTTP e operações de leitura e escrita. |
| [API de demonstração](app/api/livros/route.ts) | Rotas GET e POST com dados iniciais em memória. |

## Como explorar

```bash
pnpm install
pnpm dev
```

Abra `http://localhost:3000/livros`. A API usa dados em memória, sem persistência. As rotas de coleção e de item mantêm listas próprias, então os fluxos de criação, edição e remoção podem divergir. Na listagem, falhas de rede ainda precisam de uma mensagem própria e de uma opção para tentar novamente.
