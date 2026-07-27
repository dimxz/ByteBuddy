
module.exports = {
    command: '/bytebuddy-jwt',
    description: 'Decode a JWT Token', 
    handler: async ({ command, ack, respond}) => {
        await ack();
        
        const token = command.text.split('.');
        if (token.length !== 3 ) {
        await respond({ text: 'Enter a valid JWT Token' });
        return;
        }    

        try {
            const header = Buffer.from(token[0], 'base64').toString('utf-8');
            const payload = Buffer.from(token[1], 'base64').toString('utf-8');
            const parsedHeader = JSON.stringify(JSON.parse(header), null, 2);
            const parsedPayload = JSON.stringify(JSON.parse(payload), null, 2);
            await respond({ text: `Decoded JWT Token:\n*Header :*\n${parsedHeader}\n*Payload :*\n${parsedPayload}` });
        } catch (error) {
            await respond({ text: `_${command.text}_ is not a valid JWT Token` });
            return;
        }
    }
};