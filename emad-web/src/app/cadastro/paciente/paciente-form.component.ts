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
import { PacienteService } from './paciente.service';
import { Paciente } from '../../_core/_models/Paciente';
import { ActivatedRoute, Router } from '@angular/router';
import { Util } from '../../_core/_util/Util';
import PlaceResult = google.maps.places.PlaceResult;
import PlaceGeometry = google.maps.places.PlaceGeometry;
import GeocoderAddressComponent = google.maps.GeocoderAddressComponent;
import { environment } from '../../../environments/environment';
import { PacienteHipotese } from '../../_core/_models/PacienteHipotese';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HipoteseDiagnostica } from '../../_core/_models/HipoteseDiagnostica';
import { Estabelecimento } from '../../_core/_models/Estabelecimento';
import { EstabelecimentoService } from '../../seguranca/estabelecimento/estabelecimento.service';
import { FileUploadService } from '../../_core/_components/app-file-upload/services/file-upload.service';
import { AgendaPacienteImpressaoService } from '../../shared/services/agenda-paciente-impressao.service';
import { TeleAtendimentoService } from '../../shared/services/tele-atendimento.service';

@Component({
  selector: 'app-paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrls: ['./paciente-form.component.css'],
  providers: [PacienteService],
})
export class PacienteFormComponent implements OnInit {
  //documentos
  public images;
  public listaArquivosUpload: any[] = []; 
  public listaAgendamento: any[] = [];
  now: Date = new Date();
  
  object: Paciente = new Paciente();
  objectEstabelecimento: Estabelecimento = new Estabelecimento();
  pacienteHipotese: PacienteHipotese = new PacienteHipotese();
  method: string = 'paciente';
  fields = [];
  label = 'Paciente';
  id: number = null;
  domains: any[] = [];
  form: FormGroup;
  loading: Boolean = false;
  message = '';
  errors: any[] = [];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  allItemsHipotese: any[] = [];
  virtualDirectory: string =
    environment.virtualDirectory != ''
      ? environment.virtualDirectory + '/'
      : '';
  modalRef: NgbModalRef = null;
  loadPhoto = false;
  allItemsPesquisaHipoteseDiagnostica: any[] = null;
  hipoteseDiagnostica: HipoteseDiagnostica = new HipoteseDiagnostica();

  cpfObrigatorio = false;
  susObrigatorio = false;
  telefoneDefault = '';
  dataInicial: Date;
  dataFinal: Date;

  @ViewChild('addresstext') addresstext: ElementRef;

  //PAGINATION
  pager: any = {};
  pagedItems: any[];
  pageLimit = 10;
  paging: any = {
    offset: 0,
    limit: 10,
    total: 0,
  };
  warning = '';
  totalPages: Number;

