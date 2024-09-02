import { Routes } from '@angular/router';
import { ProntuarioPacienteFormLinkTemporarioComponent } from './prontuario-paciente-link-temporario/prontuario-paciente-form-link-temporario.component';

export const pacienteRoutes: Routes = [
  {
    path: 'prontuario/:id',
    component: ProntuarioPacienteFormLinkTemporarioComponent,
  }
];
