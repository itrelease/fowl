fowl = window.fowl || {};

fowl.storage = (function(){
  function get( key ){
    return JSON.parse( localStorage.getItem( key ) );
  }
  
  function set( key, value ){
    if( typeof key == 'object' ){
      for( var prop in key ){
        if( key.hasOwnProperty( prop ) ){
          localStorage.setItem( prop, JSON.stringify( key[ prop ] ) );
        }
      }
    }
    else{
      localStorage.setItem(key, JSON.stringify( value ) );
    }
  }
  
  function remove( key ){
    localStorage.removeItem( key );
  }
  
  return {
    get: get,
    set: set,
    remove: remove
  };
})();