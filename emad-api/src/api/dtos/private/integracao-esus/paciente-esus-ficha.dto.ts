export interface Paciente {
  idAtendimento: number;
  idPaciente: number;
  idEstabelecimento: number;
  parouFumar: number;
  abandonouGrupo: number;
  avaliacaoAlterada: number;
  sexo: number;
  dataNascimento: Date;
  peso: number | null;
  altura: number | null;
  cartaoSus: string;
  cpf: string;
}