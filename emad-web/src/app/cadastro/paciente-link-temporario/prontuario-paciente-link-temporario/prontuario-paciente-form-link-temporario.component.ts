import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  Output,
  ElementRef,
  EventEmitter,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { PacienteLinkTemporarioService } from '../paciente-link-temporario.service';
import { Paciente } from '../../../_core/_models/Paciente';
import { ActivatedRoute, Router } from '@angular/router';
import { Util } from '../../../_core/_util/Util';
import { environment } from '../../../../environments/environment';
import { PacienteHipotese } from '../../../_core/_models/PacienteHipotese';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ReciboReceitaImpressaoService } from '../../../shared/services/recibo-receita-impressao.service';
import { MainChartLine } from '../../../_core/_models/MainChart';
import { AtendimentoService } from '../../../operacao/atendimento/atendimento.service';
import {
  Atendimento,
  AtendimentoHistorico,
} from '../../../_core/_models/Atendimento';
import { Exame } from '../../../_core/_models/Exame';
import { ProntuarioPacienteImpressaoService } from '../../../shared/services/prontuario-paciente-impressao.service';
import { ReciboExameImpressaoService } from '../../../shared/services/recibo-exame-impressao.service';
import { FileUploadService } from '../../../_core/_components/app-file-upload/services/file-upload.service';

@Component({
  selector: 'app-prontuario-paciente-form-link-temporario',
  templateUrl: './prontuario-paciente-form-link-temporario.component.html',
  styleUrls: ['./prontuario-paciente-form-link-temporario.component.css'],
  providers: [PacienteLinkTemporarioService],
})
export class ProntuarioPacienteFormLinkTemporarioComponent implements OnInit {
  //documentos
  public images;
  public listaArquivosUpload: any[] = [];

