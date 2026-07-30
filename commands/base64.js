// { command: '/bytebuddy-whatever', handler: async ({ command, ack, respond }) => {...} }

const { validateAndDecode } = require('../utils/validation');
const { parseModeAndInput }= require('../utils/parseArgs');

module.exports = {
    command: '/bytebuddy-base64',
    description: 'Encode / Decode Base64 strings',
    handler: async ({ command, ack, respond}) => {
        await ack();
        const { mode, input } = parseModeAndInput(command.text);

        if (mode !== "encode" && mode !== "decode") {
            await respond({ text: `Enter valid "encode" or "decode" mode` });
            return;
        }

        if (mode == "decode") {
            const decoded = validateAndDecode(input, 'base64');
            await respond({ text: `Decoded strings : \n${decoded}` });
        } else if (mode == "encode") {
            const encoded = Buffer.from(input, 'utf-8').toString('base64');
            await respond({ text: `Encoded strings : \n${encoded}` });
        }
    }
};