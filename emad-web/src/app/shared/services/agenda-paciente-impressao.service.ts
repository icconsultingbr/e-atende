import { Injectable } from '@angular/core';
import * as _moment from 'moment';
import { PacienteService } from '../../cadastro/paciente/paciente.service';
import { RelatorioAgendaPacienteService } from './relatorio-agenda-paciente.service';


@Injectable()
export class AgendaPacienteImpressaoService extends RelatorioAgendaPacienteService {
    constructor(private pacienteService: PacienteService) {
        super();

        this.style = `<style type="text/css">

        @page { size: auto;  margin: 5mm; }

        .hidden-button{
            display: block;
        }

        div.page div.print-footer {
            /*Oculta os rodapes de impressão*/
            display: none;
        }

        @media print {
            html, body {
                min-height: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
            }

            .hidden-button{
                display: none;
            }

            footer {
                /*some com o rodapé original*/
                display: none;
            }

            div.page div.print-footer {
                /*exibe os rodapés de impressão (que no caso são divs)*/
                display: block;
                position: relative;
                top: 98%;
                margin-top: -2%;
                height: 2%; /*quando ajustar a altura deves ajustar margin-top e o top*/
            }

            div.content {
                /*Ajuda a trabalhar o conteudo com o .print-footer*/
                position: relative;
                background-color: #f00;
                top: 0;
                left: 0;
            }

            div.page {
                /*Força sempre quebrar a página no final*/
                page-break-after: always;
                max-height: 95%;
                height: 95%;
                background-color: #fc0;
            }
        }

        .margin-collapse {
            margin: 20 !important;
        }

        .row {
            margin-bottom: unset !important;
        }

        .collapsible {
            border-radius: 10px;
        }

        .table, th, td{
            border: 2px solid;
            padding: 5px 5px;
            font-size: 12px;
        }

        .container {
            width: 94%;
            margin-left: 30px;
            margin-right: 30px;
        }

        .collapsible-body{
            display: block !important;
        }

        .input-field{
            margin-top: unset !important;
        }

        .cor_topo {
            color: #000000;
        }
    </style>`;

        this.script = `<script>
            $(document).ready(function(){
            $('.date').mask('00/00/0000');
            $('.cpf').mask('000.000.000-00');
            $('.cnpj').mask('00.000.000/0000-00');
            });
        </script>`;
    }

    imprimir(idPaciente: number, dataInicial: Date, dataFinal: Date,  nomePaciente: string, target: string = '_blank') {
        this.pacienteService.obterAgendaPacienteRelatorio(idPaciente, dataInicial, dataFinal)
            .subscribe((result) => {
                let gridAgendaPaciente = '';

                gridAgendaPaciente += (`<table class="table table-striped">
                            <thead>
                                <tr style="text-align: center;">
                                    <th style="width:10%">Forma</th>
                                    <th style="width:10%">Data</th>
                                    <th style="width:13%">Horário</th>
                                    <th style="width:15%">Profissional/Equipe</th>
                                    <th style="width:35%">Observação</th>
                                    <th style="width:17%">Dados de cancelamento</th>
                                </tr>
                            </thead>
                                 `);


                                 gridAgendaPaciente += (result.length > 0 ? `<tbody>` : ``);

                for (const agendas of result) {
                    gridAgendaPaciente += (`
                    <tr class="text-left">
                        <td class="text-secondary">${agendas.formaAtendimento}</td>
                        <td class="text-secondary">${agendas.dataInicial ? _moment(agendas.dataInicial).format('DD/MM/YYYY') : '' }</td>
                        <td class="text-secondary">${agendas.dataInicial ? _moment(agendas.dataInicial).format('HH:mm') : '' } - ${agendas.dataFinal ? _moment(agendas.dataInicial).format('HH:mm') : '' }</td>
                        <td class="text-secondary">${agendas.nomeProfissionalOuEquipe}</td>
                        <td class="text-secondary">${agendas.observacao}</td>`);

                        if(agendas.deletedAt)
                        {
                            gridAgendaPaciente += (`
                                <td class="text-secondary"> <b>Data:</b> ${agendas.deletedAt ? _moment(agendas.deletedAt).format('DD/MM/YYYY HH:mm') : ''} 
                                                            - <b>Usuário:</b> ${agendas.deletedAt ? agendas.usuarioCancelamento: ""} 
                                                            - <b>Motivo:</b> ${agendas.deletedAt ? agendas.justificativaCancelamento : ""}</td>
                                 `);        
                        }
                        else{
                            gridAgendaPaciente += (`<td class="text-secondary"></td>`);
                        }
                    

                    gridAgendaPaciente += (`</tr>`);
                }

                gridAgendaPaciente += (result.length > 0 ? `</tbody></table>` : `</table>`);

                const tela = `
                            <div class="page">
                                <div class="content">
                                    <form class="container" id="form" style="font-size: 12px;">
                                        <div class="row hidden-button" style="margin-bottom: 10px !important;">
                                            <a class="waves-effect waves-light btn" style="float:right; margin-right:1%" onclick="window.print()">Imprimir</a>
                                        </div>
                                        <div class="row">
                                            <div class="col s4" style="margin-top:20px;">
                                                <img style="width:60%; float:left; margin-left:10px;" src="${window.location.origin}${window.location.pathname}/assets/imgs/logo_relatorio.png">
                                            </div>
                                            <div class="col s8" style="margin-top:40px;text-align: right; color: #7d0000; font-weight:bold">
                                                Agendamento(s) por paciente
                                            </div>
                                            <div class="col s8" style="text-align: right; color: #7d0000; font-weight:bold">
                                                Paciente: ${nomePaciente}
                                            </div>
                                        </div>
                                        <hr size = 7>
                                        <br/>
                                        <div class="row">
                                            ${gridAgendaPaciente}
                                        </div>
                                    </form>
                                </div>
                            </div>`;
                this.print(tela, nomePaciente, target);
            });
    }
}
