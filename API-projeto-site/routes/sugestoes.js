var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Publicacao = require('../models').Publicacao;
var sugestoes = require('../models').sugestoes;

/* ROTA DE CRIAÇÃO DE SUGESTÃO */
router.post('/sugestoes/:idUsuario', function(req, res, next) {
    console.log("Iniciando sugestao...")
    
	let idUsuario = req.params.idUsuario;

    Publicacao.create({
        descricao: req.body.descricao,
        fkUsuario: idUsuario
    }).then(resultado => {
        console.log("Post realizado com sucesso!!");
        res.send(resultado);
    }).catch(erro => {
        console.log('DEU UM ERRINHO')
        console.error(erro);
        res.status(500).send(erro.message);
    })
});

/* ROTA QUE RECUPERA TODAS AS SUGESTOES */
router.get('/', function(req, res, next) {
	console.log('Recuperando todas as sugestoes');
	
    let instrucaoSql = `SELECT u.nome, 
    descricao FROM sugestoes as s INNER JOIN usuario_gameswiki as u
    ON s.fkUsuario = u.idUsuario
    ORDER BY s.idsugestao DESC`;

	sequelize.query(instrucaoSql, {
		model: sugestoes,
		mapToModel: true 
	})
	.then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

module.exports = router;