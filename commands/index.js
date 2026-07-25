const fs = require('fs');
const path = require('path');

function loadCommands() {
    const files = fs
        .readdirSync(__dirname)
        .filter(file => file !== "index.js" && file.endsWith('.js'));
    return files.map(file => require(path.join(__dirname, file)));
}
function registerCommands(app) {
    const commands = loadCommands();

    for( const { command, handler } of commands) {
        app.command(command, handler);
        console.log(`Registered command : ${command}`)
    }
}

module.exports = { registerCommands };