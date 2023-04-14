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

module.exports = { readAll, getById };