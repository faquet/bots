
exports.parse = (text, key) => {
  return text.toLowerCase().includes(key.toLowerCase());
};