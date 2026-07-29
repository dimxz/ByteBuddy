
const { parseModeAndInput }= require('../utils/parseArgs');

module.exports = {
    command: '/bytebuddy-regex',
    description: 'Test a regex pattern against a string', 
    handler: async ({ command, ack, respond}) => {
        await ack();
        const { mode, input } = parseModeAndInput(command.text);

        if (input === '') {
            await respond({text: `Enter a regex pattern and the string`});
            return;
        }

        const regex =  mode;
        const string = input

        if (regex.toString().startsWith('/')) {

            const lastSlash = regex.lastIndexOf('/');
            const corePattern = regex.slice(1, lastSlash);
            const flags = regex.slice(lastSlash + 1);
            try {
                const pattern = new RegExp(corePattern, flags);
                if (pattern.test(string)) {
                    await respond({text: `*Match!*\nPattern: \`${regex}\`\nString: \`${string}\`` });
                } else {
                await respond({text: `*No match.*\nPattern: \`${regex}\`\nString: \`${string}\`` });
                }
            } catch (error) {
                await respond({text: `Not a valid regex pattern`});
            }
        } else {
            await respond({text: `Enter a valid regex pattern`});
        }
    }
};




const aab = "/^\d{3}-[A-Z]{2}$/i ABC-AB";

const input = aab.split(" ");
const regex =  input[0];
console.log(input.length);

const string = input[1];

if (regex.toString().startsWith('/')) {

    const lastSlash = regex.lastIndexOf('/');
    const corePattern = regex.slice(1, lastSlash);
    const flags = regex.slice(lastSlash + 1);

    console.log(corePattern);
    console.log(flags);
    
    new RegExp(corePattern, flags);
} else {
    console.log("nah");
}