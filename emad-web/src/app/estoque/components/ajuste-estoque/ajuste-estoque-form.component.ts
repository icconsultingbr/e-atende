import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { AjusteEstoqueService } from './ajuste-estoque.service';
import { TipoMovimento } from '../../../_core/_models/TipoMovimento';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Util } from '../../../_core/_util/Util';
import { Material } from '../../../_core/_models/Material';
import { MovimentoGeral, ItemMovimentoGeral } from '../../../_core/_models/MovimentoGeral';
import * as uuid from 'uuid';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EstoqueImpressaoService } from '../../../shared/services/estoque-impressao.service';
import * as _moment from 'moment';
const myId = uuid.v4();

@Component({
    selector: 'app-ajuste-estoque-form',
    templateUrl: './ajuste-estoque-form.component.html',
    styleUrls: ['./ajuste-estoque-form.component.css'],
    providers: [AjusteEstoqueService]
})

export class AjusteEstoqueFormComponent implements OnInit {
  @ViewChild('contentRecibo') contentRecibo: ElementRef;

  method: String = 'estoque';
  fields: any[] = [];
  label: String = 'Ajuste de estoque';
  movimento: MovimentoGeral = new MovimentoGeral();
  itemMovimento: ItemMovimentoGeral = new ItemMovimentoGeral();
  id: Number = null;
  domains: any[] = [];
  form: FormGroup;
  loading: Boolean = false;
  message = '';
  errors: any[] = [];
  listaMaterialLote: any[] = [];
  objectMaterial: Material = new Material();
  warning = '';
  modalRef: NgbModalRef = null;
  tipoMovimento: TipoMovimento = new TipoMovimento();

  constructor(
    private fb: FormBuilder,
    private service: AjusteEstoqueService,
    private ref: ChangeDetectorRef,
    private modalService: NgbModal,
    private estoqueImpressaoService: EstoqueImpressaoService,
    private route: ActivatedRoute) {

    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.loadDomains();
    this.createGroup();
  }

  loadDomains() {
    this.service.list('tipo-movimento/administrativo').subscribe(tipoMovimento => {
      this.service.list('fabricante-material').subscribe(fabricante => {
        this.domains.push({
          idTipoMovimento: tipoMovimento,
          idFabricante: fabricante
        });
      });
    });
  }

  createGroup() {
    this.form = this.fb.group({
      id: [''],
      idTipoMovimento: ['', ''],
      motivo: ['', ''],
      idFabricante: ['', ''],
      idEstabelecimento: ['', ''],
      numeroEmpenho: ['', ''],
      validade: ['', ''],
      numeroDocumento: ['', ''],
      quantidade: ['', ''],
      idLoteAtual: ['', ''],
      lote: ['', '']
    });
  }

  toggleItemEntradaMaterial() {
    return Util.isEmpty(this.itemMovimento.idMaterial)
    || Util.isEmpty(this.itemMovimento.idFabricante)
    || Util.isEmpty(this.itemMovimento.lote)
    || Util.isEmpty(this.itemMovimento.quantidade)
    || Util.isEmpty(this.itemMovimento.validade);
  }

  medicamentoSelecionado(material: any) {
    this.itemMovimento.idMaterial = material.id;
    this.itemMovimento.nomeMaterial = material.descricao;
    this.buscaLotes();
  }

  tipoMovimentoSelecionado(tipoMovimento: any) {
    this.movimento.idTipoMovimento = tipoMovimento.target.value;
    this.tipoMovimento = this.domains[0].idTipoMovimento[tipoMovimento.target.options.selectedIndex - 1];
  }

  loteSelecionado(lote: any) {
    let loteSelecionado: any = {};
    loteSelecionado = this.domains[0].idLoteAtual[lote.target.options.selectedIndex - 1];

    this.itemMovimento.idFabricante = loteSelecionado.idFabricante;
    this.itemMovimento.nomeFabricante = loteSelecionado.nomeFabricanteMaterial;
    this.itemMovimento.validade = new Date(loteSelecionado.validade);
    this.itemMovimento.lote = loteSelecionado.lote;
    this.itemMovimento.quantidadeAtual = loteSelecionado.quantidade;
  }

