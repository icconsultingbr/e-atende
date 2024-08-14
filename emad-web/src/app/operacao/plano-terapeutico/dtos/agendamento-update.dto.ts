export interface UpdateAgendamentoRequestDto {
  id: number;
  idPaciente: number;
  idEquipe: number | null;
  idProfissional: number;
  formaAtendimento: number;
  tipoAtendimento: number;
  dataInicial: string; // ISO 8601 format
  dataFinal: string; // ISO 8601 format
  observacao: string;
  situacao: number;
  justificativaCancelamento: string;
  usuarioCancelamentoId: number;
  deletedAt: string; // ISO 8601 format
}