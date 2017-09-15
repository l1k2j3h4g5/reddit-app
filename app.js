require('dotenv').config();

const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');

const request = require('request')
     ,url = 'https://api.cryptonator.com/api/ticker/iot-usd'

// Build Snoowrap and Snoostorm clients
const r = new Snoowrap({
    userAgent: 'reddit-bot-example-node',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS
});
const client = new Snoostorm(r);

// Configure options for stream: subreddit & results per query
const streamOpts = {
    subreddit: 'testingground4bots',
    results: 25
};

// Create a Snoostorm CommentStream with the specified options
const comments = client.CommentStream(streamOpts); // eslint-disable-line

var reply = `
***
[Google](https://google.com) | [Google](https://google.com) 
`;

// On comment, perform whatever logic you want to do
comments.on('comment', (comment) => {
    if (comment.body.indexOf("ShowME Some Love") !== -1) {
        comment.reply(reply);
    }
});


// On comment, perform whatever logic you want to do
comments.on('comment', (comment) => {
    if (comment.body.indexOf("IOTA-USD") !== -1) {
         request(url, (error, response, body)=> {
          if (!error && response.statusCode === 200) {
            const tickerResponse = JSON.parse(body)
            comment.reply("Currently: 1 IOTA is worth around " + tickerResponse.ticker.price + " USD")
          }
        })
    }
});








// https://api.cryptonator.com/api/ticker/iot-usd