const { validateAndDecode } = require('../utils/validation');
const { parseModeAndInput }= require('../utils/parseArgs');
const { encode } = require('hi-base32');


module.exports = {
    command: '/bytebuddy-base32',
    description: 'Encode / Decode Base32 strings',
    handler: async ({ command, ack, respond}) => {
        await ack();
        const { mode, input } = parseModeAndInput(command.text);

        if (mode !== "encode" && mode !== "decode") {
            await respond({ text: `Enter valid "encode" or "decode" mode` });
            return;
        }

        if (mode == "decode") {
            const decoded = validateAndDecode(input, 'base32');
            await respond({ text: `Decoded strings : \n${decoded}` });
        } else if (mode == "encode") {
            const encoded = encode(input);
            await respond({ text: `Encoded strings : \n${encoded}` });
        }
    }
};