// const base32 = require('hi-base32');
// const validateAndDecode = require('./utils/validation');

const { LogLevel } = require("@slack/bolt");

// function base32Encode(input) {
//     return base32.encode(input);
// }

// function base32Decode(input) {
//     return validateAndDecode(input, 'base32');
// }

// //BASE64
// function base64Decode(input) {
//     if (typeof input !== 'string' || input.trim() === '') {
//         return null;
//     }
//     if (input.length % 4 !== 0) {
//         return null;
//     }

//     const base64Regex = /^[A-Za-z0-9+/]+={0,2}$/;
//     if (!base64Regex.test(input)) {
//         return null;
//     }
//     const encoded = Buffer.from(input, 'base64').toString('utf8');
//     return encoded;
// }

// function base64Encode(input) {
//     return Buffer.from(input, 'utf8').toString('base64');
// }

// console.log(base32Decode('MFQWC==='));

// const arr = ['a', 'b', 'c', 'd'];
// console.log(arr.splice(2).join(' '));
const input = "FF44DD";
const chunks = []
    const parsed = input.match('/.{1,2}/g')
    for (let i = 0; i < input.length; i += 2) {
    chunks.push(input.slice(i, i + 2));
    }
console.log(chunks.map(char => parseInt(char, 16)));