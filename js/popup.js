var bg = chrome.extension.getBackgroundPage();
var app = new Vue({
  el:"#app",
  data:{
    title:"media club",
    netease: bg.netease
  },
  methods: {
    netease_download: function (index) {
      var data = this.netease[index];
      console.log(data);
      fetch(url, {ada
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify({
          params:data.params,
          encSecKey:data.encseckey
        })
      }).then(function(result) {
        result = JSON.parse(result);
        var url = result['data'][0]['url'];
        //给网易云页面(content.js)发送消息转换blob
        chrome.tabs.sendMessage(data.tabid, {
          type: "downloadNetease",
          url: url,
          name:data.name + '-' + data.singer + '.mp3'
        });
      });
    }
  }
});