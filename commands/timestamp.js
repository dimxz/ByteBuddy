
module.exports = {
    command: '/bytebuddy-timestamp',
    description: 'Parse Unix timestamp into human readable format', 
    handler: async ({command, ack, respond}) => {
        await ack();
        let timestamp;
        let input = parseInt(command.text, 10);

        if (!command.text.trim()) {
            timestamp = Date.now();

        } else if (Number.isNaN(input)) {
            await respond({ text: `*Enter a valid Unix timestamp*` });
            return;

        } else {
            timestamp = input*1000;
        }
            

        const date = new Date(timestamp);
        await respond({ text: `*Parsed timestamp :*\n${date.toUTCString()}` });
    }
};
