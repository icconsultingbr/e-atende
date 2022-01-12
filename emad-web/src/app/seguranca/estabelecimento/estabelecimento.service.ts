import { Injectable } from '@angular/core';
import { GenericsService } from '../../_core/_services/generics.service';
import { MaxLengthValidator, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EstabelecimentoService extends GenericsService {

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
    },
        {
      field: "cnes",
      type: "text",
      label: "CNES",
      grid: true,
      form: true,
      required: true,
      validator: ['', Validators.required],
      autoFocus : true
    },
    {
      field: "cnpj",
      type: "text",
      label: "CNPJ",
      mask: "99.999.999/9999-99",
      placeholder: "99.999.999/9999-99",
      grid: true,
      form: true,
      required: true,
      validator: ['', Validators.required]
    },
    {
      field: "razaoSocial",
      type: "text",
      label: "Razão Social",
      grid: true,
      form: true,
      required: true,
      validator: ['', Validators.required]
    },
    {
      field: "nomeFantasia",
      type: "text",
      label: "Nome Fantasia",
      grid: true,
      form: true,
      required: true,
      validator: ['', Validators.required]
    },
    {
      field: "logradouro",
      type: "geocode",
      label: "Endereço",
      grid: false,
      form: true,
      required: true,
      validator: ['', Validators.required]
    },
    {
      field: "numero",
      type: "text",
      label: "Número",
      grid: false,
      form: true,
      required: true,
      validator: ['', Validators.required]
    },
    {
      field: "latitude",
      type: "text",
      label: "Latitude",
      grid: false,
      form: true,
      required: false,
      readonly: true,
      validator: ['', '']
    },
    {
      field: "longitude",
      type: "text",
      label: "Longitude",
      grid: false,
      form: true,
      required: false,
      readonly: true,
      validator: ['', '']
    },
    {
      field: "complemento",
      type: "text",
      label: "Complemento",
      grid: false,
      form: true,
      required: false,
      validator: ['','']
    },
    {
      field: "bairro",
      type: "text",
      label: "Bairro",
      grid: false,
      form: true,
      required: true,
      validator: ['', Validators.required]
    },
    {
      field: "idUf",
      type: "select",
      label: "Estado",
      grid: false,
      form: true,
      required: true,
      validator: ['', Validators.required],
      filter: {
        type: "select",
        changeMethod: 'municipio/uf',
        changeTarget: 'idMunicipio' 
      },
    },
    {
      field: "idMunicipio",
      type: "select",
      label: "Município",
      grid: false,
      form: true,
      required: true,
      validator: ['', Validators.required]
    },
    {
      field: "cep",
      type: "text",
      label: "CEP",
      grid: false,
      form: true,
      required: true,
      validator: ['', Validators.required],
      mask: "99999-999",
      placeholder: "00000-000",
      /*
      onBlur : {
        url : "endereco/cep",
        targets: [
          { field: 'logradouro' },
          { field: 'bairro' },
          { field: 'idUf' },
          { field: 'idMunicipio' }
        ],
      },
      */
    },
    {
      field: "telefone1",
      type: "text",
      label: "Fone 1",
      grid: false,
      form: true,
      required: false,
      validator: ['', '']
    },
    {
      field: "telefone2",
      type: "text",
      label: "Fone 2",
      grid: false,
      form: true,
      required: false,
      validator: ['', '']
    }, 
    {
      field: "email",
      type: "text",
      label: "E-mail",
      grid: false,
      form: true,
      required: false,
      validator: ['', '']
    }, 
    {
      field: "cnpjMantedora",
      type: "text",
      mask : "99.999.999/9999-99",
      placeholder : "99.999.999/9999-99",
      label: "CNPJ mantedora",
      grid: false,
      form: true,
      required: false,
      validator: ['', '']
    }, 
    {
      field: "grauDependencia",
      type: "select",
      label: "Grau de dependência",
      grid: false,
      form: true,
      required: true,
      validator: ['', Validators.required]
    }, 
    {
      field: "terceiros",
      type: "checkbox",
      label: "Terceiros",
      grid: false,
      form: true,
      required: true,
      validator: ['', Validators.required]
    }, 
    {
      field: "idTipoUnidade",
      type: "select",
      label: "Tipo de unidade",
      grid: false,
      form: true,
      required: true,
      validator: ['', Validators.required]
    }, 
    {
      field: "esferaAdministradora",
      type: "select",
      label: "Esfera administradora",
      grid: false,
      form: true,
      required: true,
      validator: ['', Validators.required]
    },      
    {
      field: "idUnidadeCorrespondenteDim",
      type: "text",
      label: "Und. E-care correspondente",
      grid: false,
      form: true,
      required: true,
      validator: ['', Validators.required]
    },        
    {
      field: "idUnidadePesquisaMedicamentoDim",
      type: "text",
      label: "Und. E-care pesquisa de medicamentos",
      grid: false,
      form: true,
      required: true,
      validator: ['', Validators.required]
    },     
    {
      field: "idUnidadeRegistroReceitaDim",
      type: "text",
      label: "Und. E-care registro de receita",
      grid: false,
      form: true,
      required: true,
      validator: ['', Validators.required]
    },     
    {
      field: "nivelSuperior",
      type: "checkbox",
      label: "Nível superior",
      grid: true,
      form: true,
      required: false,
      translate: {1: "Sim", 0: "Não"},
      validator: ['', '']
    },
    {
      field: "idEstabelecimentoNivelSuperior",
      type: "select",
      label: "Estabelecimento superior",
      grid: false,
      form: true,
      required: false,
      validator: ['', '']
    },
    {
      field: "cnsProfissionaleSus",
      type: "text",
      label: "CNS Profissional eSus",
      grid: false,
      form: true,
      required: true,
      validator:  ['',  [Validators.required]],
      autoFocus : true
    },
    {
      field: "situacao",
      type: "checkbox",
      label: "Situação",
      grid: false,
      form: true,
      required: true,
      validator: ['', Validators.required]
    }, 
    {
      field: "dataCriacao",
      type: "text",
      label: "Data de criação",
      grid: true,
      form: false,
      required: false,
      validator: ['', ''],
      isDateTime: true
    }
  ];
}