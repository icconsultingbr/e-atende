import { NgModule } from '@angular/core';
import { CoreModule } from '../../../_core/core.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppGridViewModule } from '../../../_core/_components/app-grid-view/app-grid-view.module';
import { AppFormModule } from '../../../_core/_components/app-form/app-form.module';
import { PacienteMedicamentoComponent } from './paciente-medicamento.component';
import { pacienteMedicamentoRoutes } from './paciente-medicamento.routing';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap/collapse/collapse.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PesquisaPacienteModule } from '../../../components/pesquisa-pacientes/pesquisa-paciente.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PesquisaMedicamentoModule } from '../../../components/pesquisa-medicamentos/pesquisa-medicamento.module';
import { PacienteMedicamentoService } from './paciente-medicamento.service';
import { RelatorioMedicamentoModule } from '../../../shared/services/relatorio-medicamento.module';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        AppGridViewModule,
        AppFormModule,
        RouterModule.forChild(pacienteMedicamentoRoutes),
        ReactiveFormsModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NgbCollapseModule,
        NgbDatepickerModule,
        PesquisaPacienteModule,
        BsDatepickerModule,
        PesquisaMedicamentoModule,
        RelatorioMedicamentoModule
    ],
    declarations: [
        PacienteMedicamentoComponent,
    ],
    providers: [
        PacienteMedicamentoService
    ]
})
export class PacienteMedicamentoModule {
}
