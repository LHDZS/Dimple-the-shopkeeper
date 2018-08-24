<style>
.disembark_header {
    width: 100%;
    height: 745rpx;
    margin: 0 auto;
    padding: 0rpx 75rpx;
    box-sizing: border-box;
}
.disembark_header_div {
    width: 100%;
    height: 110rpx;
    border-bottom: 1rpx solid #d8d8d8;
}
.disembark_header_input {
    width: 100%;
    height: 110rpx;
    line-height: 110rpx;
    font-size: 16px;
    color: #aaa;
}
.disembark_denglu {
    width: 520rpx;
    height: 90rpx;
    line-height: 90rpx;
    margin: 0 auto;
    border-radius: 50rpx;
    text-align: center;
    background:-webkit-gradient(linear, 0% 0%, 100% 0%,from(#00ccff), to(#448cfa));
    color: #fff;
}
.disembark_footer {
    width: 100%;
    margin-top: 50rpx;
    color: #aaaaaa;
    line-height: 50rpx;
    font-size: 14px;
    text-align: center;
}
.disembark_bootom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 150rpx;
}
</style>

<template>
  <div>
      <div class="disembark_header">
            <div style="height:250rpx"></div>
            <div class="disembark_header_div">
                <input class="disembark_header_input" type="text" placeholder="电话号码" v-model="inputname" :value="inputname" confirm-type="done" @confirm="inputnames()">
            </div>
            <div class="disembark_header_div">
                <input class="disembark_header_input" type="text" placeholder="密码" v-model="inputmima" :value="inputmima" confirm-type="done" @confirm="inputmimas()">
            </div>
      </div>
      <form @submit="denglu" report-submit='true'>
            <!-- <div class="disembark_denglu" @click="denglu">登陆</div> -->
            <button class="disembark_denglu" style="color:#fff" type="default" formType="submit">登陆</button>
      </form>
      <!-- <form @submit="submit" report-submit='true' >

        <button form-type="submit" type="default" size="mini" >提交</button>
      </form> -->
      <div class="disembark_footer">
          <div>商户名和密码由平台为您提供</div>
          <div>如有问题请联系聚酒窝官方客服：400-5212-2145</div>
      </div>
      <div class="disembark_bootom">
          <img style="width:100%;height:100%" src="/static/image/bolang.png" alt="">
      </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
          inputname: '',
          inputmima: '',
          openid:null
      }
  },
  components: {

  },
  mounted() {
    wx.setNavigationBarTitle({
        title: '登录'
    })
    wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#ffffff',
    })
    this.openid = wx.getStorageSync('openid')
  },
  methods: {
      inputnames(e) {
          this.inputname = e.target.value
      },
      inputmimas (e) {
          this.inputmima = e.target.value
      },
    //   denglu(e) {
    //     if (this.openid) {
    //         var _this = this
    //         this.$post('/restapi/bgoods/login',{
    //             phone:this.inputname,
    //             password:this.inputmima,
    //             openid:this.openid,
    //             form_id: e.target.formId
    //         })
    //         .then(function (res) {
    //             wx.setStorageSync('merchant_id',res.data.merchant_id)
    //             wx.setStorageSync('login_time',res.data.login_time)
    //             wx.setStorageSync('merchant_name',res.data.merchant_name)
    //             if (res.success) {
    //                 if (!res.data.tag) {
    //                     wx.showToast({
    //                         title: '成功',
    //                         icon: 'success',
    //                         duration: 1000
    //                     })
    //                     setTimeout(function(){
    //                         const url = '../index/main'
    //                         wx.switchTab({ url })
    //                     },2000)
    //                 }
    //             }else {
    //                 wx.showToast({
    //                     title: res.data.message,
    //                     icon: 'none',
    //                     duration: 2000
    //                 })
    //             }
    //         })
    //         .catch(function(res) {
    //             console.log(res)
    //         })
    //     }
            
    //   },
      denglu(e) {
        if (this.openid) {
            var _this = this
            wx.request({
                url: 'https://jujiuwo.xiaoniren.cn/restapi/bgoods/login',
                method: 'POST',
                data: {
                    phone:_this.inputname,
                    password:_this.inputmima,
                    openid:_this.openid,
                    form_id: e.target.formId
                },
                header: {
                    'content-type': 'application/json'
                },
                success: function(res) {
                    wx.setStorageSync('merchant_id',res.data.data.merchant_id)
                    wx.setStorageSync('login_time',res.data.data.login_time)
                    wx.setStorageSync('merchant_name',res.data.data.merchant_name)
                    console.log(res)
                    if (res.data.success) {
                        if (!res.data.data.tag) {
                            wx.showToast({
                                title: '成功',
                                icon: 'success',
                                duration: 1000
                            })
                            setTimeout(function(){
                                const url = '../index/main'
                                wx.switchTab({ url })
                            },2000)
                        }
                    }else {
                        wx.showToast({
                            title: res.data.data.message,
                            icon: 'none',
                            duration: 2000
                        })
                    }  
                }
            })
        }
      }
  }
}
</script>