  object: Paciente = {
    id: 1,
    cartaoSus: '123456789012345',
    nome: 'John Doe',
    nomeSocial: 'Johnny',
    nomeMae: 'Jane Doe',
    nomePai: 'John Doe Sr.',
    dataNascimento: '1990-01-01',
    sexo: 'M',
    idNacionalidade: 1,
    idNaturalidade: 1,
    ocupacao: 'Software Engineer',
    cpf: '123.456.789-00',
    rg: 'MG-12.345.678',
    dataEmissao: '2005-01-01',
    orgaoEmissor: 'SSP',
    escolaridade: 3,
    cep: '12345-678',
    logradouro: 'Rua Fictícia',
    numero: '123',
    complemento: 'Apto 101',
    bairro: 'Centro',
    idMunicipio: 1,
    idUf: 1,
    foneResidencial: '1234-5678',
    foneCelular: '91234-5678',
    foneContato: '91234-5678',
    contato: 'Jane Doe',
    email: 'john.doe@example.com',
    situacao: true,
    idModalidade: 1,
    latitude: -19.8157,
    longitude: -43.9542,
    distancia: 10,
    idSap: 1,
    idTipoSanguineo: 'O+',
    idRaca: 1,
    numeroProntuario: '123456',
    numeroProntuarioCnes: '654321',
    falecido: false,
    reeducando: false,
    idAtencaoContinuada: '1',
    idEstabelecimentoCadastro: 1,
    idEstabelecimento: 1,
    gruposAtencaoContinuada: [],
    apelido: 'Johnny',
    observacao: 'Nenhuma observação',
    historiaProgressaFamiliar: 'História familiar de doenças cardíacas',
    pesquisaCentral: 'Pesquisa central',
    foto: 'path/to/photo.jpg',
    pacienteOutroEstabelecimento: '2',
    pacienteAtivoInativo: '1',
    necessidadeEspeciais: false,
    gestante: false,
    aleitamentoMaterno: 'Não',
    dumDaGestante: '2022-01-01',
    idadeGestacional: 20,
    stGravidezPlanejada: false,
    nuGestasPrevias: 0,
    nuPartos: 0,
    obrigaCpfNovoPaciente: 1,
    obrigaCartaoSusNovoPaciente: true,
    celularDefaultNovoPaciente: '91234-5678',
    parouFumar: false,
    abandonouGrupo: false,
    avaliacaoAlterada: false,
  };
  objectExame: Exame = {
    id: 1,
    idEstabelecimento: 1,
    nomeProfissional: 'Dr. John Doe',
    idAtendimento: 123,
    idPaciente: 456,
    nomePaciente: 'Jane Doe',
    situacao: 'Pendente',
    idTipoExame: 789,
    itensExame: [],
    acao: 'Solicitado',
    mensagemPaciente: 'Favor comparecer em jejum.',
    ano: 2023,
    mes: 'Outubro',
    numero: 'EX123456',
    resultadoFinal: 'Aguardando',
    descricaoSolicitacaoExame: 'Exames de rotina',
    idTipoSolicitacaoExame: 1,
    dataAgendamento: new Date('2023-10-15T09:00:00'),
    local: 'Laboratório Central'
  };
  objectHistorico: Atendimento = {
    id: 1,
    cpf: '123.456.789-00',
    idPaciente: 456,
    pacienteNome: 'Jane Doe',
    pacienteHistoriaProgressa: 'História de hipertensão',
    pressaoArterial: '120/80',
    pulso: '70 bpm',
    saturacao: '98%',
    temperatura: '36.5°C',
    altura: '1.70m',
    peso: '70kg',
    historicoClinico: 'Paciente com histórico de hipertensão e diabetes',
    historiaProgressa: 'História de hipertensão e diabetes',
    exameFisico: 'Exame físico normal',
    observacoesGerais: 'Nenhuma observação adicional',
    situacao: 'Em andamento',
    motivoCancelamento: null,
    dataCriacao: new Date(),
    dataFinalizacao: null,
    dataCancelamento: null,
    idEstabelecimento: 1,
    idProfissional: 123,
    ano_receita: 2023,
    numero_receita: 456,
    unidade_receita: 789,
    motivoQueixa: 'Dor de cabeça',
    dadosFicha: [],
    tipoHistoriaClinica: 1,
    pesquisaCentral: 'Pesquisa central',
    idTipoAtendimentoHistorico: 1,
    ficouEmObservacao: 0,
    tiposConsultaOdonto: 1,
    tiposFornecimOdonto: 1,
    tiposVigilanciaSaudeBucal: 1,
    inep: '12345678',
    numParticipantes: 10,
    profissionais: 2,
    atividadeTipo: 1,
    temasParaReuniao: 1,
    publicoAlvo: 1,
    participantes: 10,
    procedimento: 1,
    temasParaSaude: 1,
    praticasEmSaude: 1,
    pseEducacao: true,
    pseSaude: true,
    gestante: 0,
    possuiNecessidadesEspeciais: 0,
    tipoConsultaOdonto: 1,
    condutaEncaminhamento: 1,
    localDeAtendimento: 1,
    modalidade: 1,
    tipoAtendimento: 1,
    vacinasEmDia: 1,
    condicaoAvaliada: 1,
    idProfissionalCompartilhado: 123,
    integracaoPEC: true
  };
  pacienteHipotese: PacienteHipotese = {
    id: 1,
    idAtendimento: 123,
    idPaciente: 456,
    idHipoteseDiagnostica: 789,
    funcionalidade: 'ATENDIMENTO',
    idEstabelecimento: 1
  };
  method: string = 'paciente';
  fields = [];
  label = 'Paciente';
  formHistorico: FormGroup;
  formHipotese: FormGroup;
  formMedicamento: FormGroup;
  id: number = null;
  token: number = null;
  // idSap: number = null;
  domains: any[] = [];
  form: FormGroup;
  loading: Boolean = false;
  message = '';
  warning = '';
  errors: any[] = [];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  allItemsHipotese: any[] = [];
  allItemsMedicamentoHistorico: any[] = [];
  allItemsEncaminhamentoHistorico: any[] = [];
  allItemsEncaminhamentoHistoricoPaciente: any[] = [];
  allItemsHipoteseHistorico: any[] = [];
  allItemsAtendimentos: any[] = [];
  allItemsSinaisVitaisPressaoArterial: any[] = [];
  allItemsSinaisVitaisPulso: any[] = [];
  allItemsSinaisVitaisSaturacao: any[] = [];
  allItemsSinaisVitaisTemperatura: any[] = [];
  allItemsSinaisVitaisPeso: any[] = [];
  allItemsSinaisVitaisGlicemia: any[] = [];
  allItemsFichas: any[] = [];
  allItemsExames: any[] = [];
  allItemsReceita: any[] = [];
  allItemsVacina: any[] = [];
  allItemsProcedimentos: any[] = [];
  allItemsCarteiraVacinacao: any[] = [];
  listaMaterialLoteDispensadoGravado: any[] = [];
  listaMaterialLoteDispensadoFinalizado: any[] = [];
  virtualDirectory: string =
    environment.virtualDirectory != ''
      ? environment.virtualDirectory + '/'
      : '';
  modalRef: NgbModalRef = null;
  loadPhoto = false;
  totalPressaoArterial: number;
  totalPulso: number;
  totalSaturacao: number;
  totalTemperatura: number;
  totalPeso: number;
  totalGlicemia: number;
  pathFiles = `${environment.apiUrl}/fotos/`;

  idHistorico: number;
  dataHistorico: string;
  nomeProfissional: string;
  nomeTipoHistorico: string;
  mostraHistorico = false;

  dataInicial: Date;
  dataFinal: Date;
  tipoFichaFiltro: number;
  profissionalFiltro: number;

  @ViewChild('addresstext') addresstext: ElementRef;

  public lineChartDataPressaoArterial: Array<any> = [{ data: [] }];
  public lineChartLabelsPressaoArterial: Array<any> = [];

  public lineChartDataPulso: Array<any> = [{ data: [] }];
  public lineChartLabelsPulso: Array<any> = [];

  public lineChartDataSaturacao: Array<any> = [{ data: [] }];
  public lineChartLabelsSaturacao: Array<any> = [];

  public lineChartDataTemperatura: Array<any> = [{ data: [] }];
  public lineChartLabelsTemperatura: Array<any> = [];

  public lineChartDataPeso: Array<any> = [{ data: [] }];
  public lineChartLabelsPeso: Array<any> = [];

