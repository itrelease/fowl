fowl = window.fowl || {};

fowl.storage = (function(){
  function get( key ){
    var storage = JSON.parse( localStorage.getItem('fowl') ) || {};
    return storage[key];
  }
  
  function set( key, value ){
    var storage = JSON.parse( localStorage.getItem('fowl') ) || {};
    if( typeof key == 'object' ){
      for( var prop in key ){
        if( key.hasOwnProperty( prop ) ){
          storage[ prop ] = key[ prop ];
        }
      }
    }
    else{
      storage[ key ] = value;
    }
    
    localStorage.setItem('fowl', JSON.stringify( storage ) );
  }
  
  function remove( key ){
    var storage = JSON.parse( localStorage.getItem('fowl') ) || {};
    storage[key] = null;
    delete storage[key];
    localStorage.setItem('fowl', JSON.stringify( storage ) );
  }
  
  return {
    get: get,
    set: set,
    remove: remove
  };
})();