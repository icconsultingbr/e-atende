function GenericDAO(connection,table) {
    this._connection = connection;
    this._table = table;
}

GenericDAO.prototype.salva = function(obj, callback) {
    this._connection.query(`INSERT INTO ${this._table} SET ?`, obj, callback);
}

GenericDAO.prototype.atualiza = function(obj, id, callback) {
    this._connection.query(`UPDATE ${this._table} SET ? WHERE id= ?`, [obj, id], callback);
}

GenericDAO.prototype.lista = function(callback) {

    this._connection.query(`SELECT * FROM ${this._table} WHERE situacao = 1`, callback);
}

GenericDAO.prototype.buscaPorId = function (id, callback) {
    this._connection.query(`SELECT * FROM ${this._table} WHERE id = ?`,id,callback);
}

GenericDAO.prototype.buscaDominio = function (callback) {
    this._connection.query(`SELECT id, nome FROM ${this._table} WHERE situacao = 1`, callback);
}

GenericDAO.prototype.dominio = function (callback) {
    this._connection.query(`SELECT id, nome FROM ${this._table} WHERE situacao = 1`, callback);
}

GenericDAO.prototype.dominioAsync = async function() {
  console.log('dominq', this._table)
  const resp = await this._connection.query(`SELECT id, nome FROM ${this._table} WHERE situacao = 1`);
  return resp;
}

GenericDAO.prototype.deletaPorId = function (id,callback) {
    this._connection.query("UPDATE "+this._table+" set situacao = 0 WHERE id = ? ",id,callback);
}

module.exports = function(){
    return GenericDAO;
};
