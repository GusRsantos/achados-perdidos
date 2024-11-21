//Configuração express
const express = require('express')
const app = express()
const port = 5000

// Configuração banco
const mysql = require('mysql2')

// Variáveis para o file upload
const fileUpload = require('express-fileupload')
app.use(fileUpload())

//Ler o body e transformar em JSON
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

// Código pro CORS funcionar
const cors = require('cors')
app.use(cors())

//Rota para criação de usuário
app.post("/usuario/criar", (req, res) => {
    const nome = req.body.nome
    const cpf = req.body.cpf
    const senha = req.body.senha
    const tipo = req.body.tipo

    const sql = `INSERT INTO usuario (nome_usuario, cpf_usuario, senha_usuario, tipo_usuario) VALUES ('${nome}', '${cpf}', '${senha}', '${tipo}')`

    conn.query(sql, (erro) => {
        if (erro) {
            console.log(erro)
            res.status(500).json(erro.sqlMessage).end()
        }
        else {
            res.status(200).json("Cadastro efetuado").end()
        }
    })
})


//Rota pro login
app.get("/usuario/entrar", (req, res) => {
    const cpf = req.query.cpf
    const senha = req.query.senha

    const sql = `SELECT * FROM usuario WHERE cpf_usuario = '${cpf}' AND senha_usuario = '${senha}'`

    conn.query(sql, (erro, result) => {
        if (erro) {
            console.log(erro)
            res.status(500).json(erro).end()
        }
        else {
            //Se a consulta não retornar resultados, significa que aquele usuário ou senha são incorretas
            if (result.length === 0) {
                res.status(500).json("Usuário ou senha incorretas").end()
            }
            //Se achar alguém manda esse registro pro front
            else {
                res.status(200).json(JSON.stringify(result)).end()
            }
        }
    })
})

//Rota de usuarios
app.get("/usuario", (req, res) => {
    const sql = `SELECT * FROM usuario`
    conn.query(sql, (erro, dados) => {
        if (erro) {
            res.status(500).json(erro).end()
        }
        else {
            res.status(200).json(dados).end()
        }
    })
})


//Rota de objetos
app.get("/objetos", (req, res) => {
    const sql = `SELECT * FROM objeto`
    conn.query(sql, (erro, dados) => {
        if (erro) {
            res.status(500).json(erro).end()
        }
        else {
            res.status(200).json(dados).end()
        }
    })
})


//Rota pra conseguir acessar a pasta de imagens no back
app.use("/images", express.static(__dirname + "/images"))
//Rota para criar produtos
app.post("/objetos/criar", (req, res) => {
    const nome = req.body.nome
    const hora = req.body.hora
    const descricao = req.body.descricao
    const img = Date.now().toString() + "_" + req.files.imagem.name

    req.files.imagem.mv(__dirname + "/images/" + img)

    const sql = `INSERT INTO objeto (nome_objeto, hora_entrada, descricao, foto) VALUES ('${nome}', 
'${hora}', '${descricao}', '${img}')`

    conn.query(sql, (erro, dados) => {
        if (erro) {
            res.status(500).json(erro.sqlMessage).end()
        }
        else {
            res.status(200).json("Produto Cadastrado com sucesso").end()
        }
    })
})

// Rota para deletar um produto
app.get("/objetos/excluir/:id", (req, res) => {
    const id = req.params.id;

    const sql = `DELETE FROM objeto WHERE id_objeto = '${id}'`;

    conn.query(sql, (erro) => {
        if (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage).end();
        } else {
            res.status(200).json("Produto deletado com sucesso").end();
        }
    });
});


// Rota para selecionar um produto
app.get("/objetos/edicao/:id", (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM objeto WHERE id_objeto = '${id}' `;

    conn.query(sql, (erro, dados) => {
        if (erro) {
            console.log(erro);
        } else {
            res.json(dados);
            res.end();
        }
    });
});

// Rota para atualizar um produto
app.put("/objetos/editar/:id", (req, res) => {
    const id = req.params.id;
    const nome = req.body.nome
    const hora = req.body.hora
    const img = req.body.imagem
    const descricao = req.body.descricao

    const sql = `UPDATE itens SET nome_objeto = '${nome}', hora_entrada = '${hora}', foto = '${img}', descricao = '${descricao}', status = 'achado' WHERE id_objeto = '${id}' `;

    conn.query(sql, (erro) => {
        if (erro) {
            console.log(erro);
            res.status(500).end();
        } else {
            res.status(200).end();
        }
    });
});


//Rota padrão
app.get("/", (req, res) => {
    res.status(200)
    res.end()
})

//Configura a conexão
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "achadosperdidos"
})

//Código para conexão com o banco
conn.connect((erro) => {
    if (erro) {
        console.log(erro)
    }
    else {
        console.log("Conectado com sucesso")
        //Iniciando o servidor
        app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`)
        })
    }
})