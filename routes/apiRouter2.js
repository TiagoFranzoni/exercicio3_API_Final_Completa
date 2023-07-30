const express = require('express');
const routerAPI2 = express.Router();
const jwt = require('jsonwebtoken');

const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig.development);

// processa o corpo da requisição e insere os dados recebidos 
// como atributos de req.body
routerAPI2.use(express.json());
routerAPI2.use(express.urlencoded({ extended: true }))

const checkToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: 'Token inválido' })
        }
        else {
            req.id = decoded.id;
            req.roles = decoded.roles;
            next();
        }
    })
}

const isAdmin = (req, res, next) => {
    if (req.roles.indexOf('ADMIN') >= 0) {
        next();
    }
    else {
        res.status(403).json({ message: 'Acesso negado' })
    }
}

routerAPI2.get('/produtos', checkToken, (req, res) => {
    knex('produtos').then((dados) => {
        res.json(dados);
    })
        .catch((err) => {
            res.json({ message: `Erro ao obter os produtos: ${err.message}` })
        })
})

routerAPI2.get('/produtos/:id', checkToken, (req, res) => {
    knex('produtos')
        .where('id', req.params.id)
        .then((dados) => {
            res.json(dados);
        })
        .catch((err) => {
            res.json({ message: `Erro ao obter os produtos: ${err.message}` })
        })
})

routerAPI2.post('/produtos', checkToken, isAdmin, (req, res) => {
    knex('produtos')
        .insert(req.body, 'id')
        .then((dados) => {
            if (dados.length > 0) {
                res.status(201).json({
                    message: 'Produto adicionado com sucesso.',
                    data: { id: dados[0].id }
                });
            }
        })
        .catch((err) => {
            res.json({ message: `Erro ao inserir o produto: ${err.message}` })
        });
})

routerAPI2.put('/produtos/:id', checkToken, isAdmin, (req, res) => {
    knex('produtos')
        .where('id', req.params.id)
        .update(req.body)
        .then((dados) => {
            if (dados) {
                res.status(200).json({
                    message: 'Produto modificado com sucesso.'
                });
            }
        })
        .catch((err) => {
            res.json({ message: `Erro ao modificar o produto: ${err.message}` })
        });
})

routerAPI2.delete('/produtos/:id', checkToken, isAdmin, (req, res) => {
    knex('produtos')
        .where('id', req.params.id)
        .del()
        .then((dados) => {
            if (dados) {
                res.status(200).json({
                    message: 'Produto deletado com sucesso'
                });
            }
        })
        .catch((err) => {
            res.json({ message: `Erro ao deletar o produto: ${err.message}` })
        });
})

module.exports = routerAPI2;