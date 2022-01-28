var Twitter = require('twitter');
let config = require('./config.js');
var cron = require('node-cron');

//Schedule task
// cron.schedule('*/90 * * * *', () => {

//Retrieved set of tweets
var twid = [];
var tweetset = [];
let runs = 5;
let queries = ['Dr. arun kumar mehta', 'chief secretary J&K'];
let channel;

var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    // bearer_token: process.env.TWITTER_BEARER_TOKEN,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  });
  queries.forEach(query => {
    console.log(query);
    channel = query;
   
 console.log(channel, "CHANNEL");
 //until:'2021-07-10'
  client.get('search/tweets', {q: channel, result_type:'recent', count:runs}, function(error, tweets, response) {
   
    for(let i=0;i<runs;i++){
    if (typeof tweets !== "undefined" && typeof tweets.statuses[i] !== "undefined"){
    console.log("defined");
    tweetset.push(tweets.statuses[i].id_str);
    twid.push(tweets.statuses[i].id);
    var tweetId = tweets.statuses[i].id_str;
    console.log(tweetId);
    var id = tweets.statuses[i].id;
    var scrName;
    console.log(id);
    userTwitter = tweets.statuses[i].user.screen_name
    console.log(userTwitter, 'user');
  //console.log(id, 'here is the id');

//Like
// client.post('favorites/create', { id: tweetId })
//     .then(result => {
//     console.log('Liked tweet successfully!');
// }).catch(console.error);

//Retweet
client.post('statuses/retweet/' + tweetId, function(error, tweet, response) {
  if (!error) {
    console.log(tweet, 'retweeted successfully');
  }});

//Comment
// let statusQ = ['#ramseytoarsenal','#coyg']
// for(let k=0; k<statusQ.length; k++){
// if(userTwitter != 'mehta_shreshth'){
// client.post('statuses/update/',  { status:'@'+userTwitter+' Our Captain '+statusQ[k] + '', in_reply_to_status_id: tweetId} , function(error, tweet, response) {
//     if (!error) {
//       //console.log(tweet, 'a');
//       //console.log(response);
//     } else {
//       console.log(error, response, 'error');
//     }
//   });
//   }}
      }
 }});
});

// cron   
// });
