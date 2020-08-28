import { NgModule } from "@angular/core";
import { CoreModule } from "../../_core/core.module";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AppGridViewModule } from "../../_core/_components/app-grid-view/app-grid-view.module";
import { AppFormModule } from "../../_core/_components/app-form/app-form.module";
import { PacienteComponent } from "./paciente.component";
import { PacienteFormComponent } from "./paciente-form.component";
import { PacienteService } from "./paciente.service";
import { pacienteRoutes } from "./paciente.routing";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgbModule, NgbCollapseModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AppModalModule } from "../../_core/_components/app-modal/app-modal.module";
import 'rxjs/add/operator/map';
import { SharedServiceModule } from "../../shared/services/shared-service.module";
import { TabsModule } from 'ngx-bootstrap/tabs';

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
        RouterModule.forChild(pacienteRoutes),                
        SharedServiceModule,
        RouterModule,                
        NgMultiSelectDropDownModule.forRoot(),
        TabsModule.forRoot(),
    ],
    declarations: [
        PacienteComponent,
        PacienteFormComponent,
    ],
    providers: [
        PacienteService
    ]
})
export class PacienteModule {
}