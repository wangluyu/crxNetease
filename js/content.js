chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    //网易
    if (request.type == "netease") {
      var name = $('#g_player .play .words .name').attr('title');
      var singer = $('#g_player .play .words .by').children().attr('title');
      var img = $('#g_player .head').children('img').attr('src');
      // 向background发送歌曲附带信息-- 封面 歌手 歌曲名等
      chrome.runtime.sendMessage({
        type: 'netease',
        params: request.params,
        encSecKey: request.encSecKey,
        tabId: request.tabId,
        name: name,
        singer: singer,
        img: img
      }, function(response) {
          // console.log(response);
      });
    }else if (request.type == "downloadNetease"){
      var url = request.url;
      var name = request.name;
      //将url插入网易页面后下载
      //转换为blob然后再下载
      fetch(url).then(function(response) {
        console.log(response);
        return response.blob();
      }).then(function(myBlob) {
        var a = document.createElement('a');
        var downloadUrl = URL.createObjectURL(myBlob);
        console.log(downloadUrl);
        a.href = downloadUrl;
        a.download = name;
        a.click();
        window.URL.revokeObjectURL(downloadUrl);
      });
    }
  }
);