fowl = window.fowl || {};

fowl.pubsub = (function(){
  var subscriptions = {};
  
  function subscribe( topic, fn, opt_context ){
    if( !subscriptions[topic] ){
      subscriptions[topic] = [];
    }
  
    subscriptions[topic].push({
      fn: fn,
      context: opt_context
    });
  };

  function unsubscribe( topic, fn ){
    var s = subscriptions[topic] || [];
  
    for( var i=0, l=s.length; i<l; i++ ){
      if( s[i].fn == fn ){
        s.splice( i, 1 );
        break;
      }
    }
  };

  function publish( topic ){
    var args = Array.prototype.slice.call( arguments, 1 ),
        s = subscriptions[topic] || [];
  
    for( var i=0, l=s.length; i<l; i++ ){
      s[i].fn.apply( s[i].context, args );
    }
  };
  
  return {
    publish: publish,
    subscribe: subscribe,
    unsubscribe: unsubscribe
  };
})();