  public lineChartDataGlicemia: Array<any> = [{ data: [] }];
  public lineChartLabelsGlicemia: Array<any> = [];

  public pieChartLabels = [];
  public pieChartData = [];

  public lineChartLegend: boolean = false;
  public lineChartType: string = 'line';

  objectTipoAtendimento: MainChartLine = new MainChartLine();
  objectAtendimentoSituacao: MainChartLine = new MainChartLine();

  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartDataTipoAtendimento: any[] = [{ data: [], label: '' }];
  public barChartLabelsTipoAtendimento: string[] = [];
  public barChartDataAtendimentoSituacao: any[] = [{ data: [], label: '' }];
  public barChartLabelsAtendimentoSituacao: string[] = [];

  constructor(
    private service: PacienteLinkTemporarioService,
    private atendimentoService: AtendimentoService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private fbHipotese: FormBuilder,
    private fbMedicamento: FormBuilder,
    private ref: ChangeDetectorRef,
    private modalService: NgbModal,
    private reciboReceitaService: ReciboReceitaImpressaoService,
    private router: Router,
    private reciboExameService: ReciboExameImpressaoService,
    private prontuarioPacienteImpressao: ProntuarioPacienteImpressaoService,
    private fileUploadService: FileUploadService,
  ) {
    this.fields = service.fields;
  }

  ngOnInit() {
    let token: string;

    this.route.params.subscribe((params) => {
      this.token = params['id'];

      token = params['id'];
    });

    console.log('token');
    console.log(token);

    this.service.findByToken(token).subscribe(par => {
      this.id = par.id;
    })
    this.createGroup();
    this.loadDomains();
    this.recarregarDocumentos();
  }

  loadDomains() {
    this.loading = true;
    this.service.listaDominiosExterno('uf').subscribe((ufs) => {
      console.log("ufs", ufs);
      this.service.listaDominiosExterno('nacionalidade').subscribe((paises) => {
        console.log("paises", paises);
        this.service.listaDominiosExterno('modalidade').subscribe((modalidades) => {
          this.service
            .listaDominiosExterno('estabelecimento')
            .subscribe((estabelecimentos) => {
              this.service
                .listaDominiosExterno('escolaridade')
                .subscribe((escolaridade) => {
                  this.service.listaDominiosExterno('raca').subscribe((racas) => {
                    this.service
                      .listaDominiosExterno('hipotese-diagnostica')
                      .subscribe((hipoteseDiagnostica) => {
                        this.service
                          .listaDominiosExterno('atencao-continuada')
                          .subscribe((atencaoContinuada) => {
                            this.service
                              .listaDominiosExterno('tipo-ficha')
                              .subscribe((tipoFichas) => {
                                this.service
                                  .list(
                                    'profissional/estabelecimento/' +
                                    JSON.parse(localStorage.getItem('est'))[0]
                                      .id,
                                  )
                                  .subscribe((profissionais) => {
                                    this.service
                                      .listaDominiosExterno('classificacao-risco')
                                      .subscribe((classificacaoRiscos) => {
                                        this.service
                                          .listaDominiosExterno('tipo-exame')
                                          .subscribe((tipoExame) => {
                                            this.domains.push({
                                              escolaridade: escolaridade,
                                              idUf: ufs,
                                              idNacionalidade: paises,
                                              idNaturalidade: [],
                                              idMunicipio: [],
                                              hipoteses: hipoteseDiagnostica,
                                              idEstabelecimentoCadastro:
                                                estabelecimentos,
                                              tipoFichas: tipoFichas,
                                              profissionais: profissionais,
                                              classificacaoRiscos:
                                                classificacaoRiscos,
                                              tipoHistoriaClinica: [
                                                { id: 1, nome: 'Anamnese' },
                                                { id: 2, nome: 'Evolução' },
                                              ],
                                              idModalidade: modalidades,
                                              sexo: [
                                                { id: '1', nome: 'Masculino' },
                                                { id: '2', nome: 'Feminino' },
                                                { id: '3', nome: 'Ambos' },
                                                {
                                                  id: '4',
                                                  nome: 'Não informado',
                                                },
                                              ],
                                              idTipoSanguineo: [
                                                { id: '1', nome: 'A_POSITIVO' },
                                                { id: '2', nome: 'A_NEGATIVO' },
                                                { id: '3', nome: 'B_POSITIVO' },
                                                { id: '4', nome: 'B_NEGATIVO' },
                                                {
                                                  id: '5',
                                                  nome: 'AB_POSITIVO',
                                                },
                                                {
                                                  id: '6',
                                                  nome: 'AB_NEGATIVO',
                                                },
                                                { id: '7', nome: 'O_POSITIVO' },
                                                { id: '8', nome: 'O_NEGATIVO' },
                                              ],
                                              idRaca: racas,
                                              idAtencaoContinuada:
                                                atencaoContinuada,
                                              gruposAtencaoContinuada:
                                                atencaoContinuada,
                                              idTipoExame: tipoExame,
                                              resultadoFinal: [
                                                {
                                                  id: 1,
                                                  nome: 'Amostra não reagente',
                                                },
                                                {
                                                  id: 2,
                                                  nome: 'Amostra reagente',
                                                },
                                                {
                                                  id: 3,
                                                  nome: 'Não realizado',
                                                },
                                              ],
                                            });
                                            if (!Util.isEmpty(this.id)) {
                                              this.encontraPaciente();
                                            } else {
                                              this.loading = false;
                                              this.loadPhoto = true;
                                            }
                                          });
                                      });
                                  });
                              });
                          });
                      });
                  });
                });
            });
        });
      });
    });
  }

