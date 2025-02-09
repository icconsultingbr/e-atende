import { Component, OnInit, ViewChild, Input, TemplateRef } from '@angular/core';
import { NgbModalRef, NgbModal, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PlanoTerapeuticoService } from './plano-terapeutico.service';
import { Paciente } from '../../_core/_models/Paciente';
import { PagerService } from '../../_core/_services';
import { Util } from '../../_core/_util/Util';
import { Router } from '@angular/router';
import { AgendaProfissional } from '../../_core/_models/AgendaProfissional';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
} from 'angular-calendar';
import { Subject } from 'rxjs';
import { EventColor } from 'calendar-utils';
import { DatePipe } from '@angular/common';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { moment } from 'ngx-bootstrap/chronos/test/chain';
import { isSameMonth } from 'date-fns';
import { isSameDay } from 'date-fns';
import { endOfDay } from 'date-fns';
import { startOfDay } from 'date-fns';
import { TipoAtendimento } from '../../../utils/enums/agendamentos/tipo-atendimento';
import { AgendamentoResponseListaDto } from './dtos/agendamento-response-lista.dto';
import { UpdateAgendamentoRequestDto } from './dtos/agendamento-update.dto';
import { TeleAtendimentoService } from '../../shared/services/tele-atendimento.service';
import { PacienteService } from '../../cadastro/paciente/paciente.service';
import { AtendimentoService } from '../atendimento/atendimento.service';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  profissional: {
    primary: '#1e90ff',
    secondary: '#00929c',
  },
  equipe: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-plano-terapeutico',
  templateUrl: './plano-terapeutico.component.html',
  styleUrls: ['./plano-terapeutico.component.css'],
  providers: [PlanoTerapeuticoService, DatePipe]
})
export class PlanoTerapeuticoComponent implements OnInit {
  @ViewChild('modalInfoAgendamento') modalInfoAgendamento: TemplateRef<any>;
  @ViewChild('modalAdicionarAgendamento') modalAdicionarAgendamento: TemplateRef<any>;
  @ViewChild('modalEditarAgendamento') modalEditarAgendamento: TemplateRef<any>;  
  @ViewChild('modalConfirmarExclusao') modalConfirmarExclusao: TemplateRef<any>;
  @ViewChild('contentConfirmacao') contentConfirmacao: any;
  @ViewChild('contentConfirmacaoAtendimento') contentConfirmacaoAtendimento: any;  
  @Input() public readonly: Boolean = false;
  loading: Boolean = false;
  view: string = 'month';
  selectedSchedule: any = null;
  dataAtual: string;
  selectedDate: Date;
  viewDate: Date = new Date();
  activeDayIsOpen: boolean = true;
  refresh = new Subject<void>();
  modalRef: NgbModalRef = null;  
  modalRefLocalizarPaciente: NgbModalRef = null;
  modalConsultaAgendamento: NgbModalRef = null;
  modalConfirmarExclusaoAgendamento: NgbModalRef = null;  
  modalAgendaDisponivel: NgbModalRef = null;
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate;
  toDate: NgbDate | null = null;
  form: FormGroup;
  dadosAgendamento: any;
  paciente: Paciente = new Paciente();
  pacienteSelecionado: any = null;
  dataSelecionada: any;
  agendamentoSelecionado: any
  pageLimit = 10;
  idEstabelecimento: number = !Util.isEmpty(JSON.parse(localStorage.getItem('est'))) ? +JSON.parse(localStorage.getItem('est'))[0].id : null;
  allItems: any[];
  errors: any[] = [];
  pager: any = {};
  pagedItems: any[];
  fields: any[] = [];
  listaEquipe: any[] = []
  listaEspecialidade: any[] = []
  tipoAtendimento = [];
  formaAtendimento = [];
  object: AgendaProfissional = new AgendaProfissional();
  events: CalendarEvent[] = [];
  showMensagemErro = false;
  idEspecialidade = 0;
  eventoIdExclusao: number;
  //Mensagens
  mensagem = '';
  mensagemErro: string;
  msgAlert: any = [];  
  medicos: any[] = [];

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  constructor(
    private fb: FormBuilder,
    private service: PlanoTerapeuticoService,
    private modalService: NgbModal,
    private pagerService: PagerService,
    private router: Router,
    private calendar: NgbCalendar,
    private readonly teleAtendimentoService: TeleAtendimentoService,
    private atendimentoService: AtendimentoService) {
    this.selectedDate = new Date();
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    for (const field of this.service.fields) {
      if (field.grid) {
        this.fields.push(field);
      }
    }
  }

