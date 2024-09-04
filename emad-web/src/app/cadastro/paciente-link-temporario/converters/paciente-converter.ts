import { Paciente } from "../../../_core/_models/Paciente"

export function pacienteConverter(data: any): Paciente {
  return {
    ...data,
    distancia: 0,
    gruposAtencaoContinuada: [],
    pesquisaCentral: '',
    pacienteOutroEstabelecimento: '2',
    pacienteAtivoInativo: '1',
    idEstabelecimento: 0,
    parouFumar: false,
    abandonouGrupo: false,
    avaliacaoAlterada: false,
    obrigaCpfNovoPaciente: 0,
    obrigaCartaoSusNovoPaciente: false,
    celularDefaultNovoPaciente: ''
  }
}