  constructor(
    private service: PacienteService, 
    private serviceEstabelecimento: EstabelecimentoService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private modalService: NgbModal,
    private router: Router,
    private fileUploadService: FileUploadService,
    private agendaPacienteImpressao: AgendaPacienteImpressaoService,
    private readonly teleAtendimentoService: TeleAtendimentoService
  ) {
    this.fields = service.fields;
  }

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'nome',
      selectAllText: 'Marcar todos',
      unSelectAllText: 'Desmarcar todos',
      searchPlaceholderText: 'Procurar',
      noDataAvailablePlaceholderText: 'Sem dados disponíveis',
      itemsShowLimit: 5,
      allowSearchFilter: true,
    };
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.createGroup();
    this.loadDomains();

    this.onChangeEstabelecimento(this.object.idEstabelecimentoCadastro);
    this.recarregarDocumentos();
    this.carregaAgendamentos();
  }

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  loadDomains() {
    this.loading = true;
    this.service.listDomains('uf').subscribe((ufs) => {
      this.service.listDomains('nacionalidade').subscribe((paises) => {
        this.service.listDomains('modalidade').subscribe((modalidades) => {
          this.service
            .listDomains('estabelecimento')
            .subscribe((estabelecimentos) => {
              this.service.list('orientacao-sexual').subscribe((orientacaoSexual) => {
                this.service.list('genero').subscribe((genero) => {
                  this.service.listDomains('raca').subscribe((racas) => {
                    this.service
                      .listDomains('hipotese-diagnostica')
                      .subscribe((hipoteseDiagnostica) => {
                        this.service
                          .listDomains('atencao-continuada')
                          .subscribe((atencaoContinuada) => {
                            this.service
                              .listDomains('escolaridade')
                              .subscribe((escolaridade) => {
                                this.domains.push({
                                  idUf: ufs,
                                  idNacionalidade: paises,
                                  idNaturalidade: [],
                                  idMunicipio: [],
                                  hipoteses: hipoteseDiagnostica,
                                  idEstabelecimentoCadastro: estabelecimentos,
                                  escolaridade: escolaridade,
                                  idModalidade: modalidades,
                                  idOrientacaoSexual: orientacaoSexual,
                                  idGenero: genero,
                                  sexo: [
                                    { id: '1', nome: 'Masculino' },
                                    { id: '2', nome: 'Feminino' },
                                    { id: '3', nome: 'Ambos' },
                                    { id: '4', nome: 'Não informado' },
                                  ],
                                  idTipoSanguineo: [
                                    { id: '1', nome: 'A_POSITIVO' },
                                    { id: '2', nome: 'A_NEGATIVO' },
                                    { id: '3', nome: 'B_POSITIVO' },
                                    { id: '4', nome: 'B_NEGATIVO' },
                                    { id: '5', nome: 'AB_POSITIVO' },
                                    { id: '6', nome: 'AB_NEGATIVO' },
                                    { id: '7', nome: 'O_POSITIVO' },
                                    { id: '8', nome: 'O_NEGATIVO' },
                                  ],
                                  aleitamentoMaterno: [
                                    { id: '1', nome: 'Exclusivo' },
                                    { id: '2', nome: 'Predominante' },
                                    { id: '3', nome: 'Complementado' },
                                    { id: '4', nome: 'Inexistente' },
                                  ],
                                  idRaca: racas,
                                  idAtencaoContinuada: atencaoContinuada,
                                  gruposAtencaoContinuada: atencaoContinuada,
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
  }

  encontraPaciente() {
    this.object.id = this.id;
    this.errors = [];
    this.message = '';
    this.loading = true;

    this.service.findById(this.id, this.method).subscribe(
      (result) => {
        this.object = result;
        this.loading = false;
        this.loadPhoto = true;
        this.carregaNaturalidade();
        this.carregaMunicipios();
        this.findHipotesePorPaciente();
      },
      (error) => {
        this.object = new Paciente();
        this.loading = false;
        this.loadPhoto = true;
        //this.allItemsEncaminhamento = [];
        this.allItemsHipotese = [];
        //this.allItemsMedicamento = [];
        this.errors.push({
          message: 'Paciente não encontrado',
        });
      },
    );
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
      sexo: ['', Validators.required],
      idOrientacaoSexual: ['', ''],
      idGenero: ['', ''],
      idNacionalidade: ['', Validators.required],
      idNaturalidade: ['', Validators.required],
      ocupacao: ['', ''],
      cpf: ['', ''],
      rg: ['', ''],
      dataEmissao: ['', ''],
      orgaoEmissor: ['', ''],
      escolaridade: ['', Validators.required],
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
      falecido: ['', ''],
      necessidadeEspeciais: ['', ''],
      reeducando: ['', ''],
      gestante: ['', ''],
      aleitamentoMaterno: ['', ''],
      dumDaGestante: ['', ''],
      idadeGestacional: ['', ''],
      stGravidezPlanejada: ['', ''],
      nuGestasPrevias: ['', ''],
      nuPartos: ['', ''],
      situacao: ['', Validators.required],
      foto: [''],
    });
  }

  sendForm(event) {
    this.errors = [];
    this.message = '';
    this.loading = true;
    event.preventDefault();

    this.service.save(this.object, this.method).subscribe(
      (res: any) => {
        this.loading = false;
        this.object.id = res.id;
        if (this.form.value.id)
          this.message = 'Alteração efetuada com sucesso!';
        else this.message = 'Cadastro efetuado com sucesso!';

        this.back();
        return;

        // if(res.ano_receita)
        //   this.object.ano_receita = res.ano_receita;

        // if(res.numeroReceita)
        //   this.object.numero_receita = res.numeroReceita;

        // if(res.idEstabelecimento)
        //   this.object.unidade_receita = res.idEstabelecimento;

        // if(res.dadosFicha)
        //   this.object.dadosFicha = res.dadosFicha;

        //   if(!Util.isEmpty(this.object.ano_receita) && !Util.isEmpty(this.object.numero_receita) && !Util.isEmpty(this.object.unidade_receita))
        //     this.abreReceitaMedica(this.object.ano_receita, this.object.numero_receita, this.object.unidade_receita);
        // } else {
        //   this.abreFichaDigital(this.object.id, false);
        // }

        // if(this.object.situacao && this.object.situacao != "E" && this.object.situacao != "O" && this.object.situacao != "X" && this.object.situacao != "C"){
        //   this.stopProcess(this.object.situacao);
        //   return;
        // }
      },
      (erro) => {
        this.loading = false;
        setTimeout(() => (this.loading = false), 300);
        this.errors = Util.customHTTPResponse(erro);
      },
    );
  }

  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(
      this.addresstext.nativeElement,
      {
        componentRestrictions: { country: 'BR' },
        types: ['geocode'], // 'establishment' / 'address' / 'geocode'
      },
    );

    // Set the data fields to return when the user selects a place.
    autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);

    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      let place: PlaceResult = autocomplete.getPlace();
      let geometry: PlaceGeometry = place.geometry;

      let rua = '';
      let numero = '';
      let bairro = '';
      let municipio = '';
      let estado = '';
      let latitude = 0;
      let longitude = 0;
      let cep = '';

      place.address_components.forEach(
        (address_component: GeocoderAddressComponent) => {
          if (address_component.types[0] === 'route') {
            rua = address_component.long_name;
          }
          if (address_component.types[0] === 'street_number') {
            numero = address_component.long_name;
          }
          if (address_component.types[0] === 'sublocality_level_1') {
            bairro = address_component.long_name;
          }
          if (address_component.types[0] === 'administrative_area_level_2') {
            municipio = address_component.long_name;
          }
          if (address_component.types[0] === 'administrative_area_level_1') {
            estado = address_component.long_name;
          }
          if (address_component.types[0] === 'postal_code') {
            cep = address_component.long_name;
          }
        },
      );

      if (geometry) {
        latitude = geometry.location.lat();
        longitude = geometry.location.lng();
      }

      this.object.logradouro = rua;
      this.object.numero = numero;
      this.object.bairro = bairro;
      this.object.latitude = latitude;
      this.object.longitude = longitude;
      this.object.cep = cep;

      let ufs = this.domains[0].idUf.filter(
        (uf) => uf.nome.toUpperCase() == estado.toUpperCase(),
      );

      if (ufs.length > 0) {
        this.object.idUf = ufs[0].id;

        this.service
          .list(`municipio/uf/${this.object.idUf}`)
          .subscribe((municipios) => {
            this.domains[0].idMunicipio = municipios;
            let ufMunicipios = municipios.filter(
              (uf) =>
                uf.nome.toUpperCase() == municipio.toString().toUpperCase(),
            );
            if (ufMunicipios.length > 0) {
              this.object.idMunicipio = ufMunicipios[0].id;
            }
            this.ref.detectChanges();
          });
      }
    });
  }

  carregaMunicipios() {
    this.message = '';
    this.errors = [];
    this.loading = true;

    this.service.list(`municipio/uf/${this.object.idUf}`).subscribe(
      (municipios) => {
        this.domains[0].idMunicipio = municipios;
        let listaMunicipios = municipios.filter(
          (municipio) =>
            municipio.nome.toUpperCase() == municipio.toString().toUpperCase(),
        );
        if (listaMunicipios.length > 0) {
          this.object.idMunicipio = listaMunicipios[0].id;
        }
      },
      (error) => {
        this.loading = false;
        this.errors = Util.customHTTPResponse(error);
      },
    );
  }

  findHipotesePorPaciente() {
    this.message = '';
    this.errors = [];
    this.loading = true;
    this.service.findHipoteseByPaciente(this.object.id).subscribe(
      (result) => {
        this.allItemsHipotese = result;
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

  openHipotese(content: any) {
    this.errors = [];
    this.message = '';
    this.allItemsPesquisaHipoteseDiagnostica = [];
    this.pacienteHipotese = new PacienteHipotese();
    this.hipoteseDiagnostica = new HipoteseDiagnostica();

    this.modalRef = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      size: 'lg',
    });
  }

  pesquisaHipoteseDiagnostica() {
    this.loading = true;
    const params = '';
    this.allItemsPesquisaHipoteseDiagnostica = [];
    this.errors = [];

    if (
      Util.isEmpty(this.hipoteseDiagnostica.nome) &&
      Util.isEmpty(this.hipoteseDiagnostica.cid_10)
    ) {
      this.errors = [{ message: 'Informe o nome ou código CID 10' }];
      this.loading = false;
      return;
    }

    if (!Util.isEmpty(this.hipoteseDiagnostica.nome)) {
      if (this.hipoteseDiagnostica.nome.length < 3) {
        this.errors = [{ message: 'Informe o nome, ao menos 3 caracteres' }];
        this.loading = false;
        return;
      }
    }

    if (!Util.isEmpty(this.hipoteseDiagnostica.cid_10)) {
      if (this.hipoteseDiagnostica.cid_10.length < 2) {
        this.errors = [
          { message: 'Informe o código CID 10, ao menos 2 caracteres' },
        ];
        this.loading = false;
        return;
      }
    }

    this.buscaHipoteseDiagnostica();
  }

  buscaHipoteseDiagnostica(offset: Number = null, limit: Number = null) {
    this.loading = true;

    this.paging.offset = offset ? offset : 0;
    this.paging.limit = limit ? limit : 10;

    var params =
      '?nome=' +
      this.hipoteseDiagnostica.nome +
      '&cid=' +
      this.hipoteseDiagnostica.cid_10;

    if (this.paging.offset != null && this.paging.limit != null) {
      params +=
        (params == '' ? '?' : '&') +
        'offset=' +
        this.paging.offset +
        '&limit=' +
        this.paging.limit;
    }

    this.service.list('hipotese-diagnostica' + params).subscribe(
      (result) => {
        this.warning = '';
        this.paging.total = result.total;
        this.totalPages = Math.ceil(this.paging.total / this.paging.limit);
        this.allItemsPesquisaHipoteseDiagnostica = result.items;
        setTimeout(() => {
          this.loading = false;
        }, 300);
      },
      (erro) => {
        setTimeout(() => (this.loading = false), 300);
        this.errors = Util.customHTTPResponse(erro);
      },
    );
  }

  selecionaHipoteseDiagnostica(item) {
    this.hipoteseDiagnostica = item;
  }

  close() {
    if (this.modalRef) this.modalRef.close();
  }

  disableHipoteseButton() {
    return Util.isEmpty(this.hipoteseDiagnostica.id);
  }

  saveHipotese() {
    this.message = '';
    this.errors = [];
    this.loading = true;
    this.pacienteHipotese.idHipoteseDiagnostica = this.hipoteseDiagnostica.id;
    this.pacienteHipotese.idPaciente = this.id;
    this.pacienteHipotese.funcionalidade = 'PACIENTE';
    this.pacienteHipotese.idEstabelecimento =
      this.object.idEstabelecimentoCadastro;

    this.service.saveHipotese(this.pacienteHipotese).subscribe(
      (result) => {
        this.message = 'Hipótese diagnóstica inserida com sucesso!';
        this.close();
        this.loading = false;
        this.findHipotesePorPaciente();
      },
      (error) => {
        this.loading = false;
        this.errors = Util.customHTTPResponse(error);
      },
    );
  }

  removeHipotese(item) {
    this.service.removeHipotese(item.id).subscribe((result) => {
      this.message = 'Hipótese diagnóstica removida com sucesso!';
      this.close();
      this.loading = false;
      this.findHipotesePorPaciente();
    });
  }

  photoSaved(id: string) {
    this.form.patchValue({ foto: id }, { emitEvent: false });
    this.object.foto = id;
  }

  loadQuantityPerPagePaginationHipotese(event) {
    const id = parseInt(event.target.value);
    this.paging.limit = id;

    this.setPagePaginedHipotese(this.pager.offset, this.paging.limit);
  }

  setPagePaginedHipotese(offset: number, limit: Number) {
    this.paging.offset = offset !== undefined ? offset : 0;
    this.paging.limit = limit ? limit : this.paging.limit;

    this.buscaHipoteseDiagnostica(this.paging.offset, this.paging.limit);
  }

  onChangeEstabelecimento(idEstabelecimento) {
    this.errors = [];
    this.message = '';
    this.loading = true;

    this.serviceEstabelecimento
      .findById(idEstabelecimento, 'estabelecimento')
      .subscribe(
        (result) => {
          this.objectEstabelecimento = result;
          this.loading = false;

          let estabelecimento = JSON.parse(JSON.stringify(result));

          // VALIDACAO EM TELA
          this.cpfObrigatorio = estabelecimento.obrigaCpfNovoPaciente == 1;
          this.susObrigatorio =
            estabelecimento.obrigaCartaoSusNovoPaciente == 1;
          this.telefoneDefault = estabelecimento.celularDefaultNovoPaciente;

          //VALIDAR OS DADOS NA API
          this.object.obrigaCpfNovoPaciente =
            estabelecimento.obrigaCpfNovoPaciente;
          this.object.obrigaCartaoSusNovoPaciente =
            estabelecimento.obrigaCartaoSusNovoPaciente;
          this.object.celularDefaultNovoPaciente =
            estabelecimento.celularDefaultNovoPaciente;
        },
        (error) => {
          this.objectEstabelecimento = new Estabelecimento();
          this.loading = false;
          this.errors.push({
            message: 'Estabelecimento não encontrado',
          });
        },
      );
  }

  openModal(content) {
    this.modalRef = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      size: 'lg',
    });
  }

  fileChangeEvent(event: any): void {
    this.images = event;
    this.ref.detectChanges();

    if (this.images.length > 0) {
      this.images.forEach((object) => {
        {
          const reader = new FileReader();
          reader.onload = function () {
            object.base64 = reader.result;
          };
          reader.readAsDataURL(object);
        }
      });
    }
  }

  salvarDocumentos() {
    this.fileUploadService.uploadListImage(this.images).subscribe((result) => {

      result.forEach(object => {
        object.idPaciente = this.id;
      });

      this.service.salvarArquivo(result).subscribe((result) => {
        if (result) {
          this.recarregarDocumentos();
        }
        if (this.modalRef) {
          this.modalRef.close();
        }
      });
    });
  }

  recarregarDocumentos() {
    this.service
      .list(`paciente-documento/documento/${this.id}`)
      .subscribe((arquivos) => {
        this.listaArquivosUpload = arquivos;
      });
  }

  carregaAgendamentos() {
    let dataInicialConvertida = null;
    let dataFinalConvertida = null;
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

    this.service
      .list(`paciente-agendamento/report?idPaciente=${this.id}&dataInicial=${dataInicialConvertida}&dataFinal=${dataFinalConvertida}`)
      .subscribe((lista) => {
        this.listaAgendamento = lista;
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

  removeItemArquivo(item: any) {
    this.service.removeArquivo(item).subscribe((produtoExame) => {
      this.service
        .list(`paciente-documento/documento/${this.id}`)
        .subscribe((arquivo) => {
          this.listaArquivosUpload = arquivo;
        });
    });
  }

  isFutureDate(dateString: string): boolean {
    // Substitui o espaço entre a data e hora por 'T' para que o formato seja reconhecido
    const date = new Date(dateString.replace(' ', 'T'));
    return date > this.now;
  }

  imprimirPdfAgenda() {
    let dataInicialConvertida = null;
    let dataFinalConvertida = null;

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

    this.agendaPacienteImpressao.imprimir(
      this.id,
      dataInicialConvertida,
      dataFinalConvertida,
      this.object.nome
    );
  }

  abreSessao(item: number): void {
    this.teleAtendimentoService
      .gerarSessao({
        atendimentoId: item,
        medico: false
      })
      .subscribe(result => {
        window.open(result.url, '_blank');
      });
  }

  download(sessaoId: string): void {
    this.teleAtendimentoService.downloadVideo(sessaoId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `session-${sessaoId}.mp4`; // Nome do arquivo
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },
      error: (error) => {
        console.error('Erro ao fazer download:', error);
      },
    });
  }
}
