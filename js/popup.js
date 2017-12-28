var bg = chrome.extension.getBackgroundPage();
$(function(){
  //分页
    $('#table').bootstrapTable({
        method: 'get',
        cache: false,
        height: 400,
        striped: true,
        pagination: true,
        pageSize: 20,
        pageNumber:1,
        pageList: [10, 20, 50, 100, 200, 500],
        search: true,
        showColumns: true,
        showRefresh: false,
        showExport: false,
        exportTypes: ['csv','txt','xml'],
        search: true,
        clickToSelect: true,
        columns:
            [
                {field:"header",title:"封面",align:"center",valign:"middle",sortable:"true"},
                {field:"name",title:"歌曲",align:"center",valign:"middle",sortable:"true"},
                {field:"singer",title:"歌手",align:"center",valign:"middle",sortable:"true"}
            ],
        data:bg.netease,
    });
  //获取所有听过的网易云的歌曲
  getNetease();

  //下载网易云音乐
  $('.download-netease').click(function () {
    var params = $(this).data('params');
    var encseckey = $(this).data('encseckey');
    var tabid = $(this).data('tabid');
    var name = $(this).data('name');
    downloadNetease(params,encseckey,tabid,name);
  });

  function getNetease () {
    $('#music').empty();
    $.each(bg.netease, function(index, value) {
      var html = '<tr><th scope="row">' +
        '<img src="'+value.img+'">'+
        '</th><td>' +
        value.name+
        '</td><td>'+
        value.singer+
        '</td><td>'+
        '<button class="btn btn-primary download-netease" data-params="'+value.params+'" data-encseckey="'+value.encSecKey+'" data-tabid="'+value.tabId+'" data-name="'+value.name+'-'+value.singer+'.mp3'+'">'+
        'Download</button></td></tr>';
      $('#music').append(html);
    });
  }

  function downloadNetease(params,encSecKey,tabId,name) {
    //用params,encSecKey请求最新的歌曲链接
    $.ajax({
      type: 'POST',
      url: "https://music.163.com/weapi/song/enhance/player/url?csrf_token=",
      data: {
        params:params,
        encSecKey:encSecKey
      },
      success: function(result){
        result = JSON.parse(result);
        var url = result['data'][0]['url'];
        //给网易云页面发送消息转换blob
        chrome.tabs.sendMessage(tabId, {
          type: "downloadNetease",
          url: url,
          name:name
        });
      }
    });
  }
});