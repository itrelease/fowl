// init
// timeline
// tweet

window.T = window.T || {};

T.pubsub = {};

T.init = function( params, callback ){
  var subscriptions = {},
      oauth;
  
  oauth = new OAuth({
    consumerKey: params.consumerKey,
    consumerSecret: params.consumerSecret
  });
  
  oauth.setAccessToken([ params.accessTokenKey, params.accessTokenSecret ]);
  
  Object.defineProperties(T, {
    consumerKey: { get: function(){ return params.consumerKey; } },
    consumerSecret: { get: function(){ return params.consumerSecret; } },
    
    accessTokenKey: { get: function(){ return params.accessTokenKey; } },
    accessTokenSecret: { get: function(){ return params.accessTokenSecret; } },
    
    oauth: { get: function(){ return oauth; } }
  });
  
  Object.defineProperties(T.pubsub, {
    subscriptions: { get: function(){ return subscriptions; } }
  });
  
  callback();
};

T.request = function( url, method, params, callback ){
  var queryString = [];
  
  if( params ){
    for( var key in params ){
      if( params.hasOwnProperty( key ) ){
        queryString.push( key + '=' + params[key] );
      }
    }
  }
  
  queryString = queryString.join('&');
  method = method.toLowerCase();
  
  if( method == 'get' ){
    url += '?' + queryString;
  }
  
  T.oauth[method]( url, T.request.successHandler, T.request.errorHandler );
};

T.request.successHandler = function( response ){
  response.json = JSON.parse( response.text );
  callback( true, response );
};

T.request.errorHandler = function( response ){
  response.error = JSON.parse( response.text );
  callback( false, response );
};

T.pubsub.subscribe = function( topic, fn, opt_context ){
  var subscriptions = T.pubsub.subscriptions[topic];
  
  if( !subscriptions ){
    subscriptions = T.pubsub.subscriptions[topic] = [];
  }
  
  subscriptions.push({
    fn: fn,
    context: opt_context
  });
};

T.pubsub.unsubscribe = function( topic, fn ){
  var subscriptions = T.pubsub.subscriptions[topic] || [];
  
  for( var i=0, l=subscriptions.length; i<l; i++ ){
    if( subscriptions[i].fn == fn ){
      subscriptions.splice( i, 1 );
      break;
    }
  }
};

T.pubsub.publish = function( topic ){
  var args = Array.prototype.slice.call( arguments, 1 ),
      subscriptions = T.pubsub.subscriptions[topic] || [],
      subscription;
  
  for( var i=0, l=subscriptions.length; i<l; i++ ){
    subscription = subscriptions[i];
    subscription.fn.apply( subscription.context, args );
  }
};


T.authorize = function( params, callback ){
  var queryString = window.location.search.split('?').pop(),
      oauth;
  
  if( !queryString || queryString.indexOf('oauth_token') == -1 ){
    console.log('1', params.consumerKey, params.consumerSecret, params.callbackUrl);
    oauth = new OAuth({
      consumerKey: params.consumerKey,
      consumerSecret: params.consumerSecret,
      callbackUrl: params.callbackUrl
    });
    
    oauth.get(
      'https://api.twitter.com/oauth/request_token',
      function success( response ){
        window.location = 'https://api.twitter.com/oauth/authorize?' + response.text;
      },
      function failure( response ){
        console.warn( response );
      }
    );
  }
  
  else{
    console.log('2');
    var queryObject = {},
        pairs;
    
    queryString = queryString.split('&');
    
    for( var i=0, l=queryString.length; i<l; i++ ){
      pairs = queryString[i].split('=');
      queryObject[pairs[0]] = pairs[1];
    }
    
    var requestToken = queryObject['oauth_token'];
    
    oauth = OAuth({
      consumerKey: params.consumerKey,
  	  consumerSecret: params.consumerSecret,
  	  accessTokenKey: requestToken,
  	  accessTokenUrl: 'https://api.twitter.com/oauth/access_token'
    });
    
    oauth.fetchAccessToken(
      function(){
        var accessToken = oauth.getAccessToken();
        callback( accessToken[0], accessToken[1] );
      },
      function( response ){
        console.warn(response);
      }
    );
  }
};
