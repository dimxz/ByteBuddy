const { validateAndDecode } = require('../utils/validation');
const { parseModeAndInput }= require('../utils/parseArgs');

module.exports = {
    command: '/bytebuddy-ping',
    description: 'Check if the bot is online',
    handler: async ({ command, ack, respond}) => {
        const start = Date.now();
        await ack();
        const end = Date.now() - start;
        await respond({ text: `Pong! \nLatency: ${end}ms` });
    }
};