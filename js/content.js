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
      var html = '<a id="back-download-netease" hidden href="'+url+'" download="'+name+'">download</a>';
      $('.play').append(html);
      //blob
      if (url !== window.currentMusicUrl) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.onload = function(e) {
          var res = xhr.response;
          var blob = new Blob([res], {type:"audio/mpeg"});
          window.URL.revokeObjectURL(window.downloadUrl);
          window.currentMusicUrl = url;
          window.downloadUrl = window.URL.createObjectURL(blob);
          if(downloadUrl.indexOf('music.163.com') != -1){
            document.getElementById('back-download-netease').href = downloadUrl;
            $('#back-download-netease')[0].click();
            // $('#back-download-netease').remove();
            // $('#back-download-netease').attr('href',downloadUrl);
          }
        };
        xhr.onreadystatechange = function() {
          if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            console.log($('#back-download-netease').attr('href'));
          }
        };
        xhr.send();
      }
      // console.log(document.getElementById('back-download-netease').href);
    }
  }
);