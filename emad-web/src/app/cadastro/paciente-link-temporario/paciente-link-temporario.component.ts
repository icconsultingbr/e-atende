import { Component, OnInit, Input, ViewChild, Output, ElementRef, EventEmitter } from '@angular/core';
import { Paciente } from '../../_core/_models/Paciente';
import { PacienteLinkTemporarioService } from './paciente-link-temporario.service';
import { AppNavbarService } from '../../_core/_components/app-navbar/app-navbar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { PagerService } from '../../_core/_services';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Util } from '../../_core/_util/Util';
import { isDate } from 'util';
import { Translation } from '../../_core/_locale/Translation';

@Component({
  selector: 'app-paciente-link-temporario',
  templateUrl: './paciente-link-temporario.component.html',
  styleUrls: ['./paciente-link-temporario.component.css'],
  providers: [PacienteLinkTemporarioService]
})
export class PacienteComponent implements OnInit {

  method = 'paciente';
  domains: any[] = [];
  fields = [];
  fieldsSearch = [];
  object: Paciente = new Paciente();
  virtualDirectory: string = environment.virtualDirectory != '' ? environment.virtualDirectory + '/' : '';
  permiteVisualizarProntuario: boolean = JSON.parse(localStorage.getItem('especialidade'))
    ? JSON.parse(localStorage.getItem('especialidade')).visualizaProntuario
    : false;
  allItems: any[];
  pager: any = {};
  pagedItems: any[];

  erroEstabelecimento = false;
  mensagem = '';
  mensagemModal = '';
  isFilterCollapse = false;
  pagerService: PagerService;
  warning = '';
  pageLimit = 10;
  totalPages: Number;
  idPacienteExclusao: number;
  idPacienteTransferencia: number;
  estabelecimentoPacienteSelecionado: number;
  modalRef: NgbModalRef = null;
  paging: any = {
    offset: 0,
    limit: 10,
    total: 0
  };

  enableSearchButton: any[] = [];
  dropdownList: any[] = [];

  errors: any[] = [];
  showLabels: Boolean = false;
  loading = false;

  //ACTION BUTTONS
  @Input() create: Boolean = true;
  @Input() view: Boolean = true;
  @Input() urlForm = 'pacientes/cadastro';

  @ViewChild('textoProcurado') textoProcurado: ElementRef;
  @Output() emitFilterMultiSelectMethod = new EventEmitter();
  @ViewChild('content') content: ElementRef;

