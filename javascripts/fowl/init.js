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
  
  var timeline = fowl.storage.get('timeline') || {};
  
  fowl.timeline.home.init( timeline['home'] );
  fowl.timeline.home.fetch();
  
  setInterval(function(){
    fowl.timeline.home.fetch();
  }, 60 * 1000);
};
