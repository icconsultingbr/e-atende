function AgendamentoDAO(connection) {
    this._connection = connection;
    this._table = "tb_agendamento";
}

module.exports = function () {
    return AgendamentoDAO;
};

AgendamentoDAO.prototype.salva = function (obj, callback) {
    this._connection.query(`INSERT INTO ${this._table} SET ?`, obj, callback);
}

AgendamentoDAO.prototype.buscaPorId = function (id, callback) {
    this._connection.query(`select a.id as idAgendamento,
                                a.idPaciente,
                                a.idEquipe,
                                a.idProfissional,
                                a.formaAtendimento,
                                a.tipoAtendimento,
                                DATE_FORMAT(a.dataInicial, '%Y-%m-%dT%H:%i:%s') dataInicial,
                                DATE_FORMAT(a.dataFinal, '%Y-%m-%dT%H:%i:%s') dataFinal, 
                                a.observacao,
                                e.nome as nomeEquipe,
                                p.nome as profissionalNome,
                                p.id as profissionalId,
                                p.teleatendimento as profissionalTeleatendimento,
                                pc.nome as pacienteNome,
                                te.nome as especialidadeNome,
                                te.id as especialidadeId,
                                e.idEstabelecimento equipeEstabelecimetoId,
                                pc.idEstabelecimentoCadastro pacienteEstabeleciomentoId,
                                tele.idTeleAtendimento,
    							tele.situacaoTeleAtendimento,
    							tele.sessaoId 
                                FROM tb_agendamento a 
                                left join tb_profissional p ON (a.idProfissional = p.id)
                                left join tb_especialidade te on p.idEspecialidade = te.id
                                left join tb_equipe e ON (a.idEquipe = e.id)
                                inner join tb_paciente pc ON(a.idPaciente = pc.id)
                                left join vw_agenda_paciente tele on tele.idAgenda = a.id
                            where a.id = ?`, id, callback);
}

// AgendamentoDAO.prototype.buscaPorProfissional = function (id, callback) {
//     this._connection.query(`select 
//        a.id as idAgendamento,
//         a.idPaciente,
//         a.idEquipe,
//         a.idProfissional,
//         a.formaAtendimento,
//         a.tipoAtendimento,
//         a.dataInicial,
//         a.dataFinal,
//         a.observacao,
//         e.nome,
//         p.nome as profissionalNome,
//         p.id as profissionalId,
//         p.teleatendimento as profissionalTeleatendimento,
//         pc.nome as pacienteNome
//             FROM ${this._table} a 
//             inner join tb_profissional p ON(a.idProfissional = p.id) 
//             left join tb_equipe e ON(a.idEquipe = e.id)
//             inner join tb_paciente pc ON(a.idPaciente = pc.id)
//         where a.situacao = 1 AND a.idProfissional = ?`, id, callback);
// }
AgendamentoDAO.prototype.buscaPorEquipe = function (id, callback) {
    this._connection.query(`select 
       a.id as idAgendamento,
        a.idPaciente,
        a.idEquipe,
        a.idProfissional,
        a.formaAtendimento,
        a.tipoAtendimento,
        a.dataInicial,
        a.dataFinal,
        a.observacao,
        e.nome,
        p.nome as profissionalNome,
        p.id as profissionalId,
        p.teleatendimento as profissionalTeleatendimento,
        pc.nome as pacienteNome
            FROM ${this._table} a 
            inner join tb_profissional p ON(a.idProfissional = p.id) 
            left join tb_equipe e ON(a.idEquipe = e.id)
            inner join tb_paciente pc ON(a.idPaciente = pc.id)
        where a.situacao = 1 AND a.idEquipe = ?`, id, callback);
}

// AgendamentoDAO.prototype.buscaPorPaciente = function (id, callback) {
//     this._connection.query(`select 
//        a.id as idAgendamento,
//         a.idPaciente,
//         a.idEquipe,
//         a.idProfissional,
//         a.formaAtendimento,
//         a.tipoAtendimento,
//         a.dataInicial,
//         a.dataFinal,
//         a.observacao,
//         e.nome,
//         p.nome as profissionalNome,
//         p.id as profissionalId,
//         p.teleatendimento as profissionalTeleatendimento,
//         pc.nome as pacienteNome
//             FROM ${this._table} a 
//             left join tb_profissional p ON(a.idProfissional = p.id) 
//             left join tb_equipe e ON(a.idEquipe = e.id)
//             inner join tb_paciente pc ON(a.idPaciente = pc.id)
//         where a.situacao = 1 AND a.idPaciente = ?`, id, callback);
// }