  actualPage: Number = 0;
  @Input() methodXls: string = this.method;
  dropdownSettings: any = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Marcar todos',
    unSelectAllText: 'Desmarcar todos',
    searchPlaceholderText: 'Procurar',
    noDataAvailablePlaceholderText: 'Sem dados disponíveis',
    itemsShowLimit: 1,
    allowSearchFilter: true
  };

  constructor(
    public nav: AppNavbarService,
    private service: PacienteLinkTemporarioService,
    private route: ActivatedRoute,
    pagerService: PagerService,
    private modalService: NgbModal,
    private router: Router) {

    for (const field of this.service.fields) {
      if (field.grid) {
        this.fields.push(field);
      }
      if (field.filter) {
        this.fieldsSearch.push(field);
      }
    }
    this.loadDomains();
    this.pagerService = pagerService;
  }

  ngOnInit() {
    this.nav.show();

    this.route.params.subscribe(params => {
      //this.idPaciente = params['idPaciente'];
    });

    // if (this.idPaciente>0) {
    //   this.object.idPaciente = this.idPaciente;
    // }

    //if (typeof Util.getPageState('textoProcurado') != 'undefined') {
    //      this.textoProcurado.nativeElement.value = Util.getPageState('textoProcurado');
    //}
  }

  loadDomains() {
    this.service.listDomains('estabelecimento').subscribe(estabelecimentos => {
      this.service.listDomains('especialidade').subscribe(especialidades => {
        this.domains.push({
          estabelecimentos: estabelecimentos,
          idEstabelecimentoCadastro: estabelecimentos,
          idEspecialidade: especialidades,
          pacienteOutroEstabelecimento: [
            { id: '1', nome: 'Sim' },
            { id: '2', nome: 'Não' }
          ],
          pacienteAtivoInativo: [
            { id: '1', nome: 'Ambos' },
            { id: '2', nome: 'Ativos' },
            { id: '3', nome: 'Inativos' }
          ]
        });
      });
    });
  }

  setPagePagined(offset: number, limit: Number) {
    this.paging.offset = offset !== undefined ? offset : 0;
    this.paging.limit = limit ? limit : this.paging.limit;
    this.getListPaged(this.paging.offset, this.paging.limit);
  }

  getListPaged(offset: Number = null, limit: Number = null) {

    this.mensagem = '';
    this.paging.offset = offset ? offset : 0;
    this.paging.limit = limit ? limit : 10;

    if (this.loading != true) {
      setTimeout(() => this.loading = true, 300);
    }

    let params = '';
    this.errors = [];

    if (this.object !== null) {
      if (Object.keys(this.object).length) {
        for (const key of Object.keys(this.object)) {
          if (this.object[key] != '' && this.object[key] != 0 && this.object[key] != null) {
            if (typeof this.object[key] !== 'undefined') {
              if (typeof this.object[key] == 'object') {
                if (isDate(this.object[key])) {
                  params += key + '=' + Util.dateFormat(this.object[key], 'yyyy-MM-dd') + '&';
                } else {
                  let p = '';

                  for (const k of this.object[key]) {
                    p += k.id + ',';
                  }
                  params += key + '=' + p.substring(0, p.length - 1) + '&';
                }
              } else {
                if (this.object[key].toString().indexOf('/') >= 0) {
                  params += key + '=' + Util.dateFormat(this.object[key], 'yyyy-MM-dd') + '&';
                } else {
                  params += key + '=' + this.object[key] + '&';
                }
              }
            }
          }
        }

        if (params != '') {
          params = '?' + params;
        }
      }
    }

    if (this.paging.offset != null && this.paging.limit != null) {
      params += (params == '' ? '?' : '') + 'offset=' + this.paging.offset + '&limit=' + this.paging.limit;
    }

    this.service.list(this.method + params).subscribe(result => {
      this.warning = '';
      this.paging.total = result.total;
      this.totalPages = Math.ceil((this.paging.total / this.paging.limit));
      this.allItems = result.items;
      setTimeout(() => {
        this.loading = false;
      }, 300);
    }, erro => {
      setTimeout(() => this.loading = false, 300);
      this.errors = Util.customHTTPResponse(erro);
    });
  }

  pesquisaCentral() {
    this.object.pesquisaCentral = this.textoProcurado.nativeElement.value;
    this.getListPaged();
  }

  new() {
    if (this.urlForm != undefined) {
      this.router.navigate(['/' + this.urlForm]);
    } else {
      const route = this.method.split('/');
      this.router.navigate(['/' + route[0] + '-form']);
    }
  }

  viewer(id) {
    this.mensagem = '';
    if (this.urlForm != undefined) {
      this.router.navigate(['/' + this.urlForm + '/' + id]);
    } else {
      const route = this.method.split('/');
      this.router.navigate(['/' + route[0] + '-view/' + id]);
    }
  }

  ngAfterViewInit() {
    this.getListPaged();
  }

  refresherPagination() {
    this.errors = [];
    this.getListPaged(this.paging.offset, this.paging.limit);
  }

  toggleFilter() {
    this.isFilterCollapse = !this.isFilterCollapse;
  }

  searchFilter() {
    this.mensagem = '';
    this.getListPaged();
  }

  clear() {
    if (this.object != null) {

      if (Object.keys(this.object).length) {
        for (const key of Object.keys(this.object)) {

          if (this.object[key] != '' && this.object[key] != 0) {

            const fields2 = this.fieldsSearch.filter(item => item.field == key);

            if (typeof fields2[0] != 'undefined' && fields2[0] !== null) {
              if (fields2[0].filter.type == 'select') {
                if (fields2[0].filter.changeTarget) {
                  this.domains[0][fields2[0].filter.changeTarget] = [];
                }
                this.object[key] = undefined;
              } else {
                this.object[key] = null;
              }
            }
          }
        }
      }
      Util.savePageState(null, 0, null, null, '');
      this.allItems = [];
      this.textoProcurado.nativeElement.value = '';
    }

  }

  loadQuantityPerPagePagination(event) {
    const id = parseInt(event.target.value);
    this.paging.limit = id;

    this.setPagePagined(this.pager.offset, this.paging.limit);
  }

  translate(term, obj) {
    if (typeof (obj) == 'object') {
      return obj[term];
    } else {
      return Translation.t(term);
    }
  }

  haveSubmitPermission() {
    return true;
  }

  toCurrency(number, mask) {
    if (number == null) {
      return '';
    }

    if (typeof (mask) == 'object') {
      return Util.convertToCurrency(number);
    } else {
      return number.replace('R$ ', '').replace('.', ',');
    }
  }

  close() {
    this.idPacienteExclusao = null;
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  openConfirmacao(content: any, id: number) {
    this.idPacienteExclusao = id;
    this.modalRef = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      size: 'lg'
    });
  }

  openTransferencia(content: any, id: number, idEstabelecimentoCadastroSelecionado: number) {
    this.idPacienteTransferencia = id;
    this.estabelecimentoPacienteSelecionado = idEstabelecimentoCadastroSelecionado;
    this.modalRef = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      size: 'lg'
    });
  }


  visualizaAtendimentos(id: any): void {
    const url = this.router.url.replace('pacientes', '') + this.virtualDirectory + '#/atendimentos/idPaciente/' + id;
    this.service.file('atendimento/consulta-por-paciente', url).subscribe(result => {
      this.loading = false;
      window.open(
        url,
        '_self'
      );
    });
  }

  remover() {
    this.loading = true;
    this.service.remove(this.idPacienteExclusao, this.method).subscribe(() => {
      this.mensagem = Translation.t('Registro removido com sucesso!');
      this.getListPaged();
      this.modalRef.close();
    },
      (erro) => {
        this.modalRef.close();
        setTimeout(() => this.loading = false, 300);
        this.errors = Util.customHTTPResponse(erro);
      }
    );
  }

  transferir() {
    this.erroEstabelecimento = false;
    if (this.estabelecimentoPacienteSelecionado == 0) {
      this.erroEstabelecimento = true;
      return;
    }
    this.loading = true;
    const pacienteSelecionado: any = {};
    pacienteSelecionado.id = this.idPacienteTransferencia;
    pacienteSelecionado.idEstabelecimentoCadastro = this.estabelecimentoPacienteSelecionado;

    this.service.transfereEstabelecimento(pacienteSelecionado).subscribe(() => {
      this.mensagem = Translation.t('Paciente transferido com sucesso!');
      this.getListPaged();
      this.modalRef.close();
    },
      (erro) => {
        this.modalRef.close();
        setTimeout(() => this.loading = false, 300);
        this.errors = Util.customHTTPResponse(erro);
      }
    );
  }

  visualizaProntuarioPaciente(idPaciente: any): void {
    const url = this.router.url.replace('pacientes', '') + this.virtualDirectory + '#/pacientes/prontuario/' + idPaciente + '?hideMenu=true';
    this.service.file('atendimento/consulta-por-paciente', url).subscribe(result => {
      this.loading = false;
      window.open(
        url,
        '_blank'
      );
    });
  }
}
