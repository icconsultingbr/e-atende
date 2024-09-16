import { Component, OnInit } from '@angular/core';
import { AppNavbarService } from '../../_core/_components/app-navbar/app-navbar.service';
import { IntegracaoEsus } from '../../shared/services/integracao-e-sus.service';
import { IntegracaoEsusModel } from '../../_core/_models/IntegracaoEsus';
import { Util } from '../../_core/_util/Util';
declare function escape(s: string): string;

@Component({
  selector: 'app-esus',
  templateUrl: './esus.component.html',
  styleUrls: ['./esus.component.css'],
  providers: [IntegracaoEsus]
})

export class ESusComponent implements OnInit {

  object: IntegracaoEsusModel = new IntegracaoEsusModel();
  domains: any[] = [];
  periodoCriacao = false;
  periodoAlteracao = false;
  errors: any[] = [];
  loading = false;

  constructor(
    public nav: AppNavbarService,
    private service: IntegracaoEsus
  ) { }

  ngOnInit() {
    this.nav.show();
    this.loadDomain();
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    this.object.periodoExtracao = [yesterday, today];
  }

  loadDomain() {
    this.domains.push({
      tipoFicha: [
        { id: '0', nome: 'Todas' },
        { id: '4', nome: 'Ficha de Atendimento Individual' },
        { id: '9', nome: 'Ficha de Atendimento Domiciliar' },
        { id: '16', nome: 'Ficha de Atendimento Odontologico Individual' },
        { id: '15', nome: 'Ficha de Atividade Coletiva' },
        { id: '2', nome: 'Ficha de Cadastro Individual' },
        { id: '7', nome: 'Ficha de Procedimentos' },
        { id: '14', nome: 'Ficha de Vacinação' }],
      tipoPeriodo: [
        { id: '1', nome: 'Criação' },
        { id: '2', nome: 'Alteração' }]
    });
  }

  tipoPeriodoAlterado(event) {
    if (event == 1) {
      this.periodoCriacao = true;
      this.periodoAlteracao = false;
    } else {
      this.periodoAlteracao = true;
      this.periodoCriacao = false;
    }
  }

  isEnable() {
    if (!this.object.idFichaEsus || !this.object.idTipoPeriodo || !this.object.periodoExtracao[0] || !this.object.periodoExtracao[1]) {
      return true;
    }
    return false;
  }

  gerarXMLsPorTipoFicha() {

    let dataInicialConvertida;
    let dataFinalConvertida;

    if (this.object.periodoExtracao[0]) {
      this.object.periodoExtracao[0].setHours(0, 0, 0, 0);
      dataInicialConvertida = this.object.periodoExtracao[0].toISOString();
    }

    if (this.object.periodoExtracao[1]) {
      this.object.periodoExtracao[1].setHours(23, 59, 0, 0);
      dataFinalConvertida = this.object.periodoExtracao[1].toISOString();
    }

    this.object.periodoExtracao[0] = dataInicialConvertida;
    this.object.periodoExtracao[1] = dataFinalConvertida;


    this.loading = true;
    this.service.obterXmlsPorTipoFicha(this.object).subscribe((result: ArrayBuffer) => {
      const blob = new Blob([result], { type: 'application/zip;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      switch (this.object.idFichaEsus) {
        case '2':
          link.download = `lote-ficha-cadastro-individual.zip`;
          break;
        case '4':
          link.download = `lote-ficha-atendimento-individual.zip`;
          break;
        case '7':
          link.download = `lote-ficha-procedimentos.zip`;
          break;
        case '14':
          link.download = `lote-ficha-vacinacao.zip`;
          break;
        case '15':
          link.download = `lote-ficha-atividade-coletiva.zip`;
          break;
        case '16':
          link.download = `lote-ficha-atendimento-odontologico-individual.zip`;
          break;
        default:
          link.download = `lote-importacao-esus.zip`;
          break;
      }

      link.click();

      this.object.periodoExtracao = [];
      this.errors = [];

    }, () => {
      this.loading = false;
      this.object.periodoExtracao = [];
      this.errors = [{ message: "Não há dados no período selecionado" }];
    });
    this.loading = false;
  }
}
