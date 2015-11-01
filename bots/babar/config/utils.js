exports.find = function(arr, params) {
  var result = {};
  arr.forEach(function(item) {
    if (Object.keys(params).every(function(key) { return item[key] === params[key];})) {
      result = item;
    }
  });
  return result;
};

exports.parse = function(text, key) {
  return text.toLowerCase().indexOf(key.toLowerCase()) >= 0;
};