var Twitter = require('twitter');
let config = require('./config.js');
var cron = require('node-cron');
const Quotes = require("randomquote-api");

//Schedule task
cron.schedule('*/180 * * * *', () => {

//Retrieved set of tweets
var twid = [];
// var tweetset = [];
let runs = 5;
let queriesRT = ['Dr. arun kumar mehta', 'Chief secretary J&K', 'IASOWA J&K'];
let queriesLK = ['Silicon labs','wifi halow', 'Arsenal for top 4', 'wildlife travel india', 'fractalai'];
let channel;

var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    //bearer_token: process.env.TWITTER_BEARER_TOKEN,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  });

  function post () {
    let randomquote = Quotes.randomQuote();
  console.log(randomquote.quote);
   
   client.post('statuses/update', {status: randomquote.quote}, function(error, tweet, response) {
       if (!error) {
        //  console.log(tweet);
       } 
       else {
           console.log(error, "no");
       }
   });
  }

  function like (queries) {
  queries.forEach(query => {
   
    console.log(query);
    channel = query;
  //console.log(channel, "CHANNEL");
 //until:'2021-07-10'
  client.get('search/tweets', {q: channel, result_type:'recent', count:runs}, function(error, tweets, response) { 
       for(let i=0;i<runs;i++){
    if (typeof tweets !== "undefined" && typeof tweets.statuses[i] !== "undefined"){
    // tweetset.push(tweets.statuses[i].id_str);
    twid.push(tweets.statuses[i].id);
    var tweetId = tweets.statuses[i].id_str;
  }
  
  //Like
client.post('favorites/create', { id: tweetId })
    .then(result => {
    console.log('Liked tweet successfully!');
}).catch(console.error);
 }
//  console.log(twid, 'full list of array accessible here');
});
});
}

function retweet (queries) {
  queries.forEach(query => {
     
      console.log(query);
      channel = query;
    //console.log(channel, "CHANNEL");
   //until:'2021-07-10'
    client.get('search/tweets', {q: channel, result_type:'recent', count:runs}, function(error, tweets, response) { 
         for(let i=0;i<runs;i++){
      if (typeof tweets !== "undefined" && typeof tweets.statuses[i] !== "undefined"){
      twid.push(tweets.statuses[i].id);
      var tweetId = tweets.statuses[i].id_str;
    }

// Retweet
client.post('statuses/retweet/' + tweetId, function(error, tweet, response) {
  if (!error) {
    console.log('retweeted successfully');
  }});
 }
  //  console.log(twid, 'full list of array accessible here');
  });
 });
}

// post();
like(queriesLK);
retweet(queriesRT);

// cron-job
});


