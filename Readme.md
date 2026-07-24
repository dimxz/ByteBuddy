# ByteBuddy

A Slack bot that brings everyday dev tools — encoders, decoders, and converters — right into Slack, so you don't have to leave the conversation to use them.

![ByteBuddy demo](preview.jpg)
**[Try it in Slack →](your-demo-link-or-channel)**

## Quick start

1. Join the Hack Club Slack
2. Go to any channel ByteBuddy is in
3. Run `/bytebuddy-base64 encode hello world`

## Features

- `/bytebuddy-base64 encode|decode <text>` — Base64 encoding and decoding
- `/bytebuddy-url encode|decode <text>` — URL encoding and decoding
- `/bytebuddy-hextorgb <hex>` — Convert hex color codes (3 or 6 digit) to RGB values

## Running it locally

Requires Node.js [version].

1. Clone the repo: `git clone [your-repo-url]`
2. Install dependencies: `npm install`
3. Create a `.env` file with your Slack tokens:
SLACK_BOT_TOKEN=xoxb-your-token
SLACK_APP_TOKEN=xapp-your-token
4. Start the bot: `node app.js`

## How it works

Each converter command follows the same parsing pattern: the first word of the slash command's input is treated as the mode (encode/decode), and everything after it is rejoined into the actual payload, which matters because naively grabbing just the second word would break on any input containing spaces. Validation differs by encoding type rather than using one generic check: Base64 and Base32 use encoding-specific regexes that verify the exact character set and padding shape before decoding, since malformed input to these decoders can silently produce garbage output rather than throwing an error. URL encoding/decoding, by contrast, relies on decodeURIComponent's built-in error handling wrapped in a try/catch, since it reliably throws on malformed input — making a separate regex redundant there.

## Credits

Built following Hack Club Stardance's [Slack Bot guide](https://stardance.hackclub.com/missions/slack-bot/guide). Uses `hi-base32` for base32 support.
