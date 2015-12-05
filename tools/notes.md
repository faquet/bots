# _Property Descriptors_

## Required
Properties to initialize a bot
* Slack API Token

## Optional

#### Local
Properties of a bot
* Username
* Real name
* Icon URL

#### Global
To be shared across all bots
* Google API ID
* Google API Key

Note: Each instance of a bot is checked individually for these keys. If these keys are not found on the bot they are checked for globablly. This means each instance can have its own keys and all other instances will delegate to the keys provided globally (if they are provided).

#### Example
```javascript
const Bot = require('@faquet/bots);

const slackbot = Bot({
  token: 'x0x0-some-fucked-up-mess-of-shit',
    name: 'Wayne Deathsky',
    real_name: 'Wayne Deathsky',
    icon_url: 'http://1.cdn.nhle.com/nhl/images/upload/gallery/2015/03/465562838_slide.jpg',
    google_key: 'dsfas-some-other-shit',
    google_id: '243253-some-other-shit'
});