import { NgModule } from '@angular/core';
import { CoreModule } from '../../_core/core.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppGridViewModule } from '../../_core/_components/app-grid-view/app-grid-view.module';
import { AppFormModule } from '../../_core/_components/app-form/app-form.module';
import { AtendimentoComponent } from './atendimento-link-temporario.component';
import { AtendimentoFormComponent } from './atendimento-link-temporario-form.component';
import { AtendimentoService } from './atendimento-link-temporario.service';
import { atendimentoRoutes } from './atendimento-link-temporario.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {
  NgbModule,
  NgbCollapseModule,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AppModalModule } from '../../_core/_components/app-modal/app-modal.module';
import 'rxjs/add/operator/map';
import { SharedServiceModule } from '../../shared/services/shared-service.module';
import { RelatorioReceitaComponent } from './relatorio-receita-link-temporario.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AtendimentoSalaEsperaFormComponent } from './sala-espera-link-temporario/atendimento-sala-espera-form.component';
import { AtendimentoSalaEsperaComponent } from './sala-espera-link-temporario/atendimento-sala-espera-link-temporario.component';
import { AppSelectModule } from '../../_core/_components/app-select/app-select.module';
import { AppSelectModalModule } from '../../_core/_components/app-select-modal/app-select-modal.module';
import { ExameFormularioModule } from '../exame-formulario/exame-formulario.module';
import { AppFileUploadModule } from '../../_core/_components/app-file-upload/app-file-upload.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    AppGridViewModule,
    AppFormModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    NgbModule,
    NgbCollapseModule,
    NgbDatepickerModule,
    NgMultiSelectDropDownModule,
    AppModalModule,
    RouterModule.forChild(atendimentoRoutes),
    SharedServiceModule,
    TabsModule.forRoot(),
    AppSelectModule,
    AppSelectModalModule,
    AppFileUploadModule,
    ExameFormularioModule,
  ],
  declarations: [
    AtendimentoComponent,
    AtendimentoSalaEsperaComponent,
    AtendimentoFormComponent,
    AtendimentoSalaEsperaFormComponent,
    RelatorioReceitaComponent,
  ],
  providers: [AtendimentoService],
})
export class AtendimentoLinkTemporarioModule { }
