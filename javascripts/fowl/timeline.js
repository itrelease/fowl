fowl = window.fowl || {};

fowl.timeline = (function(){
  var Timeline = function(){
    Object.defineProperty( this, 'tweets', { value: [] } );
  };
  
  Timeline.prototype.init = function( opt_tweets ){
    this.tweets = opt_tweets || [];
  };
  
  Timeline.prototype.onUpdateHandler = function( status, response ){
    if( status ){
      // response.json — new tweets
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
  };
  
  return {
    home: new HomeTimeline()
  };
})();