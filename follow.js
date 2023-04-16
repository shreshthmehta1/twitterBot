const Twitter = require("twitter");
const config = require("./config.js");
const cron = require("node-cron");
const fs = require("fs");

//Schedule task
cron.schedule("0 */1 * * *", () => 
{

//Retrieved set of tweets
var twid = [];
let runs = 2;
let channel;

var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
    //bearer_token: process.env.TWITTER_BEARER_TOKEN,
});

function follow (queries) 
{
  queries.forEach(query => 
{
    console.log(query);
    channel = query;
  //console.log(channel, "CHANNEL");
  //until:'2021-07-10'
  client.get("search/tweets", {q: channel, result_type:"recent", count:runs}, function(error, tweets) 
{ 
       for(let i=0;i<runs;i++)
{
    if (typeof tweets !== "undefined" && typeof tweets.statuses[i] !== "undefined")
{
    //tweetset.push(tweets.statuses[i].id_str);
    console.log(tweets.statuses[i].user.screen_name)
    twid.push(tweets.statuses[i].user.screen_name);
    var tweetId = tweets.statuses[i].user.screen_name;
}
client.post("friendships/create", { id: tweetId }, function (error, tweet, response)
{
 if(!error)
{
  console.log(response,tweet, "LK");
 }
  else 
{
    console.log(error, "LK err");
    fs.appendFile("lk.txt", "\n"+JSON.stringify(error), function (err) 
{
      if (err) 
{
return console.log(err);
}
    });
   }
})
 }
//console.log(twid, 'full list of array accessible here');
  });
});
//EOLK
}


follow(config.queriesLK);

// cron-job
});
