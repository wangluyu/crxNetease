var bg = chrome.extension.getBackgroundPage();
var app = new Vue({
  el:"#app",
  data:{
    title:"media club",
    netease: bg.netease
  },
  methods: {
    netease_download: function (index) {
      cover();
      var data = this.netease[index];
      axios({
        method: 'post',
        url: 'https://music.163.com/weapi/song/enhance/player/url?csrf_token=',
        data: {
          params:data.params,
          encSecKey:data.encSecKey
        },
        transformRequest: [function (data) {
          var ret = ''
          for (var it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        result = response.data.data[0];
        var url = result.url;
        //给网易云页面(content.js)发送消息转换blob
        chrome.tabs.sendMessage(data.tabId, {
          type: "downloadNetease",
          url: url,
          name:data.name + '-' + data.singer + '.mp3'
        });
      }).catch(function (err) {
        console.log(err);
      });
    }
  }
});
function cover() {
  var coverbg = document.getElementById("cover");
  coverbg.setAttribute('class','up-fadeIn');
  coverbg.style.display ='inline';
}
function hideCover() {
  var coverbg = document.getElementById("cover");
  coverbg.setAttribute('class','down-fadeIn');
  coverbg.style.display ='none';
}
//获取来自content.js的
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.type == 'netease_download_complete'){
      hideCover();
    }
  }
);