  ngOnInit() {
    this.consultaAgendamentos();
    this.consultaEspecialidade();
    this.carregarFormaAtendimento();
    this.carregarTipoAtendimento();
    this.fomularioAgendamento()
    this.dataAtual = encodeURIComponent(moment().format('YYYY-MM-DDTHH:mm'));

    this.form.get('tipoAtendimento').valueChanges.subscribe((value) => {
      if (!value) {
        return;
      }
      if (value == 1) {
        this.form.get('idEquipe').clearValidators()
        this.form.get('idEquipe').updateValueAndValidity()
        this.form.patchValue({
          idEquipe: null
        })
      }
      if (value == 2) {
        this.listaEquipeDisponivel();
        this.form.patchValue({
          idProfissional: null
        })
        this.form.get('idProfissional').clearValidators()
        this.form.get('idProfissional').updateValueAndValidity()
      }
    });

    this.form.get('especialidade').valueChanges.subscribe((value) => {
      if (!value) {
        return;
      }
    });

    this.form.get('dataFinal').valueChanges.subscribe((result) => {
      const dtIn = this.form.get('dataInicial').value
      this.dataSelecionada = moment(dtIn).format('YYYY-MM-DDTHH:mm');
      const dtFim = result
      this.consultaAgendaPaciente(moment(dtIn), moment(dtFim));
    });
  }

  handleOpenAbrirModalConfirmacaoExlusao(idAgendamento: number): void {
    this.eventoIdExclusao = idAgendamento;
    this.modalConfirmarExclusaoAgendamento = this.modalService.open(this.modalConfirmarExclusao, { centered: true });
  }

  handleClickExcluirAgendamento(): void {
    this.events = this.events.filter((event) => event.id !== this.eventoIdExclusao);
    this.excluir(Number(this.eventoIdExclusao));
    this.mensagem = 'Agendamento excluído com sucesso';

    setTimeout(() => {
      this.mensagem = '';
    }, 4000);

    this.modalConfirmarExclusaoAgendamento.dismiss()

    this.eventoIdExclusao = null;
  }

  handleClickFecharModalConfirmarExcluirAgendamento(): void {
    this.modalConfirmarExclusaoAgendamento.dismiss()
  }

  excluir(value: number) {
    const idAgendamento = value ? value : this.dadosAgendamento.idAgendamento
    let body: UpdateAgendamentoRequestDto
    this.service.list(`agendamento/${idAgendamento}`).subscribe((result) => {
      body = result
      body = {
        ...body,
        id: idAgendamento,
        usuarioCancelamentoId: 1,
        justificativaCancelamento: this.form.get('justificativaCancelamento').value,
        situacao: 0,
        deletedAt: moment(new Date).format('YYYY-MM-DDTHH:mm')
      }
      this.service.save(body, 'agendamento').subscribe((result) => {
        this.consultaAgendamentos();
        this.modalConsultaAgendamento.dismiss()
        this.mensagem = 'Agendamento concluído com sucesso'
        setTimeout(() => {
          this.mensagem = '';
        }, 4000);
      })
    }
    );
  }
  focoCampoData(value: string) {
    if (value == 'dataInicial') {
      const dtSelecionada = this.form.get('dataInicial').value;
      const dtAtual = moment(new Date).format('YYYY-MM-DDTHH:mm');
      if (dtSelecionada < dtAtual) {
        this.alerta('error', 'A data selecionada não pode ser menor que a data atual.', 5000)
        this.form.get('dataInicial').reset()

      }
    }
    if (value == 'dataFinal') {
      const dtSelecionada = this.form.get('dataFinal').value;
      const dataInicial = this.form.get('dataInicial').value;
      if (dtSelecionada < dataInicial) {
        this.alerta('error', 'A data selecionada não pode ser menor que a data Inicial.', 5000)
        this.form.get('dataFinal').reset()
      }
    }
  }

  alerta(tipo: string, msg: string, timeout: number): void {
    let type = '';
    if (tipo === 'error') {
      type = 'danger';
    } else if (tipo === 'sucesso') {
      type = 'success';
    } else if (tipo === 'informacao') {
      type = 'info';
    }

    this.msgAlert = [{ type, msg }];

    setTimeout(() => {
      this.msgAlert = [];
    }, timeout);
  }

