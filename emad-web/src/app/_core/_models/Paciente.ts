import { Input } from '@angular/core';

export class Paciente {
  id: number = null;
  @Input() cartaoSus: string = null;
  @Input() nome: string = null;
  @Input() nomeSocial: string = null;
  @Input() nomeMae: string = null;
  @Input() nomePai: string = null;
  @Input() dataNascimento: string = null;
  @Input() sexo: string = null;
  @Input() idNacionalidade: number = null;
  @Input() idNaturalidade: number = null;
  @Input() ocupacao: string = null;
  @Input() cpf: string = null;
  @Input() rg: string = null;
  @Input() dataEmissao: string = null;
  @Input() orgaoEmissor: string = null;
  @Input() escolaridade: number = null;
  @Input() cep: string = null;
  @Input() logradouro: string = null;
  @Input() numero: string = null;
  @Input() complemento: string = null;
  @Input() bairro: string = null;
  @Input() idMunicipio: number = null;
  @Input() idUf: number = null;
  @Input() foneResidencial: string = null;
  @Input() foneCelular: string = null;
  @Input() foneContato: string = null;
  @Input() contato: string = null;
  @Input() email: string = null;
  @Input() situacao: Boolean = null;
  @Input() idModalidade: number = null;
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() distancia: number;
  @Input() idSap: number = null;
  @Input() idTipoSanguineo: string = null;
  @Input() idRaca: number = null;
  @Input() numeroProntuario: string = null;
  @Input() numeroProntuarioCnes: string = null;
  @Input() falecido: Boolean = null;
  @Input() idAtencaoContinuada: string = null;
  @Input() idEstabelecimentoCadastro: number = +JSON.parse(
    localStorage.getItem('est'),
  )[0].id;
  @Input() idEstabelecimento: number = +JSON.parse(
    localStorage.getItem('est'),
  )[0].id;
  @Input() gruposAtencaoContinuada: any[];
  @Input() apelido: string = null;
  @Input() observacao: string = null;
  @Input() historiaProgressaFamiliar: string = null;
  @Input() pesquisaCentral: string = null;
  @Input() foto: string;
  @Input() pacienteOutroEstabelecimento = '2';
  @Input() necessidadeEspeciais: Boolean = null;
  @Input() gestante: Boolean = null;
  @Input() aleitamentoMaterno: string = null;
  @Input() dumDaGestante: string = null;
  @Input() idadeGestacional: number = null;
  @Input() stGravidezPlanejada: Boolean = null;
  @Input() nuGestasPrevias: number = null;
  @Input() nuPartos: number = null;

  @Input() obrigaCpfNovoPaciente: number;
  @Input() obrigaCartaoSusNovoPaciente: Boolean;
  @Input() celularDefaultNovoPaciente: string;

  @Input() parouFumar: boolean = null;
  @Input() abandonouGrupo: boolean = null;
  @Input() avaliacaoAlterada: boolean = null;
}
