function find(arr, params) {
  var result = {};
  arr.forEach(function(item) {
    if (Object.keys(params).every(function(key) { return item[key] === params[key];})) {
      result = item;
    }
  });
  return result;
}

module.exports = {
  find: find,
};