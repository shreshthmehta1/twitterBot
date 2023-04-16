const Twitter = require("twitter");
const config = require("./config.js");
const { Configuration, OpenAIApi } = require("openai");
// const cron = require("node-cron");

//Schedule task
// cron.schedule("0 */1 * * *", () => 
// {

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
    //bearer_token: process.env.TWITTER_BEARER_TOKEN,
});


const completion = openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages:[{ role: "user", content: "tweet about smart devices & wildlife" }],
  temperature: 0.5,
  max_tokens: 100,
  top_p: 1,
  frequency_penalty: 1,
  presence_penalty: 0,
  });
  
  let k = Promise.resolve(completion);
  k.then(value => 
{
console.log(value.data.choices[0].message.content);
  tweet(value.data.choices[0].message.content);
  });
  

function tweet(post)
{
  client.post("statuses/update/",  { status:post} , function(error, tweet, response) 
  {
      if (!error) 
  {
        //console.log(tweet, 'a');
        //console.log(response);
      }
   else 
  {
        console.log(error, response, "error");
      }
    });
  }

// cron-job
// });
