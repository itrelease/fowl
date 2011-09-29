window.T = window.T || {};
T.timeline = (function(){
  var HOME_TIMELINE_URL = 'https://api.twitter.com/1/statuses/home_timeline.json',
      MENTIONS_TIMELINE_URL = 'https://api.twitter.com/1/statuses/mentions.json';
  
  var EventType = {
    HOME: 'onTimelineUpdate',
    MENTIONS: 'onMentionsUpdate'
  };
  
  function homeTimeline( params ){
    T.request(HOME_TIMELINE_URL, 'GET', params || null, function( status, response ){
      console.log('T.timeline.home', status, response);
      T.pubsub.publish( EventType.HOME, status, response );
    });
  }
  
  function mentionsTimeline( params ){
    T.request(MENTIONS_TIMELINE_URL, 'GET', params || null, function( status, response ){
      console.log('T.timeline.mentions', status, response);
      T.pubsub.publish( EventType.MENTIONS, status, response );
    });
  }
  
  return {
    home: homeTimeline,
    mentions: mentionsTimeline,
    EventType: EventType
  };
})();