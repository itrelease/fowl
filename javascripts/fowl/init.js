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
  T.subscribe( T.timeline.EventType.HOME, fowl.timeline.home.onUpdateHandler );
  
  (function(){
    setInterval(function(){
    
    }, 60 * 1000);
  })();
};
