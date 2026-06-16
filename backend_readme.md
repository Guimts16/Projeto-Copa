# Integração com Backend Java - ProjetoCopaBack

## Configuração Completada

O projeto Angular foi totalmente adaptado para trabalhar com o backend Java localizado em `ProjetoCopaBack-main/helloworld`.

## Endpoints Disponíveis

### 1. **Jogadores** (`/api/jogadores`)

- `GET /api/jogadores` - Lista todos os jogadores
- `GET /api/jogadores/{id}` - Busca um jogador por ID
- `POST /api/jogadores` - Cria um novo jogador
- `PUT /api/jogadores/{id}` - Atualiza um jogador
- `DELETE /api/jogadores/{id}` - Deleta um jogador

**Modelo Jogador:**

```json
{
  "id": 1,
  "nome": "Neymar",
  "selecao": "Brasil",
  "posicao": "Atacante",
  "obtida": true
}
```

### 2. **Ingressos** (`/ingressos`)

- `GET /ingressos` - Lista todos os ingressos
- `GET /ingressos/{id}` - Busca um ingresso por ID
- `POST /ingressos` - Cria um novo ingresso
- `PUT /ingressos/{id}` - Atualiza um ingresso
- `DELETE /ingressos/{id}` - Deleta um ingresso

**Modelo Ingressos:**

```json
{
  "id": 1,
  "cpf": "12345678901",
  "titular": "João Silva",
  "jogo": "Brasil vs Argentina",
  "setor": "A",
  "assento": "101",
  "preco": 150.0
}
```

### 3. **Jogos** (`/jogos`)

- `GET /jogos` - Lista todos os jogos da Copa

## Estrutura do Projeto Angular

### Serviços

- `JogadorService` (product-service.ts) - Gerencia operações CRUD de Jogadores
- `IngressosService` (match-service.ts) - Gerencia operações CRUD de Ingressos
- `JogoService` (jogo-service.ts) - Busca lista de Jogos

### Componentes

- `JogadorComponent` - Interface para CRUD de Jogadores
- `IngressosComponent` - Interface para CRUD de Ingressos
- `HomeComponent` - Página inicial

### Rotas

- `/` - Home
- `/jogadores` - Gerenciamento de Jogadores
- `/ingressos` - Gerenciamento de Ingressos

## Configuração de Ambiente

### `src/environments/environment.ts` (Desenvolvimento)

```typescript
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080',
  endpoints: {
    jogadores: '/api/jogadores',
    ingressos: '/ingressos',
    jogos: '/jogos',
  },
  timeout: 30000,
};
```

### `src/environments/environment.prod.ts` (Produção)

```typescript
export const environment = {
  production: true,
  apiBaseUrl: '/api',
  endpoints: {
    jogadores: '/jogadores',
    ingressos: '/ingressos',
    jogos: '/jogos',
  },
  timeout: 30000,
};
```

## Configuração CORS

O backend Java está configurado com `@CrossOrigin` em todos os controllers, liberando requisições da aplicação Angular (porta 4200).

## Como Executar

### 1. Inicie o Backend Java

```bash
cd ProjetoCopaBack-main/helloworld
mvn spring-boot:run
```

O backend rodará em: `http://localhost:8080`

### 2. Inicie o Frontend Angular

```bash
npm start
```

O frontend rodará em: `http://localhost:4200`

## Arquitetura de Dados

```
Angular Application (Port 4200)
         ↓
HttpConfigInterceptor (adiciona headers, timeout, error handling)
         ↓
HTTP Requests
         ↓
Backend Java (Port 8080)
  ├── JogadorController → JogadorService → JogadorRepository
  ├── IngressosController → IngressosService → IngressosRepository
  └── FutebolController → FutebolService
```

## Interceptor HTTP

O `HttpConfigInterceptor` gerencia:

- Injeção automática de headers (Content-Type, Accept)
- Timeout de 30 segundos para todas as requisições
- Tratamento centralizado de erros HTTP
- Mensagens de erro amigáveis ao usuário

## Tratamento de Erros

Erros HTTP são tratados automaticamente:

- **Status 0**: "Servidor não está respondendo"
- **Status 404**: "Recurso não encontrado"
- **Status 400**: "Requisição inválida"
- **Status 500**: "Erro interno do servidor"

## Tema Dark Mode

A aplicação utiliza tema escuro com:

- Cores primárias: Cyan (#06b6d4)
- Fundo: Navy azul (#0f172a)
- Cartões: Cinza escuro (#1e293b)
- Texto: Off-white (#f1f5f9)

## Próximos Passos

1. ✅ Configurar modelos de dados (Jogador, Ingressos, Jogo)
2. ✅ Criar serviços Angular
3. ✅ Criar componentes UI
4. ✅ Configurar rotas
5. ⏳ Testar integração completa
6. ⏳ Implementar autenticação (se necessário)
7. ⏳ Adicionar filtros e buscas avançadas

## Troubleshooting

### CORS Error

Se receber erro de CORS, verifique se o backend está rodando em `http://localhost:8080` e se os controllers têm `@CrossOrigin`.

### Timeout

Se as requisições estão demorando, aumente o `timeout` em `environment.ts`.

### 404 Not Found

Verifique se a URL base está correta em `environment.ts`.