  fomularioAgendamento() {
    this.form = this.fb.group({
      id: [''],
      nomePaciente: [''],
      idPaciente: ['', [Validators.required]],
      idEquipe: ['', [Validators.required]],
      idProfissional: ['', [Validators.required]],
      formaAtendimento: ['', [Validators.required]],
      tipoAtendimento: ['', [Validators.required,]],
      dataInicial: ['', [Validators.required,]],
      dataFinal: ['', Validators.required],
      especialidade: [{ value: '', disabled: true }],
      observacao: [''],
      justificativaCancelamento: [''],
      dataSelecionadaNova: [''],
      profissionalNome: [''],
    });
    this.form.get('tipoAtendimento').valueChanges.subscribe(value => {
      if (value == 1) {
        this.form.get('especialidade').enable();
        this.form.get('especialidade').setValidators([Validators.required]);
        this.form.get('dataInicial').disable();
        this.form.get('dataFinal').disable();
      } else {
        if (value == 2) {
          this.form.get('especialidade').disable();
          this.form.get('especialidade').clearValidators();
          this.form.get('dataInicial').enable();
        this.form.get('dataFinal').enable();
        }
      }
    });
  }

  isJustificativaCancelamento() {
    const justificativaCancelamentoExists = this.form.get('justificativaCancelamento').value
    if (!justificativaCancelamentoExists) {
      return true
    }
    return false
  }

  limparFormulario() {
    this.form.reset()
    this.allItems = []
    this.paciente.nome = '';
    this.msgAlert = '';
  }

  salvar() {
    console.log("this.form.getRawValue()", this.form.getRawValue())
    this.service.save(this.form.getRawValue(), 'agendamento').subscribe((result) => {
      this.mensagem = 'Agendamento salvo com sucesso'
      this.consultaAgendamentos();
      this.paciente = new Paciente
      this.allItems = []
    });

    this.closeModal();
  }

  editar(value: number) {
    const id = value ? value : this.dadosAgendamento.idAgendamento;
    this.service.list(`agendamento/${id}`).subscribe((result) => {
      this.dadosAgendamento = result
      this.form.patchValue({
        id: this.dadosAgendamento.idAgendamento,
        idPaciente: this.dadosAgendamento.idPaciente,
        idEquipe: this.dadosAgendamento.idEquipe,
        nomeEquipe: this.dadosAgendamento.nomeEquipe,
        idProfissional: this.dadosAgendamento.idProfissional,
        profissionalNome: this.dadosAgendamento.profissionalNome,
        nomePaciente: this.dadosAgendamento.pacienteNome,
        especialidade: this.dadosAgendamento.especialidadeNome,
        especialidadeId: this.dadosAgendamento.especialidadeId,
        formaAtendimento: this.dadosAgendamento.formaAtendimento,
        tipoAtendimento: this.dadosAgendamento.tipoAtendimento,
        dataInicial: this.dadosAgendamento.dataInicial,
        dataFinal: this.dadosAgendamento.dataFinal,
        observacao: this.dadosAgendamento.observacao
      });

      if (this.dadosAgendamento.tipo == TipoAtendimento.Profissional) {
        this.idEstabelecimento = this.dadosAgendamento.pacienteEstabeleciomentoId
      } else {
        this.idEstabelecimento = this.dadosAgendamento.equipeEstabelecimetoId
      }

      this.openEditModalAgendamento();
    });

  }

