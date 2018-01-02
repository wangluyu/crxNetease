var bg = chrome.extension.getBackgroundPage();
var app = new Vue({
  el:"#app",
  data:{
    title:"media club",
    netease_table: {
        data: bg.netease,//总数据
        total_num: bg.netease.length,//总条数
        num: 5,//每页条数
        page: 1,//当前页码
    }
  },
  computed: {
    netease_table_show_data: function () {  //本页显示的数据
      var end = this.netease_table.page * this.netease_table.num
      var start = this.netease_table.num * (this.netease_table.page -1)
      return this.netease_table.data.slice(start,end)
    },
    netease_table_total_page: function () {//总页数
      return Math.ceil(this.netease_table.total_num / this.netease_table.num)
    },
    netease_table_pre_pager_class: function () {//控制网易云table分页后退的class
        return {
            'disabled' : this.netease_table.page === 1 //当前页等于
        }
    },
    netease_table_next_pager_class: function () {//控制网易云table分页前进的class
        return {
          'disabled' : this.netease_table.page === this.netease_table_total_page //当前页等于最后一页
        }
    }
  },
  methods: {
    netease_table_remove: function (type,index) {
      switch (type){
        case 'one':
          bg.netease.splice(this.netease_table.num * (this.netease_table.page -1) + index,1);
          break
        case 'page':
          bg.netease.splice(this.netease_table.num * (this.netease_table.page -1),this.netease_table.num);
          break
        case 'all':
          bg.netease.splice(0,bg.netease.length)
          break
      }
    },
    netease_table_change_page: function (index) {
      if(index !==0 && index <= this.netease_table_total_page){
        this.netease_table.page = index
      }
    },
    netease_download: function (index) {
      cover();
      var data = this.netease_table.data[index];
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
      })
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