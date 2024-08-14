export interface AgendamentoResponseListaDto {
  idAgendamento: number;
  idPaciente: number;
  idEquipe: number | null;
  idProfissional: number | null;
  formaAtendimento: number;
  tipoAtendimento: number;
  dataInicial: string;
  dataFinal: string;
  observacao: string | null;
  nome: string | null;
  profissionalNome: string | null;
  profissionalId: number | null;
  profissionalTeleatendimento: string | null;
  pacienteNome: string;
  usuarioCancelamentoId: number | null;
  justificativaCancelamento: string | null;
  deletedAt: Date | null;
}