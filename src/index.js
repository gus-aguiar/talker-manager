const express = require('express');
const { readAll, getById, login } = require('./functions');
const validateLogin = require('./middleware/validateEmail');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
  const characters = await readAll();
  return res.status(200).json(characters);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const person = await getById(id);
  if (!person) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(person);
});

app.post('/login', validateLogin, async (req, res) => {
  const { email, password } = req.body;
  const token = await login(email, password);
  return res.status(200).json({ token });
});
