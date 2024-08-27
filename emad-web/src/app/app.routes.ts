import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { MainComponent } from "./main/main.component";
import { AuthGuard } from "./_core/_guards";
import { NotFoundComponent } from "./not-found/not-found.component";
import { UsuarioResetComponent } from "./seguranca/usuario/usuario-reset.component";

// http://localhost:4200/atendimento-link-temporario?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWRUaXBvVXN1YXJpbyI6MywiZXAiOjAsImFsbG93ZWRSb3V0ZSI6ImF0ZW5kaW1lbnRvLXBhY2llbnRlLWZpY2hhLXRlbXBvcmFyaWEiLCJpZFNhcCI6NDkxNjM2MjM0LCJpYXQiOjE3MjQ3MDAzNzksImV4cCI6MTcyNDcwMzk3OX0.2kqjRmSbNXSkLFU1mtH5KE-jUDScECSbnya7HGfxnas

const appRoutes: Routes = [
  { path: "", component: MainComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },

  {
    path: "usuario-reset",
    component: UsuarioResetComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "especialidades",
    canActivate: [AuthGuard],
    loadChildren:
      "./cadastro/dominio/especialidade/especialidade.module#EspecialidadeModule",
  },
  {
    path: "hipoteses-diagnosticas",
    canActivate: [AuthGuard],
    loadChildren:
      "./cadastro/dominio/hipotese-diagnostica/hipotese-diagnostica.module#HipoteseDiagnosticaModule",
  },
  {
    path: "modalidades",
    canActivate: [AuthGuard],
    loadChildren:
      "./cadastro/dominio/modalidade/modalidade.module#ModalidadeModule",
  },
  {
    path: "modelos-canetas",
    canActivate: [AuthGuard],
    loadChildren:
      "./cadastro/dominio/modelo-caneta/modelo-caneta.module#ModeloCanetaModule",
  },
  {
    path: "tipos-unidades",
    canActivate: [AuthGuard],
    loadChildren:
      "./cadastro/dominio/tipo-unidade/tipo-unidade.module#TipoUnidadeModule",
  },
  {
    path: "tipos-escolaridades",
    canActivate: [AuthGuard],
    loadChildren:
      "./cadastro/dominio/tipo-escolaridade/tipo-escolaridade.module#TipoEscolaridadeModule",
  },
  {
    path: "tipos-fichas",
    canActivate: [AuthGuard],
    loadChildren:
      "./cadastro/dominio/tipo-ficha/tipo-ficha.module#TipoFichaModule",
  },
  {
    path: "canetas",
    canActivate: [AuthGuard],
    loadChildren: "./cadastro/caneta/caneta.module#CanetaModule",
  },
  {
    path: "pacientes",
    canActivate: [AuthGuard],
    loadChildren: "./cadastro/paciente/paciente.module#PacienteModule",
  },
  {
    path: "equipes",
    canActivate: [AuthGuard],
    loadChildren: "./cadastro/equipe/equipe.module#EquipeModule",
  },
  {
    path: "profissionais",
    canActivate: [AuthGuard],
    loadChildren:
      "./cadastro/profissional/profissional.module#ProfissionalModule",
  },
  {
    path: "georreferenciamentos",
    canActivate: [AuthGuard],
    loadChildren:
      "./cadastro/georreferenciamento/georreferenciamento.module#GeorreferenciamentoModule",
  },
  {
    path: "atribuicoes-canetas",
    canActivate: [AuthGuard],
    loadChildren:
      "./operacao/atribuicao-caneta/atribuicao-caneta.module#AtribuicaoCanetaModule",
  },
  {
    path: "escalas-profissionais",
    canActivate: [AuthGuard],
    loadChildren:
      "./operacao/escala-profissional/escala-profissional.module#EscalaProfissionalModule",
  },
  {
    path: "planos-terapeuticos",
    canActivate: [AuthGuard],
    loadChildren:
      "./operacao/plano-terapeutico/plano-terapeutico.module#PlanoTerapeuticoModule",
  },
  {
    path: "agendas",
    canActivate: [AuthGuard],
    loadChildren: "./operacao/agenda/agenda.module#AgendaModule",
  },
  {
    path: "reaberturas",
    canActivate: [AuthGuard],
    loadChildren:
      "./operacao/reabertura-atendimento/reabertura-atendimento.module#ReaberturaAtendimentoModule",
  },
  {
    path: "estabelecimentos",
    canActivate: [AuthGuard],
    loadChildren:
      "./seguranca/estabelecimento/estabelecimento.module#EstabelecimentoModule",
  },
  {
    path: "menus",
    canActivate: [AuthGuard],
    loadChildren: "./seguranca/menu/menu.module#MenuModule",
  },
  {
    path: "parametros-segurancas",
    canActivate: [AuthGuard],
    loadChildren:
      "./seguranca/parametro-seguranca/parametro-seguranca.module#ParametroSegurancaModule",
  },
  {
    path: "usuarios",
    canActivate: [AuthGuard],
    loadChildren: "./seguranca/usuario/usuario.module#UsuarioModule",
  },
  {
    path: "tipos-usuarios",
    canActivate: [AuthGuard],
    loadChildren:
      "./seguranca/tipo-usuario/tipo-usuario.module#TipoUsuarioModule",
  },
  {
    path: "atendimentos",
    canActivate: [AuthGuard],
    loadChildren: "./operacao/atendimento/atendimento.module#AtendimentoModule",
  },
  {
    path: "atendimento-link-temporario",
    // canActivate: [AuthGuard],
    loadChildren: "./operacao/atendimento-link-temporario/atendimento-link-temporario.module#AtendimentoLinkTemporarioModule",
  },
  {
    path: "logs",
    canActivate: [AuthGuard],
    loadChildren: "./seguranca/log/log.module#LogModule",
  },
  {
    path: "atencoes-continuadas",
    canActivate: [AuthGuard],
    loadChildren:
      "./cadastro/dominio/atencao-continuada/atencao-continuada.module#AtencaoContinuadaModule",
  },
  {
    path: "orientacao-sexual",
    canActivate: [AuthGuard],
    loadChildren:
      "./cadastro/dominio/orientacao-sexual/orientacao-sexual.module#OrientacaoSexualModule",
  },
  {
    path: "genero",
    canActivate: [AuthGuard],
    loadChildren:
      "./cadastro/dominio/genero/genero.module#GeneroModule",
  },
  {
    path: "grupos-materiais",
    canActivate: [AuthGuard],
    loadChildren:
      "./cadastro/dominio/grupo-material/grupo-material.module#GrupoMaterialModule",
  },
  {
    path: "motivos-fim-receitas",
    canActivate: [AuthGuard],
    loadChildren:
      "./cadastro/dominio/motivo-fim-receita/motivo-fim-receita.module#MotivoFimReceitaModule",
  },
  {
    path: "livros",
    canActivate: [AuthGuard],
    loadChildren: "./cadastro/livro/livro.module#LivroModule",
  },
  {
    path: "fabricantes-materiais",
    canActivate: [AuthGuard],
    loadChildren:
      "./cadastro/fabricante-material/fabricante-material.module#FabricanteMaterialModule",
  },
  {
    path: "grupos-origens-receitas",
    canActivate: [AuthGuard],
    loadChildren:
      "./cadastro/grupo-origem-receita/grupo-origem-receita.module#GrupoOrigemReceitaModule",
  },
  {
    path: "sub-grupos-origens-receitas",
    canActivate: [AuthGuard],
    loadChildren:
      "./cadastro/dominio/sub-grupo-origem-receita/sub-grupo-origem-receita.module#SubGrupoOrigemReceitaModule",
  },
  {
    path: "sub-grupos-materiais",
    canActivate: [AuthGuard],
    loadChildren:
      "./cadastro/dominio/sub-grupo-material/sub-grupo-material.module#SubGrupoMaterialModule",
  },
  {
    path: "familias-materiais",
    canActivate: [AuthGuard],
    loadChildren:
      "./cadastro/dominio/familia-material/familia-material.module#FamiliaMaterialModule",
  },
  {
    path: "tipos-materiais",
    canActivate: [AuthGuard],
    loadChildren:
      "./cadastro/dominio/tipo-material/tipo-material.module#TipoMaterialModule",
  },
  {
    path: "tipos-movimentos",
    canActivate: [AuthGuard],
    loadChildren:
      "./cadastro/dominio/tipo-movimento/tipo-movimento.module#TipoMovimentoModule",
  },
  {
    path: "listas-controles-especiais",
    canActivate: [AuthGuard],
    loadChildren:
      "./cadastro/dominio/lista-controle-especial/lista-controle-especial.module#ListaControleEspecialModule",
  },
  {
    path: "estabelecimentos-grupos-materiais",
    canActivate: [AuthGuard],
    loadChildren:
      "./seguranca/estabelecimento-grupo-material/estabelecimento-grupo-material.module#EstabelecimentoGrupoMaterialModule",
  },
  {
    path: "materiais",
    canActivate: [AuthGuard],
    loadChildren: "./cadastro/material/material.module#MaterialModule",
  },
  {
    path: "unidades-materiais",
    canActivate: [AuthGuard],
    loadChildren:
      "./cadastro/dominio/unidade-material/unidade-material.module#UnidadeMaterialModule",
  },
  {
    path: "especialidades-materiais",
    canActivate: [AuthGuard],
    loadChildren:
      "./cadastro/especialidade-material/especialidade-material.module#EspecialidadeMaterialModule",
  },
  {
    path: "especialidades-entidades-campos",
    canActivate: [AuthGuard],
    loadChildren:
      "./cadastro/especialidade-entidade-campo/especialidade-entidade-campo.module#EspecialidadeEntidadeCampoModule",
  },
  {
    path: "notificacoes",
    canActivate: [AuthGuard],
    loadChildren: "./cadastro/notificacao/notificacao.module#NotificacaoModule",
  },
  {
    path: "tipos-notificacoes",
    canActivate: [AuthGuard],
    loadChildren:
      "./cadastro/dominio/tipo-notificacao/tipo-notificacao.module#TipoNotificacaoModule",
  },
  {
    path: "cores-classificacoes-riscos",
    canActivate: [AuthGuard],
    loadChildren:
      "./cadastro/dominio/cor-classificacao-risco/cor-classificacao-risco.module#CorClassificacaoRiscoModule",
  },
  {
    path: "classificacoes-riscos",
    canActivate: [AuthGuard],
    loadChildren:
      "./cadastro/dominio/classificacao-risco/classificacao-risco.module#ClassificacaoRiscoModule",
  },
  {
    path: "grupos-origens",
    canActivate: [AuthGuard],
    loadChildren:
      "./cadastro/dominio/grupo-origem/grupo-origem.module#GrupoOrigemModule",
  },
  {
    path: "subgrupos-origens",
    canActivate: [AuthGuard],
    loadChildren:
      "./cadastro/dominio/subgrupo-origem/subgrupo-origem.module#SubgrupoOrigemModule",
  },
  {
    path: "receitas",
    canActivate: [AuthGuard],
    loadChildren: "./farmacia/receita/receita.module#ReceitaModule",
  },
  {
    path: "exames",
    canActivate: [AuthGuard],
    loadChildren: "./operacao/exame/exame.module#ExameModule",
  },
  {
    path: "bloqueio-lote",
    canActivate: [AuthGuard],
    loadChildren:
      "./estoque/components/bloqueio-lote/bloqueio-lote.module#BloqueioLoteModule",
  },
  {
    path: "altera-validade",
    canActivate: [AuthGuard],
    loadChildren:
      "./estoque/components/altera-validade/altera-validade.module#AlteraValidadeModule",
  },
  {
    path: "estoques-unidades",
    canActivate: [AuthGuard],
    loadChildren:
      "./estoque/relatorios/estoque-unidade/estoque-unidade.module#EstoqueUnidadeModule",
  },
  {
    path: "estoques-medicamentos",
    canActivate: [AuthGuard],
    loadChildren:
      "./estoque/relatorios/estoque-medicamento/estoque-medicamento.module#EstoqueMedicamentoModule",
  },
  {
    path: "estoques-consumos",
    canActivate: [AuthGuard],
    loadChildren:
      "./estoque/relatorios/estoque-consumo/estoque-consumo.module#EstoqueConsumoModule",
  },
  {
    path: "entrada-material",
    canActivate: [AuthGuard],
    loadChildren:
      "./estoque/components/entrada-material/entrada-material.module#EntradaMaterialModule",
  },
  {
    path: "ajuste-estoque",
    canActivate: [AuthGuard],
    loadChildren:
      "./estoque/components/ajuste-estoque/ajuste-estoque.module#AjusteEstoqueModule",
  },
  {
    path: "reverter-ajuste-estoque",
    canActivate: [AuthGuard],
    loadChildren:
      "./estoque/components/reverter-ajuste-estoque/reverter-ajuste-estoque.module#ReverterAjusteEstoqueModule",
  },
  {
    path: "pedidos-compras",
    canActivate: [AuthGuard],
    loadChildren:
      "./estoque/components/pedido-compra/pedido-compra.module#PedidoCompraModule",
  },
  {
    path: "solicitacoes-remanejamentos",
    canActivate: [AuthGuard],
    loadChildren:
      "./estoque/components/solicitacao-remanejamento/solicitacao-remanejamento.module#SolicitacaoRemanejamentoModule",
  },
  {
    path: "atendimentos-remanejamentos",
    canActivate: [AuthGuard],
    loadChildren:
      "./estoque/components/atender-remanejamento/atender-remanejamento.module#AtenderRemanejamentoModule",
  },
  {
    path: "recibo-receita",
    canActivate: [AuthGuard],
    loadChildren:
      "./farmacia/relatorios/recibo-receita/recibo-receita.module#ReciboReceitaModule",
  },
  {
    path: "medicamento-paciente",
    canActivate: [AuthGuard],
    loadChildren:
      "./farmacia/relatorios/medicamento-paciente/medicamento-paciente.module#MedicamentoPacienteModule",
  },
  {
    path: "paciente-medicamento",
    canActivate: [AuthGuard],
    loadChildren:
      "./farmacia/relatorios/paciente-medicamento/paciente-medicamento.module#PacienteMedicamentoModule",
  },
  {
    path: "medicamento-profissional",
    canActivate: [AuthGuard],
    loadChildren:
      "./farmacia/relatorios/medicamento-profissional/medicamento-profissional.module#MedicamentoProfissionalModule",
  },
  {
    path: "profissional-medicamento",
    canActivate: [AuthGuard],
    loadChildren:
      "./farmacia/relatorios/profissional-medicamento/profissional-medicamento.module#ProfissionalMedicamentoModule",
  },
  {
    path: "medicamento-vencido",
    canActivate: [AuthGuard],
    loadChildren:
      "./farmacia/relatorios/medicamento-vencido-vencer/medicamento-vencido-vencer.module#MedicamentoVencidoVencerModule",
  },
  {
    path: "medicamento-movimento",
    canActivate: [AuthGuard],
    loadChildren:
      "./farmacia/relatorios/medicamento-movimento/medicamento-movimento.module#MedicamentoMovimentoModule",
  },
  {
    path: "extrato-movimento",
    canActivate: [AuthGuard],
    loadChildren:
      "./farmacia/relatorios/medicamento-extrato-movimento/medicamento-extrato-movimento.module#MedicamentoExtratoMovimentoModule",
  },
  {
    path: "motivo-ajuste-estoque-relatorio",
    canActivate: [AuthGuard],
    loadChildren:
      "./farmacia/relatorios/medicamento-ajuste-estoque/medicamento-ajuste-estoque.module#MedicamentoAjusteEstoqueModule",
  },
  {
    path: "livro-medicamento-controlado",
    canActivate: [AuthGuard],
    loadChildren:
      "./farmacia/relatorios/medicamento-livro-controlado/medicamento-livro-controlado.module#MedicamentoLivroControladoModule",
  },
  {
    path: "visualizacao-bi",
    canActivate: [AuthGuard],
    loadChildren:
      "./bi/power-bi/visualizacao-power-bi.module#VisualizacaoPowerBIModule",
  },
  {
    path: "url-externa/:id",
    canActivate: [AuthGuard],
    loadChildren:
      "./urlexterna/url-externa.module#UrlExternaModule",
  },
  {
    path: "integracao-e-sus",
    canActivate: [AuthGuard],
    loadChildren: "./integracao/e-sus/esus.module#ESusModule",
  },
  {
    path: "tipos-exames",
    canActivate: [AuthGuard],
    loadChildren:
      "./cadastro/dominio/tipo-exame/tipo-exame.module#TipoExameModule",
  },
  {
    path: "produtos-exames",
    canActivate: [AuthGuard],
    loadChildren:
      "./cadastro/dominio/produto-exame/produto-exame.module#ProdutoExameModule",
  },
  {
    path: "metodos-exames",
    canActivate: [AuthGuard],
    loadChildren:
      "./cadastro/dominio/metodo-exame/metodo-exame.module#MetodoExameModule",
  },
  {
    path: "procedimento",
    canActivate: [AuthGuard],
    loadChildren:
      "./cadastro/procedimento/procedimento.module#ProcedimentoModule",
  },
  {
    path: "comorbidades-estabelecimento",
    canActivate: [AuthGuard],
    loadChildren:
      "./analise/relatorios/comorbidade-estabelecimento/comorbidade-estabelecimento.module#ComorbidadeEstabelecimentoModule",
  },

  { path: "not-found", component: NotFoundComponent },
  { path: "**", component: NotFoundComponent }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
