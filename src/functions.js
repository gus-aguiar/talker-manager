const fs = require('fs').promises;

async function readAll() {
    const data = await fs.readFile('src/talker.json', 'utf8');
    const talker = JSON.parse(data);
    return talker;
}

async function getById(id) {
    const data = await fs.readFile('src/talker.json', 'utf8');
    const group = JSON.parse(data);
    const personById = group.find((person) => Number(person.id) === Number(id));
    return personById;
}

async function login(_email, _password) {
    let token = '';
while (token.length < 16) {
  token += Math.random().toString(36).substring(2);
}
token = token.substring(0, 16);
    return token;
}

module.exports = { readAll, getById, login };