AgendamentoDAO.prototype.buscaPorProfissional = function (id, callback) {
    this._connection.query(`select 
       a.id as idAgendamento,
        a.idPaciente,
        a.idEquipe,
        a.idProfissional,
        a.formaAtendimento,
        a.tipoAtendimento,
        a.dataInicial,
        a.dataFinal,
        a.observacao,
        e.nome,
        p.nome as profissionalNome,
        p.id as profissionalId,
        p.teleatendimento as profissionalTeleatendimento,
        pc.nome as pacienteNome
            FROM ${this._table} a 
            inner join tb_profissional p ON(a.idProfissional = p.id) 
            left join tb_equipe e ON(a.idEquipe = e.id)
            inner join tb_paciente pc ON(a.idPaciente = pc.id)
        where a.situacao = 1 AND a.idProfissional = ?`, id, callback);
}

AgendamentoDAO.prototype.buscaPorPaciente = function (id, callback) {
    this._connection.query(`select 
       a.id as idAgendamento,
        a.idPaciente,
        a.idEquipe,
        a.idProfissional,
        a.formaAtendimento,
        a.tipoAtendimento,
        a.dataInicial,
        a.dataFinal,
        a.observacao,
        e.nome,
        p.nome as profissionalNome,
        p.id as profissionalId,
        p.teleatendimento as profissionalTeleatendimento,
        pc.nome as pacienteNome
            FROM ${this._table} a 
            left join tb_profissional p ON(a.idProfissional = p.id) 
            left join tb_equipe e ON(a.idEquipe = e.id)
            inner join tb_paciente pc ON(a.idPaciente = pc.id)
        where a.situacao = 1 AND a.idPaciente = ?`, id, callback);
}

AgendamentoDAO.prototype.lista = function (addFilter, callback) {

    console.log('addFilter', addFilter);
    let where = " 1=1";

    if (addFilter.idPaciente) {
        where += " AND a.idPaciente = " + addFilter.idPaciente;
    }
    if (addFilter.idEquipe) {
        where += " AND a.idEquipe = " + addFilter.idEquipe;
    }
    if (addFilter.idProfissional) {
        where += " AND a.idProfissional = " + addFilter.idProfissional;
    }

    this._connection.query(
        `SELECT 
            a.id as idAgendamento, 
            a.idPaciente, 
            a.idEquipe, 
            a.idProfissional, 
            a.formaAtendimento, 
            a.tipoAtendimento, 
            a.dataInicial, 
            a.dataFinal, 
            a.observacao,
            e.nome,
            p.nome as profissionalNome,
            p.id as profissionalId,
            p.teleatendimento as profissionalTeleatendimento,
            pc.nome as pacienteNome
        FROM ${this._table} a
        inner join tb_usuario tu on tu.id = ${addFilter.usuarioId}
        left join tb_profissional p ON a.idProfissional = p.id
        left join tb_equipe e ON a.idEquipe = e.id
        inner join tb_paciente pc ON a.idPaciente = pc.id
        WHERE ${where} AND a.situacao = 1
        and case 
            when tu.idTipoUsuario IN (3, 2, 1) then true
            else (
                EXISTS (
                    SELECT 1 FROM tb_profissional_equipe tpe
                    inner join tb_profissional tp on tpe.idProfissional = tp.id
                    where tpe.idEquipe = a.idEquipe
                    and tp.idUsuario = tu.id
                ) or
                exists (
                    select * FROM tb_profissional tpf
                    where tpf.idUsuario = tu.id
                    and tpf.id = a.idProfissional
                )
            )
        end`, callback);
}

AgendamentoDAO.prototype.atualiza = function (obj, id, callback) {
    console.log('chegou aqui DAO AGENDAMENTO ==>',obj, id)
    this._connection.query(`UPDATE ${this._table} SET ? WHERE id= ?`, [obj, id], callback);
}

AgendamentoDAO.prototype.deletaPorId = function (id, callback) {
    this._connection.query("UPDATE " + this._table + " set situacao = 0 WHERE id = ? ", id, callback);
}

AgendamentoDAO.prototype.formaAtendimento = function (callback) {
    this._connection.query("SELECT * from tb_forma_atendimento fa", callback)
}
AgendamentoDAO.prototype.tipoAtendimento = function (callback) {
    this._connection.query("SELECT * from tb_agendamento_tipo_atendimento ata", callback)
}

