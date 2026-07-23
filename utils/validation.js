const base32 = require('hi-base32');

const base64Regex = /^[A-Za-z0-9+/]+={0,2}$/;
const base32Regex = /^(?:[A-Z2-7]{8})*(?:[A-Z2-7]{2}={6}|[A-Z2-7]{4}={4}|[A-Z2-7]{5}={3}|[A-Z2-7]{7}=)?$/i;


function validateAndDecode(input, type){
    const cleaned = input.replace(/\s+/g, '');

    if (typeof input !== 'string' || input.trim() === '') {
        return null;
    }

    if (type == "base64") {
        if (input.length % 4 !== 0) {
            return null;
        }
        if (base64Regex.test(input)) {
            return Buffer.from(input, 'base64').toString('utf-8');
        } else {
            return null;
        }
        
    } else if (type == "base32") {
        if (base32Regex.test(cleaned)) {
            return base32.decode(cleaned);
        } else {
            return null;
        }
    }
}


module.exports = validateAndDecode;