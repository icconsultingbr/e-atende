import { Routes } from '@angular/router';
import { AtendimentoFormComponent } from './atendimento-link-temporario-form.component';
import { AtendimentoComponent } from './atendimento-link-temporario.component';
import { RelatorioReceitaComponent } from './relatorio-receita-link-temporario.component';
import { AtendimentoSalaEsperaFormComponent } from './sala-espera-link-temporario/atendimento-sala-espera-form.component';
import { AtendimentoSalaEsperaComponent } from './sala-espera-link-temporario/atendimento-sala-espera-link-temporario.component';

export const atendimentoRoutes: Routes = [
  {
    path: '',
    component: AtendimentoComponent,
  },
  {
    path: 'sala-espera',
    component: AtendimentoSalaEsperaComponent,
  },
  {
    path: 'idPaciente/:idPaciente',
    component: AtendimentoComponent,
  },
  {
    path: 'cadastro',
    component: AtendimentoFormComponent,
  },
  {
    path: 'cadastro/:id',
    component: AtendimentoFormComponent,
  },
  {
    path: 'pesquisa/:armazenaPesquisa',
    component: AtendimentoComponent,
  },
  {
    path: 'sala-espera-criar',
    component: AtendimentoSalaEsperaFormComponent,
  },
  {
    path: 'sala-espera-criar/:id',
    component: AtendimentoSalaEsperaFormComponent,
  },
  {
    path: 'historico/:idHistorico',
    component: AtendimentoFormComponent,
  },
  {
    path: 'relatorio-receita/:ano/:estabelecimentoId/:numero/:farmacia',
    component: RelatorioReceitaComponent
  }
];
