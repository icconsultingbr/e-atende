function TeleAtendimentoDAO(connection) {
    this._connection = connection;
    this._table = "tb_tele_atendimento";
}


/**
 * Insere um novo registro de teleatendimento no banco de dados
 * @param {Object} teleAtendimento - Objeto contendo os dados do teleatendimento a ser inserido
 * @returns {Promise<void>} Promise que resolve quando a inserção é concluída
 */
TeleAtendimentoDAO.prototype.incluir = async function(teleAtendimento) {
    if(!teleAtendimento){
        return;
    }

    const response = await this._connection.query(`INSERT INTO ${this._table} SET ?`, teleAtendimento);
    teleAtendimento.id = response.insertId;
}

/**
 * Verifica se existe um teleatendimento com o ID informado
 * @param {number} teleAtendimentoId - ID do teleatendimento a ser verificado
 * @returns {Promise<boolean>} Promise que resolve com true se existir, false caso contrário
 */
TeleAtendimentoDAO.prototype.existe = async function (teleAtendimentoId) {
    const result = await this._connection.query(`SELECT a.id FROM ${this._table} a where a.agendamentoId=?`, [id]);
    return result ? true : false;
}

/**
 * Busca um teleatendimento pelo ID do agendamento
 * @param {number} id - ID do agendamento a ser pesquisado
 * @returns {Promise<Object|null>} Promise que resolve com o objeto do teleatendimento encontrado ou null se não existir
 */
TeleAtendimentoDAO.prototype.obterPorAgendamentoId = async function(id){
    let result = await this._connection.query(`SELECT a.* FROM ${this._table} a where a.agendamentoId=?`, [id]);
    return result ? result[0] : null;
}

/**
 * Busca um teleatendimento pelo ID da sessão
 * @param {string} sessaoId - ID da sessão a ser pesquisada
 * @returns {Promise<Object|null>} Promise que resolve com o objeto do teleatendimento encontrado ou null se não existir
 */
TeleAtendimentoDAO.prototype.obterPorSessaoId = async function (sessaoId) {
    let result = await this._connection.query(`SELECT a.* FROM ${this._table} a where a.sessaoId=?`, [sessaoId]);
    return result ? result[0] : null;
}

/**
 * Atualiza um registro de teleatendimento no banco de dados
 * @param {Object} teleAtendimento - Objeto contendo os dados atualizados do teleatendimento
 * @param {number} teleAtendimento.id - ID do teleatendimento a ser atualizado
 * @returns {Promise<void>} Promise que resolve quando a atualização é concluída
 */
TeleAtendimentoDAO.prototype.atualizar = async function (teleAtendimento) {
    if(!teleAtendimento){
        return;
    }

    await this._connection.query(`UPDATE ${this._table} SET ?  where id= ?`, [teleAtendimento, teleAtendimento.id]);
}

/**
 * Atualiza um registro de teleatendimento no banco de dados com a informação do número de atendimento
 * @param {Object} teleAtendimento - Objeto contendo os dados atualizados do teleatendimento
 * @param {number} teleAtendimento.id - ID do teleatendimento a ser atualizado
 * @returns {Promise<void>} Promise que resolve quando a atualização é concluída
 */
TeleAtendimentoDAO.prototype.atualizarAtendimentoId = async function (agendamentoId, atendimentoId) {
    if(!agendamentoId && !atendimentoId){
        return;
    }

    const response = await this._connection.query(`UPDATE ${this._table} SET atendimentoId = ?  where agendamentoId= ?`, [atendimentoId, agendamentoId]);
    return [response];
}

module.exports = function(){
    return TeleAtendimentoDAO;
};
