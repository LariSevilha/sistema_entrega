const express = require('express');
const exphbs = require('express-handlebars');
require('dotenv').config()

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

let pacotes = [];


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/pacotes', (req, res) => {
  res.render('lista', { pacotes });
});

app.get('/pacotes/:id', (req, res) => {
  const pacote = pacotes.find(pacote => pacote.id === parseInt(req.params.id));
  res.render('detalhes', { pacote });
});

app.get('/cadastro', (req, res) => {
  res.render('cadastro');
});

app.post('/cadastro', (req, res) => {
  const { remetente, destinatario, endereco } = req.body;
  const id = pacotes.length + 1;
  pacotes.push({ id, remetente, destinatario, endereco });
  res.redirect('/pacotes');
});

app.listen(port, () => {
  console.log(`Server rodando na porta ${port}`)
});