  encontraPaciente() {

    this.object.id = this.id;
    this.errors = [];
    this.message = '';
    this.loading = true;

    this.service.findById(this.id, this.method).subscribe(
      (result) => {
        console.log('result', result);
        this.object = result;
        this.loadPhoto = true;
        this.loading = false;
        this.carregaNaturalidade();
      },
      (error) => {
        this.object = new Paciente();
        this.loadPhoto = true;
        this.loading = false;
        this.allItemsHipotese = [];
        this.errors.push({
          message: 'Paciente não encontrado',
        });
      },
    );
  }

  tabSelected(tab: number) {
    tab == 3 ? this.findSinaisVitaisPorPaciente() : null; //Sinais vitais
    tab == 4 ? this.findAtendimentoPorPaciente() : null; //Atendimentos
    tab == 5 ? this.findReceitaPorPaciente() : null; //Medicamentos
    tab == 6 ? this.findFichasPorPaciente() : null; //Fichas de atendimentos
    tab == 7 ? this.findExamesPorPaciente() : null; //Exames
    tab == 8 ? this.findHipotesePorPaciente() : null; //Hipótes diagnosticada
    tab == 9 ? this.findProntuarioVacinacaoPorPaciente() : null; //Vacinas
    tab == 10 ? this.findProcedimentosPorPaciente() : null; //Procedimentos
    tab == 11 ? this.findEncaminhamentoPorPaciente(this.object.id) : null; //encaminhamentos
  }

  carregaNaturalidade() {
    this.loading = true;
    this.service
      .carregaNaturalidadePorNacionalidade(this.object.idNacionalidade)
      .subscribe(
        (result) => {
          this.domains[0].idNaturalidade = result;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
        },
      );
  }

  back() {
    const route = 'pacientes';
    this.router.navigate([route]);
  }

  createGroup() {
    this.form = this.fb.group({
      id: [''],
      cartaoSus: ['', ''],
      nome: ['', Validators.required],
      nomeSocial: ['', ''],
      apelido: ['', ''],
      nomeMae: ['', Validators.required],
      nomePai: ['', ''],
      dataNascimento: ['', Validators.required],
      sexo: new FormControl({ value: '', disabled: true }),
      idNacionalidade: new FormControl({ value: '', disabled: true }),
      idNaturalidade: new FormControl({ value: '', disabled: true }),
      ocupacao: ['', ''],
      cpf: ['', ''],
      rg: ['', ''],
      dataEmissao: ['', ''],
      orgaoEmissor: ['', ''],
      escolaridade: new FormControl({ value: '', disabled: true }),
      cep: ['', ''],
      logradouro: ['', ''],
      numero: ['', ''],
      complemento: ['', ''],
      bairro: ['', ''],
      idMunicipio: ['', ''],
      idUf: ['', ''],
      foneResidencial: ['', ''],
      foneCelular: ['', ''],
      foneContato: ['', ''],
      contato: ['', ''],
      email: ['', ''],
      idModalidade: ['', ''],
      latitude: ['', ''],
      longitude: ['', ''],
      idSap: ['', ''],
      idTipoSanguineo: ['', ''],
      idRaca: ['', ''],
      numeroProntuario: ['', ''],
      numeroProntuarioCnes: ['', ''],
      idAtencaoContinuada: ['', ''],
      historiaProgressaFamiliar: ['', ''],
      observacao: ['', ''],
      idEstabelecimentoCadastro: new FormControl(
        {
          value: '',
          disabled: this.id > 0 || this.object.id > 0 ? true : false,
        },
        Validators.required,
      ),
      gruposAtencaoContinuada: ['', ''],
      falecido: new FormControl({ value: '', disabled: true }),
      situacao: new FormControl({ value: '', disabled: true }),
      necessidadeEspeciais: new FormControl({ value: '', disabled: true }),
      gestante: new FormControl({ value: '', disabled: true }),
      aleitamentoMaterno: ['', ''],
      dumDaGestante: ['', Validators.required],
      idadeGestacional: ['', ''],
      stGravidezPlanejada: new FormControl({ value: '', disabled: true }),
      nuGestasPrevias: ['', ''],
      nuPartos: ['', ''],
      tipoFichaFiltro: ['', ''],
      profissionalFiltro: ['', ''],
    });
  }

