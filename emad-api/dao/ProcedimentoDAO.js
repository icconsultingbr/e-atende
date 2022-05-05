const QueryBuilder = require('../infrastructure/QueryBuilder');

function ProcedimentoDAO(connection) {
    this._connection = connection;
    this._table = "tb_procedimento";
}

ProcedimentoDAO.prototype.salva = async function (obj) {
    return await this._connection.query(`INSERT INTO ${this._table} (co_procedimento, no_procedimento, dt_competencia)
                                        VALUES (?, ?, ?)`, [obj.co_procedimento, obj.no_procedimento, obj.dt_competencia]);
}

ProcedimentoDAO.prototype.atualiza = async function (obj, id) {
    return await this._connection.query(`UPDATE ${this._table} SET ? WHERE id= ?`, [obj, id]);
}

ProcedimentoDAO.prototype.lista = async function (queryFilter) {
    let orderBy = queryFilter.sortColumn ? `${queryFilter.sortColumn}` : "a.id";
    let where = "";
    let join = "";

    if(queryFilter.codigo || queryFilter.nome){

        where += "WHERE 1 = 1"

        if(queryFilter.codigo && queryFilter.codigo != 'null' && queryFilter.codigo != 'undefined'){
            where += ` AND UPPER(co_procedimento) LIKE '%${queryFilter.codigo.toUpperCase()}%'`;
        }

        if(queryFilter.nome && queryFilter.nome != 'null' && queryFilter.nome != 'undefined'){
            where += ` AND UPPER(no_procedimento) LIKE '%${queryFilter.nome.toUpperCase()}%'`;
        }

        if(queryFilter.tipoFicha && queryFilter.tipoFicha != 'null' && queryFilter.tipoFicha != 'undefined'){
            join  += ` INNER JOIN tb_tipo_ficha c on c.id = ${queryFilter.tipoFicha} INNER JOIN tb_procedimento_tipo_ficha b on b.id_procedimento = a.id and b.id_tipo_ficha = c.tipoAtendimentoSus `;            
        }

    }  

    const count = await this._connection.query(`SELECT COUNT(1) as total FROM ${this._table} a ${join}`);

    const query = QueryBuilder.datatable(`SELECT a.*, CONCAT(SUBSTRING(a.dt_competencia, 1, 4), '/',SUBSTRING(a.dt_competencia, 5, 6)) as dt_competencia_formatada FROM ${this._table} a ${join} ${where}`, orderBy, queryFilter.sortOrder, queryFilter.limit, queryFilter.offset);

    let result = await this._connection.query(query);

    return {
        total: count[0].total,
        items: result
    }
}

ProcedimentoDAO.prototype.buscaPorId = async function (id) {
    let result = await this._connection.query(`SELECT * FROM ${this._table} WHERE id = ?`, id);
    return result ? result[0] : null;
}

ProcedimentoDAO.prototype.deletaPorId = async function (id) {
    return await this._connection.query("UPDATE " + this._table + " set situacao = 0 WHERE id = ? ", id);
}

module.exports = function () {
    return ProcedimentoDAO;
};