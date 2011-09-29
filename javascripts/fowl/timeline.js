fowl = window.fowl || {};

fowl.timeline = (function(){
  var Timeline = function(){
    Object.defineProperty( this, 'data', { value: [] } );
  };
  
  Timeline.prototype.init = function( opt_data ){
    this.data = opt_data || [];
  };
  
  Timeline.prototype.onUpdateHandler = function( status, response ){
    
  };
  
  var HomeTimeline = function(){
    Timeline.apply( this, arguments );
  };
  fowl.inherit( HomeTimeline, Timeline );
  
  HomeTimeline.prototype.onUpdateHandler = function( status, response ){
    HomeTimeline.super.onUpdateHandler.apply( this, arguments );
  };
  
  return {
    home: new HomeTimeline()
  };
})();