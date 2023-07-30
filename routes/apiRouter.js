const express = require('express');
const routerAPI = express.Router();

// Declara um array de produtos com id, decsrição, marca e preço
const produtos = [
    { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João"  },
    { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans"  },
    { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé"  },
    { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps"  },
    { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé"  }
]

// processa o corpo da requisição e insere os dados recebidos 
// como atributos de req.body
routerAPI.use(express.json());
routerAPI.use(express.urlencoded({ extended: true }))

routerAPI.get ('/produtos', (req, res) => {
    res.json (produtos);
})

routerAPI.get ('/produtos/:id', (req, res) => {
    let produto = produtos.find (p => p.id == req.params.id);
    res.json (produto);
})

routerAPI.post('/produtos', (req, res) => {
    req.body.id = Math.max(...produtos.map(o => o.id)) + 1;
    produtos.push (req.body);

    res.status(201).json( { 
        message: 'Produto adicionado com sucesso',
        data: { id: req.body.id } });  
})

routerAPI.put('/produtos/:id', (req, res) => {
    let produto = produtos.find (p => p.id == req.params.id);
    produto.descricao = req.body.descricao;
    produto.valor = req.body.valor;
    produto.marca = req.body.marca;

    res.status(200).json( { 
        message: 'Produto modificado com sucesso',
        data: { produtos } });  
})

routerAPI.delete('/produtos/:id', (req, res) => {
    let indexproduto = produtos.indexOf (p => p.id == req.params.id);
    produtos.splice(indexproduto, 1);

    res.status(200).json( { 
        message: 'Produto deletado com sucesso',
        data: { produtos } });  
})

module.exports = routerAPI;