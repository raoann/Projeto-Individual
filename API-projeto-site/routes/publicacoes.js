var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Publicacao = require('../models').Publicacao;
// var sugestoes = require('../models').sugestoes;

/* ROTA QUE RECUPERA CRIA UMA PUBLICAÇÃO */
router.post('/publicar/:idUsuario', function(req, res, next) {
    console.log("Iniciando Publicação...")
    
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
    });
});

// /* ROTA DE CRIAÇÃO DE SUGESTÃO */
// router.post('/sugestoes/:idUsuario', function(req, res, next) {
//     console.log("Iniciando sugestao...")
    
// 	let idUsuario = req.params.idUsuario;

//     Publicacao.create({
//         descricao: req.body.descricao,
//         fkUsuario: idUsuario
//     }).then(resultado => {
//         console.log("Post realizado com sucesso!!");
//         res.send(resultado);
//     }).catch(erro => {
//         console.log('DEU UM ERRINHO')
//         console.error(erro);
//         res.status(500).send(erro.message);
//     })
// });

/* ROTA QUE RECUPERA TODAS AS PUBLICAÇÕES */
router.get('/', function(req, res, next) {
	console.log('Recuperando todas as publicações');
	
    let instrucaoSql = `SELECT usuario.nome, 
    descricao FROM publicacao as publi INNER 
	JOIN usuario_gameswiki as usuario
    ON publi.fkUsuario = usuario.idUsuario
    ORDER BY publi.idcomentario DESC`;

	sequelize.query(instrucaoSql, {
		model: Publicacao,
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

// /* ROTA QUE RECUPERA TODAS AS SUGESTOES */
// router.get('/', function(req, res, next) {
// 	console.log('Recuperando todas as sugestoes');
	
//     let instrucaoSql = `SELECT u.nome, 
//     descricao FROM sugestoes as s INNER JOIN usuario_gameswiki as u
//     ON s.fkUsuario = u.idUsuario
//     ORDER BY s.idsugestao DESC`;

// 	sequelize.query(instrucaoSql, {
// 		model: sugestoes,
// 		mapToModel: true 
// 	})
// 	.then(resultado => {
// 		console.log(`Encontrados: ${resultado.length}`);
// 		res.json(resultado);
// 	}).catch(erro => {
// 		console.error(erro);
// 		res.status(500).send(erro.message);
// 	});
// });


/* ROTA QUE RECUPERA AS PUBLICAÇÕES DE UM USUÁRIO PELO ID */
router.get('/:idUsuario', function(req, res, next) {
	console.log('Recuperando todas as publicações');
	
	var idUsuario = req.params.idUsuario;

    let instrucaoSql = `SELECT 
    usuario_gameswiki.nome,
    descricao
    FROM comentarios
    INNER JOIN usuario_gameswiki
    ON comentarios.fkUsuario = usuario_gameswiki.idUsuario
    WHERE fkUsuario = ${idUsuario}
    ORDER BY comentarios.idcomentario DESC`;

	sequelize.query(instrucaoSql, {
		model: Publicacao,
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
