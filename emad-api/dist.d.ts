declare module "config/config" {
    const _exports: any;
    export = _exports;
}
declare module "ConnectionPool" {
    export const pool: any;
    export function connection(): Promise<any>;
    export function query(sql: any, binding: any): Promise<any>;
}
declare module "ab" { }
declare module "config/custom-express" {
    function _exports(): import("express-serve-static-core").Express;
    export = _exports;
}
declare module "index" {
    export {};
}
declare module "cluster" {
    export {};
}
declare module "dao/ParametroSegurancaDAO" {
    function _exports(): typeof ParametroSegurancaDAO;
    export = _exports;
    function ParametroSegurancaDAO(connection: any): void;
    class ParametroSegurancaDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(obj: any, callback: any): void;
        atualiza(obj: any, id: any, callback: any): void;
        lista(callback: any): void;
        listaStorage(callback: any): void;
        buscaPorId(id: any, callback: any): void;
        buscarValorPorChave(nomeChave: any, callback: any): void;
        buscarValorPorChaveSync(nomeChave: any): Promise<any>;
        buscaDominio(callback: any): void;
        dominio(callback: any): void;
        deletaPorId(id: any, callback: any): void;
        obterConexaoDim(callback: any): void;
    }
}
declare module "cache/DimCache" {
    function _exports(): typeof DimCache;
    export = _exports;
    function DimCache(connection: any): void;
    class DimCache {
        constructor(connection: any);
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        connection: any;
        configurar(connection: any): Promise<any>;
        configurado(): string;
        obterCache(): void;
        obterDb(): Promise<any>;
        salvarCache(result: any): void;
    }
}
declare module "controllers/private/Agenda" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/Agendamento" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/AtencaoContinuada" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/Atendimento" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/AtendimentoCondicaoAvaliada" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/AtendimentoDocumento" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/AtendimentoEncaminhamento" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/AtendimentoHipotese" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/AtendimentoMedicamento" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/AtendimentoParticipanteAtividadeColetiva" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/AtendimentoProcedimento" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/AtendimentoProfissionalAtividadeColetiva" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/AtendimentoTipoFornecimentoOdonto" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/AtendimentoTipoVigilanciaSaudeOdonto" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/AtendimentoVacina" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/AtribuicaoCaneta" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/AusenciaProfissional" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/Caneta" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/Charts" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/ClassificacaoRisco" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/ComorbidadeEstabelecimento" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/CondicaoAvaliada" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/CondutaEncaminhamento" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/CorClassificacaoRisco" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/Documento" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/Dominios" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/Equipe" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/EscalaProfissional" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/Especialidade" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/EspecialidadeEntidadeCampo" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/EspecialidadeMaterial" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/Estabelecimento" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/EstabelecimentoGrupoMaterial" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/Estoque" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/Exame" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/FabricanteMaterial" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/FamiliaMaterial" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/Genero" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/Grupo" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/GrupoMaterial" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/GrupoOrigem" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/GrupoOrigemReceita" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/HipoteseDiagnostica" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/IntegracaoESus" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/ItemPedidoCompra" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/ItemReceita" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/ListaControleEspecial" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/Livro" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/Log" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/Material" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/Medicamento" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/Menu" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/MetodoExame" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/Modalidade" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/ModeloCaneta" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/MotivoFimReceita" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/Municipio" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/Notificacao" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/OrientacaoSexual" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/Paciente" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/PacienteDocumento" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/ParametroSeguranca" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/PedidoCompra" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/Procedimento" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/ProdutoExame" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/Profissional" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/Receita" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/SolicitacaoRemanejamento" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/SubGrupoMaterial" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/SubGrupoOrigemReceita" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/SubgrupoOrigem" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/TipoAtendimento" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/TipoEscolaridade" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/TipoExame" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/TipoFicha" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/TipoMaterial" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/TipoMovimento" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/TipoNotificacao" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/TipoUnidade" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/TipoUsuario" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/TipoUsuarioMenu" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/Uf" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/UnidadeMaterial" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/private/Usuario" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/public/Endereco" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "controllers/public/Usuario" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "cron/Cron" {
    function _exports(): typeof Cron;
    export = _exports;
    function Cron(): void;
    class Cron {
        geraFatura(callback: any): void;
    }
}
declare module "dao/AgendaDAO" {
    function _exports(): typeof AgendaDAO;
    export = _exports;
    function AgendaDAO(connection: any): void;
    class AgendaDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(obj: any, callback: any): void;
        atualiza(obj: any, id: any, callback: any): void;
        lista(addFilter: any, callback: any): void;
        buscaPorId(id: any, callback: any): void;
        deletaPorId(id: any, callback: any): void;
    }
}
declare module "dao/AgendamentoDAO" {
    function _exports(): typeof AgendamentoDAO;
    export = _exports;
    function AgendamentoDAO(connection: any): void;
    class AgendamentoDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(obj: any, callback: any): void;
        buscaPorId(id: any, callback: any): void;
        buscaPorEquipe(id: any, callback: any): void;
        buscaPorProfissional(id: any, callback: any): void;
        buscaPorPaciente(id: any, callback: any): void;
        lista(addFilter: any, callback: any): void;
        atualiza(obj: any, id: any, callback: any): void;
        deletaPorId(id: any, callback: any): void;
        formaAtendimento(callback: any): void;
        tipoAtendimento(callback: any): void;
    }
}
declare module "dao/ArquivosDAO" {
    function _exports(): typeof ArquivosDAO;
    export = _exports;
    function ArquivosDAO(connection: any): void;
    class ArquivosDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        buscaPorId(id: any): Promise<any>;
        salva(obj: any, callback: any): Promise<any>;
        atualiza(obj: any): Promise<any>;
    }
}
declare module "dao/AtencaoContinuadaPacienteDAO" {
    function _exports(): typeof AtencaoContinuadaPacienteDAO;
    export = _exports;
    function AtencaoContinuadaPacienteDAO(connection: any): void;
    class AtencaoContinuadaPacienteDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        deletaGrupoPorPacienteSync(id: any): Promise<any>;
        atualizaGrupoPorPacienteSync(grupos: any): Promise<any>;
        buscaPorPacienteSync(id: any): Promise<any>;
    }
}
declare module "dao/AtendimentoCondicaoAvaliadaDAO" {
    function _exports(): typeof AtendimentoCondicaoAvaliadaDAO;
    export = _exports;
    function AtendimentoCondicaoAvaliadaDAO(connection: any): void;
    class AtendimentoCondicaoAvaliadaDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        deletaPorId(id: any, callback: any): any;
        salva(obj: any): Promise<any>;
        buscarPorAtendimentoId(idAtendimento: any): Promise<any>;
    }
}
declare module "infrastructure/QueryBuilder" {
    export = QueryBuilder;
    class QueryBuilder {
        static sort(query: any, sortColumn: any, sortOrder: any): any;
        static datatable(query: any, sortColumn: any, sortOrder: any, limit: any, offset: any): string | undefined;
    }
}
declare module "dao/AtendimentoDAO" {
    function _exports(): typeof AtendimentoDAO;
    export = _exports;
    function AtendimentoDAO(connection: any): void;
    class AtendimentoDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        listarAsync(addFilter: any): Promise<{
            total: any;
            items: any;
        }>;
        lista(addFilter: any, callback: any): void;
        listaPorUsuario(id: any, addFilter: any, callback: any): void;
        buscaPorId(id: any, callback: any): void;
        buscaPorHistoricoId(idHistorico: any): Promise<any>;
        buscaPorPacienteId(idPaciente: any, usuario: any, idEstabelecimento: any, callback: any): void;
        buscaPorPacienteIdProntuario(idPaciente: any, tipo: any, tipoFicha: any, profissional: any): Promise<any>;
        buscaSinaisVitaisPorPacienteId(idPaciente: any, tipo: any, tipoFicha: any, profissional: any): Promise<any>;
        salva(objeto: any, callback: any): void;
        salvaSync(objeto: any): Promise<any[]>;
        salvaHistoricoSync(objeto: any): Promise<any[]>;
        deletaPorId(id: any, callback: any): void;
        buscaCabecalhoReceitaDim(id: any, callback: any): void;
        buscaDadosFichaAtendimento(command: any, id: any, callback: any): void;
        buscaDadosFichaAtendimentoSync(command: any, id: any): Promise<any>;
        buscaProfissionalAberturaAtendimento(idUsuario: any, idAtendimento: any, callback: any): void;
        carregaQtdAtendimentosPorPeriodo(periodo: any, idEstabelecimento: any, callback: any): void;
        carregaAtendimentosPorPeriodo(periodo: any, idEstabelecimento: any, callback: any): void;
        carregaTipoAtendimentoExistentesPorPeriodo(periodo: any, idEstabelecimento: any, callback: any): void;
        carregaTipoAtendimentoPorPeriodo(periodo: any, idEstabelecimento: any, callback: any): void;
        carregaAtendimentoSituacaoExistentesPorPeriodo(periodo: any, idEstabelecimento: any, callback: any): void;
        carregaAtendimentoSituacaoPorPeriodo(periodo: any, idEstabelecimento: any, callback: any): void;
        buscaProfissionalPorUsuarioSync(idUsuario: any): Promise<any>;
        buscaPorIdSync(id: any): Promise<any>;
        buscaHistoricoPorAtendimento(id: any): Promise<any>;
        atualizaPorIdSync(objeto: any, id: any): Promise<any>;
    }
}
declare module "dao/AtendimentoDocumentoDAO" {
    function _exports(): typeof AtendimentoDocumentoDAO;
    export = _exports;
    function AtendimentoDocumentoDAO(connection: any): void;
    class AtendimentoDocumentoDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        buscaPorIdAtendimento(idAtendimento: any): Promise<any>;
        salva(obj: any, callback: any): Promise<any>;
        atualiza(obj: any): Promise<any>;
    }
}
declare module "dao/AtendimentoEncaminhamentoDAO" {
    function _exports(): typeof AtendimentoEncaminhamentoDAO;
    export = _exports;
    function AtendimentoEncaminhamentoDAO(connection: any): void;
    class AtendimentoEncaminhamentoDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        buscaPorAtendimentoId(idAtendimento: any, callback: any): void;
        buscaEncaminhamentoPorPacienteId(idUsuario: any, tipoFicha: any, profissional: any, callback: any): any;
    }
}
declare module "dao/AtendimentoHipoteseDiagnosticaDAO" {
    function _exports(): typeof AtendimentoHipoteseDiagnosticaDAO;
    export = _exports;
    function AtendimentoHipoteseDiagnosticaDAO(connection: any): void;
    class AtendimentoHipoteseDiagnosticaDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        buscarPorAtendimentoId(idAtendimento: any): Promise<any>;
        listarPorPaciente(id: any, tipoFicha: any, profissional: any): Promise<any>;
        listarPorPacienteAgrupada(id: any): Promise<any>;
        deletaPorId(obj: any): Promise<any>;
        salva(objeto: any): Promise<any[]>;
        validaHipotesePorPaciente(obj: any): Promise<any>;
    }
}
declare module "dao/AtendimentoMedicamentoDAO" {
    function _exports(): typeof AtendimentoMedicamentoDAO;
    export = _exports;
    function AtendimentoMedicamentoDAO(connection: any): void;
    class AtendimentoMedicamentoDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        buscaPorAtendimentoId(idAtendimento: any, callback: any): void;
        buscaMedicamentoParaReceitaDim(idAtendimento: any, callback: any): void;
        buscaMedicamentoReceitaSync(idAtendimento: any): Promise<any>;
        confirmaMedicamentoParaReceitaDim(id: any, idReceita: any, numeroReceita: any, callback: any): void;
        carregaQtdMedicamentosPorPeriodo(periodo: any, idEstabelecimento: any, callback: any): void;
        carregaMedicamentosPorPeriodo(periodo: any, idEstabelecimento: any, callback: any): void;
    }
}
declare module "dao/AtendimentoParticipanteAtividadeColetivaDAO" {
    function _exports(): typeof AtendimentoParticipanteAtividadeColetivaDAO;
    export = _exports;
    function AtendimentoParticipanteAtividadeColetivaDAO(connection: any): void;
    class AtendimentoParticipanteAtividadeColetivaDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        buscaPorAtendimentoId(idAtendimento: any, callback: any): void;
        deletaPorId(id: any, callback: any): void;
        salvaSync(objeto: any): Promise<any[]>;
        atualizaPorId(objeto: any, id: any, callback: any): Promise<void>;
    }
}
declare module "dao/AtendimentoProcedimentoDAO" {
    function _exports(): typeof AtendimentoProcedimentoDAO;
    export = _exports;
    function AtendimentoProcedimentoDAO(connection: any): void;
    class AtendimentoProcedimentoDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        buscarPorAtendimentoId(idAtendimento: any): Promise<any>;
        listarPorPaciente(id: any, tipoFicha: any, profissional: any): Promise<any>;
        listarPorPacienteAgrupada(id: any): Promise<any>;
        deletaPorId(obj: any): Promise<any>;
        salva(objeto: any): Promise<any[]>;
        validaHipotesePorPaciente(obj: any): Promise<any>;
    }
}
declare module "dao/AtendimentoProfissionalAtividadeColetivaDAO" {
    function _exports(): typeof AtendimentoProfissionalAtividadeColetivaDAO;
    export = _exports;
    function AtendimentoProfissionalAtividadeColetivaDAO(connection: any): void;
    class AtendimentoProfissionalAtividadeColetivaDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        buscaPorAtendimentoId(idAtendimento: any, callback: any): void;
        deletaPorId(id: any, callback: any): void;
        salvaSync(objeto: any): Promise<any[]>;
        atualizaPorId(objeto: any, id: any): Promise<any>;
    }
}
declare module "dao/AtendimentoTipoFornecimentoOdontoDAO" {
    function _exports(): typeof AtendimentoTipoFornecimentoOdontoDAO;
    export = _exports;
    function AtendimentoTipoFornecimentoOdontoDAO(connection: any): void;
    class AtendimentoTipoFornecimentoOdontoDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        buscaPorAtendimentoId(idAtendimento: any, callback: any): void;
        deletaPorId(id: any, callback: any): void;
        salvaSync(objeto: any): Promise<any[]>;
        atualizaPorId(objeto: any, id: any, callback: any): Promise<void>;
    }
}
declare module "dao/AtendimentoTipoVigilanciaOdontoDAO" {
    function _exports(): typeof AtendimentoTipoFornecimentoOdontoDAO;
    export = _exports;
    function AtendimentoTipoFornecimentoOdontoDAO(connection: any): void;
    class AtendimentoTipoFornecimentoOdontoDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        buscaPorAtendimentoId(idAtendimento: any, callback: any): void;
        buscarPorAtendimentoIdAtivo(idAtendimento: any): Promise<any>;
        deletaPorId(id: any, callback: any): void;
        salvaSync(objeto: any): Promise<any[]>;
        atualizaPorId(objeto: any, id: any, callback: any): Promise<void>;
    }
}
declare module "dao/AtendimentoVacinaDAO" {
    function _exports(): typeof AtendimentoVacinaDAO;
    export = _exports;
    function AtendimentoVacinaDAO(connection: any): void;
    class AtendimentoVacinaDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(objeto: any): Promise<any[]>;
        buscarPorAtendimentoId(idAtendimento: any): Promise<any>;
        deletaPorId(obj: any): Promise<any>;
    }
}
declare module "dao/AtribuicaoCanetaDAO" {
    function _exports(): typeof AtribuicaoCanetaDAO;
    export = _exports;
    function AtribuicaoCanetaDAO(connection: any): void;
    class AtribuicaoCanetaDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(obj: any, callback: any): void;
        atualiza(obj: any, id: any, callback: any): void;
        lista(addFilter: any, callback: any): void;
        buscaPorId(id: any, callback: any): void;
        deletaPorId(id: any, callback: any): void;
        buscaPorProfissionalId(idProfissional: any, dataInicial: any, horaInicial: any, dataFinal: any, horaFinal: any, callback: any): void;
    }
}
declare module "dao/AusenciaProfissionalDAO" {
    function _exports(): typeof AusenciaProfissionalDAO;
    export = _exports;
    function AusenciaProfissionalDAO(connection: any): void;
    class AusenciaProfissionalDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(obj: any, callback: any): void;
        atualiza(obj: any, id: any, callback: any): void;
        buscaPorId(id: any, callback: any): void;
        deletaPorId(id: any, callback: any): void;
        buscaPorProfissionalId(idProfissional: any, callback: any): void;
    }
}
declare module "dao/CanetaDAO" {
    function _exports(): typeof CanetaDAO;
    export = _exports;
    function CanetaDAO(connection: any): void;
    class CanetaDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(obj: any, callback: any): void;
        atualiza(obj: any, id: any, callback: any): void;
        lista(addFilter: any, callback: any): void;
        buscaPorId(id: any, callback: any): void;
        listaPorEstabelecimentoDisponivel(idEstabelecimento: any, dataInicial: any, horaInicial: any, dataFinal: any, horaFinal: any, callback: any): void;
        buscaDominio(callback: any): void;
        deletaPorId(id: any, callback: any): void;
        dominio(callback: any): void;
    }
}
declare module "dao/ClassificacaoRiscoDAO" {
    function _exports(): typeof ClassificacaoRiscoDAO;
    export = _exports;
    function ClassificacaoRiscoDAO(connection: any): void;
    class ClassificacaoRiscoDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(obj: any, callback: any): void;
        atualiza(obj: any, id: any, callback: any): void;
        buscaPorId(id: any, callback: any): void;
        buscaDominio(callback: any): void;
        deletaPorId(id: any, callback: any): void;
        lista(callback: any): void;
    }
}
declare module "dao/ComorbidadeEstabelecimentoDAO" {
    function _exports(): typeof ComorbidadeEstabelecimentoDAO;
    export = _exports;
    function ComorbidadeEstabelecimentoDAO(connection: any): void;
    class ComorbidadeEstabelecimentoDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        lista(addFilter: any, callback: any): Promise<any>;
    }
}
declare module "dao/CondicaoAvaliadaDAO" {
    function _exports(): typeof CondicaoAvaliadaDAO;
    export = _exports;
    function CondicaoAvaliadaDAO(connection: any): void;
    class CondicaoAvaliadaDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        lista(queryFilter: any): Promise<{
            total: any;
            items: any;
        }>;
        buscaPorId(id: any): Promise<any>;
        deletaPorId(id: any): Promise<any>;
    }
}
declare module "dao/CondutaEncaminhamentoDAO" {
    function _exports(): typeof CondutaEncaminhamentoDAO;
    export = _exports;
    function CondutaEncaminhamentoDAO(connection: any): void;
    class CondutaEncaminhamentoDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(obj: any, callback: any): void;
        atualiza(obj: any, id: any, callback: any): void;
        buscaDominio(callback: any): void;
        deletaPorId(id: any, callback: any): void;
        lista(id: any, callback: any): void;
    }
}
declare module "dao/ConnectionFactory" {
    function _exports(): typeof createDBConnection;
    export = _exports;
    function createDBConnection(): any;
}
declare module "dao/ConnectionFactoryDim" {
    function _exports(): typeof createDBConnection;
    export = _exports;
    function createDBConnection(): any;
}
declare module "dao/DoseVacinaDAO" {
    function _exports(): typeof DoseVacinaDAO;
    export = _exports;
    function DoseVacinaDAO(connection: any): void;
    class DoseVacinaDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(obj: any, callback: any): void;
        atualiza(obj: any, id: any, callback: any): void;
        lista(callback: any): void;
        buscaPorId(id: any, callback: any): void;
        buscaDominio(callback: any): void;
        dominio(callback: any): void;
        dominioPorIdAvo(codigoVacinaSus: any, codigoEstrategiaVacinacaoSus: any, callback: any): void;
        deletaPorId(id: any, callback: any): void;
    }
}
declare module "dao/EquipeDAO" {
    function _exports(): typeof EquipeDAO;
    export = _exports;
    function EquipeDAO(connection: any): void;
    class EquipeDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(obj: any, callback: any): void;
        atualiza(obj: any, id: any, callback: any): void;
        lista(callback: any): void;
        listaPorEstabelecimento(idEstabelecimento: any, callback: any): void;
        buscaPorEquipe(idEstabelecimento: any, callback: any): void;
        buscaPorId(id: any, callback: any): void;
        buscaDominio(callback: any): void;
        deletaPorId(id: any, callback: any): void;
        dominio(callback: any): void;
        buscaEquipeDisponivelParaAgendamentoPorEspecialidade(params: any, res: any): Promise<any>;
    }
}
declare module "dao/EquipeEmapDAO" {
    function _exports(): typeof EquipeEmapDAO;
    export = _exports;
    function EquipeEmapDAO(connection: any): void;
    class EquipeEmapDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        lista(callback: any): void;
        dominio(callback: any): void;
        buscaPorId(id: any, callback: any): void;
        salva(objeto: any, callback: any): void;
        atualiza(objeto: any, id: any, callback: any): void;
        deletaPorId(id: any, callback: any): void;
    }
}
declare module "dao/EscalaProfissionalDAO" {
    function _exports(): typeof EscalaProfissionalDAO;
    export = _exports;
    function EscalaProfissionalDAO(connection: any): void;
    class EscalaProfissionalDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(obj: any, callback: any): void;
        atualiza(obj: any, id: any, callback: any): void;
        buscaPorId(id: any, callback: any): void;
        deletaPorId(id: any, callback: any): void;
        buscaPorProfissionalId(idProfissional: any, anomes: any, callback: any): void;
    }
}
declare module "dao/EspecialidadeDAO" {
    function _exports(): typeof EspecialidadeDAO;
    export = _exports;
    function EspecialidadeDAO(connection: any): void;
    class EspecialidadeDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        lista(callback: any): void;
        dominio(callback: any): void;
        buscaPorId(id: any, callback: any): void;
        salva(objeto: any, callback: any): void;
        atualiza(): void;
        deletaPorId(): void;
        carregaPermissoesPorEspecialidadeUsuarioSync(idUsuario: any): Promise<any>;
    }
}
declare module "dao/EspecialidadeEntidadeCampoDAO" {
    function _exports(): typeof EspecialidadeEntidadeCampoDAO;
    export = _exports;
    function EspecialidadeEntidadeCampoDAO(connection: any): void;
    class EspecialidadeEntidadeCampoDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(objeto: any): Promise<any[]>;
        atualiza(objeto: any, id: any): Promise<any>;
        deletaPorId(id: any): Promise<any>;
        listaPorEspecialidade(idEspecialidade: any): Promise<any>;
        buscaEntidadeCampoPorEspecialidade(idEntidadeCampo: any, idEspecialidade: any): Promise<any>;
    }
}
declare module "dao/EspecialidadeMaterialDAO" {
    function _exports(): typeof EspecialidadeMaterialDAO;
    export = _exports;
    function EspecialidadeMaterialDAO(connection: any): void;
    class EspecialidadeMaterialDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(obj: any, callback: any): void;
        atualiza(obj: any, id: any, callback: any): void;
        buscaPorId(id: any, callback: any): void;
        buscaDominio(callback: any): void;
        deletaPorId(id: any, callback: any): void;
        lista(callback: any): void;
        listaPorEspecialidade(idEspecialidade: any, callback: any): void;
        buscaMaterialPorEspecialidade(idMaterial: any, idEspecialidade: any, callback: any): void;
    }
}
declare module "dao/EstabelecimentoDAO" {
    function _exports(): typeof EstabelecimentoDAO;
    export = _exports;
    function EstabelecimentoDAO(connection: any): void;
    class EstabelecimentoDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(estabelecimento: any, callback: any): void;
        atualiza(estabelecimento: any, id: any, callback: any): void;
        listaPorUsuario(id: any): any;
        listaEstabelecimentosNivelSuperior(id: any, callback: any): void;
        lista(addFilter: any): Promise<any>;
        buscaPorId(id: any, callback: any): Promise<any>;
        buscaCidadePorIdEstabelecimento(id: any, callback: any): void;
        buscaDominio(callback: any): void;
        dominio(callback: any): void;
        deletaPorId(id: any, callback: any): void;
        buscarPacientes(id: any, raio: any, idModalidade: any, sexo: any, idadeDe: any, idadeAte: any, callback: any): void;
        carregaPorId(id: any): Promise<any>;
        buscaEstabelecimentoESus(id: any): Promise<any>;
        buscarTipoFichaEstabelecimento(idEstabelecimento: any): any;
    }
}
declare module "dao/EstabelecimentoGrupoMaterialDAO" {
    function _exports(): typeof EstabelecimentoGrupoMaterialDAO;
    export = _exports;
    function EstabelecimentoGrupoMaterialDAO(connection: any): void;
    class EstabelecimentoGrupoMaterialDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(obj: any, callback: any): void;
        atualiza(obj: any, id: any, callback: any): void;
        buscaPorId(id: any, callback: any): void;
        buscaDominio(callback: any): void;
        deletaPorId(id: any, callback: any): void;
        lista(addFilter: any, callback: any): void;
    }
}
declare module "dao/EstabelecimentoUsuarioDAO" {
    function _exports(): typeof EstabelecimentoUsuarioDAO;
    export = _exports;
    function EstabelecimentoUsuarioDAO(connection: any): void;
    class EstabelecimentoUsuarioDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        deletaEstabelecimentosPorUsuario(id: any, callback: any): void;
        deletaEstabelecimentosPorUsuarioSync(id: any): Promise<any>;
        atualizaEstabelecimentosPorUsuario(estabelecimentos: any, callback: any): void;
        atualizaEstabelecimentosPorUsuarioSync(estabelecimentos: any): Promise<any>;
        buscaPorUsuario(id: any): Promise<any>;
        buscaPorUsuarioSync(id: any): Promise<any>;
    }
}
declare module "dao/EstoqueDAO" {
    function _exports(): typeof EstoqueDAO;
    export = _exports;
    function EstoqueDAO(connection: any): void;
    class EstoqueDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(obj: any, callback: any): void;
        salvaSync(obj: any, callback: any): Promise<any[]>;
        atualiza(obj: any, id: any, callback: any): void;
        atualizaSync(obj: any, id: any): Promise<any[]>;
        buscaPorId(id: any, callback: any): void;
        buscaDominio(callback: any): void;
        deletaPorId(id: any, callback: any): void;
        carregaQuantidadePorMaterialEstabelecimento(obj: any): Promise<any>;
        carregaQuantidadePorMaterialEstabelecimentoLote(obj: any): Promise<any>;
        carregaEstoquePorMaterial(obj: any): Promise<any>;
        carregaEstoquePorMaterialBloqueado(obj: any): Promise<any>;
        atualizaQuantidadeEstoque(qtdDispensar: any, idUsuario: any, id: any): Promise<any[]>;
        lista(addFilter: any, callback: any): void;
        listaBloqueados(addFilter: any): Promise<any>;
        carregaEstoquePorUnidade(idEstabelecimento: any, addFilter: any): Promise<any>;
        carregaEstoquePorUnidadeDetalhe(idMaterial: any, idEstabelecimento: any): Promise<any>;
        carregaEstoquePorMedicamento(idMaterial: any): Promise<any>;
        carregaEstoquePorConsumo(idMaterial: any, idEstabelecimento: any, addFilter: any): Promise<any>;
        carregaEstoqueLotePorMaterial(idMaterial: any, idEstabelecimento: any, addFilter: any): Promise<any>;
    }
}
declare module "dao/EstrategiaVacinacaoDAO" {
    function _exports(): typeof EstrategiaVacinacaoDAO;
    export = _exports;
    function EstrategiaVacinacaoDAO(connection: any): void;
    class EstrategiaVacinacaoDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(obj: any, callback: any): void;
        atualiza(obj: any, id: any, callback: any): void;
        lista(callback: any): void;
        buscaPorId(id: any, callback: any): void;
        buscaDominio(callback: any): void;
        dominio(callback: any): void;
        dominioPorId(id: any, callback: any): void;
        deletaPorId(id: any, callback: any): void;
    }
}
declare module "dao/ExameDAO" {
    function _exports(): typeof ExameDAO;
    export = _exports;
    function ExameDAO(connection: any): void;
    class ExameDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(exame: any): Promise<any[]>;
        buscaPorId(id: any): Promise<any>;
        atualizaStatus(obj: any): Promise<any[]>;
        buscaPorPacienteId(idPaciente: any, profissional: any): Promise<any>;
        listar(addFilter: any): Promise<{
            total: any;
            items: any;
        }>;
        buscaReportExameId(id: any): Promise<any>;
    }
}
declare module "dao/FamiliaMaterialDAO" {
    function _exports(): typeof FamiliaMaterialDAO;
    export = _exports;
    function FamiliaMaterialDAO(connection: any): void;
    class FamiliaMaterialDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(obj: any, callback: any): void;
        atualiza(obj: any, id: any, callback: any): void;
        buscaPorId(id: any, callback: any): void;
        buscaDominio(callback: any): void;
        deletaPorId(id: any, callback: any): void;
        lista(callback: any): void;
        buscarPorSubGrupoMaterial(id: any, callback: any): void;
    }
}
declare module "dao/GenericDAO" {
    function _exports(): typeof GenericDAO;
    export = _exports;
    function GenericDAO(connection: any, table: any): void;
    class GenericDAO {
        constructor(connection: any, table: any);
        _connection: any;
        _table: any;
        salva(obj: any, callback: any): void;
        atualiza(obj: any, id: any, callback: any): void;
        lista(callback: any): void;
        buscaPorId(id: any, callback: any): void;
        buscaDominio(callback: any): void;
        dominio(callback: any): void;
        deletaPorId(id: any, callback: any): void;
    }
}
declare module "dao/GrupoAtendimentoVacinacaoDAO" {
    function _exports(): typeof GrupoAtendimentoVacinacaoDAO;
    export = _exports;
    function GrupoAtendimentoVacinacaoDAO(connection: any): void;
    class GrupoAtendimentoVacinacaoDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(obj: any, callback: any): void;
        atualiza(obj: any, id: any, callback: any): void;
        lista(callback: any): void;
        buscaPorId(id: any, callback: any): void;
        buscaDominio(callback: any): void;
        dominio(callback: any): void;
        deletaPorId(id: any, callback: any): void;
    }
}
declare module "dao/GrupoMaterialDAO" {
    function _exports(): typeof GenericDAO;
    export = _exports;
    function GenericDAO(connection: any, table: any): void;
    class GenericDAO {
        constructor(connection: any, table: any);
        _connection: any;
        _table: string;
        salva(obj: any, callback: any): void;
        atualiza(obj: any, id: any, callback: any): void;
        lista(callback: any): void;
        buscaPorId(id: any, callback: any): void;
        buscaSemVinculoEstabelecimento(idEstabelecimento: any, callback: any): void;
        buscaDominio(callback: any): void;
        dominio(callback: any): void;
        deletaPorId(id: any, callback: any): void;
    }
}
declare module "dao/HipoteseDiagnosticaDAO" {
    function _exports(): typeof HipoteseDiagnosticaDAO;
    export = _exports;
    function HipoteseDiagnosticaDAO(connection: any): void;
    class HipoteseDiagnosticaDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        lista(callback: any): void;
        listarAsync(addFilter: any): Promise<{
            total: any;
            items: any;
        }>;
        dominio(callback: any): void;
        buscaPorId(id: any, callback: any): void;
        salva(objeto: any, callback: any): void;
        atualiza(objeto: any, id: any, callback: any): void;
        deletaPorId(id: any, callback: any): void;
    }
}
declare module "dao/IntegracaoESusDAO" {
    function _exports(): typeof IntegracaoESusDAO;
    export = _exports;
    function IntegracaoESusDAO(connection: any, tipoCampoData: any): void;
    class IntegracaoESusDAO {
        constructor(connection: any, tipoCampoData: any);
        _connection: any;
        campoData: any;
        listaCadastroIndividual(filtro: any): Promise<any>;
        listaAtendimentoIndividual(filtro: any): Promise<{
            atendimentos: any;
            condicaoAvaliacao: any;
            condicaoCiaps: any;
            condutaSus: any;
            solicitacoesExames: any;
            medicamentos: any;
        }>;
        listaAtividadeColetiva(filtro: any): Promise<{
            atendimentos: any;
        }>;
        listaAtividadeColetivaParticipantes(idEstabelecimento: any): Promise<{}>;
        listaVacinas(filtro: any): Promise<{
            vacinas: any;
            vacinaChild: any;
        }>;
        listaProcedimentos(filtro: any): Promise<{
            atendimentos: any;
            procedimentos: any;
            atendimentoProcedimentos: any;
            numTotalAfericaoPa: any;
            numTotalAfericaoTemperatura: any;
            numTotalMedicaoAltura: any;
            numTotalMedicaoPeso: any;
        }>;
        listaAtendimentoOdontologicoIndividual(filtro: any): Promise<{
            atendimentos: any;
        }>;
        listAtendimentoTipoFornecimentoOdonto(idEstabelecimento: any): Promise<{}>;
        listAtendimentoTipoVigilanciaOdonto(idEstabelecimento: any): Promise<{}>;
        listaAtendimentoDomiciliar(filtro: any): Promise<{
            atendimentos: any;
            procedimentos: any;
            condicaoAvaliacao: any;
            condicaoCiaps: any;
        }>;
    }
}
declare module "dao/ItemExameDAO" {
    function _exports(): typeof ItemExameDAO;
    export = _exports;
    function ItemExameDAO(connection: any): void;
    class ItemExameDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(itemExame: any): Promise<any[]>;
        atualiza(itemExame: any): Promise<any[]>;
        buscarPorExame(idExame: any): Promise<any>;
    }
}
declare module "dao/ItemMovimentoGeralDAO" {
    function _exports(): typeof ItemMovimentoGeralDAO;
    export = _exports;
    function ItemMovimentoGeralDAO(connection: any): void;
    class ItemMovimentoGeralDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(obj: any): Promise<any[]>;
        buscarPorItemReceita(idReceita: any, idItemReceita: any): Promise<any>;
        buscarPorMovimento(idMovimentoGeral: any): Promise<any>;
        buscarReservaRemanejamento(idSolicitacaoRemanejamento: any, idItemSolicitacaoRemanejamento: any): Promise<any>;
    }
}
declare module "dao/ItemPedidoCompraDAO" {
    function _exports(): typeof ItemPedidoCompraDAO;
    export = _exports;
    function ItemPedidoCompraDAO(connection: any): void;
    class ItemPedidoCompraDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(obj: any): Promise<any[]>;
        atualiza(obj: any): Promise<any[]>;
        buscarPorPedidoCompra(idPedidoCompra: any): Promise<any>;
        carregaItemPorEmpenhoMaterial(idPedidoCompra: any, idMaterial: any): Promise<any>;
    }
}
declare module "dao/ItemReceitaDAO" {
    function _exports(): typeof ItemReceitaDAO;
    export = _exports;
    function ItemReceitaDAO(connection: any): void;
    class ItemReceitaDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(itemReceita: any): Promise<any[]>;
        atualiza(itemReceita: any): Promise<any[]>;
        buscaPorId(id: any, callback: any): void;
        buscaDominio(callback: any): void;
        deletaPorId(id: any, callback: any): void;
        lista(callback: any): void;
        buscarPorReceita(idReceita: any): Promise<any>;
        buscarMaterialDispensadoPorPaciente(idMaterial: any, idPaciente: any): Promise<any>;
    }
}
declare module "dao/ItemSolicitacaoRemanejamentoDAO" {
    function _exports(): typeof ItemSolicitacaoRemanejamentoDAO;
    export = _exports;
    function ItemSolicitacaoRemanejamentoDAO(connection: any): void;
    class ItemSolicitacaoRemanejamentoDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(obj: any): Promise<any[]>;
        atualiza(obj: any): Promise<any[]>;
        buscarPorSolicitacaoRemanejamento(idSolicitacao: any): Promise<any>;
    }
}
declare module "dao/ListaControleEspecialDAO" {
    function _exports(): typeof ListaControleEspecialDAO;
    export = _exports;
    function ListaControleEspecialDAO(connection: any): void;
    class ListaControleEspecialDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(obj: any, callback: any): void;
        atualiza(obj: any, id: any, callback: any): void;
        buscaPorId(id: any, callback: any): void;
        buscaDominio(callback: any): void;
        dominio(callback: any): void;
        deletaPorId(id: any, callback: any): void;
        lista(callback: any): void;
    }
}
declare module "dao/LogDAO" {
    function _exports(): typeof LogDAO;
    export = _exports;
    function LogDAO(connection: any): void;
    class LogDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        lista(addFilter: any, usuario: any, callback: any): void;
        salva(obj: any, callback: any): void;
    }
}
declare module "dao/MaterialDAO" {
    function _exports(): typeof MaterialDAO;
    export = _exports;
    function MaterialDAO(connection: any): void;
    class MaterialDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(obj: any, callback: any): void;
        atualiza(obj: any, id: any, callback: any): void;
        buscaPorId(id: any, callback: any): void;
        buscaDominio(callback: any): void;
        deletaPorId(id: any, callback: any): void;
        lista(callback: any): void;
        listaPorDescricao(addFilter: any, callback: any): void;
        listaPorDescricaoVacina(addFilter: any, callback: any): void;
        listaPorDescricaoProfissionalEspecialidade(addFilter: any, idProfissional: any, callback: any): void;
        listaPorDescricaoUsuarioEspecialidade(addFilter: any, idUsuario: any, callback: any): void;
        carregaMedicamentoPorPaciente(idPaciente: any, addFilter: any, unidade: any): Promise<any>;
        carregaMedicamentoPorProfissional(idProfissional: any, addFilter: any, unidade: any): Promise<any>;
        carregaMedicamentoVencido(addFilter: any): Promise<any>;
        carregaMedicamentoMovimentacao(idTipoMovimento: any, addFilter: any, unidade: any): Promise<any>;
        carregaMedicamentoExtratoMovimento(idMaterial: any, addFilter: any): Promise<any>;
        carregaMedicamentoAjusteEstoque(idTipoMovimento: any, addFilter: any, unidade: any): Promise<any>;
    }
}
declare module "dao/MedicamentoDAO" {
    function _exports(): typeof MedicamentoDAO;
    export = _exports;
    function MedicamentoDAO(connection: any): void;
    class MedicamentoDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        listaMedicamentosDim(descricao: any, callback: any): void;
        dominio(callback: any): void;
        buscaPorId(id: any, callback: any): void;
        salva(objeto: any, callback: any): void;
        atualiza(objeto: any, id: any, callback: any): void;
        deletaPorId(id: any, callback: any): void;
    }
}
declare module "dao/MenuDAO" {
    function _exports(): typeof MenuDAO;
    export = _exports;
    function MenuDAO(connection: any): void;
    class MenuDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(menu: any, callback: any): void;
        lista(callback: any): void;
        listaDescricao(callback: any): void;
        listaRotasPorTipoUsuario(idTipoUsuario: any): Promise<any>;
        listaOrdemMenuFilhoPorMenuPai(idMenuPai: any, callback: any): void;
        listaPorTipoUsuarioDescricao(idTipoUsuario: any, callback: any): void;
        buscaPorId(id: any, callback: any): void;
        atualizaPorId(menu: any, id: any, ordemAtual: any, callback: any): void;
        deletaPorId(id: any, callback: any): void;
        listaPorTipoUsuario(idUsuario: any, callback: any): void;
    }
}
declare module "dao/MetodoExameDAO" {
    function _exports(): typeof MetodoExameDAO;
    export = _exports;
    function MetodoExameDAO(connection: any): void;
    class MetodoExameDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salvaSync(objeto: any): Promise<any[]>;
        atualizaSync(objeto: any): Promise<any>;
        buscaPorIdSync(id: any): Promise<any>;
        listaAsync(addFilter: any): Promise<{
            total: any;
            items: any;
        }>;
    }
}
declare module "dao/ModalidadeDAO" {
    function _exports(): typeof ModalidadeDAO;
    export = _exports;
    function ModalidadeDAO(connection: any): void;
    class ModalidadeDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        lista(callback: any): void;
        dominio(callback: any): void;
        buscaPorId(id: any, callback: any): void;
        salva(objeto: any, callback: any): void;
        atualiza(objeto: any, id: any, callback: any): void;
        deletaPorId(id: any, callback: any): void;
    }
}
declare module "dao/ModeloCanetaDAO" {
    function _exports(): typeof ModeloCanetaDAO;
    export = _exports;
    function ModeloCanetaDAO(connection: any): void;
    class ModeloCanetaDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(obj: any, callback: any): void;
        atualiza(obj: any, id: any, callback: any): void;
        lista(callback: any): void;
        buscaPorId(id: any, callback: any): void;
        buscaDominio(callback: any): void;
        dominio(callback: any): void;
        deletaPorId(id: any, callback: any): void;
    }
}
declare module "dao/MovimentoGeralDAO" {
    function _exports(): typeof MovimentoGeralDAO;
    export = _exports;
    function MovimentoGeralDAO(connection: any): void;
    class MovimentoGeralDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(obj: any): Promise<any[]>;
        carregaRelatorioEntradaMaterial(idMovimento: any): Promise<any>;
        carregaOperacaoPorMovimentoId(idMovimento: any): Promise<any>;
    }
}
declare module "dao/MovimentoLivroDAO" {
    function _exports(): typeof MovimentoLivroDAO;
    export = _exports;
    function MovimentoLivroDAO(connection: any): void;
    class MovimentoLivroDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(obj: any): Promise<any[]>;
        carregaQtdSaida(obj: any): Promise<any>;
        carregaLivroPorMovimento(obj: any): Promise<any>;
        atualizaSaida(qtdeSaidaLivro: any, saldoAtualUnidade: any, obj: any, idUsuario: any): Promise<any[]>;
        atualizaEntrada(qtdeeEntradaLivro: any, saldoAtualUnidade: any, obj: any, idUsuario: any): Promise<any[]>;
    }
}
declare module "dao/MunicipioDAO" {
    function _exports(): typeof MunicipioDAO;
    export = _exports;
    function MunicipioDAO(connection: any, connectionDim: any): void;
    class MunicipioDAO {
        constructor(connection: any, connectionDim: any);
        _connection: any;
        _connectionDim: any;
        _table: string;
        lista(callback: any): void;
        buscaPorId(id: any, callback: any): void;
        buscaPorUfId(id: any, callback: any): void;
        buscarPorMunicipio(municipio: any, callback: any): void;
        buscaPorUfNomeDim(nome_cidade: any, uf: any, callback: any): void;
    }
}
declare module "dao/NacionalidadeDAO" {
    function _exports(): typeof NacionalidadeDAO;
    export = _exports;
    function NacionalidadeDAO(connection: any): void;
    class NacionalidadeDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        lista(callback: any): void;
        dominio(callback: any): void;
        buscaPorId(id: any, callback: any): void;
        salva(objeto: any, callback: any): void;
        atualiza(objeto: any, id: any, callback: any): void;
        deletaPorId(id: any, callback: any): void;
        buscaPorIdSync(id: any): Promise<any>;
    }
}
declare module "dao/NotificacaoDAO" {
    function _exports(): typeof NotificacaoDAO;
    export = _exports;
    function NotificacaoDAO(connection: any): void;
    class NotificacaoDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(Notificacao: any, callback: any): void;
        lista(callback: any): void;
        listaPorUsuarioId(id: any, callback: any): void;
        carregaQtdPorUsuarioId(id: any, callback: any): void;
        listaPorUsuarioIdById(id: any, idNotificacao: any, callback: any): void;
        buscaPorId(id: any, callback: any): void;
        deletaPorId(id: any, callback: any): void;
        atualizaPorId(Notificacao: any, id: any, callback: any): void;
    }
}
declare module "dao/NotificacaoUsuarioDAO" {
    function _exports(): typeof NotificacaoUsuarioDAO;
    export = _exports;
    function NotificacaoUsuarioDAO(connection: any): void;
    class NotificacaoUsuarioDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(NotificacaoUsuario: any, callback: any): void;
        lista(callback: any): void;
        buscaPorId(id: any, callback: any): void;
        deletaPorId(id: any, callback: any): void;
        atualizaPorId(NotificacaoUsuario: any, id: any, callback: any): void;
        visualizadaPorId(notificacao_id: any, usuario_id: any, callback: any): void;
    }
}
declare module "dao/PacienteDAO" {
    function _exports(): typeof PacienteDAO;
    export = _exports;
    function PacienteDAO(connection: any, connectionDim: any): void;
    class PacienteDAO {
        constructor(connection: any, connectionDim: any);
        _connection: any;
        _connectionDim: any;
        _table: string;
        salva(paciente: any, callback: any): void;
        salvaAsync(paciente: any): Promise<any[]>;
        atualizaAsync(paciente: any, id: any): Promise<any[]>;
        transferirUnidade(paciente: any): Promise<any[]>;
        atualizaHistoriaProgressaFamiliar(historiaProgressaFamiliar: any, id: any, idUsuarioAlteracao: any, dataAlteracao: any): Promise<any[]>;
        gravaEstabelecimento(paciente: any, dataCriacao: any, usuario: any): Promise<any[]>;
        atualiza(paciente: any, id: any, callback: any): void;
        listarAsync(addFilter: any, idUsuario: any): Promise<{
            total: any;
            items: any;
        }>;
        buscaPorId(id: any, callback: any): void;
        buscaPorIdSync(id: any): Promise<any>;
        consultaPaciente(tipo: any, valor: any): Promise<any>;
        buscaPorIdFicha(id: any, callback: any): void;
        buscaEmailPaciente(id: any, callback: any): void;
        buscaEmailPacienteSync(id: any): Promise<any>;
        buscaDominio(callback: any): void;
        deletaPorId(id: any, callback: any): any;
        buscarEstabelecimentos(id: any, raio: any, idTipoUnidade: any, callback: any): void;
        carregaNomePaciente(id: any): Promise<any>;
        validaPorChaveSync(tipoValidacao: any, paciente: any, id: any): Promise<any>;
        carregaPacientePorMedicamento(addFilter: any, material: any): Promise<any>;
        buscaPacientePorSapId(idSap: any): Promise<any>;
    }
}
declare module "dao/PacienteDocumentoDAO" {
    function _exports(): typeof PacienteDocumentoDAO;
    export = _exports;
    function PacienteDocumentoDAO(connection: any): void;
    class PacienteDocumentoDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        buscaPorIdPaciente(idPaciente: any): Promise<any>;
        salva(obj: any, callback: any): Promise<any>;
        atualiza(obj: any): Promise<any>;
    }
}
declare module "dao/PedidoCompraDAO" {
    function _exports(): typeof PedidoCompraDAO;
    export = _exports;
    function PedidoCompraDAO(connection: any): void;
    class PedidoCompraDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(obj: any): Promise<any[]>;
        atualiza(obj: any, id: any): Promise<any[]>;
        buscaPorId(id: any): Promise<any>;
        deletaPorId(id: any): Promise<any[]>;
        lista(sortColumn: any, sortOrder: any): Promise<any>;
        listaEmpenho(): Promise<any>;
    }
}
declare module "dao/ProcedimentoDAO" {
    function _exports(): typeof ProcedimentoDAO;
    export = _exports;
    function ProcedimentoDAO(connection: any): void;
    class ProcedimentoDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(obj: any): Promise<any>;
        atualiza(obj: any, id: any): Promise<any>;
        lista(queryFilter: any): Promise<{
            total: any;
            items: any;
        }>;
        buscaPorId(id: any): Promise<any>;
        deletaPorId(id: any): Promise<any>;
    }
}
declare module "dao/ProdutoExameDAO" {
    function _exports(): typeof ProdutoExameDAO;
    export = _exports;
    function ProdutoExameDAO(connection: any): void;
    class ProdutoExameDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salvaSync(objeto: any): Promise<any[]>;
        atualizaSync(objeto: any): Promise<any>;
        buscaPorIdSync(id: any): Promise<any>;
        listaAsync(addFilter: any): Promise<{
            total: any;
            items: any;
        }>;
        listaDominio(idTipoExame: any): Promise<any>;
        buscaProdutoExamePorId(id: any): Promise<any>;
    }
}
declare module "dao/ProfissionalDAO" {
    function _exports(): typeof ProfissionalDAO;
    export = _exports;
    function ProfissionalDAO(connection: any, connectionDim: any): void;
    class ProfissionalDAO {
        constructor(connection: any, connectionDim: any);
        _connection: any;
        _connectionDim: any;
        _table: string;
        listaPorEstabelecimento(estabelecimento: any, callback: any): void;
        lista(addFilter: any, callback: any): void;
        buscaPorId(id: any, callback: any): void;
        buscaDominio(callback: any): void;
        deletaPorId(id: any, callback: any): void;
        dominio(callback: any): void;
        buscaProfissionalPorEstabelecimentoEEspecialidade(idEstabeleciemnto: any, idEspecialidade: any, callback: any): void;
        buscarPorEstabelecimento(id: any, callback: any): void;
        buscaPorEquipe(id: any, callback: any): void;
        atualizaEstabelecimentosPorProfissionalDim(idUsuario: any, estabelecimentos: any, callback: any): void;
        buscaEstabelecimentoPorProfissionalParaDim(idUsuario: any, callback: any): void;
        buscaPorUsuario(idUsuario: any, callback: any): void;
        buscaProfissionalPorUsuario(idUsuario: any, callback: any): void;
        buscaProfissionalPorUsuarioSync(idUsuario: any): Promise<any>;
        buscaPorIdSync(id: any): Promise<any>;
        salvaSync(profissional: any): Promise<any>;
        atualizaSync(profissional: any, id: any): Promise<any>;
        carregaProfissionalPorMedicamento(addFilter: any, material: any): Promise<any>;
        buscarProfissionalPorEstabelecimentoEsus(id: any): Promise<any>;
        buscarProfissionalPorEstabelecimentoAtividadeColetiva(id: any): Promise<any>;
        buscaProfissionalSusPorUsuarioSync(idUsuario: any): Promise<any>;
        buscaProfissionalDisponivelParaAgendamentoPorEspecialidade(params: any, res: any): Promise<any>;
    }
}
declare module "dao/ProfissionalEquipeDAO" {
    function _exports(): typeof ProfissionalEquipeDAO;
    export = _exports;
    function ProfissionalEquipeDAO(connection: any): void;
    class ProfissionalEquipeDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        deletaProfissionaisPorEquipe(id: any, callback: any): void;
        atualizaProfissionaisPorEquipe(profissionais: any, callback: any): void;
        buscarProfissionaisPorEquipe(id: any, callback: any): void;
    }
}
declare module "dao/RacaDAO" {
    function _exports(): typeof RacaDAO;
    export = _exports;
    function RacaDAO(connection: any): void;
    class RacaDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(obj: any, callback: any): void;
        atualiza(obj: any, id: any, callback: any): void;
        lista(callback: any): void;
        buscaPorId(id: any, callback: any): void;
        buscaDominio(callback: any): void;
        dominio(callback: any): void;
        deletaPorId(id: any, callback: any): void;
    }
}
declare module "dao/ReceitaDAO" {
    function _exports(): typeof ReceitaDAO;
    export = _exports;
    function ReceitaDAO(connection: any): void;
    class ReceitaDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(receita: any): Promise<any[]>;
        obterProximoNumero(ano: any, idEstabelecimento: any): Promise<any>;
        atualizaStatus(obj: any): Promise<any[]>;
        atualiza(obj: any, id: any, callback: any): void;
        buscaPorId(id: any): Promise<any>;
        buscaReciboReceita(ano: any, idEstabelecimento: any, numero: any): Promise<any>;
        buscaPorPacienteIdProntuario(idPaciente: any, profissional: any): Promise<any>;
        buscaDominio(callback: any): void;
        deletaPorId(id: any, callback: any): void;
        lista(addFilter: any, callback: any): void;
        buscaPorPacienteIdProntuarioVacinacao(idPaciente: any, profissional: any): Promise<any>;
        buscaCarteiraVacinacaoPorPaciente(idPaciente: any): Promise<any>;
    }
}
declare module "dao/SolicitacaoRemanejamentoDAO" {
    function _exports(): typeof SolicitacaoRemanejamentoDAO;
    export = _exports;
    function SolicitacaoRemanejamentoDAO(connection: any): void;
    class SolicitacaoRemanejamentoDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(obj: any): Promise<any[]>;
        atualiza(obj: any, id: any): Promise<any[]>;
        buscaPorId(id: any): Promise<any>;
        deletaPorId(id: any): Promise<any[]>;
        lista(addFilter: any, pendente: any): Promise<any>;
    }
}
declare module "dao/SubGrupoMaterialDAO" {
    function _exports(): typeof SubGrupoMaterialDAO;
    export = _exports;
    function SubGrupoMaterialDAO(connection: any): void;
    class SubGrupoMaterialDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(obj: any, callback: any): void;
        atualiza(obj: any, id: any, callback: any): void;
        buscaPorId(id: any, callback: any): void;
        buscaDominio(callback: any): void;
        deletaPorId(id: any, callback: any): void;
        lista(callback: any): void;
        buscarPorGrupoMaterial(idGrupoMaterial: any, callback: any): void;
    }
}
declare module "dao/SubGrupoOrigemReceitaDAO" {
    function _exports(): typeof SubGrupoOrigemReceitaDAO;
    export = _exports;
    function SubGrupoOrigemReceitaDAO(connection: any): void;
    class SubGrupoOrigemReceitaDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(obj: any, callback: any): void;
        atualiza(obj: any, id: any, callback: any): void;
        buscaPorId(id: any, callback: any): void;
        buscaDominio(callback: any): void;
        deletaPorId(id: any, callback: any): void;
        lista(callback: any): void;
    }
}
declare module "dao/SubgrupoOrigemDAO" {
    function _exports(): typeof SubgrupoOrigemDAO;
    export = _exports;
    function SubgrupoOrigemDAO(connection: any): void;
    class SubgrupoOrigemDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(obj: any, callback: any): void;
        atualiza(obj: any, id: any, callback: any): void;
        buscaPorId(id: any, callback: any): void;
        buscaDominio(callback: any): void;
        deletaPorId(id: any, callback: any): void;
        lista(callback: any): void;
    }
}
declare module "dao/TipoAtendimentoDAO" {
    function _exports(): typeof TipoAtendimentoDAO;
    export = _exports;
    function TipoAtendimentoDAO(connection: any): void;
    class TipoAtendimentoDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        buscarPorIdTipoFicha(id: any, callback: any): void;
    }
}
declare module "dao/TipoExameDAO" {
    function _exports(): typeof TipoExameDAO;
    export = _exports;
    function TipoExameDAO(connection: any): void;
    class TipoExameDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salvaSync(objeto: any): Promise<any[]>;
        atualizaSync(objeto: any): Promise<any>;
        buscaPorIdSync(id: any): Promise<any>;
        carregaHipotese(id: any): Promise<any>;
        listaAsync(addFilter: any): Promise<{
            total: any;
            items: any;
        }>;
        buscaTipoExamePorId(id: any): Promise<any>;
    }
}
declare module "dao/TipoFichaDAO" {
    function _exports(): typeof TipoFichaDAO;
    export = _exports;
    function TipoFichaDAO(connection: any): void;
    class TipoFichaDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(obj: any, callback: any): void;
        atualiza(obj: any, id: any, callback: any): void;
        lista(callback: any): void;
        buscaPorId(id: any, callback: any): void;
        buscaConfigPorId(id: any, callback: any): void;
        buscaTemplatePorId(id: any, callback: any): void;
        buscaTemplatePorIdSync(id: any): Promise<any>;
        buscaDominio(callback: any): void;
        dominio(callback: any): Promise<void>;
        buscarPorIdEstabelecimento(idEstabelecimento: any): Promise<any>;
        salvaTipoFichaEstabelecimento(tipoFicha: any, callback: any): void;
        deletaPorIdEstabelecimento(id: any, callback: any): void;
        deletaPorId(id: any, callback: any): void;
    }
}
declare module "dao/TipoMovimentoDAO" {
    function _exports(): typeof TipoMovimentoDAO;
    export = _exports;
    function TipoMovimentoDAO(connection: any): void;
    class TipoMovimentoDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        carregaNomeTipoMovimento(id: any): Promise<any>;
        carregaListaMovimentoAdministrativo(): Promise<any>;
        carregaPorId(id: any): Promise<any>;
        carregaListaPorOperacao(idOperacao: any): Promise<any>;
    }
}
declare module "dao/TipoUnidadeDAO" {
    function _exports(): typeof TipoUnidadeDAO;
    export = _exports;
    function TipoUnidadeDAO(connection: any): void;
    class TipoUnidadeDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        lista(callback: any): void;
        dominio(callback: any): void;
        buscaPorId(id: any, callback: any): void;
        salva(objeto: any, callback: any): void;
        atualiza(objeto: any, id: any, callback: any): void;
        deletaPorId(id: any, callback: any): void;
    }
}
declare module "dao/TipoUsuarioDAO" {
    function _exports(): typeof TipoUsuarioDAO;
    export = _exports;
    function TipoUsuarioDAO(connection: any): void;
    class TipoUsuarioDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        lista(callback: any): void;
        dominio(callback: any): void;
        listaTipoUsuarioProfissional(callback: any): void;
        listaPorAdmin(su: any, callback: any): void;
        buscaPorId(id: any, callback: any): void;
        salva(grupo: any, callback: any): void;
        atualiza(grupo: any, id: any, callback: any): void;
        deletaPorId(id: any, callback: any): void;
    }
}
declare module "dao/TipoUsuarioMenuDAO" {
    function _exports(): typeof TipoUsuarioMenuDAO;
    export = _exports;
    function TipoUsuarioMenuDAO(connection: any): void;
    class TipoUsuarioMenuDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        lista(callback: any): void;
        listaTipoUsuario(id: any, callback: any): void;
        buscaPorId(id: any, callback: any): void;
        salva(obj: any, callback: any): void;
        atualiza(obj: any, id: any, callback: any): void;
        deletaPermissoes(id: any, callback: any): void;
        atualizaPermissoes(permissoes: any, callback: any): void;
        deletaPorId(id: any, callback: any): void;
    }
}
declare module "dao/UfDAO" {
    function _exports(): typeof UfDAO;
    export = _exports;
    function UfDAO(connection: any): void;
    class UfDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        lista(callback: any): void;
        dominio(callback: any): void;
        buscaPorId(id: any, callback: any): void;
        buscarPorUf(uf: any, callback: any): void;
        buscaPorPais(idPais: any, callback: any): void;
        buscaPorIdSync(id: any): Promise<any>;
    }
}
declare module "dao/UsuarioDAO" {
    function _exports(): typeof UsuarioDAO;
    export = _exports;
    function UsuarioDAO(connection: any): void;
    class UsuarioDAO {
        constructor(connection: any);
        _connection: any;
        _table: string;
        salva(usuario: any, callback: any): void;
        atualiza(usuario: any, id: any): Promise<any>;
        atualizaToken(usuario: any, id: any): Promise<any>;
        atualizaTentativa(id: any, callback: any): void;
        atualizaSituacaoUsuario(id: any, callback: any): void;
        hashSenha(usuario: any, callback: any): void;
        lista(addFilter: any, callback: any): void;
        buscaPorId(id: any, callback: any): void;
        listaPorEmpresa(id: any, callback: any): void;
        buscaPorEmail(usuario: any): Promise<any>;
        buscaPorToken(token: any, callback: any): void;
        buscaPorCPF(usuario: any): Promise<any>;
        deletaPorId(id: any, callback: any): void;
        addActivity(id: any, callback: any): void;
        buscaUsuario(usuario: any, callback: any): void;
        dominio(callback: any): void;
        listaUsuarioSemProfissional(idProfissional: any, idEstabelecimento: any, callback: any): void;
        listaPorTipoUsuario(idTipoUsuario: any, callback: any): void;
        buscaPorCPFSync(usuario: any): Promise<any>;
        buscaPorEmailSync(usuario: any): Promise<any>;
        salvaSync(usuario: any): Promise<any>;
        atualizaSync(usuario: any, id: any): Promise<any>;
    }
}
declare module "dao/connections/EatendConnection" {
    function _exports(): {
        connection(): Promise<any>;
    };
    export = _exports;
}
declare module "middlewares/AutenticacaoRotas" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "middlewares/Cors" {
    function _exports(app: any): void;
    export = _exports;
}
declare module "services/ClientCEP" {
    function _exports(): typeof ClientCEP;
    export = _exports;
    function ClientCEP(): void;
    class ClientCEP {
        consultaCep(cep: any, callback: any): void;
    }
}
declare module "services/DimMedicamentoService" {
    function _exports(): typeof DimMedicamentoService;
    export = _exports;
    function DimMedicamentoService(): void;
    class DimMedicamentoService {
        enviaReceitaMedicaDim(cabecalho: any, medicamentos: any, url: any): Promise<any>;
    }
}
declare module "services/DocumentoService" {
    function _exports(): typeof DocumentoService;
    export = _exports;
    function DocumentoService(): void;
    class DocumentoService {
        uploadImage(file: any): Promise<any>;
        uploadImageList(files: any): Promise<any>;
    }
}
declare module "services/FichaDigitalService" {
    function _exports(): typeof FichaDigitalService;
    export = _exports;
    function FichaDigitalService(): void;
    class FichaDigitalService {
        enviaFicha(obj: any, url: any, html: any): Promise<any>;
        enviaFichaSync(obj: any, url: any, html: any): Promise<void>;
        testeSync(url: any, arquivoCompleto: any): Promise<any>;
    }
}
declare module "util/Mail" {
    function _exports(): typeof Mail;
    export = _exports;
    function Mail(): void;
    class Mail {
        sendMail(usuario: any, urlEmail: any, urlSenha: any, _subject: any, _html: any): void;
        enviaEmailFicha(obj: any, urlEmail: any, urlSenha: any, _subject: any, _html: any): Promise<any>;
    }
}
declare module "util/Util" {
    function _exports(): typeof Util;
    export = _exports;
    function Util(): void;
    class Util {
        URL_SERVER: any;
        SUPER_ADMIN: any;
        ADMIN: any;
        CONSULTA: any;
        dateToISO(str: any): string;
        dateTimeToISO(str: any): string;
        cpfValido(str: any): boolean;
        cartaoSUSValido(str: any): boolean;
        customError(errors: any, field: any, message: any, value: any): any;
        isValidDate(value: any): boolean;
        hashPassword(pwd: any): any;
        checkPassword(pwd: any, hash: any): any;
        createWebToken(app: any, req: any, usuario: any): any;
        createHashEmail(email: any): string;
        makeDirectory(dir: any): void;
    }
}
declare module "util/WebUser" {
    function _exports(): typeof WebUser;
    export = _exports;
    function WebUser(): void;
    class WebUser {
        buscaPorToken(app: any, token: any): any;
        unauthorized(res: any): void;
    }
}
