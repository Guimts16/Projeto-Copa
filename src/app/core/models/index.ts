// Exemplo de Models TypeScript alinhados com o Backend Java

// Team Model
export interface Team {
  id?: number;
  name: string;
  country: string;
  matchDay: string; // formato: yyyy-MM-dd
  cupPoints: number;
}

// Match Model
export interface Match {
  id?: number;
  date: string; // formato: yyyy-MM-dd
  venue: string; // local do jogo
  opponent: string; // time adversário
}

// Response genérico (opcional, para respostas com mensagem)
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  status: number;
}

// Pagination (opcional, se o backend usar)
export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  totalPages: number;
  totalElements: number;
  size: number;
}
