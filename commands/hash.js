const crypto = require('crypto');
const { parseModeAndInput } = require('../utils/parseArgs');

module.exports = {
    command: '/bytebuddy-hash',
    description: 'Hash a string using md5/sha1/sha256/sha512', 
    handler: async ({ command, ack, respond}) => {
        await ack();
        const { mode, input } = parseModeAndInput(command.text);
        const hashType = ['md5', 'sha1', 'sha256', 'sha512'];
        
        if (!hashType.includes(mode)) {
            await respond({ text: `Enter a valid hash algorithm (md5/sha1/sha256/sha512)` });
            return; 
        }

        if (input === '') {
            await respond({ text: `Enter valid string` });
            return;
        }

        const hash = crypto.createHash(mode).update(input).digest('hex');
        await respond({ text: `Hash result :\n${hash}` });
    }
};

