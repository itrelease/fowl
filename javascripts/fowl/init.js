// init
// storage
// timeline

fowl = window.fowl || {};

fowl.getMsg = function( str, opt_values ){
  var values = opt_values || {};
  for (var key in values) {
    var value = ('' + values[key]).replace(/\$/g, '$$$$');
    str = str.replace(new RegExp('\\{\\$' + key + '\\}', 'gi'), value);
  }
  return str;
};

fowl.init = function(){
  T.pubsub.subscribe( T.timeline.EventType.HOME, fowl.timeline.home.onUpdateHandler, fowl.timeline.home );
  
  (function(){
    var timeline = fowl.storage.get( 'timeline' ) || {},
        sinceId = fowl.storage.get( 'since_id' ) || {};
    
    fowl.timeline.home.init( timeline['home'] );
    
    T.timeline.home({
      since_id: sinceId['home'],
      include_entities: true
    });
    
    setInterval(function(){
      var sinceId = fowl.storage.get( 'since_id' ) || {};
      
      T.timeline.home({
        since_id: sinceId['home'],
        include_entities: true
      });
    }, 60 * 1000);
  })();
};