  buscaPaciente() {
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
      this.allItems = result.items;
      this.setPage(1);
    }, erro => {
      this.errors = Util.customHTTPResponse(erro);
    });
  }

  consultaEspecialidade() {
    this.service.list('especialidade').subscribe((result) => {
      this.listaEspecialidade = result;
    })
  }

  listaEquipeDisponivel() {
    this.listaEquipe = []
    const dataInicial = encodeURIComponent(moment(this.form.get('dataInicial').value).format("YYYY-MM-DD HH:mm:ss"));
    const dataFinal = encodeURIComponent(moment(this.form.get('dataFinal').value).format("YYYY-MM-DD HH:mm:ss"));
    const idEspecialidade = this.form.get('especialidade').value;
    const idEstabelecimento = this.pacienteSelecionado && this.pacienteSelecionado.idEstabelecimento;

    this.service.list(`equipe/agendamento?dataInicial=${dataInicial}&dataFinal=${dataFinal}&idEstabelecimento=${idEstabelecimento}`).subscribe((result) => {
      if (result.length > 0) {
        this.listaEquipe = result;
      } else {
        if (idEspecialidade)
          this.alerta('error', 'Não há equipe disponível para a especialidade desejada na data selecionada.', 5000);
      }
    })
  }

  consultaAgendaPaciente(dataInicial: any, dataFinal: any) {
    this.mensagemErro = '';
    const idPaciente = Number(this.form.get('idPaciente').value);
    const novaDataInicial = moment(dataInicial);
    const novaDataFinal = moment(dataFinal);

    //verifica disponibilidade do agendamento do paciente para o dia informado.
    this.service.list(`agendamento/paciente/${idPaciente}`).subscribe((result) => {
      const agendamentoPaciente = result;
      const conflitos = agendamentoPaciente.filter(agendamento =>
        (novaDataInicial >= moment(agendamento.dataInicial) && novaDataInicial < moment(agendamento.dataFinal)) ||
        (novaDataFinal > moment(agendamento.dataInicial) && novaDataFinal <= moment(agendamento.dataFinal)) ||
        (novaDataInicial <= moment(agendamento.dataInicial) && novaDataFinal >= moment(agendamento.dataFinal))
      );

      if (conflitos.length > 0) {
        this.mensagemErro = 'Paciente possui agendamento para a data e hora informada.'
      } else {
        this.mensagemErro = '';
      }

    });
  };

  selecionaPaciente(item) {
    this.pacienteSelecionado = item;
  }

  confirmaPaciente() {
    this.form.enable()
    this.openModal(this.modalAdicionarAgendamento)
    this.form.patchValue({
      nomePaciente: this.pacienteSelecionado.nome,
      idPaciente: this.pacienteSelecionado.id
    });
    this.modalRefLocalizarPaciente.close();
  }

  carregarFormaAtendimento() {
    this.service.list('agendamento/forma-atendimento/agendamento').subscribe((result) => {
      this.formaAtendimento = result;
    });
  }

  carregarTipoAtendimento() {
    this.service.list('agendamento/tipo-atendimento/agendamento').subscribe((result) => {
      this.tipoAtendimento = result
    });
  }

  consultaAgendamentos() {
    this.loading = true
    this.service.list('agendamento').subscribe((result: AgendamentoResponseListaDto[]) => {
      const eventosCalendario: CalendarEvent[] = [];

      result.forEach((evento) => {
        let title = ""
        let color = null

        if (evento.idEquipe) {
          title = `${evento.pacienteNome} (${evento.nome})`
          color = { ...colors.equipe }
        } else if (evento.idProfissional) {
          title = `${evento.pacienteNome} (${evento.profissionalNome})`
          color = { ...colors.profissional }
        }
        const today = new Date();
        eventosCalendario.push({
          id: evento.idAgendamento,
          title,
          start: new Date(evento.dataInicial),
          end: new Date(evento.dataFinal),
          color,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
          actions: [
            {
              label: '<i class="fas fa-fw fa-pencil-alt"></i>',
              onClick: async ({ event }: { event: CalendarEvent }): Promise<void> => {
                this.editar(Number(event.id));
              },
            },
            ...(new Date(evento.dataFinal) > today ? [{
              label: '<i class="fas fa-fw fa-trash-alt"></i>',
              onClick: ({ event }: { event: CalendarEvent }): void => {
                this.handleOpenAbrirModalConfirmacaoExlusao(parseInt(event.id as string));
              }
            }] : [])
          ]
        });
      });

      this.events = eventosCalendario;
      this.loading = false;
    });
  }

  consultaAgendamentoId(id: number) {
    this.service.list(`agendamento/${id}`).subscribe((result) => {
      this.dadosAgendamento = result

    });
  }

  formatarDataHora(dataString) {
    const data = new Date(dataString);
    const dataFormatada = data.toLocaleDateString();
    const horaFormatada = data.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return { data: dataFormatada, hora: horaFormatada };
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.agendamentoSelecionado = event;
    const idAgendamento = parseInt(this.agendamentoSelecionado.id)
    this.modalData = { event, action };
    this.openModalConsultaAgendamento(this.modalInfoAgendamento);
    this.consultaAgendamentoId(idAgendamento);
  }

  openModalConsultaAgendamento(content: any) {
    this.modalConsultaAgendamento = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      size: 'lg'
    });
  }

  openModalAgendamento(): void {
    this.form.enable()
    this.openModal(this.modalAdicionarAgendamento)
  }

  openEditModalAgendamento(): void {
    this.openModal(this.modalEditarAgendamento)

    if (this.dataAtual > this.form.get('dataInicial').value) {
      this.form.disable()
    } else {
      this.form.enable()
    }
  }

  openModalAgendaDisponivel(content: any): void {
    this.medicos = null;
    this.modalAgendaDisponivel = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      size: 'lg'
    });
  }

  openModal(content: any) {
    this.modalRef = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      size: 'lg'
    });
  }

  openModalLocalizarPaciente(content: any) {
    this.modalRefLocalizarPaciente = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      size: 'lg'
    });
  }

  closeModalLocalizarPaciente() {
    this.modalRefLocalizarPaciente.dismiss()
    this.paciente = new Paciente
    this.allItems = []
    this.limparFormulario()
  }

  closeModal() {
    this.modalRef.dismiss()
    this.limparFormulario()
    this.idEspecialidade = 0;
  }

  setView(view: string) {
    this.view = view;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });

    this.handleEvent('Dropped or resized', event);
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  //Paginacao consulta paciente
  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.allItems.length, page, this.pageLimit);
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  loadQuantityPerPage(event) {
    const id = parseInt(event.target.value);
    this.pageLimit = id;
    this.setPage(1);
  }

  togglePaciente() {
    return Util.isEmpty(this.paciente.cartaoSus) && Util.isEmpty(this.paciente.nome);
  }

  inicioSessao():void{
    if (this.modalRef) this.modalRef.close(); 
    this.openConfirmacao(this.contentConfirmacao);    
  }

  close() {
    if (this.modalRef) this.modalRef.close(); 
    if (this.modalConsultaAgendamento) this.modalConsultaAgendamento.close();    
    if (this.modalAgendaDisponivel) this.modalAgendaDisponivel.close();   
  }

  closeAgendaDisponivel() {
    this.modalAgendaDisponivel.dismiss();   
  }

  closeSemAtendimento() {
    this.abreSessao();
    if (this.modalRef) this.modalRef.close();  
  }

  simIniciarSessao():void{
    if (this.modalRef) this.modalRef.close();  
    this.openConfirmacao(this.contentConfirmacaoAtendimento);      
  }

  simAbrirAtendimento():void{    
    if (this.modalRef) this.modalRef.close(); 
    if (this.modalConsultaAgendamento) this.modalConsultaAgendamento.close();     
    this.abreSessao();    

    this.router.navigate(['/atendimentos/cadastro'], { queryParams: { idPaciente: this.dadosAgendamento.idPaciente, idAgendamento: this.dadosAgendamento.idAgendamento } });
  
  }

  abreSessao(): void {
    this.teleAtendimentoService
      .gerarSessaoAgendamento({
        agendamentoId: this.agendamentoSelecionado.id,
        medico: true
      })
      .subscribe(result => {
        window.open(result.url, '_blank');
      });
  }

  copiarLinkSessao(): void {
    const clipboard = (navigator as any).clipboard;

    if (!clipboard) {
      return;
    }

    this.teleAtendimentoService
      .gerarSessaoAgendamento({
        agendamentoId: this.agendamentoSelecionado.id,
        medico: false
      })
      .subscribe(result => {
        clipboard.writeText(result.url).then(() => {
        }).catch(err => {
          console.error('Erro ao copiar o link: ', err);
        });
      });    
  }

  enviarSessaoPorEmail(): void {
    let url = '';
  }

  openConfirmacao(content: any) {
    this.modalRef = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      windowClass: 'modal-gg',
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

  buscarHorarios() {
    const dtIn = this.form.get('dataSelecionadaNova').value;
    const formaAtendimento = this.form.get('formaAtendimento').value;
    var novaData = moment(dtIn).format('YYYY-MM-DDTHH:mm');

    this.service.list('agendamento/especialidade/' + this.form.get('especialidade').value  + '/data/' + novaData + '/formaAtendimento/' + formaAtendimento + '?idEstabelecimento=' + this.idEstabelecimento  ).subscribe((result) => {      
      this.medicos = result;
    });
  }

  selecionarHorario(medico, horario) {      
      const dataEscolhida = this.form.get('dataSelecionadaNova').value;
      const dataInicialCompleta = new Date(dataEscolhida + 'T' + horario.inicio + ':00');
      const dataFinalCompleta = new Date(dataEscolhida + 'T' + horario.fim + ':00');
         
    const formatoMySQL = (date) => 
      `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

      this.form.patchValue({
           dataInicial: formatoMySQL(dataInicialCompleta),  
          dataFinal: formatoMySQL(dataFinalCompleta),
          idProfissional: medico.id,
          profissionalNome: medico.nome
      });
        
      this.closeAgendaDisponivel();  
  }
}