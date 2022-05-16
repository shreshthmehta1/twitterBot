var Twitter = require('twitter');
let config = require('./config.js');
var cron = require('node-cron');
const Quotes = require("randomquote-api");
fs = require('fs');

//Schedule task
cron.schedule('*/180 * * * *', () => {

//Retrieved set of tweets
var twid = [];
// var tweetset = [];
let runs = 10;
let queriesRT = ['Dr. arun kumar mehta', 'Chief secretary J&K', 'IASOWA J&K'];
let queriesLK = ['Silicon labs','wifi halow', 'fractalai', 'Arsenal for top 4', 'wildlife travel india', 'randy orton', 'mo elneny', 'rob holding'];
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
          console.log(response);
       } 
       else {
           console.log(error);
          //  fs.appendFile('err.txt', 'blah', function (err) {
          //   if (err) return console.log(err);
          //   console.log('done did it all');
          // });
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
    // console.log(tweets)
    twid.push(tweets.statuses[i].id);
    var tweetId = tweets.statuses[i].id_str;
  }
  
  //Like
client.post('favorites/create', { id: tweetId })
    .then(result => {
    console.log(result, 'lk');
}).catch(console.error, 'lk err', fs.appendFile('lk.txt', '\n'+JSON.stringify(error), function (err) {
  if (err) return console.log(err);
  console.log('done did it all lk');
}));
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
    console.log(response, 'rt');
  }
else{
  console.log(error, 'rt err');
  //log
  fs.appendFile('rt.txt', '\n'+JSON.stringify(error), function (err) {
    if (err) return console.log(err);
    console.log('done did it all rk');
  });
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


