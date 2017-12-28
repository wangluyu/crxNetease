//网易云音乐
var netease = [];
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    try{
      var formData = details.requestBody.formData;
      chrome.tabs.sendMessage(details.tabId, {
        type: "netease",
        params: formData.params[0],
        encSecKey: formData.encSecKey[0],
        tabId:details.tabId
      });
    }catch (err){
      console.error(err.message);
    }
  },{// filters
    urls: [
        "https://music.163.com/weapi/song/enhance/player/url?csrf_token="
    ]
  },
  ["requestBody","blocking"]
);
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.type == 'netease'){
      $.each(netease, function(index, value) {
        if (value.name === request.name && value.singer === request.singer){
          console.log('=='+value.name);
          netease.splice(index,1);
          return false;
        }else{
          console.log(value.name);
        }
      });
      netease.push(request);
    }
  }
);