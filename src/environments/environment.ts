/**
 * Development environment configuration
 * Backend Java rodando em http://localhost:8080
 */
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
