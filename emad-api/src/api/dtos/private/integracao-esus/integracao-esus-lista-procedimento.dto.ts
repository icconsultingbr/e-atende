interface Atendimento {
  idAtendimento: number;
  idEstabelecimento: number;
  idProfissional: number;
  cartaoSus: string | null;
  dataNascimento: Date;
  localDeAtendimentoSus: number;
  idPaciente: number;
  sexo: number;
  turno: number;
  tipoAtendimentoSus: number;
  dataCriacao: Date;
  dataFinalizacao: Date;
  cpfCidadao: string | null;
  vacinaEmDia: number | null;
  ficouEmObservacao: number | null;
}

interface Procedimento {
  idAtendimento: number;
  co_procedimento: string;
  'sum(tap.qtd)': number;
  situacao: number;
  idProfissional: number;
}

interface AtendimentoProcedimento {
  idAtendimento: number;
  idEstabelecimento: number;
  cartaoSus: string | null;
  dataNascimento: Date;
  localDeAtendimentoSus: number;
  sexo: number;
  turno: number;
  tipoAtendimentoSus: number;
  dataCriacao: Date;
  dataFinalizacao: Date;
  cpfCidadao: string | null;
  idProfissional: number;
}

export interface IntegracaoESus {
  atendimentos: Atendimento[];
  procedimentos: Procedimento[];
  atendimentoProcedimentos: AtendimentoProcedimento[];
  numTotalAfericaoPa: { qtd: number; idProfissional: number }[];
  numTotalAfericaoTemperatura: { qtd: number; idProfissional: number }[];
  numTotalMedicaoAltura: { qtd: number; idProfissional: number }[];
  numTotalMedicaoPeso: { qtd: number; idProfissional: number }[];
}




export interface Profissional {
  id: number;
  profissionalCNS: string | null;
  codigoCBO: number | null;
  ine: string | null;
}


export interface Estabelecimento {
  codigo: number;
  cnes: string;
  cnpj: string;
  nomeFantasia: string;
  cnsProfissionaleSus: string;
  codigoCBO: number;
}