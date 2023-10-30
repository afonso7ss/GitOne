const express = require("express");
const querystring = require("querystring");
const app = express();

// Adicione um estilo CSS incorporado para a página
const style = `
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
        }
        h1 {
            color: #333;
        }
        .product-list {
            list-style-type: none;
            padding: 0;
        }
        .product-list-item {
            margin: 10px;
            padding: 10px;
            border: 1px solid #ccc;
            background-color: #f7f7f7;
            border-radius: 5px;
        }
        a {
            text-decoration: none;
            color: #007bff;
        }
    </style>
`;

// Lista de produtos
const products = [ 
    
];

// Função para verificar se um produto está na lista
function isProductInList(productName) {
    return products.includes(productName);
}

// Criando a rota inicial
app.get("/", function(req, res) {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Home Page</title>
            ${style}
        </head>
        <body>
            <h1>Bem vindo ao trabalho nuvem!</h1>
            <a href="/produtos"><button>Lista de Produtos</button></a>
            <form action="/consulta" method="get">
                <input type="text" name="parametro" placeholder="Nome do Produto">
                <button type="submit">Consultar Produto</button>
            </form>
            <form action="/cadastro" method="get">
                <input type="text" name="nome" placeholder="Nome do Produto">
                <button type="submit">Cadastrar Produto</button>
            </form>
        </body>
        </html>
    `);
});


// Rota do cadastro de produtos
app.get("/produtos", function(req, res) {
    const productList = products.map(product => `
        <li class="product-list-item">${product}</li>
    `).join('');
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Lista de Produtos</title>
            ${style}
        </head>
        <body>
            <h1>Lista de Produtos</h1>
            <ul class="product-list">
                ${productList}
            </ul>
            <a href="/">Voltar para a Página Inicial</a>
        </body>
        </html>
    `);
});

// Rota com parâmetro
app.get("/consulta", function(req, res) {
    const parametro = req.query.parametro;
    const isInList = isProductInList(parametro);
    const message = isInList ? `O produto ${parametro} está na lista de produtos.` : `O produto ${parametro} não está na lista de produtos.`;
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Consulta de Produto</title>
            ${style}
        </head>
        <body>
            <h1>${message}</h1>
            <a href="/">Voltar para a Página Inicial</a>
        </body>
        </html>
    `);
});

// Rota de cadastro com parâmetro opcional para adicionar produtos à lista
app.get("/cadastro", function(req, res) {
    const nome = req.query.nome;
    if (nome) {
        if (!isProductInList(nome)) {
            // Adicione o novo produto à lista
            products.push(nome);
        }

        // Redirecione para a página de consulta
        res.redirect(`/consulta?parametro=${nome}`);
    } else {
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Cadastro de Produto</title>
                ${style}
            </head>
            <body>
                <h1>Produto criado!</h1>
                <a href="/">Voltar para a Página Inicial</a>
            </body>
            </html>
        `);
    }
});

app.listen(process.env.PORT ?? 3000, function(erro) {
    if (erro) {
        console.log("Erro ao Iniciar.");
    } else {
        console.log("Servidor Iniciado.");
    }
});
