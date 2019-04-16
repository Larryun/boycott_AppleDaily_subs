chrome.runtime.onMessage.addListener(function(msg, sender){
	$("#status").text(msg.status);
});

window.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: 'GET_STATE'});
  });
});

var getSelectedTab = (tab) => {
  var tabId = tab.id;
  var sendMessage = (messageObj) => chrome.tabs.sendMessage(tabId, messageObj);
  document.getElementById('start').addEventListener('click', () => sendMessage({ action: 'START' }));
  document.getElementById('stop').addEventListener('click', () => sendMessage({ action: 'STOP' }));

}
chrome.tabs.getSelected(null, getSelectedTab);