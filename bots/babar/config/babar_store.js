
const googleCseId = process.env.BOT_GOOGLE_IMAGE_SEARCH_ID,
      googleApiKey = process.env.BOT_GOOGLE_IMAGE_SEARCH_SERVER_KEY,
      babarKey = process.env.BABAR_KEY,
      port = process.env.PORT || 3000,
      db = process.env.MONGOLAB_URI || 'mongodb://localhost/bot_database';


module.exports = {
  googleCseId: googleCseId,
  googleApiKey: googleApiKey,
  token: babarKey,
  name: 'babar',
  username: 'babar',
  icon_url: 'http://i.imgur.com/p51tcBd.jpg?1',
  modules: {
    image: true,
    message: true,
    remind: true,
    markov: true,
    messageKeeper: true,
  },
  port: port,
  db: db,
};