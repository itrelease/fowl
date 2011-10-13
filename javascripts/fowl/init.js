fowl = window.fowl || {};

fowl.getMsg = function( str, opt_values ){
  var values = opt_values || {};
  for (var key in values) {
    var value = ('' + values[key]).replace(/\$/g, '$$$$');
    str = str.replace(new RegExp('\\{\\$' + key + '\\}', 'gi'), value);
  }
  return str;
};

fowl.parse = function( tweet ){
  // parse urls
  tweet = tweet.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) {
  	return url.link(url);
  });
  
  // parse usernames
  tweet = tweet.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
  	var username = u.replace("@","");
  	return u.link('http://twitter.com/' + username);
  });
  
  // parse hashtags
  tweet = tweet.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
  	var tag = t.replace('#', '%23');
  	return t.link('http://search.twitter.com/search?q=' + tag);
  });

  return tweet;
};

fowl.init = function(){
  fowl.pubsub.subscribe(fowl.timeline.EventType.HOME, function( status, tweets ){
    var tweetTpl = '<span class="nickname">{$username}</span>';
        tweetTpl += '<time datetime="{$datetime}">{$time}</time>';
        tweetTpl += '<p>{$text}</p>';
    
    var documentFragment = document.createDocumentFragment();
    
    tweets.forEach( function( tweet ){
      var date = new Date( tweet.created_at );
      
      var data = {
        username: tweet.user.screen_name,
        datetime: date.toFormattedString('yyyy-MM-dd HH:mm:ss'),
        time: humanized_time_span( date ),
        text: fowl.parse( tweet.text )
      };
      
      var li = document.createElement( 'li' );
      li.id = tweet.id_str;
      li.innerHTML = fowl.getMsg( tweetTpl, data );
      
      documentFragment.appendChild( li );
    } );
    
    var homeTimeline = document.getElementById('tweetsList'),
        slide = homeTimeline.parentNode;
    
    
  });
  
  var timeline = fowl.storage.get('timeline') || {};
  
  fowl.timeline.home.init( timeline['home'] );
  fowl.timeline.home.fetch();
  
  setInterval(function(){
    fowl.timeline.home.fetch();
  }, 60 * 1000);
};
