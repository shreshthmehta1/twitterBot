console.log("yea mate cheers");
var Twitter = require('twitter');
 
var client = new Twitter({
    consumer_key: 'NfpyqSbArYGKnO9pfFHLpkxf2',
    consumer_secret: 'fDZNYGGoGMvqMhTXOHkg5endlS2BDNvVwRpasCnEIIb0G3W46S',
    bearer_token: 'AAAAAAAAAAAAAAAAAAAAAGr6MQEAAAAAD2PIacW7fExRwZy4MS74k9pZBF4%3D8NZgYeQhFEGLABe8XaRmE8oGq7whkNhz2K2zi8T8YNV5VZdrby'
  });
 
  client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
    console.log(tweets);
 });
//   client.post('statuses/update', {status: 'I Love Twitter'},  function(error, tweet, response) {
//     if(error) throw error;
//     console.log(tweet);  // Tweet body.
//     console.log(response);  // Raw response object.
//   });