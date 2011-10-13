fowl = window.fowl || {};

fowl.timeline = (function(){
  var EventType = {
    HOME: 'onHomeTimelineUpdate',
    MENTIONS: 'onMentionTimelineUpdate'
  };
  
  var Timeline = function(){
    Object.defineProperties(this, {
      tweets: { value: [], writable: true },
      sinceId: { value: null, writable: true }
    });
  };
  
  Timeline.prototype.init = function( opt_tweets ){
    this.tweets = opt_tweets || this.tweets;
    this.sinceId = this.tweets[0] ? this.tweets[0] : this.sinceId;
    if( opt_tweets ){
      fowl.pubsub.publish( EventType.HOME, true, this.tweets );
    }
  };
  
  Timeline.prototype.onUpdateHandler = function( status, response ){
    if( status ){
      var tweets = Array.isArray( response.json ) ? response.json.slice(0) : [];
      
      if( tweets.length && this.tweets.length ){
        var d1 = +new Date( tweets[tweets.length - 1]['created_at'] ),
            d2 = +new Date( this.tweets[0]['created_at'] );
        
        this.tweets = d1 > d2 ? tweets.concat( this.tweets ) : this.tweets.concat( tweets.slice(1) );
      }
      else{
        this.tweets = tweets.concat( this.tweets );
      }
      
      this.sinceId = this.tweets[0] ? this.tweets[0]['id_str'] : this.sinceId;
      
      if( this.type ){
        var localTimeline = fowl.storage.get( 'timeline' ) || {},
            localSinceId = fowl.storage.get( 'since_id' ) || {};
      
        localTimeline[ this.type ] = this.tweets.slice(0, 500);
        localSinceId[ this.type ] = this.sinceId;
      
        fowl.storage.set( 'timeline', localTimeline );
        fowl.storage.set( 'since_id', localSinceId );
      }
    }
  };
  
  var HomeTimeline = function(){
    Timeline.apply( this, arguments );
    Object.defineProperty( this, 'type', {
      value: 'home'
    } );
  };
  Object.defineProperty( HomeTimeline, 'super', {
    value: Timeline.prototype
  } );
  HomeTimeline.prototype = Object.create( Timeline.prototype );
  
  HomeTimeline.prototype.fetch = function(){
    var sinceId = fowl.storage.get('since_id') || {};
    
    T.timeline.home({
      count: 200,
      since_id: sinceId['home'],
      include_entities: true
    }, this.onUpdateHandler.bind( this ));
  };
  
  HomeTimeline.prototype.fetchWithMaxId = function( maxId ){
    T.timeline.home({
      count: 200,
      max_id: maxId,
      include_entities: true
    }, this.onUpdateHandler.bind( this ));
  };
  
  HomeTimeline.prototype.onUpdateHandler = function( status, response ){
    HomeTimeline.super.onUpdateHandler.apply( this, arguments );
    if( status && response.json.length ){
      fowl.pubsub.publish( EventType.HOME, status, response.json );
    }
  };
  
  return {
    home: new HomeTimeline(),
    EventType: EventType
  };
})();