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
    "Produto 1",
    "Produto 2",
    "Produto 3",
    "Produto 4",
    "Produto 5"
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
            <h1>Welcome to the Home Page!</h1>
            <a href="/produtos">Ver Produtos</a>
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
app.get("/consulta/:parametro", function(req, res) {
    const parametro = req.params.parametro;
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
app.get("/cadastro/:nome?", function(req, res) {
    const nome = req.params.nome;
    if (nome) {
        if (!isProductInList(nome)) {
            // Adicione o novo produto à lista
            products.push(nome);
        }

        // Redirecione para a página de consulta
        res.redirect(`/consulta/${nome}`);
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
