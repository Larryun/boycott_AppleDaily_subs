var unblocked = false;
var vdocontainer = $('div #video_player').html();
var content = $("#masterContent").html();
var fancybox = $("div.photo_center a.fancybox-button").html();

function unblock(){
  unblocked = true;
  setTimeout(function(){
    $('div #video_player img').remove();
    $('div #video_player').html(vdocontainer);
    $("#masterContent").html(content);
    $("div.photo_center a.fancybox-button").html(fancybox);
    $('div.contentblock-block').css('display','none');
    $('div.content').removeClass('block');
  }, 2050);
}

chrome.storage.sync.get(["state"], function(items){
    if(items["state"] == "start" || !items.hasOwnProperty('state')){
      unblock();
    }
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  switch (message.action) {
    case 'STOP':
      chrome.storage.sync.set({ "state": "stop" }, function(){
        sendState("OFF");
      });
      break;

    case 'START':
      chrome.storage.sync.set({ "state": "start" }, function(){
        sendState("ON");
        if(!unblocked){
          unblock();
        }
      });
      break;

    case 'GET_STATE':
      chrome.storage.sync.get(["state"], function(items){
        if(items.hasOwnProperty("state")){
          if(items["state"] == "start"){
            sendState("ON");
          }else{
            sendState("OFF");
          }
        }else{
          sendState("ON");
        }
      });
      break;

    default:
      break;
  }
});

function sendState(state){
  chrome.runtime.sendMessage({
    from: 'content',
    status: state
  });
}