require("dotenv").config();
const { App } = require("@slack/bolt");
const validateAndDecode = require('./utils/validation');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

// PING THE BOT
app.command("/bytebuddy-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

// BASE64 UTILITY
app.command("/bytebuddy-base64", async ({ command, ack, respond }) => {
    await ack();
  const mode = command.text.split(' ')[0];
  const input = command.text.split(' ').slice(1).join(' ');

  console.log(mode);
  console.log(input);
  
  
  if (mode !== 'encode' && mode !== 'decode'){
    await respond({ text: `Enter valid 'encode' or 'decode' mode.` });
    } else {
    if (mode == 'decode') {
      const decoded = validateAndDecode(input, 'base64');
      await respond({ text: `Decoded strings:\n${decoded}` });
    } else if (mode == 'encode') {
      const encoded = Buffer.from(input, 'utf-8').toString('base64');
      await respond({ text: `Encoded strings:\n${encoded}` });
  }
    }
});

// URL UTILITY
app.command("/bytebuddy-url", async ({ command, ack, respond }) => {
    await ack();
  const mode = command.text.split(' ')[0];
  const input = command.text.split(' ').slice(1).join(' ');

  if (mode !== 'encode' && mode !== 'decode'){
    await respond({ text: `Enter valid 'encode' or 'decode' mode.` });
    } else {
    if (mode == 'decode') {
      try {
        const decoded = decodeURIComponent(input);
        await respond({ text: `Decoded URL:\n${decoded}` });
      } catch (error) {
        await respond({ text: `Invalid URL-encoded string.`})
      }
    } else if (mode == 'encode') {
      const encoded = encodeURIComponent(input);
      await respond({ text: `Encoded URL:\n${encoded}` });
  }
    }
});

// HEX TO RGB
app.command("/bytebuddy-hextorgb", async ({ command, ack, respond }) => {
  await ack();
  const input = command.text.split(' ')[0].replaceAll("#", "");
  
  if (input.length == 3) {
    const doubled = input.split('').map(char => parseInt(char + char, 16));
    await respond({ text: `RGB Value:\nR : ${doubled[0]}\nG : ${doubled[1]}\nB : ${doubled[2]}` });

  } else if (input.length == 6) {
    const chunks = []
    for (let i = 0; i < input.length; i += 2) {
    chunks.push(parseInt(input.slice(i, i + 2), 16));
  }
    
    await respond({ text: `RGB Value:\nR : ${chunks[0]}\nG : ${chunks[1]}\nB : ${chunks[2]}` });
  } else {
    await respond({ text: `Invalid input length.` });  
  }
});


(async () => {
  await app.start();
  console.log("bot is running!");
})();