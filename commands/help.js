const { loadCommands }= require('../commands/');

module.exports = {
    command: '/bytebuddy-help',
    description: 'Show all the available commands', 
    handler: async ({ command, ack, respond}) => {
        await ack();

        const commands = loadCommands();
        const allCommands = [];
        
        for (const { command, description } of commands) {
            allCommands.push({
                command,
                description
            });
        }

        const message = allCommands
        .map(data => `*${data.command}* - *${data.description}*`)
        .join('\n');

        await respond({text: `ByteBuddy Available Commands:\n\n${message}`});
    }
};

