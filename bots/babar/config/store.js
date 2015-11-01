

const googleCseId = process.env.BOT_GOOGLE_IMAGE_SEARCH_ID,
      googleApiKey = process.env.BOT_GOOGLE_IMAGE_SEARCH_SERVER_KEY,
      babarKey = process.env.BABAR_KEY;


module.exports = {
  googleCseId: googleCseId,
  googleApiKey: googleApiKey,
  token: babarKey,
  name: 'babar',
  post_params: {
    icon_url: 'http://i.imgur.com/p51tcBd.jpg?1',
  },
};