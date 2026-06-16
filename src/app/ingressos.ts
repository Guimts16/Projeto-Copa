/**
 * Modelo Ingressos - Corresponde à entity Java
 */
export interface Ingressos {
  id: number;
  cpf: string;
  titular: string;
  jogo: string;
  setor: string;
  assento: string;
  preco: number;
}
