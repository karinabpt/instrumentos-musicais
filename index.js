import express from 'express';

import Instrumento from './models/Instrumento.js';
const app = express();

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');


import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.redirect('/instrumento/lst');
});

app.get('/instrumento/lst', async (req, res) => {
    try {
        const instrumentos = await Instrumento.find();

        res.render('instrumento/lst', {
            instrumentos
        });

    } catch (erro) {
        console.error(erro);
        res.status(500).send('Erro ao listar instrumentos: ' + erro.message);
    }
});

app.get('/instrumento/add', (req, res) => {
    res.render('instrumento/add');
});

app.post('/instrumento/add/ok', async (req, res) => {
    try {
        const {
            nome,
            fabricante,
            preco,
            tipo
        } = req.body;

        await Instrumento.create({
            nome,
            fabricante,
            preco,
            tipo
        });
        res.render('instrumento/addok', {
            nome
        });
    } catch (erro) {
        console.error(erro);

        res.status(500).send('Erro ao gravar instrumento: ' + erro.message +
            '<br><a href="/instrumento/add">Voltar ao cadastro</a>');
    }
});

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));