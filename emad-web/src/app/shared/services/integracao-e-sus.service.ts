import { Injectable } from '@angular/core';
import { GenericsService } from '../../_core/_services/generics.service';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IntegracaoEsusModel } from '../../_core/_models/IntegracaoEsus';
import *  as dayjs from 'dayjs';
@Injectable()
export class IntegracaoEsus extends GenericsService {

  constructor(public http: HttpClient) {
    super(http);
  }
  obterXmlsPorTipoFicha(filtroXmls: IntegracaoEsusModel): Observable<ArrayBuffer> {
    const dataInicial = dayjs(filtroXmls.periodoExtracao[0]).hour(0).minute(0).second(0).millisecond(0);
    const dataFinal = dayjs(filtroXmls.periodoExtracao[1]).hour(23).minute(59).second(59).millisecond(999);

    const convertedData: IntegracaoEsusModel = {
      ...filtroXmls,
      periodoExtracao: [
        dataInicial.toDate(),
        dataFinal.toDate()
      ]
    }
    return this.http.post('integracao-e-sus', convertedData, { responseType: 'arraybuffer' });
  }
}

