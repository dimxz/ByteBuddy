function parseModeAndInput(text) {
    const parts = text.split(' ');
    const mode = parts[0];
    const input = parts.slice(1).join(' ');
    return { mode, input };
}

module.exports = { parseModeAndInput };