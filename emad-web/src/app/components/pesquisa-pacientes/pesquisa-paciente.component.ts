import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Translation } from '../../_core/_locale/Translation';
import { Util } from '../../_core/_util/Util';
import { PesquisaPacienteService } from './pesquisa-paciente.service';
import { AppFormService } from '../../_core/_components/app-form/app-form.service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Paciente } from '../../_core/_models/Paciente';
import { PagerService } from '../../_core/_services/pager.service';

@Component({
  selector: 'app-pesquisa-paciente',
  templateUrl: './pesquisa-paciente.component.html',
  styleUrls: ['./pesquisa-paciente.component.css']
})

export class PesquisaPacienteComponent implements OnInit, AfterViewInit {
  @Output() pacienteSelecionadoEvent = new EventEmitter<any>();
  @Input() idPaciente: number;
  @Input() pacienteNome: string;
  object: Paciente = new Paciente();
  loading: Boolean = false;
  modalRef: NgbModalRef = null;
  service: PesquisaPacienteService;
  form: FormGroup;
  groupForm: any = {};
  type: string;

  id: any;
  errors: any[] = [];
  pacienteSelecionado: any = null;
  listaPacientes: any[] = [];

  //PAGINATION
  allItems: any[] = [];
  pager: any = {};
  pagedItems: any[];
  pageLimit = 10;
  fieldsPacientes: any[] = [];

  paging: any = {
    offset: 0,
    limit: 10,
    total: 0
  };
  warning = '';
  totalPages: Number;

  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.allItems.length, page, this.pageLimit);
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  loadQuantityPerPage(event) {
    const id = parseInt(event.target.value);
    this.pageLimit = id;
    this.setPage(1);
  }

  constructor(
    private fb: FormBuilder,
    router: Router,
    service: AppFormService,
    route: ActivatedRoute,
    private pagerService: PagerService,
    private modalService: NgbModal
  ) {
    this.service = service;
  }

  createGroup() {
    this.form = this.fb.group({
      id: [''],
      nome: [Validators.required]
    });
  }

  open(content: any) {
    this.clear();
    this.modalRef = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      size: 'lg'
    });
  }

  ngAfterViewInit() {
  }

  ngOnInit() {
    this.createGroup();
    if (this.idPaciente) {
      this.object.id = this.idPaciente;
      this.object.nome = this.pacienteNome;
    }
  }

  disableFields(): boolean {
    if (!this.object) {
      return true;
    }
  }

  close() {
    this.modalRef.close();
    this.form.reset()
  }

  clear() {
    this.object = new Paciente();
    this.pacienteSelecionado = null;
    this.listaPacientes = [];
  }

  togglePaciente() {
    return Util.isEmpty(this.object.cartaoSus)
           && Util.isEmpty(this.object.nome)
           && Util.isEmpty(this.object.nomeMae)
           && Util.isEmpty(this.object.numeroProntuario)
           && Util.isEmpty(this.object.cpf)
           && Util.isEmpty(this.object.dataNascimento)
           && Util.isEmpty(this.object.idSap);
  }

  selecionaPaciente(item) {
    this.pacienteSelecionado = item;
  }

  confirmaPaciente() {
    this.object.id = this.pacienteSelecionado.id;
    this.object.nome = this.pacienteSelecionado.nome;
    this.pacienteSelecionadoEvent.emit(this.object);
    this.close();
  }

  buscaPaciente(offset: Number = null, limit: Number = null) {
    this.errors = [];
    this.loading = true;
    let params = 'pesquisa=1&';

    this.paging.offset = offset ? offset : 0;
    this.paging.limit = limit ? limit : 10;

    if (!Util.isEmpty(this.object)) {
      if (Object.keys(this.object).length) {
        for (const key of Object.keys(this.object)) {
          if (!Util.isEmpty(this.object[key])) {
            params += key + '=' + this.object[key] + '&';
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

    this.service.list('paciente' + params).subscribe(result => {
      this.paging.total = result.total;
      this.totalPages = Math.ceil((this.paging.total / this.paging.limit));
      this.listaPacientes = result.items;
      setTimeout(() => {
        this.loading = false;
      }, 300);
    }, erro => {
      setTimeout(() => this.loading = false, 300);
      this.errors = Util.customHTTPResponse(erro);
    });
  }

  loadQuantityPerPagePagination(event) {
    const id = parseInt(event.target.value);
    this.paging.limit = id;

    this.setPagePagined(this.pager.offset, this.paging.limit);
  }

  setPagePagined(offset: number, limit: Number) {
    this.paging.offset = offset !== undefined ? offset : 0;
    this.paging.limit = limit ? limit : this.paging.limit;
    this.buscaPaciente(this.paging.offset, this.paging.limit);
  }
}
