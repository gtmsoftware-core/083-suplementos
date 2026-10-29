# site-starter

Modelo de site de cliente integrado ao CMS da GTM Software. Cada cliente ganha um repositório criado a
partir deste ("Use this template" no GitHub).

O conteúdo vem do CMS pelo `@gtmsoftware-core/cms-sdk`:

- `src/lib/cms.ts`: client de leitura. Cada requisição fica em cache com as tags de `tagsFor`.
- `src/app/api/revalidate/route.ts`: recebe o webhook do CMS, confere a assinatura e revalida só o que mudou.
- `src/components/blocks/`: um componente por bloco do CMS.

## Novo site em 5 passos

1. No admin do CMS, crie o cliente e o site.
2. Na página do site, em **Integração com o site**, gere a chave de leitura.
3. Em **Atualização do site**, informe `https://<domínio-do-site>/api/revalidate` e gere o segredo do webhook.
4. Cole as variáveis na Vercel (ou em `.env.local` para desenvolver), seguindo `.env.example`:

   ```
   CMS_URL=...
   CMS_SITE_ID=...
   CMS_API_KEY=...
   CMS_WEBHOOK_SECRET=...
   ```

5. No CMS, clique em **Testar conexão**. O site precisa estar publicado com essas variáveis.

A página com endereço **`inicio`** é a página inicial (`/`).

## Como o conteúdo vira a landing page

- **Menu:** cada bloco tem o campo "Mostrar no menu como". Preenchido, a seção ganha uma âncora
  (`Como comprar` → `#como-comprar`) e aparece no cabeçalho. Sem nenhum, o menu lista as outras páginas.
- **WhatsApp:** qualquer botão com endereço `#whatsapp` abre o WhatsApp das configurações do site.
  O botão de cada produto já abre com "Olá! Quero pedir: <produto>" na mensagem.
- **Destaque no título:** as palavras do campo "Destaque no título" aparecem na cor principal.
- **Cores:** a "Cor principal" das configurações é a cor de destaque. O fundo escuro e as fontes
  (Anton e Inter) ficam em `src/app/globals.css` e `src/app/layout.tsx`; ajuste por cliente se precisar.
- **Rodapé:** nome do negócio, "Texto do rodapé" (ex.: CNPJ), horários e Instagram das configurações.

Blocos disponíveis: destaque, faixa de diferenciais, cartões numerados, serviços, produtos, passo a
passo, sobre (foto e texto), galeria, depoimentos, perguntas frequentes, contato, chamada para ação e
texto livre.

## Desenvolvimento

```bash
pnpm install
cp .env.example .env.local   # preencha com os valores do CMS
pnpm dev
```

`pnpm build` lê o CMS para gerar as páginas, então precisa das variáveis e do CMS no ar.

Verificações: `pnpm typecheck && pnpm lint && pnpm test`.

## Como a atualização funciona

1. Alguém publica ou altera conteúdo no CMS.
2. O CMS envia um `POST /api/revalidate` assinado (HMAC SHA-256, com proteção contra replay).
3. O handler chama `revalidateTag(tag, 'max')` para cada tag recebida.
4. O primeiro visitante depois da mudança ainda pode ver a versão anterior; os seguintes já veem a nova
   (stale-while-revalidate). Para atualização imediata, use
   `createRevalidateHandler({ secret, profile: { expire: 0 } })`.

## Adicionar um bloco

1. No CMS: schema no SDK, formulário em `presentation/content/blocks/` e nova versão do SDK.
2. Aqui: atualize o SDK, crie `src/components/blocks/<bloco>-block.tsx` e inclua no `switch` de
   `block-renderer.tsx`. O TypeScript acusa erro até o bloco novo ter um componente.

## Instalando o SDK do GitHub Packages

Enquanto o SDK não está publicado, ele vem de `vendor/gtmsoftware-core-cms-sdk-0.3.0.tgz`
(gerado com `pnpm --filter @gtmsoftware-core/cms-sdk pack` no repositório do CMS).

Depois da publicação, troque a dependência por `"@gtmsoftware-core/cms-sdk": "^0.3.0"`, apague `vendor/` e
configure o token (escopo `read:packages`) fora do repositório:

```bash
pnpm config set //npm.pkg.github.com/:_authToken <token>
```

Na Vercel e no CI, use a variável `NODE_AUTH_TOKEN` com um `.npmrc` gerado no build. O Dependabot
(`.github/dependabot.yml`) abre PRs semanais com novas versões do SDK.
