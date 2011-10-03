// storage
// pubsub
// timeline
// init

fowl = window.fowl || {};

fowl.pubsub = {};

fowl.getMsg = function( str, opt_values ){
  var values = opt_values || {};
  for (var key in values) {
    var value = ('' + values[key]).replace(/\$/g, '$$$$');
    str = str.replace(new RegExp('\\{\\$' + key + '\\}', 'gi'), value);
  }
  return str;
};

fowl.init = function(){  
  fowl.pubsub.subscribe(fowl.timeline.EventType.HOME, function( status, response ){
    response.json.forEach( function( tweet ){
      console.group('TWEET');
      console.log('raw', tweet);
      console.log( fowl.getMsg(' {$username}: {$text} ', { username: tweet.user.name, text: tweet.text }) );
      console.groupEnd('TWEET');
    } );
  });
  
  var timeline = fowl.storage.get('timeline') || {};
  
  fowl.timeline.home.init( timeline['home'] );
  fowl.timeline.home.fetch();
  
  setInterval(function(){
    fowl.timeline.home.fetch();
  }, 60 * 1000);
};
