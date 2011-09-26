window.T = window.T || {};
T.tweet = (function( window, document, undefined ){
  var DESTROY_TWEET_URL = '',
      RETWEET_TWEET_URL = '';
  
  var EventType = {
    DESTROY: 'onTweetDestroy',
    RETWEET: 'onTweetRetweet'
  };
  
  function destroyTweet( params ){
    T.request(DESTROY_TWEET_URL, 'POST', params || null, function( status, response ){
      console.log('T.tweet.destroy', status, response);
      T.pubsub.publish( EventType.DESTROY, status, response );
    });
  }
  
  function retweetTweet( params ){
    T.request(RETWEET_TWEET_URL, 'POST', params || null, function( status, response ){
      console.log('T.tweet.retweet', status, response);
      T.pubsub.publish( EventType.RETWEET, status, response );
    });
  }
  
  return {
    destroy: null,
    retweet: null
  };
})( window, window.document );