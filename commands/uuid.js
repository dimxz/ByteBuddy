const crypto = require('crypto');

module.exports = {
    command: '/bytebuddy-uuid',
    description: 'Generate a valid UUID', 
    handler: async ({command, ack, respond}) => {
        await ack();
        let total;
        const input = parseInt(command.text, 10);
        
        if (Number.isNaN(input)) {
            total = 1;
        } else {
            total = input;
        }
        
        if (total > 20 || total < 1) {
        await respond({ text: `*Please enter a valid number between 1 and 20*` });
        return;
        }

        const result = Array.from({ length: total }, () => crypto.randomUUID())
        const text = result.join('\n');
        await respond({ text: `*Generated UUID :* \n${text}` })
    }
};
