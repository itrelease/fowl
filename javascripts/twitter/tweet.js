window.T = window.T || {};
T.tweet = (function(){
  var DESTROY_TWEET_URL = 'http://api.twitter.com/1/statuses/destroy/:id.json',
      RETWEET_TWEET_URL = 'http://api.twitter.com/1/statuses/retweet/:id.json';
  
  var EventType = {
    DESTROY: 'onTweetDestroy',
    RETWEET: 'onTweetRetweet'
  };
  
  function destroyTweet( params ){
    T.request(DESTROY_TWEET_URL.replace(':id', params.id), 'POST', params || null, function( status, response ){
      console.log('T.tweet.destroy', status, response);
      T.pubsub.publish( EventType.DESTROY, status, response );
    });
  }
  
  function retweetTweet( params ){
    T.request(RETWEET_TWEET_URL.replace(':id', params.id), 'POST', params || null, function( status, response ){
      console.log('T.tweet.retweet', status, response);
      T.pubsub.publish( EventType.RETWEET, status, response );
    });
  }
  
  return {
    destroy: null,
    retweet: null
  };
})();