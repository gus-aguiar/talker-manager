const fs = require('fs').promises;

async function readAll() {
    const data = await fs.readFile('src/talker.json', 'utf8');
    const talker = JSON.parse(data);
    return talker;
}

module.exports = { readAll };