  findHipotesePorPaciente() {
    this.message = '';
    this.errors = [];
    this.loading = true;
    this.service.findHipoteseByPaciente(this.object.id).subscribe(
      (result) => {
        this.allItemsHipotese = result;

        this.service.findHipoteseByPacienteAgrupado(this.object.id).subscribe(
          (resultChart) => {
            var labels = [];
            for (var itemLabel in resultChart) {
              labels.push(resultChart[itemLabel].label);
            }
            this.pieChartLabels = labels;
            var data = [];
            for (var item in resultChart) {
              data.push(resultChart[item].data);
            }
            this.pieChartData = data;

            this.ref.detectChanges();
            this.loading = false;
          },
          (error) => {
            this.loading = false;
            this.errors = Util.customHTTPResponse(error);
          },
        );
      },
      (error) => {
        this.loading = false;
        this.errors = Util.customHTTPResponse(error);
      },
    );
  }

  findAtendimentoPorPaciente() {
    this.message = '';
    this.errors = [];
    this.loading = true;
    this.service.findAtendimentoByPaciente(this.object.id, 1).subscribe(
      (result) => {
        this.allItemsAtendimentos = result;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.errors = Util.customHTTPResponse(error);
      },
    );
  }

  findSinaisVitaisPorPaciente() {
    this.message = '';
    this.errors = [];
    this.loading = true;
    this.lineChartDataPressaoArterial = [{ data: [] }];
    this.lineChartDataPulso = [{ data: [] }];
    this.lineChartDataSaturacao = [{ data: [] }];
    this.lineChartDataTemperatura = [{ data: [] }];
    this.lineChartDataPeso = [{ data: [] }];
    this.lineChartDataGlicemia = [{ data: [] }];

    this.service
      .findSinaisVitaisByPaciente(this.object.id, 'pressaoArterial')
      .subscribe(
        (result) => {
          this.allItemsSinaisVitaisPressaoArterial = result;
          //  this.totalPressaoArterial = this.allItemsSinaisVitaisPressaoArterial.length;
          //  var labels = [];
          //   for(var item in result){
          //     labels.push(result[item].label);
          //   }
          //   this.lineChartLabelsPressaoArterial = labels;
          //   var data = [];
          //   for(var item in result){
          //     data.push(result[item].pressaoArterial);
          //   }
          //   this.lineChartDataPressaoArterial[0].data = data;

          this.service
            .findSinaisVitaisByPaciente(this.object.id, 'pulso')
            .subscribe(
              (result) => {
                this.allItemsSinaisVitaisPulso = result;
                this.totalPulso = this.allItemsSinaisVitaisPulso.length;
                var labels = [];
                for (var item in result) {
                  labels.push(result[item].label);
                }
                this.lineChartLabelsPulso = labels;
                var data = [];
                for (var item in result) {
                  data.push(result[item].pulso);
                }
                this.lineChartDataPulso[0].data = data;

                this.service
                  .findSinaisVitaisByPaciente(this.object.id, 'saturacao')
                  .subscribe(
                    (result) => {
                      this.allItemsSinaisVitaisSaturacao = result;
                      this.totalSaturacao =
                        this.allItemsSinaisVitaisSaturacao.length;
                      var labels = [];
                      for (var item in result) {
                        labels.push(result[item].label);
                      }
                      this.lineChartLabelsSaturacao = labels;
                      var data = [];
                      for (var item in result) {
                        data.push(result[item].saturacao);
                      }
                      this.lineChartDataSaturacao[0].data = data;

                      this.service
                        .findSinaisVitaisByPaciente(
                          this.object.id,
                          'temperatura',
                        )
                        .subscribe(
                          (result) => {
                            this.allItemsSinaisVitaisTemperatura = result;
                            this.totalTemperatura =
                              this.allItemsSinaisVitaisTemperatura.length;
                            var labels = [];
                            for (var item in result) {
                              labels.push(result[item].label);
                            }
                            this.lineChartLabelsTemperatura = labels;
                            var data = [];
                            for (var item in result) {
                              data.push(result[item].temperatura);
                            }
                            this.lineChartDataTemperatura[0].data = data;

                            this.service
                              .findSinaisVitaisByPaciente(
                                this.object.id,
                                'peso',
                              )
                              .subscribe(
                                (result) => {
                                  this.allItemsSinaisVitaisPeso = result;
                                  this.totalPeso =
                                    this.allItemsSinaisVitaisPeso.length;
                                  var labels = [];
                                  for (var item in result) {
                                    labels.push(result[item].label);
                                  }
                                  this.lineChartLabelsPeso = labels;
                                  var data = [];
                                  for (var item in result) {
                                    data.push(result[item].peso);
                                  }
                                  this.lineChartDataPeso[0].data = data;

                                  this.service
                                    .findSinaisVitaisByPaciente(
                                      this.object.id,
                                      'glicemia',
                                    )
                                    .subscribe(
                                      (result) => {
                                        this.allItemsSinaisVitaisGlicemia =
                                          result;
                                        this.totalGlicemia =
                                          this.allItemsSinaisVitaisGlicemia.length;
                                        var labels = [];
                                        for (var item in result) {
                                          labels.push(result[item].label);
                                        }
                                        this.lineChartLabelsGlicemia = labels;
                                        var data = [];
                                        for (var item in result) {
                                          data.push(result[item].peso);
                                        }
                                        this.lineChartDataGlicemia[0].data =
                                          data;
                                      },
                                      (error) => {
                                        this.loading = false;
                                        this.errors =
                                          Util.customHTTPResponse(error);
                                      },
                                    );
                                },
                                (error) => {
                                  this.loading = false;
                                  this.errors = Util.customHTTPResponse(error);
                                },
                              );
                          },
                          (error) => {
                            this.loading = false;
                            this.errors = Util.customHTTPResponse(error);
                          },
                        );
                    },
                    (error) => {
                      this.loading = false;
                      this.errors = Util.customHTTPResponse(error);
                    },
                  );
              },
              (error) => {
                this.loading = false;
                this.errors = Util.customHTTPResponse(error);
              },
            );
        },
        (error) => {
          this.loading = false;
          this.errors = Util.customHTTPResponse(error);
        },
      );
  }