  fornecedorSelecionado(fornecedor: any) {
    this.itemMovimento.idFabricante = fornecedor.target.value;
    this.itemMovimento.nomeFabricante = fornecedor.target.options[fornecedor.target.options.selectedIndex].text;
  }

  buscaLotes() {
    this.loading = true;
       this.service.list('estoque/material-lote/'
       + this.itemMovimento.idMaterial
        + '/estabelecimento/'
        +  JSON.parse(localStorage.getItem('est'))[0].id
        + '?loteBloqueado=' + this.tipoMovimento.loteBloqueado
        + '&loteVencido='  + this.tipoMovimento.loteVencido
        + '&operacao='  + this.tipoMovimento.operacao).subscribe(result => {
        this.domains[0].idLoteAtual = result;
        this.itemMovimento.idLoteAtual = null;
        this.loading = false;
      }, error => {
        this.loading = false;
        this.errors = Util.customHTTPResponse(error);
      });
  }

  confirmaItemEntradaMaterial() {
    if (this.movimentoContemDivergencias()) {
    return;
    }

    this.itemMovimento.idFront = uuid.v4();

    if (!this.movimento.itensMovimento) {
      this.movimento.itensMovimento = [];
    }

    this.movimento.itensMovimento.push(this.itemMovimento);
    this.itemMovimento = new ItemMovimentoGeral();
    this.listaMaterialLote = [];
    this.objectMaterial = new Material();
    this.domains[0].idLoteAtual = [];
    this.ref.detectChanges();
  }

  removeItemMovimento(item) {
    this.movimento.itensMovimento = this.movimento.itensMovimento.filter(itemExistente => itemExistente.idFront != item.idFront);
  }

  movimentoContemDivergencias() {
     this.errors = [];
     let erroQtd = false;
     let listaMaterialLoteExistente = [];
     listaMaterialLoteExistente =  Object.assign([], this.movimento.itensMovimento);

     if (this.tipoMovimento.operacao != 1 && this.itemMovimento.quantidadeAtual < this.itemMovimento.quantidade) {
      this.errors.push({
        message: 'Quantidade insuficiente para saída.'
      });
      erroQtd = true;
    }

     this.movimento.itensMovimento.forEach(item => {

     const materialExistente = listaMaterialLoteExistente.filter(itemAdicionado => itemAdicionado.idMaterial == this.itemMovimento.idMaterial
                                                                                && itemAdicionado.lote == this.itemMovimento.lote
                                                                                && itemAdicionado.idFabricante == this.itemMovimento.idFabricante);

     if (materialExistente.length > 0) {
        this.errors.push({
          message: 'Material já adicionado com o lote ' + this.itemMovimento.lote + '.'
        });
        erroQtd = true;
      }
     });

     return erroQtd;
  }

  sendForm(event, acao) {
    this.errors = [];
    event.preventDefault();

    this.service
      .inserirMaterialEstoque(this.movimento, 'entrada-material-estoque')
      .subscribe((res: any) => {
        this.movimento.id = res.id;
        this.movimento.dataMovimento = res.dataMovimento;
        this.openConfirmacao(this.contentRecibo);
        this.warning = '';
      }, erro => {
        this.errors = Util.customHTTPResponse(erro);
      });
  }

  openConfirmacao(content: any) {
    this.modalRef = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      size: 'lg'
    });
  }

  close() {
    if (this.modalRef) {
      this.modalRef.close();
    }

    this.movimento = new MovimentoGeral();
    this.itemMovimento = new ItemMovimentoGeral();
    this.listaMaterialLote = [];
    this.objectMaterial = new Material();
    this.domains[0].idLoteAtual = [];
    this.ref.detectChanges();
  }

  abreRelatorio() {
    const dadosRelatorio: any = {};
    dadosRelatorio.idMovimentoGeral = this.movimento.id;
    dadosRelatorio.nomeTipoMovimento = this.tipoMovimento.nome;
    dadosRelatorio.dataMovimentacao = this.movimento.dataMovimento;
    dadosRelatorio.operacao = this.tipoMovimento.operacao;
    dadosRelatorio.motivo = this.movimento.motivo;
    this.estoqueImpressaoService.imprimir('MOVIMENTAR_ESTOQUE', 'Movimentar estoque', this.movimento.nomeEstabelecimento, dadosRelatorio);
    this.close();
  }
}
