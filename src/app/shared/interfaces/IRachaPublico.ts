export interface IRachaPublico {
  id: string;
  titulo: string;
  data: Date;
  horarioInicio: string;
  horarioFim: string;
  localizacao: string;
  gratuito: boolean;
  preco: number;
  qtdVagas: number;
  qtdPreenchidas: number;
}
