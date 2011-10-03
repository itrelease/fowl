window.T = window.T || {};
T.tweet = (function(){
  var DESTROY_TWEET_URL = 'http://api.twitter.com/1/statuses/destroy/:id.json',
      RETWEET_TWEET_URL = 'http://api.twitter.com/1/statuses/retweet/:id.json';
  
  function destroyTweet( params, callback ){
    T.request(DESTROY_TWEET_URL.replace(':id', params.id), 'POST', params || null, callback);
  }
  
  function retweetTweet( params, callback ){
    T.request(RETWEET_TWEET_URL.replace(':id', params.id), 'POST', params || null, callback);
  }
  
  return {
    destroy: null,
    retweet: null
  };
})();