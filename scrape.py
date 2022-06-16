import configparser
import tweepy
import pandas as pd
import boto3

# read config
config = configparser.ConfigParser()
config.read('config.ini')
print(config)

api_key = config['twitter']['TWITTER_CONSUMER_KEY']
api_key_secret = config['twitter']['TWITTER_CONSUMER_SECRET']
access_token = config['twitter']['TWITTER_ACCESS_TOKEN_KEY']
access_token_secret = config['twitter']['ACCESS_TOKEN_SECRET']

# print(api_key)
# print(api_key_secret)
# print(access_token)
# print(access_token_secret)

# authenticate
auth = tweepy.OAuthHandler(api_key, api_key_secret)
auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(auth)
public_tweets = api.home_timeline()
print(public_tweets)

columns = ['Time', 'User', 'Tweet']

data = []
for tweet in public_tweets:
    data.append([tweet.created_at, tweet.user.screen_name, tweet.text])

df = pd.DataFrame(data, columns=columns)

df.to_csv('tweets.csv')

# upload -> s3 
s3 = boto3.resource('s3')
for bucket in s3.buckets.all():
    print(bucket.name)

bucket = s3.Bucket('myawsbucketweet')
s3.Object('myawsbucketweet', 'tweetsO.csv').put(Body=open(r'tweets.csv','rb'))

