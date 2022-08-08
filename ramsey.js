const { Configuration, OpenAIApi } = require("openai");
const Twitter = require('twitter');
const config = require('./config.js');
const cron = require('node-cron');
const fs = require('fs');

//Schedule task
cron.schedule('0 */2 * * *', () => {

//var tweetset = [];
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

const configuration = new Configuration({apiKey: process.env.API_KEY});
const openai = new OpenAIApi(configuration);
function fetch (){
fs.readFile('prompts.js', 'utf8', function(err, data)
{
 if (err){
 //check and handle err
 }
    let firstline = data.split('\r\n')[0];
    channel = firstline;
    console.log(channel, 'channel');
    let linesExceptFirst = data.split('\n').slice(1).join('\n');
    fs.writeFile('prompts.js', linesExceptFirst, function(err, data) { if (err) {/** check and handle err */} });
    tweet(channel);
});
}

async function tweet (query) {
const completion = await openai.createCompletion({
  model: "text-davinci-002",
  prompt:query,
  temperature: 0.29,
  max_tokens: 64,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});
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
//EOPS
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
    //console.log(tweets.statuses[i].user.screen_name)
    twid.push(tweets.statuses[i].id);
    var tweetId = tweets.statuses[i].id_str;
}
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
//EOLK
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
client.post('statuses/retweet/' + tweetId, function(error, tweet, response) {
  if (!error) {
    //console.log(response, 'RT');
  }
else {
  console.log(error, 'RT err');
  fs.appendFile('rt.txt', '\n'+JSON.stringify(error), function (err) {
    if (err) return console.log(err);
  });
}});
 }
  //console.log(twid, 'full list of array accessible here');
  });
 });
//EORT
}

fetch()
// tweet();
like(config.queriesLK);
retweet(config.queriesRT);

// cron-job
});