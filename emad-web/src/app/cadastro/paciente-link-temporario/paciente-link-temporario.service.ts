import { Injectable } from '@angular/core'
import { Validators } from '@angular/forms'
import { GenericsService } from '../../_core/_services/generics.service'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { ca } from 'date-fns/locale'

type GetHeaders = {
  headers: {
    'Authorization': string
  }
}

@Injectable()
export class PacienteLinkTemporarioService extends GenericsService {
  constructor(public http: HttpClient) {
    super(http);
  }

  fields: any[] = [
    {
      field: 'id',
      type: 'hidden',
      label: 'Id',
      grid: false,
      form: true,
      required: false,
      validator: ['', ''],
    },
    {
      field: 'cartaoSus',
      type: 'text',
      label: 'Cartão SUS',
      grid: true,
      form: true,
      required: false,
      validator: ['', ''],
      autoFocus: true,
      filter: {
        type: 'text',
      },
    },
    {
      field: 'idSap',
      type: 'text',
      label: 'ID SAP',
      grid: true,
      form: true,
      required: false,
      autoFocus: true,
      filter: {
        type: 'text',
      },
    },
    {
      field: 'nome',
      type: 'text',
      label: 'Nome',
      grid: true,
      form: true,
      required: true,
      validator: ['', Validators.required],
      filter: {
        type: 'text',
      },
    },
    {
      field: 'dataNascimento',
      type: 'text',
      mask: '99/99/9999',
      placeholder: '99/99/9999',
      label: 'Data de nascimento',
      grid: true,
      //isDate: true,
      form: true,
      required: true,
      validator: ['', Validators.required],
    },
    {
      field: 'sexo',
      type: 'select',
      label: 'Sexo',
      grid: true,
      form: true,
      translate: {
        '1': 'Masculino',
        '2': 'Feminino',
        '3': 'Ambos',
        '4': 'Não informado',
      },
      required: true,
      validator: ['', Validators.required],
    },
    {
      field: 'cpf',
      type: 'text',
      label: 'CPF',
      grid: true,
      form: true,
      required: false,
      validator: ['', ''],
      filter: {
        type: 'text',
        placeHolder: '999.999.999-99',
        mask: '999.999.999-99',
      },
    },
    {
      field: 'logradouro',
      type: 'geocode',
      label: 'Endereço',
      grid: false,
      form: true,
      required: false,
      validator: ['', ''],
    },
    {
      field: 'latitude',
      type: 'text',
      label: 'Latitude',
      grid: false,
      form: true,
      required: false,
      readonly: true,
      validator: ['', ''],
    },
    {
      field: 'longitude',
      type: 'text',
      label: 'Longitude',
      grid: false,
      form: true,
      required: false,
      readonly: true,
      validator: ['', ''],
    },
    {
      field: 'numero',
      type: 'text',
      label: 'Número',
      grid: false,
      form: true,
      required: false,
      validator: ['', ''],
    },
    {
      field: 'complemento',
      type: 'text',
      label: 'Complemento',
      grid: false,
      form: true,
      required: false,
      validator: ['', ''],
    },
    {
      field: 'bairro',
      type: 'text',
      label: 'Bairro',
      grid: false,
      form: true,
      required: false,
      validator: ['', ''],
    },
    // {
    //   field: "idUf",
    //   type: "select",
    //   label: "Estado",
    //   grid: false,
    //   form: true,
    //   required: false,
    //   validator: ['', ''],
    //   filter: {
    //     type: "select",
    //     changeMethod: 'municipio/uf',
    //     changeTarget: 'idMunicipio'
    //   },
    // },
    {
      field: 'idMunicipio',
      type: 'select',
      label: 'Município',
      grid: false,
      form: true,
      required: false,
      validator: ['', ''],
    },
    {
      field: 'cep',
      type: 'text',
      label: 'CEP',
      grid: false,
      form: true,
      required: false,
      validator: ['', ''],
      mask: '99999-999',
      placeholder: '00000-000',
      /*
      onBlur: {
        url: "endereco/cep",
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
      field: 'foneResidencial',
      type: 'text',
      label: 'Telefone residencial',
      placeholder: '(99) 9999-9999',
      mask: '(99) 9999-9999',
      grid: false,
      form: true,
      required: false,
      validator: ['', ''],
    },
    {
      field: 'foneCelular',
      type: 'text',
      placeholder: '(99) 99999-9999',
      mask: '(99) 99999-9999',
      label: 'Telefone celular',
      grid: false,
      form: true,
      required: false,
      validator: ['', ''],
    },
    {
      field: 'foneContato',
      type: 'text',
      placeholder: '(99) 9999-9999',
      mask: '(99) 9999-9999',
      label: 'Telefone de contato',
      grid: false,
      form: true,
      required: false,
      validator: ['', ''],
    },
    {
      field: 'contato',
      type: 'text',
      label: 'Contato',
      grid: false,
      form: true,
      required: false,
      validator: ['', ''],
    },
    {
      field: 'email',
      type: 'text',
      label: 'E-mail',
      grid: false,
      form: true,
      required: false,
      validator: ['', ''],
    },
    {
      field: 'idModalidade',
      type: 'select',
      label: 'Modalidade',
      grid: false,
      form: true,
      required: false,
      validator: ['', ''],
    },
    {
      field: 'idTipoSanguineo',
      type: 'select',
      label: 'Tipo sanguíneo',
      grid: false,
      form: true,
      translate: {
        '1': 'A_POSITIVO',
        '2': 'A_NEGATIVO',
        '3': 'B_POSITIVO',
        '4': 'B_NEGATIVO',
        '5': 'AB_POSITIVO',
        '6': 'AB_NEGATIVO',
        '7': 'O_POSITIVO',
        '8': 'O_NEGATIVO',
      },
      required: false,
      validator: ['', ''],
    },
    {
      field: 'idRaca',
      type: 'select',
      label: 'Raça/Cor',
      grid: false,
      form: true,
      required: false,
      validator: ['', ''],
    },
    {
      field: 'numeroProntuario',
      type: 'text',
      label: 'Número prontuário',
      grid: false,
      form: true,
      required: false,
      validator: ['', ''],
    },
    {
      field: 'numeroProntuarioCnes',
      type: 'text',
      label: 'Número prontuário Cnes',
      grid: false,
      form: true,
      required: false,
      validator: ['', ''],
    },
    {
      field: 'idAtencaoContinuada',
      type: 'select',
      label: 'Grupo de atenção continuada',
      grid: false,
      form: false,
      required: false,
      validator: ['', ''],
    },
    {
      field: 'gruposAtencaoContinuada',
      type: 'multiSelect',
      label: 'Grupo de atenção continuada',
      grid: false,
      form: true,
      required: false,
      validator: ['', ''],
    },
    {
      field: 'falecido',
      type: 'checkbox',
      label: 'Falecido',
      grid: false,
      form: true,
      required: false,
      validator: ['', ''],
    },
    {
      field: 'necessidadeEspeciais',
      type: 'checkbox',
      label: 'Possui necessidades especiais',
      grid: false,
      form: true,
      required: false,
      validator: ['', ''],
    },
    {
      field: 'gestante',
      type: 'checkbox',
      label: 'Gestante',
      grid: false,
      form: true,
      required: false,
      validator: ['', ''],
    },
    {
      field: 'aleitamentoMaterno ',
      type: 'text',
      label: 'Cód aleita. materno',
      grid: false,
      form: true,
      required: false,
      validator: ['', ''],
    },
    {
      field: 'dumDaGestante',
      type: 'text',
      mask: '99/99/9999',
      placeholder: '99/99/9999',
      label: 'Dt. Ult. Menstruação',
      grid: false,
      //isDate: true,
      form: true,
      required: true,
      validator: ['', Validators.required],
    },
    {
      field: 'idadeGestacional ',
      type: 'number',
      label: 'Idade Gest. em semanas',
      grid: false,
      form: true,
      required: false,
      validator: ['', ''],
    },
    {
      field: 'stGravidezPlanejada',
      type: 'checkbox',
      label: 'Gravidez Planejada',
      grid: false,
      form: true,
      required: false,
      validator: ['', ''],
    },
    {
      field: 'nuGestasPrevias',
      type: 'number',
      label: 'Núm. de gestações',
      grid: false,
      form: true,
      required: false,
      validator: ['', ''],
    },
    {
      field: 'nuPartos',
      type: 'number',
      label: 'Núm. de Partos',
      grid: false,
      form: true,
      required: false,
      validator: ['', ''],
    },
    {
      field: 'situacao',
      type: 'checkbox',
      label: 'Situação',
      grid: true,
      form: true,
      translate: {
        '1': 'ATIVO',
        '0': 'INATIVO',
      },
      required: true,
      validator: ['', Validators.required],
    },
    {
      field: 'idEstabelecimentoCadastro',
      type: 'select',
      label: 'Id do estabelecimento',
      grid: false,
      form: true,
      required: false,
      validator: ['', ''],
    },
    {
      field: 'observacao',
      type: 'text',
      label: 'Observação',
      grid: true,
      form: false,
      required: false,
      validator: ['', ''],
    },
    {
      field: 'pacienteOutroEstabelecimento',
      type: 'text',
      label: 'Visualizar pacientes de outros estabelecimentos',
      grid: false,
      form: false,
      translate: { '1': 'Sim', '2': 'Não' },
      required: false,
      validator: ['', ''],
      filter: {
        type: 'select',
      },
    },
    {
      field: 'pacienteAtivoInativo',
      type: 'text',
      label: 'Visualizar pacientess Ativos/Inativos',
      grid: false,
      form: false,
      translate: { '1': 'Ambos', '2': 'Ativos', '3': 'Inativos' },
      required: false,
      validator: ['', ''],
      filter: {
        type: 'select',
      },
    },
  ]

  async findByToken(token: string): Promise<any> {
    localStorage.setItem('externalToken', token)
    try {
      return await new Promise((resolve) => {
        this.http.get('external/paciente/ficha-temporaria', this._getHeaders()).subscribe((paciente: any) => {
          localStorage.setItem('externalEstabelecimento', `${paciente.idEstabelecimentoCadastro}`)
          return resolve(paciente)
        })
      })
    } catch (e) {
      console.error(e)
      return null
    }
  }

  async findDocumentByPacienteId(id: number): Promise<any> {
    try {
      return await new Promise((resolve) => {
        this.http.get('external/paciente-documento/documento/' + id, this._getHeaders())
          .subscribe((data) => {
            return resolve(data)
          })
      })
    } catch (e) {
      console.error(e)
      return null
    }
  }

  async findPacienteById(id: number): Promise<any | null> {
    try {
      return await new Promise((resolve, reject) => {
        this.http.get('external/paciente/' + id, this._getHeaders())
          .subscribe((data: any) => {
            return resolve(data)
          })
      })
    } catch (e) {
      console.error(e)
      return null
    }
  }

  async listaDominiosExterno(method: string): Promise<any> {
    try {
      return await new Promise((resolve) => {
        this.http.get('external/dominios/' + method, this._getHeaders())
          .subscribe((data) => {
            return resolve(data)
          }
          )
      })
    } catch (e) {
      console.error(e)
      return null
    }
  }

  async listaTodosDominiosExterno(): Promise<any> {
    try {
      return await new Promise((resolve) => {
        this.http.get('external/dominios', this._getHeaders())
          .subscribe((data) => {
            return resolve(data)
          }
          )
      })
    } catch (e) {
      console.error(e)
      return null
    }
  }


  carregaNaturalidadePorNacionalidade(id: any): Observable<any> {
    return this.http.get('external/uf/pais/' + id, this._getHeaders());
  }

  findHipoteseByPaciente(id: any): Observable<any> {
    return this.http.get('external/atendimento-hipotese/paciente/' + id, this._getHeaders());
  }

  findHipoteseByPacienteAgrupado(id: any): Observable<any> {
    return this.http.get('external/atendimento-hipotese/paciente-agrupado/' + id, this._getHeaders());
  }

  findMedicamentoByAtendimento(id: number): Observable<any> {
    return this.http.get('external/atendimento-medicamento/atendimento/' + id, this._getHeaders());
  }

  findEncaminhamentoByAtendimento(id: any): Observable<any> {
    return this.http.get('external/atendimento-encaminhamento/atendimento/' + id, this._getHeaders());
  }

  findProcedimentoByAtendimento(id: any): Observable<any> {
    return this.http.get('external/atendimento-procedimento/atendimento/' + id, this._getHeaders());
  }

  saveHipotese(obj: any) {
    if (obj.id) {
      return this.http.put('atendimento-hipotese', JSON.stringify(obj));
    } else {
      return this.http.post('atendimento-hipotese', JSON.stringify(obj));
    }
  }

  findAtendimentoByPaciente(id: number, tipo: number): Observable<any> {
    return this.http.get(
      'external/atendimento/prontuario-paciente/paciente/' +
      id +
      '/tipo-atendimento/' +
      tipo,
      this._getHeaders());
  }

  findExameByPaciente(id: any): Observable<any> {
    return this.http.get('external/exame/prontuario-paciente/paciente/' + id, this._getHeaders());
  }

  findReceitaByPaciente(id: number): Observable<any> {
    return this.http.get('external/receita/prontuario-paciente/paciente/' + id, this._getHeaders());
  }

  findItemReceitaId(id: number): Observable<any> {
    return this.http.get('external/item-receita/' + id, this._getHeaders());
  }

  findAtendimentoById(id: number): Observable<any> {
    return this.http.get('external/atendimento/' + id, this._getHeaders());
  }

  findHipoteseByAtendimentoId(id: number): Observable<any> {
    return this.http.get('external/atendimento-hipotese/atendimento/' + id, this._getHeaders());
  }

  findProntuarioVacinacaoByPaciente(id: any): Observable<any> {
    return this.http.get('external/receita/prontuario-vacinacao/paciente/' + id);
  }

  findCarteiraVacinacaoByPaciente(id: any): Observable<any> {
    return this.http.get('external/receita/carteira-vacinacao/paciente/' + id);
  }

  findAtendimentoProcedimentoByPaciente(id: any): Observable<any> {
    return this.http.get('external/atendimento-procedimento/paciente/' + id, this._getHeaders());
  }

  removeHipotese(params: any) {
    return this.http.delete('atendimento-hipotese/' + params);
  }

  findSinaisVitaisByPaciente(id: any, tipo: any): Observable<any> {
    return this.http.get(
      'external/atendimento/prontuario-paciente/paciente/' +
      id +
      '/sinais-vitais/' +
      tipo, this._getHeaders()
    );
  }

  // carregaAtendimentosPorPeriodo(periodo: number): Observable<any> {
  //   return this.http.get(
  //     'atendimentos-por-periodo?periodo=' +
  //     periodo +
  //     '&idEstabelecimento=' +
  //     localStorage.getItem('externalEstabelecimento'), this._getHeaders()
  //   );
  // }

  // carregaAtendimentoSituacaoExistentePorPeriodo(
  //   periodo: number,
  // ): Observable<any> {
  //   return this.http.get(
  //     'atendimento-situacao-existente-por-periodo?periodo=' +
  //     periodo +
  //     '&idEstabelecimento=' +
  //     localStorage.getItem('externalEstabelecimento'), this._getHeaders()
  //   );
  // }

  // carregaAtendimentoSituacaoPorPeriodo(periodo: number): Observable<any> {
  //   return this.http.get(
  //     'atendimento-situacao-por-periodo?periodo=' +
  //     periodo +
  //     '&idEstabelecimento=' +
  //     localStorage.getItem('externalEstabelecimento'), this._getHeaders()
  //   );
  // }

  obterProntuarioPacienteRelatorio(
    idPaciente: number,
    tipoFicha: number,
    profissional: number,
  ): Observable<any> {
    return this.http.get(
      `external/paciente/prontuario/report?idPaciente=${idPaciente}&tipoFicha=${tipoFicha}&profissional=${profissional}`, this._getHeaders()
    );
  }

  // obterCamposEstabelecimento(idEstabelecimento: number): Observable<any> {
  //   return this.http.get(
  //     'paciente/campos-estabelecimento/' + idEstabelecimento,
  //   );
  // }

  // salvarArquivo(obj: any) {
  //   return this.http.post('paciente-documento/', JSON.stringify(obj));
  // }

  // removeArquivo(obj: any) {
  //   return this.http.put(
  //     'paciente-documento/atualiza/' + obj.id,
  //     JSON.stringify(obj),
  //   );
  // }

  private _getHeaders(): GetHeaders {
    return {
      headers: {
        'Authorization': localStorage.getItem('externalToken')
      }
    }
  }
}
