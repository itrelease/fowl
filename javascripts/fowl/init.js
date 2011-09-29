// init
// storage
// timeline

fowl = window.fowl || {};

fowl.inherit = (function( C, P ){
  var F = function(){};
  return function(){
    F.prototype = P.prototype;
    C.prototype = new F();
    C.super = P.prototype;
    C.prototype.constructor = C;
  };
})();

fowl.init = function(){
  T.pubsub.subscribe( T.timeline.EventType.HOME, fowl.timeline.home.onUpdateHandler, fowl.timeline.home );
  
  (function(){
    T.timeline.home();
    
    setInterval(function(){
      T.timeline.home();
    }, 60 * 1000);
  })();
};
