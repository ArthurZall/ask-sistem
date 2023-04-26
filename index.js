const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");


connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    });


//usando o EJS no Express como View engine 
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false })); //DECODIFICADOR DE DADOS ENVIADO PELO FORMULÁRIO
// app.use(bodyParser.json()); //permissão para ler dados de formulario via json (API)

//Rotas
app.get("/", (req, res) => {
    Pergunta.findAll({ raw: true }).then(perguntas => {
        res.render("index.ejs", {
            pergunta: perguntas
        });
    })
        ;
});


app.get("/perguntar", (req, res) => {
    res.render("perguntar.ejs");
});

app.post("/salvarpergunta", (req, res) => {
    const titulo = req.body.titulo;
    const descricao = req.body.descricao;
    const setor = req.body.setor;

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
});


app.listen(8080, () => {
    console.log("App rodando: http://localhost:8080/");
});