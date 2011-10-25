window.T = window.T || {};
T.account = (function(){
  var CREDENTIALS_URL = 'http://api.twitter.com/1/account/verify_credentials.json';
  
  function accountCredentials( params, callback ){
    T.request(CREDENTIALS_URL, 'GET', params || null, callback);
  };
  
  return {
    credentials: accountCredentials
  };
})();