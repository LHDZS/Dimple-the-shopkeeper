<script>
export default {
  created () {
    let _this = this
    wx.login({
      success: function(res) {
        if (res.code) {
          //发起网络请求
          _this.$post('/restapi/member/openids',{code: res.code})
          .then(function (res) {
              wx.setStorageSync('openid',res.data.openid)
          })
          .catch(function(res) {
              console.log(res)
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }

}
</script>

<style>
/* .container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
} */
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
/* 占位 */
.zhanweifu {
  width: 100%;
  height: 15rpx;
  background-color: #eee;
}
.clearfix:after {content:"."; display:block; height:0; visibility:hidden; clear:both; } */
.clearfix { zoom:1; }
button{
  position: static;
  background-color: #fff;
}
button:after{
  content: '';
  display: none;
}
.tab_buttom_on {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
}
</style>
