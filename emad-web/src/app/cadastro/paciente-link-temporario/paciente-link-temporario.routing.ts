import { Routes } from '@angular/router';
import { PacienteFormComponent } from './paciente-form-link-temporario.component';
import { PacienteComponent } from './paciente-link-temporario.component';
import { ProntuarioPacienteFormComponent } from './prontuario-paciente-link-temporario/prontuario-paciente-form-link-temporario.component';

export const pacienteRoutes: Routes = [
  {
    path: '',
    component: PacienteComponent,
  },
  {
    path: 'cadastro',
    component: PacienteFormComponent,
  },
  {
    path: 'cadastro/:id',
    component: PacienteFormComponent,
  },
  {
    path: 'prontuario/:id',
    component: ProntuarioPacienteFormComponent,
  }
];
