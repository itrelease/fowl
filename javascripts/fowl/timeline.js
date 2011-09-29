fowl = window.fowl || {};

fowl.timeline = (function(){
  var Timeline = function(){
    Object.defineProperties( this, {
      'tweets': {
        value: [],
        writable: true
      },
      'sinceId': {
        value: null,
        writable: true
      }
    } );
  };
  
  Timeline.prototype.init = function( opt_tweets ){
    this.tweets = opt_tweets || [];
    this.sinceId = this.tweets[0] ? this.tweets[0]['id_str'] : 0;
  };
  
  Timeline.prototype.onUpdateHandler = function( status, response ){
    if( status ){
      var tweets = Array.isArray( response.json ) ? response.json.slice(0) : [];
      this.tweets = tweets.concat( this.tweets );
      this.sinceId = this.tweets[0] ? this.tweets[0]['id_str'] : this.sinceId;
    }
  };
  
  var HomeTimeline = function(){
    Timeline.apply( this, arguments );
  };
  Object.defineProperty( HomeTimeline, 'super', {
    value: Timeline.prototype
  } );
  HomeTimeline.prototype = Object.create( Timeline.prototype );
  
  HomeTimeline.prototype.onUpdateHandler = function( status, response ){
    HomeTimeline.super.onUpdateHandler.apply( this, arguments );
    if( status && response.json.length ){
      var localTimeline = fowl.storage.get( 'timeline' ) || {},
          localSinceId = fowl.storage.get( 'since_id' ) || {};
      
      localTimeline['home'] = this.tweets.slice(0, 50);
      localSinceId['home'] = this.sinceId;
      
      fowl.storage.set( 'timeline', localTimeline );
      fowl.storage.set( 'since_id', localSinceId );
      
      response.json.forEach( function( tweet ){
        console.group('TWEET');
        console.log('raw', tweet);
        console.log( fowl.getMsg(' {$username}: {$text} ', { username: tweet.user.name, text: tweet.text }) );
        console.groupEnd('TWEET');
      } );
    }
  };
  
  return {
    home: new HomeTimeline()
  };
})();