  findFichasPorPaciente() {
    this.message = '';
    this.errors = [];
    this.loading = true;
    this.service.findAtendimentoByPaciente(this.object.id, 2).subscribe(
      (result) => {
        this.allItemsFichas = result;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.errors = Util.customHTTPResponse(error);
      },
    );
  }

  findExamesPorPaciente() {
    this.message = '';
    this.errors = [];
    this.loading = true;
    this.service.findExameByPaciente(this.object.id).subscribe(
      (result) => {
        this.allItemsExames = result;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.errors = Util.customHTTPResponse(error);
      },
    );
  }

  findReceitaPorPaciente() {
    this.message = '';
    this.errors = [];
    this.loading = true;
    this.service.findReceitaByPaciente(this.object.id).subscribe(
      (result) => {
        this.allItemsReceita = result;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.errors = Util.customHTTPResponse(error);
      },
    );
  }

  findProntuarioVacinacaoPorPaciente() {
    this.message = '';
    this.errors = [];
    this.loading = true;
    this.service.findProntuarioVacinacaoByPaciente(this.object.id).subscribe(
      (result) => {
        this.allItemsVacina = result;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.errors = Util.customHTTPResponse(error);
      },
    );
  }

  findCarteiraVacinacaoPorPaciente() {
    this.message = '';
    this.errors = [];
    this.loading = true;
    this.service.findCarteiraVacinacaoByPaciente(this.object.id).subscribe(
      (result) => {
        this.allItemsCarteiraVacinacao = result;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.errors = Util.customHTTPResponse(error);
      },
    );
  }

  findProcedimentosPorPaciente() {
    this.message = '';
    this.errors = [];
    this.loading = true;
    this.service
      .findAtendimentoProcedimentoByPaciente(this.object.id)
      .subscribe(
        (result) => {
          this.allItemsProcedimentos = result;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.errors = Util.customHTTPResponse(error);
        },
      );
  }

  visualizaAtendimentos(id: any): void {
    let url =
      this.router.url.replace('paciente', '') +
      this.virtualDirectory +
      '#/atendimentos/cadastro/' +
      id;
    this.service
      .file('atendimento/consulta-por-paciente', url)
      .subscribe((result) => {
        this.loading = false;
        window.open(url, '_blank');
      });
  }

  carregaEstoque(item: any) {
    this.loading = true;
    this.listaMaterialLoteDispensadoGravado = [];
    this.listaMaterialLoteDispensadoFinalizado.forEach((itemEstoque) => {
      itemEstoque.expandir =
        itemEstoque.id == item.id && itemEstoque.expandir == true
          ? true
          : false;
    });

    item.expandir = !item.expandir;
    this.service.list(`item-receita/receita/` + item.id).subscribe(
      (estoque) => {
        this.listaMaterialLoteDispensadoGravado = estoque;
        this.loading = false;
      },
      (erro) => {
        this.loading = false;
        this.errors = Util.customHTTPResponse(erro);
      },
    );
  }

  close() {
    if (this.modalRef) this.modalRef.close();
  }

  abreReceitaMedica(
    ano_receita: number,
    numero_receita: number,
    unidade_receita: number,
  ) {
    this.reciboReceitaService.imprimir(
      ano_receita,
      unidade_receita,
      numero_receita,
      true,
    );
  }

  imprimirPdfProntuario() {
    let dataInicialConvertida;
    let dataFinalConvertida;

    if (this.dataFinal < this.dataInicial) {
      this.warning =
        'Atenção: A data final e menor que a data Inicial, efetue a correção.';
      return;
    }

    if (this.dataInicial) {
      this.dataInicial.setHours(0, 0, 0, 0);
      dataInicialConvertida = this.dataInicial.toISOString();
    }

    if (this.dataFinal) {
      this.dataFinal.setHours(23, 59, 0, 0);
      dataFinalConvertida = this.dataFinal.toISOString();
    }

    this.prontuarioPacienteImpressao.imprimir(
      this.id,
      dataInicialConvertida,
      dataFinalConvertida,
      this.tipoFichaFiltro,
      this.profissionalFiltro,
    );
  }

  abreReciboExame(exameId: number) {
    this.reciboExameService.imprimir(exameId);
  }

