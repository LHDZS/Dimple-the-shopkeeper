<template>
  <div>
    <div class="header_main">
      <div class="header_main_imges" @click="xiugaitupian">
        <img class="header_main_img" :src="http + message.image_head || ''" alt="">
      </div>
      <div class="header_main_content">
        <div class="main_content_names">{{message.linkname}}</div>
        <div class="main_content_dizhi">地址：{{message.address}}</div>
      </div>
      <!-- <div class="main_content_logo" @click="xiugaitupian">修改头像</div> -->
    </div>
    <div class="zhanweifu"></div>
    <div class="main_content">
      <div class="main_content_name">店铺背景图</div>
      <img class="main_content_img" :src="http + message.image_back || ''" alt="">
    </div>
    <div class="zhanweifu"></div>
    <!-- <div class="wrap_footer">
        <div class="footer-left">订单提醒</div>
        <div class="footer-right">{{swNoYes}}<switch  checked v-on:change="switch1Change"/></div>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
      return {
          img:'',
          swNoYes:'开',
          time:'',
          message:{},
          warn:0,
          http:'https://jujiuwo.xiaoniren.cn',
          merchant_id:'',
          login_time:''
      }
  },
  mounted () {
    this.merchant_id = wx.getStorageSync('merchant_id')
    this.login_time = wx.getStorageSync('login_time')
    this.merchant()
  },
  methods:{
    xiugaitupian() {
      var _this = this
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths[0]
          wx.uploadFile({
            url: 'https://jujiuwo.xiaoniren.cn/restapi/bgoods/uploads', //仅为示例，非真实的接口地址
            filePath: tempFilePaths,
            name: 'file',
            formData:{
              id:_this.merchant_id,
              login_time:_this.login_time,
            },
            success: function(res){
              var data =  JSON.parse(res.data)
              _this.img = data.data.file.url
              _this.store()
            }
          })
        }
      })
    },
    switch1Change(e){
      if (e.target.value) {
        this.swNoYes = '开'
        this.warn = 0
        this.store()
      }else {
        this.swNoYes = '关'
        this.warn = 1
        this.store()
      }
    },
    merchant() {
        var _this = this
        this.$post('/restapi/bgoods/merchant',{id:this.merchant_id,login_time:this.login_time})
        .then(function (res) {
            if (!res.data.tag) {
                _this.img = res.data.image_head
                _this.message = res.data
            }else {
              wx.showToast({
                  title: res.data.data,
                  icon: 'success',
                  duration: 1000
              })
              setTimeout(function(){
                  const url = '../disembark/main'
                  wx.reLaunch({ url })
              },2000)
            }
        })
        .catch(function(res) {
            console.log(res)
        })
    },
    store() {
        var _this = this
        this.$post('/restapi/bgoods/image',{
          id:this.merchant_id,
          login_time:this.login_time,
          warning:this.warn,
          image_head:this.img
        })
        .then(function (res) {
            _this.message = res.data
        })
        .catch(function(res) {
            wx.showToast({
                title: res.data.message,
                icon: 'success',
                duration: 1000
            })
            setTimeout(function(){
                const url = '../disembark/main'
                wx.switchTab({ url })
            },2000)
        })
    },
  },
  created () {
    // // 获取当前时间戳
    // var timestamp = new Date();
    // // 转换成当前时间
    // function formatDate(nows) { 
    //     var now=new Date(nows); 
    //     var year=now.getFullYear(); 
    //     var month=now.getMonth()+1; 
    //     var date=now.getDate(); 
    //     var hour=now.getHours(); 
    //     var minute=now.getMinutes(); 
    //     var second=now.getSeconds(); 
    //     return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
    // }
    // this.time = formatDate(timestamp)
  }
}
</script>

<style>
.header_main {
  width: 100%;
  height: 207rpx;
  position: relative;
}
.header_main_imges {
  padding: 30rpx 21rpx;
  float: left;
}
.header_main_img {
  width: 142rpx;
  height: 142rpx;
  border-radius: 50%;
}
.header_main_content {
  float: left;
  width: 550rpx;
  height: 120rpx;
  margin-top: 60rpx;
  line-height: 40rpx;
}
.main_content_names {
  font-size:  28rpx;
  color: #000;
}
.main_content_dizhi {
  width: 100%;
  height: 70rpx;
  font-size: 26rpx;
  color: #666;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.main_content_logo {
  position: absolute;
  top: 70rpx;
  right: 10rpx;
  font-size: 14px;
  padding: 10rpx 30rpx;
  border: 1px solid #545454;
  border-radius: 50rpx;
  color: #545454;
}
.main_content_logo:hover {
  color: #3a9afc;
  border: 1px solid #3a9afc;
}
/* 店铺背景 */
.main_content {
  width: 100%;
  height: 455rpx;
  padding: 0rpx 20rpx 30rpx 20rpx;
  box-sizing: border-box;
}
.main_content_name {
  width: 100%;
  height: 90rpx;
  line-height: 90rpx;
  font-size: 18px;
  color: #333;
}
.main_content_img {
  width: 100%;
  height: calc(455rpx - 110rpx);
}
/* 底部 */
.wrap_footer {
  width: 100%;
  height: 90rpx;
  padding: 29rpx 22rpx;
  box-sizing: border-box;
}
.footer-left {
  float: left;
}
.footer-right {
  float: right;
}
</style>
