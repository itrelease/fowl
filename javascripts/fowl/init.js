// init
// storage
// timeline

fowl = window.fowl || {};

fowl.init = function(){
  T.pubsub.subscribe( T.timeline.EventType.HOME, fowl.timeline.home.onUpdateHandler, fowl.timeline.home );
  
  (function(){
    T.timeline.home();
    // 
    // setInterval(function(){
    //   T.timeline.home();
    // }, 60 * 1000);
  })();
};