AgendamentoDAO.prototype.buscaEquipeDisponivelParaAgendamentoPorEspecialidade = async function (idEspecialidade, dataDesejada, formaAtendimento, idEstabelecimento, callback) {
    const anoMes = dataDesejada.substring(0, 4) + dataDesejada.substring(5, 7);
    
    let teleatendimentoCondition = "";
    if (formaAtendimento == 2) {
        teleatendimentoCondition = "AND tp.teleatendimento = 'S'";
    }

    const query = `
        SELECT 
            tp.id,
            tp.nome, 
            CASE DAYOFWEEK(?)
                WHEN 1 THEN ep.domingoHorarioInicial
                WHEN 2 THEN ep.segundaHorarioInicial
                WHEN 3 THEN ep.tercaHorarioInicial
                WHEN 4 THEN ep.quartaHorarioInicial
                WHEN 5 THEN ep.quintaHorarioInicial
                WHEN 6 THEN ep.sextaHorarioInicial
                WHEN 7 THEN ep.sabadoHorarioInicial
            END AS escalaInicio,
            CASE DAYOFWEEK(?)
                WHEN 1 THEN ep.domingoHorarioFinal
                WHEN 2 THEN ep.segundaHorarioFinal
                WHEN 3 THEN ep.tercaHorarioFinal
                WHEN 4 THEN ep.quartaHorarioFinal
                WHEN 5 THEN ep.quintaHorarioFinal
                WHEN 6 THEN ep.sextaHorarioFinal
                WHEN 7 THEN ep.sabadoHorarioFinal
            END AS escalaFim,
            IFNULL(TIME_FORMAT(agenda.dataInicial, '%H:%i'), 'Livre') AS inicio, 
            IFNULL(TIME_FORMAT(agenda.dataFinal, '%H:%i'), 'Livre') AS fim,
            ep.tempoMedioConsulta
        FROM tb_profissional tp
        INNER JOIN tb_estabelecimento_usuario as eu ON (tp.idUsuario = eu.idUsuario)
        LEFT JOIN tb_agendamento agenda ON tp.id = agenda.idProfissional AND DATE(agenda.dataInicial) = ? AND agenda.situacao != 0
        INNER JOIN tb_escala_profissional ep ON tp.id = ep.idProfissional AND ep.anoMes = ?
        WHERE tp.idEspecialidade = ? 
        AND eu.idEstabelecimento = ?      
        ${teleatendimentoCondition}
        ORDER BY tp.nome, agenda.dataInicial;
    `;

    this._connection.query(query, [dataDesejada, dataDesejada, dataDesejada, anoMes, idEspecialidade, idEstabelecimento], function (error, results, fields) {
        if (error) {
            console.error('Error during database query:', error);
            return callback(error);
        }

         const medicos = results.reduce((acc, cur) => {
            if (!acc[cur.nome]) {
                acc[cur.nome] = { 
                    nome: cur.nome, 
                    id: cur.id,
                    escalaInicio: cur.escalaInicio, 
                    escalaFim: cur.escalaFim,
                    horariosOcupados: [], 
                    horariosLivres: [],
                    tempoMedioConsulta: cur.tempoMedioConsulta
                };
            }
            if (cur.inicio !== 'Livre') {
                acc[cur.nome].horariosOcupados.push({ inicio: cur.inicio, fim: cur.fim });
            }
            return acc;
        }, {});

        for (let medico in medicos) {
            let horariosLivres = [];
            let horaInicio = new Date(`${dataDesejada}T${medicos[medico].escalaInicio}`);
            const horaFim = new Date(`${dataDesejada}T${medicos[medico].escalaFim}`);

            while (horaInicio < horaFim) {
                let fimIntervalo = new Date(horaInicio.getTime() + medicos[medico].tempoMedioConsulta * 60000); // Adiciona 30 minutos
                if (!medicos[medico].horariosOcupados.some(ocupado =>
                    new Date(`${dataDesejada}T${ocupado.inicio}`) < fimIntervalo &&
                    new Date(`${dataDesejada}T${ocupado.fim}`) > horaInicio
                )) {
                    horariosLivres.push({ 
                        inicio: horaInicio.toTimeString().slice(0, 5), 
                        fim: fimIntervalo.toTimeString().slice(0, 5) 
                    });
                }
                horaInicio = fimIntervalo;
            }

            medicos[medico].horariosLivres = horariosLivres;
        }

        callback(null, Object.values(medicos));
    });    
}