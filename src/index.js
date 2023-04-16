const express = require('express');
const crypto = require('crypto');
const { readAll, getById, writeJson } = require('./functions');
const validateLogin = require('./middleware/validateEmail');
const { validateToken, 
  validateName, 
  validateAge, 
  validateTalk, 
  validateWatchedAt, 
  validateRateOnetoFive,
  validateRatePresence } = require('./middleware/validateTalker');

const talkerValidators = [
  validateToken, 
  validateName, 
  validateAge, 
  validateTalk, 
  validateWatchedAt, 
  validateRatePresence,
  validateRateOnetoFive,  
];

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
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ token });
});

app.post('/talker', talkerValidators, async (req, res) => {
  const talker = await readAll();
    const newId = talker[talker.length - 1].id + 1;
    await writeJson([...talker, { ...req.body, id: newId }]);
    return res.status(201).json({ ...req.body, id: newId });
});

app.put('/talker/:id', talkerValidators, async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  const { name, age, talk } = req.body;
  const talkers = await readAll();
  const index = talkers.findIndex((d) => d.id === Number(id));
  if (!talkers[index]) {
 return res.status(404)
  .json({ message: 'Pessoa palestrante não encontrada' }); 
}  
talkers[index] = { id: Number(id), name, age, talk };
   await writeJson(talkers);
  return res.status(200).json(talkers[index]);
});