import { Injectable } from '@angular/core';
import { GenericsService } from '../../../_core/_services/generics.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MedicamentoProfissionalService extends GenericsService {

  constructor(public http: HttpClient) {
    super(http);
  }

  fields: any[] = [
    {
      field: "id",
      type: "hidden",
      label: "Id",
      grid: false,
      form: true,
      required: false,
      validator: ['', '']
    }
  ];

  carregaMedicamentoPorProfissional(idProfissional: string, params: any): Observable<any> {    
    return this.http.get("material/profissional/" + idProfissional + "/filtros"  + params);
  }
}
