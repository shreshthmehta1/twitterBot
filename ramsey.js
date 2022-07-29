const { Configuration, OpenAIApi } = require("openai");
var Twitter = require('twitter');
let config = require('./config.js');
var cron = require('node-cron');
const Quotes = require("randomquote-api");
let fs = require('fs');

//Schedule task
cron.schedule('*/180 * * * *', () => {

let tweetset = [];
//Retrieved set of tweets
var twid = [];
let runs = 10;
let channel;

var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
    //bearer_token: process.env.TWITTER_BEARER_TOKEN,
  });

async function post () {
   //let randomquote = Quotes.randomQuote();
   const configuration = new Configuration({
   apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);
const completion = await openai.createCompletion({
  model: "text-davinci-002",
  prompt:"tweet about Kashmir",
  temperature: 0.29,
  max_tokens: 64,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});
console.log(completion.data)
let quote = completion.data.choices[0].text;
console.log(quote)

client.post('statuses/update', {status: quote}, function(error, tweet, response) {
  if (!error) {
    //console.log(response);
  } 
  else {
    console.log(error);
           fs.appendFile('pt.txt', '\n'+JSON.stringify(error), function (err) {
            if (err) return console.log(err);
            console.log('done did it all');
          });
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
    //tweetset.push(tweets.statuses[i].id_str);
    //console.log(tweets)
    twid.push(tweets.statuses[i].id);
    var tweetId = tweets.statuses[i].id_str;
  }
  
  //Like
client.post('favorites/create', { id: tweetId }, function (error, tweet, response){
 if(!error){
  //console.log(response, 'LK');
 }
  else {
    console.log(error, 'LK err');
    fs.appendFile('lk.txt', '\n'+JSON.stringify(error), function (err) {
      if (err) return console.log(err);
    });
   }
})
 }
//console.log(twid, 'full list of array accessible here');
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

//Retweet
client.post('statuses/retweet/' + tweetId, function(error, tweet, response) {
  if (!error) {
    console.log(response, 'RT');
  }
else{
  console.log(error, 'RT err');
  //log
  fs.appendFile('rt.txt', '\n'+JSON.stringify(error), function (err) {
    if (err) return console.log(err);
  });
}});
 }
  //console.log(twid, 'full list of array accessible here');
  });
 });
}

//post();
like(config.queriesLK);
retweet(config.queriesRT);

//cron-job
});