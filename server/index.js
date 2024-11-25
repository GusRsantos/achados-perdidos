const express = require('express');
const app = express();
const port = 5000;
const mysql = require('mysql2');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');

// Middleware para manipulação de uploads
app.use(fileUpload());

// Middleware para leitura de JSON e URLs
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware para CORS
app.use(cors());

// Servir arquivos estáticos (imagens)
app.use("/images", express.static(path.join(__dirname, "/images")));

// Configuração do banco de dados
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "SQL5625",
    database: "achadosperdidos"
});

// Conexão com o banco
conn.connect((erro) => {
    if (erro) {
        console.log(erro);
    } else {
        console.log("Conectado ao banco com sucesso");
        app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`);
        });
    }
});

// Rota para criação de usuário
app.post("/usuario/criar", (req, res) => {
    const { nome, cpf, senha, tipo } = req.body;

    const sql = `INSERT INTO usuario (cpf_usuario, nome_usuario, senha_usuario, tipo_usuario) VALUES (?, ?, ?, ?)`;

    conn.query(sql, [cpf, nome, senha, tipo], (erro) => {
        if (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage).end();
        } else {
            res.status(200).json("Cadastro efetuado").end();
        }
    });
});

// Rota para login de usuário
app.get("/usuario/entrar", (req, res) => {
    const { cpf, senha } = req.query;

    const sql = `SELECT * FROM usuario WHERE cpf_usuario = ? AND senha_usuario = ?`;

    conn.query(sql, [cpf, senha], (erro, result) => {
        if (erro) {
            console.log(erro);
            res.status(500).json(erro).end();
        } else {
            if (result.length === 0) {
                res.status(500).json("Usuário ou senha incorretos").end();
            } else {
                res.status(200).json(result).end();
            }
        }
    });
});

// Rota para listar objetos
app.get("/objetos", (req, res) => {
    const sql = `SELECT * FROM objeto`;

    conn.query(sql, (erro, dados) => {
        if (erro) {
            res.status(500).json(erro).end();
        } else {
            res.status(200).json(dados).end();
        }
    });
});

// Rota para criar produtos
app.post("/objetos/criar", (req, res) => {
    const { nome, hora, descricao } = req.body;

    if (!req.files || !req.files.imagem) {
        return res.status(400).json({ error: "Imagem é obrigatória." });
    }

    const imagem = req.files.imagem;
    const imgNome = Date.now() + "_" + imagem.name;
    const imgCaminho = path.join(__dirname, "/images/", imgNome);

    imagem.mv(imgCaminho, (err) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao salvar imagem." });
        }

        const sql = `
            INSERT INTO objeto (nome_objeto, hora_entrada, descricao, foto)
            VALUES (?, ?, ?, ?)
        `;

        conn.query(sql, [nome, hora, descricao, imgNome], (erro) => {
            if (erro) {
                console.log(erro);
                res.status(500).json({ error: "Erro ao inserir no banco." });
            } else {
                res.status(200).json({ message: "Produto cadastrado com sucesso." });
            }
        });
    });
});

// Rota para deletar um produto
app.get("/objetos/excluir/:id", (req, res) => {
    const id = req.params.id;

    const sql = `DELETE FROM objeto WHERE id_objeto = ?`;

    conn.query(sql, [id], (erro) => {
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

    const sql = `SELECT * FROM objeto WHERE id_objeto = ?`;

    conn.query(sql, [id], (erro, dados) => {
        if (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage).end();
        } else {
            res.status(200).json(dados).end();
        }
    });
});

// Rota para atualizar um produto
app.put("/objetos/editar/:id", (req, res) => {
    const id = req.params.id;
    const { nome, hora, descricao } = req.body;
    let img = null;

    // Se uma nova imagem for enviada, use-a
    if (req.files && req.files.imagem) {
        img = Date.now() + "_" + req.files.imagem.name;
        const imgCaminho = path.join(__dirname, "/images/", img);

        req.files.imagem.mv(imgCaminho, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Erro ao salvar imagem." });
            }
        });
    }

    // Recuperar a imagem antiga do banco de dados, caso nenhuma nova seja enviada
    const sqlFetchFoto = `SELECT foto FROM objeto WHERE id_objeto = ?`;
    conn.query(sqlFetchFoto, [id], (fetchError, result) => {
        if (fetchError) {
            console.log(fetchError);
            return res.status(500).json({ error: "Erro ao buscar imagem existente." });
        }

        img = img || result[0]?.foto; // Usa a imagem existente se nenhuma nova for enviada

        const sqlUpdate = `
            UPDATE objeto 
            SET nome_objeto = ?, hora_entrada = ?, descricao = ?, foto = ? 
            WHERE id_objeto = ?
        `;
        conn.query(sqlUpdate, [nome, hora, descricao, img, id], (updateError) => {
            if (updateError) {
                console.log(updateError);
                return res.status(500).json({ error: "Erro ao atualizar objeto." });
            }
            res.status(200).json({ message: "Produto atualizado com sucesso." });
        });
    });
});

// Rota padrão
app.get("/", (req, res) => {
    res.status(200).json("Servidor rodando.").end();
});
