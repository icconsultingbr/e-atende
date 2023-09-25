import { Input } from '@angular/core';

export class RelatorioMedicamento {
    @Input() idMaterial: number;
    @Input() nomeMaterial = '';
    @Input() ordenadoPor = 'mvg.dataMovimento';
    @Input() idPaciente: string;
    @Input() nomePaciente: string;
    @Input() dataInicial: Date;
    @Input() dataFinal: Date;
    @Input() dataInicialFiltro: string;
    @Input() dataFinalFiltro: string;
    @Input() criteriosPesquisa: any;
    @Input() params: any;
    @Input() idEstabelecimento: number;
    @Input() nomeEstabelecimento: string;
    @Input() lote: string;
    @Input() idFabricanteMaterial: number;
    @Input() nomeFabricanteMaterial: string;
    @Input() idProfissional: number;
    @Input() nomeProfissional: string;
    @Input() idTipoMovimento: number;
    @Input() nomeTipoMovimento: string;
    @Input() idOperacao: number;
    @Input() nomeOperacao: string;
    @Input() idLivro: number;
    @Input() nomeLivro: string;
}
