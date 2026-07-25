const { validateAndDecode } = require('../utils/validation');
const { parseModeAndInput }= require('../utils/parseArgs');

module.exports = {
    command: '/bytebuddy-url',
    handler: async ({ command, ack, respond}) => {
        await ack();
        const { mode, input } = parseModeAndInput(command.text);

        if (mode !== "encode" && mode !== "decode") {
            await respond({ text: `Enter valid "encode" or "decode" mode`, response_type: 'in_channel' });
            return;
        }

        if (mode == "decode") {
            const decoded = decodeURIComponent(input);
            await respond({ text: `Decoded strings : \n${decoded}`, response_type: 'in_channel' });
        } else if (mode == "encode") {
            const encoded = encodeURIComponent(input);
            await respond({ text: `Encoded strings : \n${encoded}`, response_type: 'in_channel' });
        }
    }
};