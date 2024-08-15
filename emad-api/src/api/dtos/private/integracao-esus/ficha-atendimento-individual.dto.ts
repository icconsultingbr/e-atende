interface Atendimento {
  idAtendimento: number;
  idEstabelecimento: number;
  idProfissional: number;
  cartaoSus: string | null;
  dataNascimento: string;
  localDeAtendimentoSus: number;
  idPaciente: number;
  sexo: number;
  turno: number;
  tipoAtendimentoSus: number;
  dataCriacao: string;
  dataFinalizacao: string;
  cpfCidadao: string | null;
  vacinaEmDia: number | null;
  ficouEmObservacao: number | null;
  altura: string | null;
  peso: string | null;
};

interface CondicaoAvaliacao {
  idAtendimento: number;
  cid_10: string;
};

interface CondicaoCiaps {
  idAtendimento: number;
  ciap2: string;
  codigoAB: string;
};
interface CondutaSus {
  idAtendimento: number;
  condutas: number
}

export interface ListaAtendimentoIndividual {
  atendimentos: Atendimento[];
  condicaoAvaliacao: CondicaoAvaliacao[];
  condicaoCiaps: CondicaoCiaps[];
  condutaSus: CondutaSus[];
  solicitacoesExames: any[];
  medicamentos: any[];
};
