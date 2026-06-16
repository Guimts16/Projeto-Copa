/**
 * Modelo Jogo - Response do endpoint /jogos
 */
export interface Jogo {
  id?: number;
  data?: string;
  horario?: string;
  time1?: string;
  time2?: string;
  estádio?: string;
  cidade?: string;
}
