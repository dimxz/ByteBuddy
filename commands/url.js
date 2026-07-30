const { validateAndDecode } = require('../utils/validation');
const { parseModeAndInput }= require('../utils/parseArgs');
const { description } = require('./help');

module.exports = {
    command: '/bytebuddy-url',
    description: 'Encode / Decode URL strings',
    handler: async ({ command, ack, respond}) => {
        await ack();
        const { mode, input } = parseModeAndInput(command.text);

        if (mode !== "encode" && mode !== "decode") {
            await respond({ text: `Enter valid "encode" or "decode" mode` });
            return;
        }

        if (mode == "decode") {
            const decoded = decodeURIComponent(input);
            await respond({ text: `Decoded strings : \n${decoded}` });
        } else if (mode == "encode") {
            const encoded = encodeURIComponent(input);
            await respond({ text: `Encoded strings : \n${encoded}` });
        }
    }
};