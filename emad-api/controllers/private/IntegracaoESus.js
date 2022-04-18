const { async } = require('q');

let versao = "";
let uuidInstalacao = "";
let major = "";
let minor = "";
let revision = "";

module.exports = function (app) {

    app.post('/integracao-e-sus', async function (req, res) {
        let filtro = req.body;

        req.assert("periodoExtracao").notEmpty().withMessage("O campo Periodo é um campo obrigatório");
        req.assert("idFichaEsus").notEmpty().withMessage("O campo Ficha é um campo obrigatório");

        const connection = await app.dao.connections.EatendConnection.connection();

        try {

            let retorno;
            let cad, atend, vac, proc;

            if (filtro) {
                switch (filtro.idFichaEsus) {
                    case '0':
                        configTipoFicha(5)
                        cad = await listaCadastroIndividual(filtro);
                        atend = await listaAtendimentoIndividual(filtro);
                        vac = await listaFichaVacinacao(filtro);
                        let xmls = cad.concat(atend, vac);
                        retorno = generateZipFiles(xmls, 'ficha')
                        break;
                    case '2':
                        configTipoFicha(5)
                        cad = await listaCadastroIndividual(filtro);
                        retorno = generateZipFiles(cad, 'ficha-cadastro-individual')
                        break;
                    case '4':
                        configTipoFicha(5)
                        atend = await listaAtendimentoIndividual(filtro);
                        retorno = generateZipFiles(atend, 'ficha-atendimento-individual')
                        break;
                    case '7':
                        configTipoFicha(5)
                        proc = await listaProcedimentos(filtro);
                        retorno = generateZipFiles(proc, 'ficha-procedimentos')
                        break;
                    case '14':
                        configTipoFicha(5)
                        vac = await listaFichaVacinacao(filtro);
                        retorno = generateZipFiles(vac, 'ficha-vacinas')
                        break;
                    case '15':
                        configTipoFicha(7)
                        vac = await listaAtividadeColetiva(filtro);
                        retorno = generateZipFiles(vac, 'ficha-atividade-coletiva')
                        break;
                    default:
                        return retorno;
                }
            }

            res.status(200).send(retorno);

        } catch (error) {
            console.log(error);
        } finally {
            await connection.close();
        }
    });

    function buscarPorId(id, res) {
        var q = require('q');
        var d = q.defer();
        var util = new app.util.Util();

        var connection = app.dao.ConnectionFactory();
        var TipoFichaDAO = new app.dao.TipoFichaDAO(connection);
        var errors = [];

        TipoFichaDAO.buscaPorId(id, function (exception, result) {
            if (exception) {
                d.reject(exception);
                console.log(exception);
                errors = util.customError(errors, "data", "Erro ao acessar os dados", "tipoFicha");
                res.status(500).send(errors);
                return;
            } else {

                d.resolve(result[0]);
            }
        });
        return d.promise;
    }

    async function listaCadastroIndividual(filtro) {
        let tipoCampoData;

        if (filtro.idTipoPeriodo == 1) {
            tipoCampoData = 'dataCriacao'
        } else {
            tipoCampoData = 'dataAlteracao'
        }

        const connection = await app.dao.connections.EatendConnection.connection();
        const integracaoESusDAO = new app.dao.IntegracaoESusDAO(connection, tipoCampoData);
        const estabelecimentoDAO = new app.dao.EstabelecimentoDAO(connection);

        let list = [];
        let estabelecimento = {};

        try {
            list = await integracaoESusDAO.listaCadastroIndividual(filtro);
            estabelecimento = await estabelecimentoDAO.buscaEstabelecimentoESus(filtro.idEstabelecimento);
        } catch (error) {
            console.log(error);
        } finally {
            await connection.close();
        }

        return preencheXMLCadastroIndividual(list, estabelecimento);
    }

    async function listaAtendimentoIndividual(filtro) {
        let tipoCampoData;

        if (filtro.idTipoPeriodo == 1) {
            tipoCampoData = 'dataCriacao'
        } else {
            tipoCampoData = 'dataFinalizacao'
        }

        const connection = await app.dao.connections.EatendConnection.connection();
        const integracaoESusDAO = new app.dao.IntegracaoESusDAO(connection, tipoCampoData);
        const estabelecimentoDAO = new app.dao.EstabelecimentoDAO(connection);
        const profissionalDAO = new app.dao.ProfissionalDAO(connection);

        let list = [];
        let estabelecimento = {};
        let profissionais = [];

        try {
            profissionais = await profissionalDAO.buscarProfissionalPorEstabelecimentoEsus(filtro.idEstabelecimento)
            estabelecimento = await estabelecimentoDAO.buscaEstabelecimentoESus(filtro.idEstabelecimento);
            list = await integracaoESusDAO.listaAtendimentoIndividual(filtro);
        } catch (error) {
            console.log(error);
        } finally {
            await connection.close();
        }

        return preencheXMLAtendimentoIndividual(list, estabelecimento, profissionais);
    }

    async function listaFichaVacinacao(filtro) {
        let tipoCampoData;

        if (filtro.idTipoPeriodo == 1) {
            tipoCampoData = 'dataCriacao'
        } else {
            tipoCampoData = 'dataUltimaDispensacao'
        }

        const connection = await app.dao.connections.EatendConnection.connection();
        const integracaoESusDAO = new app.dao.IntegracaoESusDAO(connection, tipoCampoData);
        const estabelecimentoDAO = new app.dao.EstabelecimentoDAO(connection);
        const profissionalDAO = new app.dao.ProfissionalDAO(connection);

        let listaVacinas = [];
        let estabelecimento = {};
        let profissionais = [];

        try {
            profissionais = await profissionalDAO.buscarProfissionalPorEstabelecimentoEsus(filtro.idEstabelecimento)
            estabelecimento = await estabelecimentoDAO.buscaEstabelecimentoESus(filtro.idEstabelecimento);
            listaVacinas = await integracaoESusDAO.listaVacinas(filtro);
        } catch (error) {
            console.log(error);
        } finally {
            await connection.close();
        }

        return preencheXMLFichaVacinacao(listaVacinas, estabelecimento, profissionais);
    }

    async function listaProcedimentos(filtro) {
        let tipoCampoData;

        if (filtro.idTipoPeriodo == 1) {
            tipoCampoData = 'dataCriacao'
        } else {
            tipoCampoData = 'dataUltimaDispensacao'
        }

        const connection = await app.dao.connections.EatendConnection.connection();
        const integracaoESusDAO = new app.dao.IntegracaoESusDAO(connection, tipoCampoData);
        const estabelecimentoDAO = new app.dao.EstabelecimentoDAO(connection);
        const profissionalDAO = new app.dao.ProfissionalDAO(connection);

        let listaProcedimentos = [];
        let estabelecimento = {};
        let profissionais = [];

        try {
            profissionais = await profissionalDAO.buscarProfissionalPorEstabelecimentoEsus(filtro.idEstabelecimento)
            estabelecimento = await estabelecimentoDAO.buscaEstabelecimentoESus(filtro.idEstabelecimento);
            listaProcedimentos = await integracaoESusDAO.listaProcedimentos(filtro);
        } catch (error) {
            console.log(error);
        } finally {
            await connection.close();
        }

        return preencheXMLFichaProcedimentos(listaProcedimentos, estabelecimento, profissionais);
    }

    async function listaAtividadeColetiva(filtro) {
        let tipoCampoData;

        if (filtro.idTipoPeriodo == 1) {
            tipoCampoData = 'dataCriacao'
        } else {
            tipoCampoData = 'dataFinalizacao'
        }

        const connection = await app.dao.connections.EatendConnection.connection();
        const integracaoESusDAO = new app.dao.IntegracaoESusDAO(connection, tipoCampoData);
        const estabelecimentoDAO = new app.dao.EstabelecimentoDAO(connection);
        const profissionalDAO = new app.dao.ProfissionalDAO(connection);

        let list = [];
        let estabelecimento = {};
        let profissionais = [];

        try {
            profissionais = await profissionalDAO.buscarProfissionalPorEstabelecimentoEsus(filtro.idEstabelecimento)
            estabelecimento = await estabelecimentoDAO.buscaEstabelecimentoESus(filtro.idEstabelecimento);
            list = await integracaoESusDAO.listaAtividadeColetiva(filtro);
        } catch (error) {
            console.log(error);
        } finally {
            await connection.close();
        }

        return preencheXMLAtividadeColetiva(list, estabelecimento, profissionais);
    }

    function preencheXMLCadastroIndividual(list, estabelecimento) {
        const { create } = require('xmlbuilder2');
        const { v4: uuidv4 } = require('uuid');
        let xmls = [];

        list.forEach(paciente => {
            let uuidFicha = uuidv4();

            let doc = create({ version: '1.0', encoding: 'UTF-8', standalone: 'yes' })
                .ele('ns3:dadoTransporteTransportXml', { 'xmlns:ns2': 'http://esus.ufsc.br/dadoinstalacao', 'xmlns:ns3': 'http://esus.ufsc.br/dadotransporte', 'xmlns:ns4': 'http://esus.ufsc.br/cadastroindividual' })
                .ele('uuidDadoSerializado').txt(uuidFicha).up()
                .ele('tipoDadoSerializado').txt('2').up()
                .ele('codIbge').txt(estabelecimento.codigo).up()
                .ele('cnesDadoSerializado').txt(estabelecimento.cnes).up()
                .ele('ns4:cadastroIndividualTransport')
                .ele('condicoesDeSaude').up()
                .ele('emSituacaoDeRua').up()
                .ele('fichaAtualizada').txt('false').up()
                .ele('identificacaoUsuarioCidadao')
                .ele('codigoIbgeMunicipioNascimento').txt(paciente.codigoIbgeMunicipioNascimento).up()
                .ele('dataNascimentoCidadao').txt(new Date(paciente.dataNascimento).getTime() / 1000).up()
                .ele('desconheceNomeMae').txt(paciente.desconheceNomeMae).up()
                .ele('emailCidadao').txt(paciente.email ? paciente.email : '').up()
                .ele('nacionalidadeCidadao').txt(paciente.idNacionalidadeSUS).up()
                .ele('nomeCidadao').txt(paciente.nome).up()
                .ele('nomeMaeCidadao').txt(paciente.desconheceNomeMae == 1 ? '' : paciente.nomeMae).up()
                .ele('cnsCidadao').txt(paciente.cnsCidadao ? paciente.cnsCidadao : undefined).up()
                .ele('cpfCidadao').txt(paciente.cnsCidadao ? undefined : paciente.cpfCidadao ? paciente.cpfCidadao : undefined).up()
                .ele('telefoneCelular').txt(paciente.foneCelular ? paciente.foneCelular : '').up()
                .ele('paisNascimento').txt(paciente.paisNascimento).up()
                .ele('racaCorCidadao').txt(paciente.idRacaSus ? paciente.idRacaSus : '1').up()
                .ele('sexoCidadao').txt(paciente.sexo).up()
                .ele('nomePaiCidadao').txt(paciente.desconheceNomePai == 1 ? '' : paciente.nomePai).up()
                .ele('desconheceNomePai').txt(paciente.desconheceNomePai).up()
                .up()
                .ele('informacoesSocioDemograficas').up()
                .ele('saidaCidadaoCadastro').up()
                .ele('statusTermoRecusaCadastroIndividualAtencaoBasica').txt('false').up()
                .ele('tpCdsOrigem').txt('3').up()
                .ele('uuid').txt(uuidFicha).up()
                .ele('uuidFichaOriginadora').txt(uuidFicha).up()
                .ele('headerTransport')
                .ele('profissionalCNS').txt(estabelecimento.cnsProfissionaleSus ? estabelecimento.cnsProfissionaleSus : '3').up()
                .ele('cboCodigo_2002').txt(estabelecimento.codigoCBO ? estabelecimento.codigoCBO : '3').up()
                .ele('cnes').txt(estabelecimento.cnes).up()
                .ele('dataAtendimento').txt(Date.now()).up()
                .ele('codigoIbgeMunicipio').txt(estabelecimento.codigo).up()
                .up()
                .up()
                .ele('ns2:remetente')
                .ele('contraChave').txt('E-ATENDE-VERSAO').up()
                .ele('uuidInstalacao').txt(uuidInstalacao).up()
                .ele('cpfOuCnpj').txt(estabelecimento.cnpj.replace(/[^0-9]+/g, '')).up()
                .ele('nomeOuRazaoSocial').txt(estabelecimento.nomeFantasia).up()
                .ele('versaoSistema').txt(versao).up()
                .ele('nomeBancoDados').txt('MySQL').up()
                .up()
                .ele('ns2:originadora')
                .ele('contraChave').txt('E-ATENDE-VERSAO').up()
                .ele('uuidInstalacao').txt(uuidInstalacao).up()
                .ele('cpfOuCnpj').txt(estabelecimento.cnpj.replace(/[^0-9]+/g, '')).up()
                .ele('nomeOuRazaoSocial').txt(estabelecimento.nomeFantasia).up()
                .ele('versaoSistema').txt(versao).up()
                .ele('nomeBancoDados').txt('MySQL').up()
                .up()
                .ele('versao', { major: major, minor: minor, revision: revision })
                .doc();

            let fieldToValidate = ['emailCidadao', 'nomeMaeCidadao', 'cnsCidadao', 'cpfCidadao', 'telefoneCelular', 'racaCorCidadao', 'nomePaiCidadao'];

            fieldToValidate.forEach(field => {
                doc.each(x => {
                    if (x.node.nodeName == field && !x.node._firstChild._data) {
                        x.node.removeChild(x.node._firstChild);
                        x.remove();
                    }
                }, true, true)
            })

            xmls.push(doc.doc().end({ prettyPrint: true, allowEmptyTags: false }));
        });

        return xmls;
    }

    function preencheXMLAtendimentoIndividual(list, estabelecimento, profissionais) {
        const { create, fragment } = require('xmlbuilder2');
        const { v4: uuidv4 } = require('uuid');

        let xmls = [];

        profissionais.forEach(profissional => {
            const listAtendimentos = list.atendimentos.filter(x => x.idProfissional == profissional.id);
            var uuidFicha = uuidv4();

            if (listAtendimentos.length == 0) { return; }

            let doc = create({ version: '1.0', encoding: 'UTF-8', keepNullNodes: false, keepNullAttributes: false })
                .ele('ns3:dadoTransporteTransportXml', { 'xmlns:ns2': 'http://esus.ufsc.br/dadoinstalacao', 'xmlns:ns3': 'http://esus.ufsc.br/dadotransporte', 'xmlns:ns4': 'http://esus.ufsc.br/fichaatendimentoindividualmaster' })
                .ele('uuidDadoSerializado').txt(uuidFicha).up()
                .ele('tipoDadoSerializado').txt('4').up()
                .ele('codIbge').txt(estabelecimento.codigo).up()
                .ele('cnesDadoSerializado').txt(estabelecimento.cnes).up()
                .ele('ns4:fichaAtendimentoIndividualMasterTransport')
                .ele('headerTransport')
                .ele('lotacaoFormPrincipal')
                .ele('profissionalCNS').txt(profissional.profissionalCNS ? profissional.profissionalCNS : '3').up()
                .ele('cboCodigo_2002').txt(profissional.codigoCBO ? profissional.codigoCBO : '3').up()
                .ele('cnes').txt(estabelecimento.cnes).up()
                .ele('dataAtendimento').txt(new Date(listAtendimentos[0].dataCriacao).getTime() / 1000).up()
                .ele('codigoIbgeMunicipio').txt(estabelecimento.codigo).up()
                .ele('ns2:remetente')
                .ele('contraChave').txt('E-ATENDE-VERSAO').up()
                .ele('uuidInstalacao').txt(uuidInstalacao).up()
                .ele('cpfOuCnpj').txt(estabelecimento.cnpj.replace(/[^0-9]+/g, '')).up()
                .ele('nomeOuRazaoSocial').txt(estabelecimento.nomeFantasia).up()
                .ele('versaoSistema').txt(versao).up()
                .ele('nomeBancoDados').txt('MySQL').up()
                .ele('ns2:originadora')
                .ele('contraChave').txt('E-ATENDE-VERSAO').up()
                .ele('uuidInstalacao').txt(uuidInstalacao).up()
                .ele('cpfOuCnpj').txt(estabelecimento.cnpj.replace(/[^0-9]+/g, '')).up()
                .ele('nomeOuRazaoSocial').txt(estabelecimento.nomeFantasia).up()
                .ele('versaoSistema').txt(versao).up()
                .ele('nomeBancoDados').txt('MySQL').up()
                .ele('versao', { major: major, minor: minor, revision: revision })
                .doc();

            var qtdAtendimentosValidos = listAtendimentos.length;

            listAtendimentos.forEach(atendimento => {

                const listAvaliacao = list.condicaoAvaliacao.filter(x => x.idAtendimento == atendimento.idAtendimento);
                const listCondutas = list.condutaSus.filter(x => x.idAtendimento == atendimento.idAtendimento);

                if (!listAvaliacao.some((o) => o.idAtendimento == atendimento.idAtendimento) || !listCondutas.some((o) => o.idAtendimento == atendimento.idAtendimento)) {
                    qtdAtendimentosValidos--;
                    return;
                }

                let avaliacao = preencheAvaliacaoAtendimentoIndividual(listAvaliacao, atendimento.idAtendimento);
                let condutas = preencheCondutasAtendimentoIndividual(listCondutas, atendimento.idAtendimento)

                let atend = fragment({ keepNullAttributes: false, keepNullNodes: false }).ele('atendimentosIndividuais')
                    .ele('cnsCidadao').txt(atendimento.cartaoSus ? atendimento.cartaoSus : undefined).up()
                    .ele('cpfCidadao').txt(atendimento.cartaoSus ? undefined : atendimento.cpfCidadao ? atendimento.cpfCidadao : undefined).up()
                    .ele('dataNascimento').txt(new Date(atendimento.dataNascimento).getTime() / 1000).up()
                    .ele('localDeAtendimento').txt(atendimento.localDeAtendimentoSus ? atendimento.localDeAtendimentoSus : '').up()
                    .ele('sexo').txt(atendimento.sexo).up()
                    .ele('alturaAcompanhamentoNutricional').txt(atendimento.altura).up()
                    .ele('pesoAcompanhamentoNutricional').txt(atendimento.peso).up()
                    .ele('turno').txt(atendimento.turno).up()
                    .ele('tipoAtendimento').txt(atendimento.tipoAtendimentoSus ? atendimento.tipoAtendimentoSus : undefined).up()
                    .import(avaliacao);

                condutas.forEach(x => atend.find(x => x.node.nodeName == 'atendimentosIndividuais', true, true).import(x));

                atend.ele('dataHoraInicialAtendimento').txt(new Date(atendimento.dataCriacao).getTime() / 1000).up()
                    .ele('dataHoraFinalAtendimento').txt(new Date(atendimento.dataFinalizacao).getTime() / 1000).up()
                    .up();

                doc.find(x => x.node.nodeName == 'ns4:fichaAtendimentoIndividualMasterTransport', true, true).import(atend);

                let fieldToValidate = ['cpfCidadao', 'cnsCidadao', 'localDeAtendimento', 'tipoAtendimento'];

                fieldToValidate.forEach(field => {
                    doc.each(x => {
                        if (x.node.nodeName == field && !x.node._firstChild._data) {
                            x.node.removeChild(x.node._firstChild);
                            x.remove();
                        }
                    }, true, true)
                })
            })

            if (qtdAtendimentosValidos == 0) { return; }

            doc.find(x => x.node.nodeName == 'ns4:fichaAtendimentoIndividualMasterTransport', true, true).ele('tpCdsOrigem').txt('3').up().ele('uuidFicha').txt(uuidFicha).up();

            xmls.push(doc.doc().end({ prettyPrint: true, allowEmptyTags: false }));
        })

        return xmls;
    }

    function preencheAvaliacaoAtendimentoIndividual(listAvaliacao, idAtendimento) {
        const { fragment } = require('xmlbuilder2');
        let avaliacao = fragment().ele('problemaCondicaoAvaliada');

        const listaAvaliacaoAtendimento = listAvaliacao.filter(x => x.idAtendimento == idAtendimento);
        const cid10 = fragment().ele('cid10').txt(listaAvaliacaoAtendimento[0].cid_10).up();
        avaliacao.import(cid10);

        if (listaAvaliacaoAtendimento.length > 1) {
            const cid10_2 = fragment().ele('cid10_2').txt(listaAvaliacaoAtendimento[1].cid_10).up();
            avaliacao.import(cid10_2);
        }

        return avaliacao.up();
    }

    function preencheCondutasAtendimentoIndividual(listCondutas, idAtendimento) {
        const { fragment } = require('xmlbuilder2');
        let conduta = []
        listCondutas.forEach(x => {
            if (x.idAtendimento == idAtendimento) {
                let c = fragment().ele('condutas').txt(x.condutas).up()
                conduta.push(c);
            }
        })
        return conduta
    }

    function preencheXMLFichaVacinacao(list, estabelecimento, profissionais) {
        const { create, fragment } = require('xmlbuilder2');
        const { v4: uuidv4 } = require('uuid');

        let xmls = [];

        profissionais.forEach(profissional => {
            const listVacinas = list.vacinas.filter(x => x.idProfissional == profissional.id);
            let uuidFicha = uuidv4();

            if (listVacinas.length == 0) { return; } //|| (!profissional.profissionalCNS || !profissional.codigoCBO)

            let doc = create({ version: '1.0', encoding: 'UTF-8', standalone: 'yes' })
                .ele('ns3:dadoTransporteTransportXml', { 'xmlns:ns2': 'http://esus.ufsc.br/dadoinstalacao', 'xmlns:ns3': 'http://esus.ufsc.br/dadotransporte', 'xmlns:ns4': 'http://esus.ufsc.br/fichavacinacaomaster' })
                .ele('uuidDadoSerializado').txt(uuidFicha).up()
                .ele('tipoDadoSerializado').txt('14').up()
                .ele('codIbge').txt(estabelecimento.codigo).up()
                .ele('cnesDadoSerializado').txt(estabelecimento.cnes).up()
                .ele('ns4:fichaVacinacaoMasterTransport')
                .ele('headerTransport')
                .ele('profissionalCNS').txt(profissional.profissionalCNS ? profissional.profissionalCNS : '3').up()
                .ele('cboCodigo_2002').txt(profissional.codigoCBO ? profissional.codigoCBO : '3').up()
                .ele('cnes').txt(estabelecimento.cnes).up()
                .ele('dataAtendimento').txt(new Date(listVacinas[0].dataCriacao).getTime() / 1000).up()
                .ele('codigoIbgeMunicipio').txt(estabelecimento.codigo).up()
                .up()
                .ele('uuidFicha').txt(uuidFicha).up()
                .ele('tpCdsOrigem').txt('3').up()
                .up()
                .ele('ns2:remetente')
                .ele('contraChave').txt('E-ATENDE-VERSAO').up()
                .ele('uuidInstalacao').txt(uuidInstalacao).up()
                .ele('cpfOuCnpj').txt(estabelecimento.cnpj.replace(/[^0-9]+/g, '')).up()
                .ele('nomeOuRazaoSocial').txt(estabelecimento.nomeFantasia).up()
                .ele('versaoSistema').txt(versao).up()
                .ele('nomeBancoDados').txt('MySQL').up()
                .up()
                .ele('ns2:originadora')
                .ele('contraChave').txt('E-ATENDE-VERSAO').up()
                .ele('uuidInstalacao').txt(uuidInstalacao).up()
                .ele('cpfOuCnpj').txt(estabelecimento.cnpj.replace(/[^0-9]+/g, '')).up()
                .ele('nomeOuRazaoSocial').txt(estabelecimento.nomeFantasia).up()
                .ele('versaoSistema').txt(versao).up()
                .ele('nomeBancoDados').txt('MySQL').up()
                .up()
                .ele('versao', { major: major, minor: minor, revision: revision })
                .doc();

            listVacinas.forEach(vacina => {
                const listVacinaChild = list.vacinaChild.filter(x => x.idReceita == vacina.idReceita);

                if (listVacinaChild.length == 0) { return; }

                let vac = fragment().ele('vacinacoes')
                    .ele('turno').txt(vacina.turno).up()
                    .ele('cnsCidadao').txt(vacina.cartaoSus ? vacina.cartaoSus : '').up()
                    .ele('cpfCidadao').txt(vacina.cartaoSus ? '' : vacina.cpfCidadao ? vacina.cpfCidadao : '').up()
                    .ele('dtNascimento').txt(new Date(vacina.dataNascimento).getTime() / 1000).up()
                    .ele('sexo').txt(vacina.sexo).up()
                    .ele('localAtendimento').txt(vacina.localDeAtendimentoSus ? vacina.localDeAtendimentoSus : '').up()
                    .ele('viajante').txt(vacina.viajante).up()
                    .ele('gestante').txt(vacina.gestante).up()
                    .ele('puerpera').txt(vacina.puerpera).up();

                let child = preencheVacinasChild(listVacinaChild, vacina.idReceita);
                child.forEach(x => vac.import(x));

                vac.ele('dataHoraInicialAtendimento').txt(new Date(vacina.dataCriacao).getTime() / 1000).up()
                    .ele('dataHoraFinalAtendimento').txt(new Date(vacina.dataUltimaDispensacao).getTime() / 1000).up()
                    .up();

                doc.find(x => x.node.nodeName == 'ns4:fichaVacinacaoMasterTransport', true, true).import(vac);

                let fieldToValidate = ['cpfCidadao', 'cnsCidadao', 'localDeAtendimento'];

                fieldToValidate.forEach(field => {
                    doc.each(x => {
                        if (x.node.nodeName == field && !x.node._firstChild._data) {
                            x.node.removeChild(x.node._firstChild);
                            x.remove();
                        }
                    }, true, true)
                })
            })

            xmls.push(doc.doc().end({ prettyPrint: true }));
        });

        return xmls
    }

    function preencheVacinasChild(vacina, idReceita) {
        const { fragment } = require('xmlbuilder2');
        let vac = []

        vacina.forEach(x => {
            if (x.idReceita == idReceita) {
                let frag = fragment().ele('vacinas')
                    .ele('imunobiologico').txt(x.codigoVacinaSus).up()
                    .ele('estrategiaVacinacao').txt(x.estrategiaVacinacao).up()
                    .ele('dose').txt(x.qtdPrescrita).up()
                    .ele('lote').txt(x.lote).up()
                    .ele('fabricante').txt(x.nome).up()
                    .up()
                vac.push(frag);
            }
        })
        return vac;
    }

    function preencheXMLFichaProcedimentos(list, estabelecimento, profissionais) {
        const { create, fragment } = require('xmlbuilder2');
        const { v4: uuidv4 } = require('uuid');

        let xmls = [];

        profissionais.forEach(profissional => {
            const listProcedimento = list.atendimentos.filter(x => x.idProfissional == profissional.id);
            var uuidFicha = uuidv4();

            if (listProcedimento.length == 0) { return; } //|| (!profissional.profissionalCNS || !profissional.codigoCBO)

            let doc = create({ version: '1.0', encoding: 'UTF-8', standalone: 'yes' })
                .ele('ns3:dadoTransporteTransportXml', { 'xmlns:ns2': 'http://esus.ufsc.br/dadoinstalacao', 'xmlns:ns3': 'http://esus.ufsc.br/dadotransporte', 'xmlns:ns4': 'http://esus.ufsc.br/fichaprocedimentomaster' })
                .ele('uuidDadoSerializado').txt(uuidFicha).up()
                .ele('tipoDadoSerializado').txt('7').up()
                .ele('codIbge').txt(estabelecimento.codigo).up()
                .ele('cnesDadoSerializado').txt(estabelecimento.cnes).up()
                .ele('ns4:fichaProcedimentoMasterTransport')
                .ele('headerTransport')
                .ele('profissionalCNS').txt(profissional.profissionalCNS ? profissional.profissionalCNS : '3').up()
                .ele('cboCodigo_2002').txt(profissional.codigoCBO ? profissional.codigoCBO : '3').up()
                .ele('cnes').txt(estabelecimento.cnes).up()
                .ele('dataAtendimento').txt(new Date(listProcedimento[0].dataCriacao).getTime() / 1000).up()
                .ele('codigoIbgeMunicipio').txt(estabelecimento.codigo).up()
                .up()
                .up()
                .ele('ns2:remetente')
                .ele('contraChave').txt('E-ATENDE-VERSAO').up()
                .ele('uuidInstalacao').txt(uuidInstalacao).up()
                .ele('cpfOuCnpj').txt(estabelecimento.cnpj.replace(/[^0-9]+/g, '')).up()
                .ele('nomeOuRazaoSocial').txt(estabelecimento.nomeFantasia).up()
                .ele('versaoSistema').txt(versao).up()
                .ele('nomeBancoDados').txt('MySQL').up()
                .up()
                .ele('ns2:originadora')
                .ele('contraChave').txt('E-ATENDE-VERSAO').up()
                .ele('uuidInstalacao').txt(uuidInstalacao).up()
                .ele('cpfOuCnpj').txt(estabelecimento.cnpj.replace(/[^0-9]+/g, '')).up()
                .ele('nomeOuRazaoSocial').txt(estabelecimento.nomeFantasia).up()
                .ele('versaoSistema').txt(versao).up()
                .ele('nomeBancoDados').txt('MySQL').up()
                .up()
                .ele('versao', { major: major, minor: minor, revision: revision })
                .doc();

            listProcedimento.forEach(atendimento => {
                const listProcedimentoChild = list.procedimentos.filter(x => x.idAtendimento == atendimento.idAtendimento);

                if (listProcedimentoChild.length == 0) { return; }

                let proc = fragment().ele('atendProcedimentos')
                    .ele('cnsCidadao').txt(atendimento.cartaoSus ? atendimento.cartaoSus : '').up()
                    .ele('cpfCidadao').txt(atendimento.cartaoSus ? '' : atendimento.cpfCidadao ? atendimento.cpfCidadao : '').up()
                    .ele('dtNascimento').txt(new Date(atendimento.dataNascimento).getTime() / 1000).up()
                    .ele('sexo').txt(atendimento.sexo).up()
                    .ele('localAtendimento').txt(atendimento.localDeAtendimentoSus ? atendimento.localDeAtendimentoSus : '').up()
                    .ele('turno').txt(atendimento.turno).up()
                    .ele('statusEscutaInicialOrientacao').txt(false).up()

                let child = preencheProcedimentos(listProcedimentoChild);
                child.forEach(x => proc.import(x));

                proc.ele('dataHoraInicialAtendimento').txt(new Date(atendimento.dataCriacao).getTime() / 1000).up()
                    .ele('dataHoraFinalAtendimento').txt(new Date(atendimento.dataFinalizacao).getTime() / 1000).up()
                    .up();

                doc.find(x => x.node.nodeName == 'ns4:fichaProcedimentoMasterTransport', true, true).import(proc);

                let fieldToValidate = ['cpfCidadao', 'cnsCidadao', 'localDeAtendimento'];

                fieldToValidate.forEach(field => {
                    doc.each(x => {
                        if (x.node.nodeName == field && !x.node._firstChild._data) {
                            x.node.removeChild(x.node._firstChild);
                            x.remove();
                        }
                    }, true, true)
                })
            })

            doc.find(x => x.node.nodeName == 'ns4:fichaProcedimentoMasterTransport', true, true).ele('uuidFicha').txt(uuidFicha).up()
                .ele('tpCdsOrigem').txt('3').up()
                .ele('numTotalAfericaoPa').txt('1').up()
                .ele('numTotalAfericaoTemperatura').txt('1').up()
                .ele('numTotalMedicaoAltura').txt('1').up()
                .ele('numTotalMedicaoPeso').txt('1').up();

            xmls.push(doc.doc().end({ prettyPrint: true }));
        });

        return xmls
    }

    function preencheXMLAtividadeColetiva(list, estabelecimento, profissionais) {
        const { create, fragment } = require('xmlbuilder2');
        const { v4: uuidv4 } = require('uuid');

        let xmls = [];

        list.atendimentos.forEach(atendimento => {
            var uuidFicha = uuidv4();

            const profissional = profissionais.filter(x => x.id == atendimento.idProfissional);

            let doc = create({ version: '1.0', encoding: 'UTF-8', keepNullNodes: false, keepNullAttributes: false })
                .ele('ns3:dadoTransporteTransportXml', { 'xmlns:ns2': 'http://esus.ufsc.br/dadoinstalacao', 'xmlns:ns3': 'http://esus.ufsc.br/dadotransporte', 'xmlns:ns4': 'http://esus.ufsc.br/fichaatividadecoletiva' })
                .ele('uuidDadoSerializado').txt(uuidFicha).up()
                .ele('tipoDadoSerializado').txt('6').up()
                .ele('codIbge').txt(estabelecimento.codigo).up()
                .ele('cnesDadoSerializado').txt(estabelecimento.cnes).up()
                .ele('ns4:fichaAtividadeColetivaTransport')
                .ele('uuidFicha').txt(uuidFicha).up()
                .ele('inep').txt(atendimento.inep).up()
                .ele('numParticipantes').txt(atendimento.numParticipantes).up()
                .ele('profissionais')
                .ele('cnsProfissional').txt(profissional[0].profissionalCNS).up()
                .ele('codigoCbo2002').txt(profissional[0].codigoCBO).up()
                .up()
                .ele('atividadeTipo').txt(atendimento.atividadeTipo).up()
                .ele('publicoAlvo').txt(atendimento.publicoAlvo).up()
                .ele('participantes')
                .ele('cnsParticipante').txt(atendimento.cartaoSus).up()
                .ele('dataNascimento').txt(new Date(atendimento.dataNascimento).getTime() / 1000).up()
                .ele('sexo').txt(atendimento.sexo).up()
                .up()
                .ele('tbCdsOrigem').txt('3').up()
                .ele('procedimento').txt(atendimento.codigoSIGTAP).up()
                .ele('turno').txt(atendimento.turno).up()
                .ele('pseEducacao').txt(atendimento.pseEducacao).up()
                .ele('pseSaude').txt(atendimento.pseSaude).up()
                .ele('headerTransport')
                .ele('profissionalCNS').txt(estabelecimento.cnsProfissionaleSus ? estabelecimento.cnsProfissionaleSus : '3').up()
                .ele('cboCodigo_2002').txt(estabelecimento.codigoCBO ? estabelecimento.codigoCBO : '3').up()
                .ele('cnes').txt(estabelecimento.cnes).up()
                .ele('dataAtendimento').txt(Date.now()).up()
                .ele('codigoIbgeMunicipio').txt(estabelecimento.codigo).up()
                .up()
                .ele('temasParaSaude').txt(atendimento.temasParaSaude).up()
                .ele('praticasEmSaude').txt(atendimento.praticasEmSaude).up()
                .up()
                .ele('ns2:remetente')
                .ele('contraChave').txt('E-ATENDE-VERSAO').up()
                .ele('uuidInstalacao').txt(uuidInstalacao).up()
                .ele('cpfOuCnpj').txt(estabelecimento.cnpj.replace(/[^0-9]+/g, '')).up()
                .ele('nomeOuRazaoSocial').txt(estabelecimento.nomeFantasia).up()
                .ele('versaoSistema').txt(versao).up()
                .ele('nomeBancoDados').txt('MySQL').up()
                .up()
                .ele('ns2:originadora')
                .ele('contraChave').txt('E-ATENDE-VERSAO').up()
                .ele('uuidInstalacao').txt(uuidInstalacao).up()
                .ele('cpfOuCnpj').txt(estabelecimento.cnpj.replace(/[^0-9]+/g, '')).up()
                .ele('nomeOuRazaoSocial').txt(estabelecimento.nomeFantasia).up()
                .ele('versaoSistema').txt(versao).up()
                .ele('nomeBancoDados').txt('MySQL').up()
                .up()
                .ele('versao', { major: major, minor: minor, revision: revision })
                .doc();

            //CAMPO = PROFISSIONAIS
            // Não pode ser preenchido se pseEducacao = true e pseSaude = false
            if (atendimento.pseEducacao == 1 && atendimento.pseSaude == 0) {
                removeChild(doc.doc(), ['profissionais'])
            }

            // CAMPO = publicoAlvo
            // Não pode ser preenchido se atividadeTipo for 1, 2 ou 3
            if (atendimento.atividadeTipo == 1 || atendimento.atividadeTipo == 2 || atendimento.atividadeTipo == 3) {
                removeChild(doc.doc(), ['publicoAlvo'])
                removeChild(doc.doc(), ['temasParaSaude'])
            }

            // CAMPO = procedimento
            // Só pode ser preenchido se o campo praticasEmSaude possuir o valor 30.
            if (atendimento.praticasEmSaude != 30) {
                removeChild(doc.doc(), ['procedimento'])
            }

            // CAMPO = praticasEmSaude
            // Não pode ser preenchido se atividadeTipo for 1, 2 ou 3
            if (atendimento.atividadeTipo == 1 || atendimento.atividadeTipo == 2 || atendimento.atividadeTipo == 3 || atendimento.atividadeTipo == 4 || atendimento.atividadeTipo == 7) {
                removeChild(doc.doc(), ['praticasEmSaude'])
            }

            xmls.push(doc.doc().end({ prettyPrint: true, allowEmptyTags: false }));
        })

        return xmls;
    }

    function preencheProcedimentos(listProcedimento) {
        const { fragment } = require('xmlbuilder2');
        let procedimentos = []
        listProcedimento.forEach(x => {
            let c = fragment().ele('procedimentos').txt(x.co_procedimento).up()
            procedimentos.push(c);
        })
        return procedimentos
    }

    function generateZipFiles(docs, prefixoNome) {
        const AdmZip = require('adm-zip');

        let zip = new AdmZip();
        let i = 1;
        docs.forEach(x => {
            zip.addFile(`${prefixoNome + '-' + i}.esus.xml`, new Buffer.from(x));
            i++;
        })

        return zip.toBuffer();
    }

    async function configTipoFicha(tipoficha) {
        let configuracaoFicha = {};
        configuracaoFicha = await buscarPorId(tipoficha);
        versao = configuracaoFicha.versaoSistema
        uuidInstalacao = configuracaoFicha.uuidInstalacao
        major = configuracaoFicha.major
        minor = configuracaoFicha.minor
        revision = configuracaoFicha.revision
    }

    function removeChild(doc, fieldToValidate) {
        fieldToValidate.forEach(field => {
            doc.each(x => {
                if (x.node.nodeName == field && !x.node._firstChild._data) {
                    x.node.removeChild(x.node._firstChild);
                    x.remove();
                }
            }, true, true)
        })
    }

}