  openHistorico(content: any, idAtendimento: number, idHistorico: number) {
    this.createGroupHistorico();
    this.encontraAtendimentoHistorico(idAtendimento, idHistorico);
    this.mostraHistorico = idAtendimento ? false : true;

    this.modalRef = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      windowClass: 'modal-gg',
    });
  }

  openExame(content: any, idExame: number) {
    this.createGroupExame();
    this.carregaExame(idExame);

    this.modalRef = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      windowClass: 'modal-gg',
    });
  }

  carregaExame(id: number) {
    this.errors = [];
    this.message = '';
    this.loading = true;
    this.service.findById(id, 'exame').subscribe(
      (result) => {
        this.objectExame = result;
        this.loading = false;
      },
      (error) => {
        this.objectExame = new Exame();
        this.errors.push({
          message: 'Exame não encontrado',
        });
      },
    );
  }

  createGroupExame() {
    this.form = this.fb.group({
      idTipoExame: ['', ''],
      resultadoFinal: ['', ''],
    });
  }

  openCarteiraVacinacao(content: any) {
    this.findCarteiraVacinacaoPorPaciente();
    this.modalRef = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      windowClass: 'modal-gg',
    });
  }

  encontraAtendimentoHistorico(idAtendimento: number, idHistorico: number) {
    this.object.id = this.id;
    this.errors = [];
    this.message = '';

    if (idAtendimento) {
      this.loading = true;
      this.atendimentoService.findById(idAtendimento, 'atendimento').subscribe(
        (result) => {
          this.objectHistorico = result;
          this.objectHistorico.pacienteHistoriaProgressa =
            result.pacienteHistoriaProgressa;
          this.loading = false;
          this.findHipotesePorAtendimento(idAtendimento);
          this.findEncaminhamentoPorAtendimento(idAtendimento);
          this.findMedicamentoPorAtendimento(idAtendimento);
          this.findProcedimentoPorAtendimento(idAtendimento);
        },
        (error) => {
          this.loading = false;
          this.close();
          this.errors.push({
            message: 'Atendimento não encontrado',
          });
        },
      );
    } else {
      this.loading = true;
      this.atendimentoService.findByHistoricoId(idHistorico).subscribe(
        (result) => {
          this.objectHistorico = result;
          this.objectHistorico.pacienteHistoriaProgressa =
            result.pacienteHistoriaProgressa;
          this.loading = false;

          this.objectHistorico = result;
          this.dataHistorico = result.dataHistorico;
          this.nomeProfissional = result.nomeProfissional;
          this.nomeTipoHistorico = result.nomeTipoHistorico;
          this.objectHistorico.pacienteHistoriaProgressa =
            result.pacienteHistoriaProgressa;
          this.loading = false;

          this.findHipotesePorAtendimento(result.idAtendimento);
          this.findEncaminhamentoPorAtendimento(result.idAtendimento);
          this.findMedicamentoPorAtendimento(result.idAtendimento);
          this.findProcedimentoPorAtendimento(result.idAtendimento);
        },
        (error) => {
          this.loading = false;
          this.close();
          this.errors.push({
            message: 'Atendimento histórico não encontrado',
          });
        },
      );
    }
  }

  disableFields(): boolean {
    if (!this.object) {
      return true;
    } else {
      if (
        Util.isEmpty(this.objectHistorico.dataFinalizacao) &&
        Util.isEmpty(this.objectHistorico.dataCancelamento)
      ) {
        return false;
      } else {
        return true;
      }
    }
  }

  findHipotesePorAtendimento(idAtendimento: number) {
    this.message = '';
    this.errors = [];
    this.loading = true;
    this.atendimentoService.findHipoteseByAtendimento(idAtendimento).subscribe(
      (result) => {
        this.allItemsHipoteseHistorico = result;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.errors = Util.customHTTPResponse(error);
      },
    );
  }

  findEncaminhamentoPorAtendimento(idAtendimento: number) {
    this.message = '';
    this.errors = [];
    this.loading = true;
    this.atendimentoService
      .findEncaminhamentoByAtendimento(idAtendimento)
      .subscribe(
        (result) => {
          this.allItemsEncaminhamentoHistorico = result;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.errors = Util.customHTTPResponse(error);
        },
      );
  }

  findEncaminhamentoPorPaciente(idUsuario: number) {
    this.message = '';
    this.errors = [];
    this.loading = true;
    this.atendimentoService.findEncaminhamentoByPaciente(idUsuario).subscribe(
      (result) => {
        this.allItemsEncaminhamentoHistoricoPaciente = result;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.errors = Util.customHTTPResponse(error);
      },
    );
  }

  findMedicamentoPorAtendimento(idAtendimento: number) {
    this.message = '';
    this.errors = [];
    this.loading = true;
    this.atendimentoService
      .findMedicamentoByAtendimento(idAtendimento)
      .subscribe(
        (result) => {
          this.allItemsMedicamentoHistorico = result;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.errors = Util.customHTTPResponse(error);
        },
      );
  }

  findProcedimentoPorAtendimento(idAtendimento: number) {
    this.message = '';
    this.errors = [];
    this.loading = true;
    this.atendimentoService
      .findProcedimentoByAtendimento(idAtendimento)
      .subscribe(
        (result) => {
          this.allItemsProcedimentos = result;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.errors = Util.customHTTPResponse(error);
        },
      );
  }

  createGroupHistorico() {
    this.formHistorico = this.fb.group({
      pacienteHistoriaProgressa: new FormControl({ value: '', disabled: true }),
      pressaoArterial: new FormControl({ value: '', disabled: true }),
      pulso: new FormControl({ value: '', disabled: true }),
      saturacao: new FormControl({ value: '', disabled: true }),
      temperatura: new FormControl({ value: '', disabled: true }),
      altura: new FormControl({ value: '', disabled: true }),
      peso: new FormControl({ value: '', disabled: true }),
      glicemia: new FormControl({ value: '', disabled: true }),
      historicoClinico: new FormControl({ value: '', disabled: true }),
      exameFisico: new FormControl({ value: '', disabled: true }),
      observacoesGerais: new FormControl({ value: '', disabled: true }),
      situacao: new FormControl({ value: '', disabled: true }),
      motivoCancelamento: new FormControl({ value: '', disabled: true }),
      tipoFicha: new FormControl({ value: '', disabled: true }),
      idClassificacaoRisco: new FormControl({ value: '', disabled: true }),
      motivoQueixa: new FormControl({ value: '', disabled: true }),
      tipoHistoriaClinica: new FormControl({ value: '', disabled: true }),
    });

    this.formHipotese = this.fbHipotese.group({
      idPaciente: [Validators.required],
      idHipoteseDiagnostica: [Validators.required],
    });

    this.formMedicamento = this.fbMedicamento.group({
      idPaciente: [Validators.required],
      uso: [Validators.required],
      tipoVia: [Validators.required],
      quantidade: [Validators.required],
      apresentacao: [Validators.required],
      posologia: [Validators.required],
    });
  }

  public lineChartOptions: any = {
    responsive: true,
    layout: {
      padding: {
        left: 5,
        right: 5,
        top: 0,
        bottom: 3,
      },
    },
    legend: {
      display: false,
      labels: {
        display: false,
      },
    },
    title: {
      display: false,
      text: 'Custom Chart Title',
    },
    scales: {
      xAxes: [
        {
          display: false,
        },
      ],
      yAxes: [
        {
          display: false,
        },
      ],
    },
  };

  public lineChartColors: Array<any> = this.renderBgChart(
    'rgba(0, 0, 0, 0)',
    'rgba(255,255,255,1)',
    'rgba(255,255,255,1)',
    '#fff',
    '#B4B4B4',
    'rgba(255,255,255,0.8)',
  );
  public lineChartColors2: Array<any> = this.renderBgChart(
    'rgba(0, 0, 0, 0)',
    'rgba(219,219,219,1)',
    'rgba(219,219,219,1)',
    '#00929c',
    'rgb(77, 111, 160,1)',
    'rgba(46,79,143,0.8)',
  );
  public pieChartType = 'pie';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public renderBgChart(
    bg,
    border,
    pointBg,
    pointBorder,
    pointHoverBg,
    pointHoverBorder,
  ) {
    let lineChartColors: Array<any> = [
      {
        // grey
        backgroundColor: bg ? bg : 'rgba(0, 0, 0, 0)',
        borderColor: border ? border : 'rgba(255,255,255,0.2)',
        pointBackgroundColor: pointBg ? pointBg : 'rgba(255,255,255,1)',
        pointBorderColor: pointBorder ? pointBorder : '#fff',
        pointHoverBackgroundColor: pointHoverBg ? pointHoverBg : '#fff',
        pointHoverBorderColor: pointHoverBorder
          ? pointHoverBorder
          : 'rgba(255,255,255,0.8)',
      },
    ];

    return lineChartColors;
  }

  abreAtendimentoFichaDigital(id: Number) {
    this.errors = [];
    let url = JSON.parse(localStorage.getItem('parametro_seguranca')).filter(
      (url) => url.nome == 'URL_FICHA_MEDICA_VISUALIZACAO',
    )
      ? JSON.parse(localStorage.getItem('parametro_seguranca'))
        .filter((url) => url.nome == 'URL_FICHA_MEDICA_VISUALIZACAO')[0]
        .valor.replace('{id}', id)
      : '';
    this.loading = true;
    this.atendimentoService.openDocument(url).subscribe(
      (result) => {
        this.loading = false;
        window.open(url, '_blank');
      },
      (error) => {
        this.loading = false;
        this.errors = Util.customHTTPResponse(error);
      },
    );
  }

  recarregarDocumentos() {
    this.service
      .list(`paciente-documento/documento/${this.id}`)
      .subscribe((arquivos) => {
        this.listaArquivosUpload = arquivos;
      });
  }

  abrirDocumento(base: any) {

    if (base.tipo == 'pdf') {
      const pdf = document.createElement('embed');

      pdf.src = 'data:application/pdf;base64,' + base.base64;
      pdf.width = '100%';
      pdf.height = '100%';
      const w = window.open('');
      w.document.write(pdf.outerHTML);
    }
    else {
      const image = new Image();
      image.src = 'data:image/' + base.tipo + ';base64,' + base.base64;
      const w = window.open('');
      w.document.write(image.outerHTML);
    }
  }
}
