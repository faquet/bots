'use strict';
const token = process.env.CLANG_KEY;
const name = 'clang';
const real_name = '__clang__';
const icon_url = 'http://geekdad.com/images_blogs/photos/uncategorized/2007/06/08/cb2.jpg';
const username = 'clang';
const general = '#general';
const test = "#roughhouse";
const channels = {general, test};
const attributes = {name, real_name, icon_url, username};

module.exports = {
  token      : token,
  name       : name,
  real_name  : real_name,
  icon_url   : icon_url,
  username   : username,
  general    : general,
  test       : test,
  channels   : channels,
  attributes : attributes,
};