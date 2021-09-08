import { Input } from "@angular/core";

export class PacienteHipotese {
    id: Number = null;
    @Input() idAtendimento: Number = null;
    @Input() idPaciente: Number = null;
    @Input() idHipoteseDiagnostica: Number = null;
    @Input() funcionalidade: string = 'ATENDIMENTO';
    @Input() idEstabelecimento: number = +JSON.parse(localStorage.getItem("est"))[0].id;
}