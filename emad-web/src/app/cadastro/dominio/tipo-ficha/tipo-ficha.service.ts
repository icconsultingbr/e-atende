import { Injectable } from '@angular/core';
import { GenericsService } from '../../../_core/_services/generics.service';
import { Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TipoFichaService extends GenericsService {

  constructor(public http: HttpClient) {
    super(http);
  }

  public fields: any[] = [
    {
      field: "id",
      type: "hidden",
      label: "Id",
      grid: true,
      form: true,
      required: false,
      validator: ['', '']
    },
    {
      field: "nome",
      type: "text",
      label: "Nome",
      grid: true,
      form: true,
      required: true,
      validator: ['', '']
    },
    {
      field: "xmlTemplate",
      type: "textarea",
      label: "XML Template",
      grid: false,
      form: true,
      required: false,
      validator: ['', '']
    },
    {
      field: "queryTemplate",
      type: "textarea",
      label: "Query template",
      grid: false,
      form: true,
      required: false,
      validator: ['', '']
    },
    {
      field: "tipo",
      type: "select",
      label: "Tipo",
      grid: true,
      form: true,
      translate: { 1: "Atendimento", 2: "Avaliação", 3: "Exame" },
      required: true,
      validator: ['', Validators.required]
    },
    {
      field: "tipoAtendimentoSus",
      type: "text",
      label: "Código Atendimento e-SUS",
      grid: false,
      form: true,
      required: false,
      validator: ['', '']
    },
    {
      field: "situacao",
      type: "checkbox",
      label: "Situação",
      grid: true,
      form: true,
      translate: { 1: "Ativo", 0: "Inativo" },
      required: true,
      validator: ['', Validators.required]
    }
  ];
  saveFichaEstabelecimento(obj: any) {
    return this.http.post('tipo-ficha/estabelecimento/', JSON.stringify(obj));
  }
  deleteFichaEstabelecimento(id: any) {
    return this.http.delete('tipo-ficha/estabelecimento/' + id);
  }
}

