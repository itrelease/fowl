fowl = window.fowl || {};

fowl.storage = (function(){
  var storage = JSON.parse( localStorage.getItem('fowl') ) || {};
  
  function get( key ){
    return storage[key];
  }
  
  function set( key, value ){
    storage[key] = value;
    localStorage.removeItem('fowl');
    JSON.stringify( localStorage.setItem('fowl', storage) );
  }
  
  function remove( key ){
    storage[key] = null;
    delete storage[key];
  }
  
  return {
    get: get,
    set: set,
    remove: remove
  };
})();