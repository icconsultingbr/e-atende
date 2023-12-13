import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlanoTerapeuticoService } from './plano-terapeutico.service';
import { Paciente } from '../../_core/_models/Paciente';
import { PagerService } from '../../_core/_services';
import { Util } from '../../_core/_util/Util';
import { Router } from '@angular/router';
import { AgendaProfissional } from '../../_core/_models/AgendaProfissional';
import { environment } from '../../../environments/environment';
import {
  startOfDay,
  subDays,
  addDays,
} from 'date-fns';

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
} from 'angular-calendar';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-plano-terapeutico',
  templateUrl: './plano-terapeutico.component.html',
  styleUrls: ['./plano-terapeutico.component.css'],
  providers: [PlanoTerapeuticoService]
})
export class PlanoTerapeuticoComponent implements OnInit {
  viewDate: Date = new Date();
  activeDayIsOpen: boolean = true;

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: {
        primary: '#ad2121',
        secondary: '#FAE3E3',
      },
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    }
  ];

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
  }

  handleEvent(action: string, event: CalendarEvent): void {
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
  }

  //MESSAGES
  loading: Boolean = false;
  message = '';
  errors: any[] = [];
  modalRef: NgbModalRef = null;
  modalRemoveRef: NgbModalRef = null;
  form: FormGroup;
  method = 'agenda';

  //PAGINATION
  allItems: any[];
  pager: any = {};
  pagedItems: any[];
  pageLimit = 10;
  fields: any[] = [];
  agendas: any[] = [];

  domingo: any = {};
  segunda: any = {};
  terca: any = {};
  quarta: any = {};
  quinta: any = {};
  sexta: any = {};
  sabado: any = {};

  @ViewChild('contentScheduler') contentScheduler: ElementRef;
  selectedSchedule: any = null;
  @Input() public readonly: Boolean = false;


  //MODELS (OBJECTS)
  object: AgendaProfissional = new AgendaProfissional();
  paciente: Paciente = new Paciente();

  pacienteSelecionado: any = null;
  domains: any[] = [];

  constructor(
    private pagerService: PagerService,
    private fb: FormBuilder,
    private service: PlanoTerapeuticoService,
    private modalService: NgbModal,
    private router: Router) {

    for (const field of this.service.fields) {
      if (field.grid) {
        this.fields.push(field);
      }
    }
  }

  ngOnInit() {
    this.loadDomains();
    this.loadSchedule(null);
  }

  open(content: any) {


    this.clear();
    this.pacienteSelecionado = null;
    /*this.object.idPaciente = null;
    this.object.pacienteNome = null;*/
    this.allItems = [];

    this.modalRef = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      size: 'lg'
    });
  }

  openSchedule(content: any, id: Number = null) {

    if (Util.isEmpty(id)) {
      this.object.dom = false;
      this.object.seg = false;
      this.object.ter = false;
      this.object.qua = false;
      this.object.qui = false;
      this.object.sex = false;
      this.object.sab = false;
      this.object.id = null;
      this.object.dataVigencia = null;
      this.object.idTipoAgenda = null;
      this.object.dataInicio = null;
      this.object.horaInicio = null;
      this.object.horaFim = null;
      this.object.observacoes = null;
    }



    this.modalRef = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      size: 'lg'
    });
  }

  openRemoveSchedule(content: any) {
    this.modalRemoveRef = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      size: 'sm'
    });
  }

  close() {
    this.modalRef.close();
  }

  removeCancel() {
    this.modalRemoveRef.close();
  }


  toggleProfissional() {
    if (this.object.idEquipe != null && this.object.idEquipe != undefined) {
      return false;
    }
    return true;
  }

  buscaPaciente() {
    this.loading = true;
    let params = '';
    if (!Util.isEmpty(this.paciente)) {
      if (Object.keys(this.paciente).length) {
        for (const key of Object.keys(this.paciente)) {
          if (!Util.isEmpty(this.paciente[key])) {
            params += key + '=' + this.paciente[key] + '&';
          }
        }

        if (params != '') {
          params = '?' + params;
        }
      }
    }

    this.service.list('paciente' + params).subscribe(result => {

      this.allItems = result;
      this.setPage(1);
      this.loading = false;

    }, erro => {
      this.loading = false;
      this.errors = Util.customHTTPResponse(erro);
    });
  }

  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.allItems.length, page, this.pageLimit);
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  loadQuantityPerPage(event) {
    const id = parseInt(event.target.value);
    this.pageLimit = id;
    this.setPage(1);
  }

  clear() {
    this.paciente = new Paciente();
    this.paciente.cartaoSus = '';
    this.allItems = [];
  }

  togglePaciente() {
    return Util.isEmpty(this.paciente.cartaoSus) && Util.isEmpty(this.paciente.nome);
  }

  selecionaPaciente(item) {
    this.pacienteSelecionado = item;
  }

  confirmaPaciente() {
    this.object.equipe = null;
    this.object.idEquipe = null;
    this.object.idProfissional = null;
    this.object.idPaciente = this.pacienteSelecionado.id;
    this.object.pacienteNome = this.pacienteSelecionado.nome;
    this.modalRef.close();
    this.consultaAgenda();
  }

  buscaEquipe() {

    if (!Util.isEmpty(this.object.equipe)) {
      this.loading = true;
      this.service.list('equipe/equipe/' + this.object.equipe + '/' + this.object.idEstabelecimento).subscribe(result => {
        this.domains[0].idEquipe = result;
        this.loading = false;
        this.consultaAgenda();
      }, error => {
        this.loading = false;
        this.errors = Util.customHTTPResponse(error);
      });
    }
  }

  loadDomains() {
    this.domains.push({
      equipe: [
        { id: 'EMAD', nome: 'EMAD' },
        { id: 'EMAP', nome: 'EMAP' }
      ],
      idEquipe: [],
      idProfissional: []
    });
  }


  buscaProfissionais() {
    if (!Util.isEmpty(this.object.idEquipe)) {
      this.loading = true;
      this.service.list('profissional/equipe/' + this.object.idEquipe).subscribe(result => {
        this.domains[0].idProfissional = result;
        this.loading = false;
        this.consultaAgenda();
      }, error => {
        this.loading = false;
        this.errors = Util.customHTTPResponse(error);
      });
    }
  }

  back() {
    this.router.navigate([this.method]);
  }

  consultaAgenda() {

    this.agendas = [];
    this.domingo.schedulers = [];
    this.segunda.schedulers = [];
    this.terca.schedulers = [];
    this.quarta.schedulers = [];
    this.quinta.schedulers = [];
    this.sexta.schedulers = [];
    this.sabado.schedulers = [];

    if (!Util.isEmpty(this.object.idPaciente)) {
      this.loading = true;
      this.service.list('agenda?idPaciente=' + this.object.idPaciente + '&idEquipe=' + this.object.idEquipe + '&idProfissional=' + this.object.idProfissional).subscribe(result => {

        this.agendas = result;
        this.loading = false;

        this.loadSchedule(new Date());

      }, error => {
        this.loading = false;
        this.errors = Util.customHTTPResponse(error);
      });
    }
  }

  loadSchedule(day: Date = null) {


    const hoje = ((day == null) ? new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0) : day);
    const weekDay = hoje.getDay();


    this.domingo.label = Util.cCalendar(hoje, weekDay, 0);
    this.domingo.data = Util.cdCalendar(hoje, weekDay, 0);
    this.segunda.label = Util.cCalendar(hoje, weekDay, 1);
    this.segunda.data = Util.cdCalendar(hoje, weekDay, 1);
    this.terca.label = Util.cCalendar(hoje, weekDay, 2);
    this.terca.data = Util.cdCalendar(hoje, weekDay, 2);
    this.quarta.label = Util.cCalendar(hoje, weekDay, 3);
    this.quarta.data = Util.cdCalendar(hoje, weekDay, 3);
    this.quinta.label = Util.cCalendar(hoje, weekDay, 4);
    this.quinta.data = Util.cdCalendar(hoje, weekDay, 4);
    this.sexta.label = Util.cCalendar(hoje, weekDay, 5);
    this.sexta.data = Util.cdCalendar(hoje, weekDay, 5);
    this.sabado.label = Util.cCalendar(hoje, weekDay, 6);
    this.sabado.data = Util.cdCalendar(hoje, weekDay, 6);

    //outraData.setDate(time.getDate() + 3);


    /* console.log(hoje.getDay());
     console.log(hoje.getDate());
     console.log(hoje.getMonth());
     console.log(hoje.getFullYear());*/

    if (this.agendas != null) {

      this.domingo.schedulers = [];
      this.segunda.schedulers = [];
      this.terca.schedulers = [];
      this.quarta.schedulers = [];
      this.quinta.schedulers = [];
      this.sexta.schedulers = [];
      this.sabado.schedulers = [];

      this.agendas.forEach(agenda => {


        const inicio = new Date(agenda.dataInicio);

        inicio.setHours(inicio.getHours() + (environment.utc));

        const fim = new Date(agenda.dataFim);
        fim.setHours(fim.getHours() + (environment.utc));

        const dataVigencia = new Date(agenda.dataVigencia);
        dataVigencia.setHours(dataVigencia.getHours() + (environment.utc));

        const tipo = agenda.idTipoAgenda;

        const inicioTime = inicio.getTime();
        const fimTime = fim.getTime();
        const zeroHour = new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate(), 0, 0).getTime();

        const de = Util.pad(inicio.getHours(), 2) + ':' + Util.pad(inicio.getMinutes(), 2);
        const ate = Util.pad(fim.getHours(), 2) + ':' + Util.pad(fim.getMinutes(), 2);
        const mag = (((((inicioTime - zeroHour) / 1000) / 60) / 60) * 40);

        const duration = (((((fimTime - inicioTime) / 1000) / 60) / 60) * 40);

        agenda.duration = duration;
        agenda.deAte = de + ' - ' + ate;
        agenda.margin = mag;

        if (!Util.isEmpty(agenda.daysFlag) && tipo == 'S') {
          const days = agenda.daysFlag.split('_');

          const vigTime = new Date(dataVigencia.getFullYear(), dataVigencia.getMonth(), dataVigencia.getDate(), 0, 0, 0).getTime();
          const iniTime = new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate(), 0, 0, 0).getTime();

          if (days.includes('0')) {
            const domTime = new Date(new Date(this.domingo.data).getFullYear(), new Date(this.domingo.data).getMonth(), new Date(this.domingo.data).getDate(), 0, 0, 0).getTime();
            if (domTime <= vigTime && domTime >= iniTime) {
              this.domingo.schedulers.push(agenda);
            }
          }


          if (days.includes('1')) {
            const segTime = new Date(new Date(this.segunda.data).getFullYear(), new Date(this.segunda.data).getMonth(), new Date(this.segunda.data).getDate(), 0, 0, 0).getTime();
            if (segTime <= vigTime && segTime >= iniTime) {
              this.segunda.schedulers.push(agenda);
            }
          }

          if (days.includes('2')) {
            const terTime = new Date(new Date(this.terca.data).getFullYear(), new Date(this.terca.data).getMonth(), new Date(this.terca.data).getDate(), 0, 0, 0).getTime();
            if (terTime <= vigTime && terTime >= iniTime) {
              this.terca.schedulers.push(agenda);
            }
          }

          if (days.includes('3')) {
            const quaTime = new Date(new Date(this.quarta.data).getFullYear(), new Date(this.quarta.data).getMonth(), new Date(this.quarta.data).getDate(), 0, 0, 0).getTime();
            if (quaTime <= vigTime && quaTime >= iniTime) {
              this.quarta.schedulers.push(agenda);
            }
          }

          if (days.includes('4')) {
            const quiTime = new Date(new Date(this.quinta.data).getFullYear(), new Date(this.quinta.data).getMonth(), new Date(this.quinta.data).getDate(), 0, 0, 0).getTime();
            if (quiTime <= vigTime && quiTime >= iniTime) {
              this.quinta.schedulers.push(agenda);
            }
          }

          if (days.includes('5')) {
            const sexTime = new Date(new Date(this.sexta.data).getFullYear(), new Date(this.sexta.data).getMonth(), new Date(this.sexta.data).getDate(), 0, 0, 0).getTime();
            if (sexTime <= vigTime && sexTime >= iniTime) {
              this.sexta.schedulers.push(agenda);
            }
          }

          if (days.includes('6')) {
            const sabTime = new Date(new Date(this.sabado.data).getFullYear(), new Date(this.sabado.data).getMonth(), new Date(this.sabado.data).getDate(), 0, 0, 0).getTime();
            if (sabTime <= vigTime && sabTime >= iniTime) {
              this.sabado.schedulers.push(agenda);
            }
          }
        } else if (tipo == 'U') {

          if (new Date(new Date(this.domingo.data).getFullYear(), new Date(this.domingo.data).getMonth(), new Date(this.domingo.data).getDate(), 0, 0, 0).getTime() ==
            new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate(), 0, 0, 0).getTime()) {
            this.domingo.schedulers.push(agenda);
          }

          if (new Date(new Date(this.segunda.data).getFullYear(), new Date(this.segunda.data).getMonth(), new Date(this.segunda.data).getDate(), 0, 0, 0).getTime() ==
            new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate(), 0, 0, 0).getTime()) {
            this.segunda.schedulers.push(agenda);
          }

          if (new Date(new Date(this.terca.data).getFullYear(), new Date(this.terca.data).getMonth(), new Date(this.terca.data).getDate(), 0, 0, 0).getTime() ==
            new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate(), 0, 0, 0).getTime()) {
            this.terca.schedulers.push(agenda);
          }

          if (new Date(new Date(this.quarta.data).getFullYear(), new Date(this.quarta.data).getMonth(), new Date(this.quarta.data).getDate(), 0, 0, 0).getTime() ==
            new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate(), 0, 0, 0).getTime()) {
            this.quarta.schedulers.push(agenda);
          }

          if (new Date(new Date(this.quinta.data).getFullYear(), new Date(this.quinta.data).getMonth(), new Date(this.quinta.data).getDate(), 0, 0, 0).getTime() ==
            new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate(), 0, 0, 0).getTime()) {
            this.quinta.schedulers.push(agenda);
          }

          if (new Date(new Date(this.sexta.data).getFullYear(), new Date(this.sexta.data).getMonth(), new Date(this.sexta.data).getDate(), 0, 0, 0).getTime() ==
            new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate(), 0, 0, 0).getTime()) {
            this.sexta.schedulers.push(agenda);
          }

          if (new Date(new Date(this.sabado.data).getFullYear(), new Date(this.sabado.data).getMonth(), new Date(this.sabado.data).getDate(), 0, 0, 0).getTime() ==
            new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate(), 0, 0, 0).getTime()) {
            this.sabado.schedulers.push(agenda);
          }
        }
      });
    }
  }

  voltaAgenda(data: Date) {
    const dt1 = new Date(data);
    const dt = new Date(data);

    dt.setDate((dt1.getDate() - 6));
    dt.setHours(dt.getHours() + (environment.utc));
    this.loadSchedule(dt);
  }

  avancaAgenda(data: Date) {
    const dt1 = new Date(data);
    const dt = new Date(data);

    dt.setDate((dt1.getDate() + 1));
    dt.setHours(dt.getHours() + (environment.utc));
    this.loadSchedule(dt);
  }

  hoje() {
    this.loadSchedule(null);
  }

  tipoAgenda($event) {
    const value = $event.target.value;
    if (value == 'U') {
      this.object.dataVigencia = null;
      this.object.dom = false;
      this.object.seg = false;
      this.object.ter = false;
      this.object.qua = false;
      this.object.qui = false;
      this.object.sex = false;
      this.object.sab = false;
    }
  }

  saveSchedule() {
    this.message = '';
    this.errors = [];
    this.loading = true;
    this.service.save(this.object, this.method).subscribe(result => {
      this.message = 'Agenda inserida com sucesso!';
      this.modalRef.close();
      this.consultaAgenda();
      this.loading = false;
    }, error => {
      this.errors = Util.customHTTPResponse(error);
      this.loading = false;
    });
  }

  isValid() {

    let bool: Boolean = false;

    if (this.object.idTipoAgenda == 'S') {
      if ((
        Util.isEmpty(this.object.pacienteNome) ||
        Util.isEmpty(this.object.idPaciente) ||
        Util.isEmpty(this.object.idEquipe) ||
        Util.isEmpty(this.object.dataVigencia) ||
        Util.isEmpty(this.object.idProfissional) ||
        Util.isEmpty(this.object.idTipoAgenda) ||
        Util.isEmpty(this.object.dataInicio) ||
        Util.isEmpty(this.object.horaInicio) ||
        Util.isEmpty(this.object.horaFim) ||
        Util.isEmpty(this.object.observacoes) ||
        (this.object.dom == false && this.object.seg == false && this.object.ter == false && this.object.qua == false && this.object.qui == false && this.object.sex == false && this.object.sab == false))
      ) {
        bool = true;
      }
    } else if (this.object.idTipoAgenda == 'U') {
      if (
        Util.isEmpty(this.object.pacienteNome) ||
        Util.isEmpty(this.object.idPaciente) ||
        Util.isEmpty(this.object.idEquipe) ||
        Util.isEmpty(this.object.idProfissional) ||
        Util.isEmpty(this.object.idTipoAgenda) ||
        Util.isEmpty(this.object.dataInicio) ||
        Util.isEmpty(this.object.horaInicio) ||
        Util.isEmpty(this.object.horaFim) ||
        Util.isEmpty(this.object.observacoes)
      ) {
        bool = true;
      }
    } else {
      bool = true;
    }

    return bool;
  }

  canCreate() {
    if (
      !Util.isEmpty(this.object.idPaciente) &&
      !Util.isEmpty(this.object.pacienteNome) &&
      !Util.isEmpty(this.object.equipe) &&
      !Util.isEmpty(this.object.idEquipe) &&
      !Util.isEmpty(this.object.idProfissional)
    ) {
      return true;
    } else {
      return false;
    }
  }

  editSchedule(item) {

    this.selectedSchedule = item;

    this.loading = true;

    this.object.dom = false;
    this.object.seg = false;
    this.object.ter = false;
    this.object.qua = false;
    this.object.qui = false;
    this.object.sex = false;
    this.object.sab = false;

    this.service.findById(item.id, this.method).subscribe(result => {

      const dataInicial = new Date(result.dataInicio);
      dataInicial.setHours(dataInicial.getHours() + (environment.utc));

      const dataFinal = new Date(result.dataFim);
      dataFinal.setHours(dataFinal.getHours() + (environment.utc));

      let dataVigencial = new Date(result.dataVigencia);
      dataVigencial.setHours(dataVigencial.getHours() + (environment.utc));

      let newVigencia = null;
      if (!Util.isEmpty(result.dataVigencia)) {
        dataVigencial = new Date(result.dataVigencia);
        newVigencia = dataVigencial.getFullYear() + '-' + Util.pad(dataVigencial.getMonth() + 1, 2) + '-' + Util.pad(dataVigencial.getDate(), 2) + ' ' + Util.pad(dataVigencial.getHours(), 2) + ':' + Util.pad(dataVigencial.getMinutes(), 2);

      }

      const newDataInicio = dataInicial.getFullYear() + '-' + Util.pad(dataInicial.getMonth() + 1, 2) + '-' + Util.pad(dataInicial.getDate(), 2) + ' ' + Util.pad(dataInicial.getHours(), 2) + ':' + Util.pad(dataInicial.getMinutes(), 2);
      this.object.id = result.id;
      this.object.idPaciente = result.idPaciente;
      this.object.idEquipe = result.idEquipe;
      this.object.equipeNome = result.equipeNome;
      this.object.nome = result.nome;
      this.object.dataVigencia = !Util.isEmpty(result.dataVigencia) ? Util.dateFormat(newVigencia, 'dd/MM/yyyy') : null;
      this.object.idProfissional = result.idProfissional;
      this.object.idTipoAgenda = result.idTipoAgenda;
      this.object.dataInicio = Util.dateFormat(newDataInicio, 'dd/MM/yyyy');
      this.object.horaInicio = newDataInicio.substring(11, 16);
      this.object.horaFim = Util.pad(dataFinal.getHours(), 2) + ':' + Util.pad(dataFinal.getMinutes(), 2);
      this.object.observacoes = result.observacoes;

      if (!Util.isEmpty(result.daysFlag)) {
        const split = result.daysFlag.split('_');

        split.forEach(dia => {

          if (dia == 0) {
            this.object.dom = true;
          }
          if (dia == 1) {
            this.object.seg = true;
          }
          if (dia == 2) {
            this.object.ter = true;
          }
          if (dia == 3) {
            this.object.qua = true;
          }
          if (dia == 4) {
            this.object.qui = true;
          }
          if (dia == 5) {
            this.object.sex = true;
          }
          if (dia == 6) {
            this.object.sab = true;
          }
        });
      }

      this.loading = false;
      this.openSchedule(this.contentScheduler, this.object.id);
    });
  }

  removeSchedule() {
    this.message = '';
    this.errors = [];
    this.service.remove(this.selectedSchedule.id, this.method).subscribe(result => {
      this.selectedSchedule = null;
      this.message = 'Agenda removida com sucesso!';
      this.modalRemoveRef.close();
      this.modalRef.close();
      this.consultaAgenda();

    }, error => {
      this.loading = false;
      this.errors = Util.customHTTPResponse(error);

    });
  }

  ver(agenda) {
    const data = new Date(agenda.dataInicio);
    data.setHours(data.getHours() + (environment.utc));
    this.loadSchedule(data);
  }

  convertTodate(date) {
    if (!Util.isEmpty(date)) {
      const data = new Date(date);
      return data.setHours(data.getHours() + (environment.utc));
    }

    return null;
  }

  getInitials(nome: string) {
    return Util.getInitialsOfName(nome)[0] + '' + Util.getInitialsOfName(nome)[Util.getInitialsOfName(nome).length - 1];
  }

}
