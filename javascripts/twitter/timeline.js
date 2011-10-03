window.T = window.T || {};
T.timeline = (function(){
  var HOME_TIMELINE_URL = 'https://api.twitter.com/1/statuses/home_timeline.json',
      MENTIONS_TIMELINE_URL = 'https://api.twitter.com/1/statuses/mentions.json';
  
  function homeTimeline( params, callback ){
    T.request(HOME_TIMELINE_URL, 'GET', params || null, callback);
  }
  
  function mentionsTimeline( params, callback ){
    T.request(MENTIONS_TIMELINE_URL, 'GET', params || null, callback);
  }
  
  return {
    home: homeTimeline,
    mentions: mentionsTimeline
  };
})();