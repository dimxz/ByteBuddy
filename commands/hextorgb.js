const { validateAndDecode } = require('../utils/validation');
const { parseModeAndInput }= require('../utils/parseArgs');

module.exports = {
    command: '/bytebuddy-hextorgb',
    description: 'Convert a hex color code into RGB',
    handler: async ({ command, ack, respond}) => {
        await ack();

        const input = command.text.split(' ')[0].replaceAll("#", "");
        
        if (input.length == 3) {
            const doubled = input.split('').map(char => parseInt(char + char, 16));
            await respond({ text: `RGB Value:\nR : ${doubled[0]}\nG : ${doubled[1]}\nB : ${doubled[2]}`, response_type: 'in_channel' });

        } else if (input.length == 6) {
            const chunks = []
            for (let i = 0; i < input.length; i += 2) {
            chunks.push(parseInt(input.slice(i, i + 2), 16));
        }
            
            await respond({ text: `RGB Value:\nR : ${chunks[0]}\nG : ${chunks[1]}\nB : ${chunks[2]}`, response_type: 'in_channel' });
        } else {
            await respond({ text: `Invalid input length.` });  
        }


    }
};