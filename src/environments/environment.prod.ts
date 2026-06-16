/**
 * Production environment configuration
 */
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
