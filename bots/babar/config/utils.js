
exports.parse = (text, key) => {
  return text.toLowerCase().includes(key.toLowerCase());
};

exports.random = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};