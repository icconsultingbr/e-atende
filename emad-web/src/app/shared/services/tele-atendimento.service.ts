import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class TeleAtendimentoService {

  constructor(private readonly http: HttpClient) {
  }

  gerarSessao(data :Required<{atendimentoId: number, medico: boolean}>): Observable<Required<{url: string}>>{
    return this.http.post<Required<{url: string}>>(`tele-atendimento/sessoes`, JSON.stringify(data));
  }

  downloadVideo(sessaoId: string): Observable<Blob> {
    const url = `tele-atendimento/sessao/${sessaoId}/download`;
    return this.http.get(url, { responseType: 'blob' });
  }
}