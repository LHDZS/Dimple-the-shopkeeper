<template>
  <div>
      <div class="nav_head">
          <div class="nav_head_merchant_name">{{merchant_name}}</div>
          <div class="nav_head_title">
              <img class="nav_head_img" src="/static/image/jinbi.png" alt="">
              <div class="nav_head_name">
                  <div>可提现总收入</div>
                  <div style="font-size:24px;">{{tenant.all_diff_income}}元</div>
              </div>
          </div>
      </div>
      <div class="subnav_head_title">
          <div class="subnav_head_menu">
              <img class="subnav_head_img" src="/static/image/dingdan.png" alt="">
              <div>
                  <div>今日订单收入</div>
                  <div>{{tenant.today_order_income}}元</div>
              </div>
          </div>
          <div class="subnav_head_menu">
              <img class="subnav_head_img" src="/static/image/chenggong.png" alt="">
              <div>
                  <div>今日提成收入</div><div>{{tenant.today_diff_income}}元</div></div>
          </div>
          <div class="subnav_head_menu">
              <img class="subnav_head_img" src="/static/image/mingxi.png" alt="">
              <div>
                <div>今日订单数</div>
                <div>{{tenant.today_num}}个</div>
              </div>
          </div>
      </div>
      <div class="nav_menu_tag">
          <div class="nav_submenu_tag">
              <div class="subnav_submenu_tag" @click="financeViewTap">
                  <img class="subnav_submenu_img" src="/static/image/caiwu.png" alt="">
                  <span class="subnav_submenu_name">财务报表</span>
                  <form @submit="submit" report-submit='true' class="tab_buttom_on">
                    <button type="default" formType="submit"></button>
                  </form>
              </div>
              <div class="subnav_submenu_tag" @click="pandectViewTap">
                  <img class="subnav_submenu_img" src="/static/image/shangpin2.png" alt="">
                  <span class="subnav_submenu_name">商品总览</span>
                  <form @submit="submit" report-submit='true' class="tab_buttom_on">
                    <button type="default" formType="submit"></button>
                  </form>
              </div>
              <div class="subnav_submenu_tag" @click="orderViewTap">
                  <img class="subnav_submenu_img" src="/static/image/dingdan1.png" alt="">
                  <span class="subnav_submenu_name">全部订单</span>
                  <form @submit="submit" report-submit='true' class="tab_buttom_on">
                    <button type="default" formType="submit"></button>
                  </form>
              </div>
              <div class="subnav_submenu_tag" @click="shopViewTap">
                  <img class="subnav_submenu_img" src="/static/image/dianpu.png" alt="">
                  <span class="subnav_submenu_name">店铺信息</span>
                  <form @submit="submit" report-submit='true' class="tab_buttom_on">
                    <button type="default" formType="submit"></button>
                  </form>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
          tenant:{},
          merchant_id:'',
          login_time:'',
          merchant_name:''
      }
  },
  methods:{
        submit(e) {
            var _this = this
            console.log('213213')
            var openid = wx.getStorageSync('openid')
            this.$post('/restapi/bgoods/getformid',{
                form_id: e.target.formId,
                openid: openid,
                })
            .then(function (res) {
                console.log(res)
            })
            .catch(function(res) {
                console.log(res)
            })
        },
        shopViewTap () {
          const url = '../setupshop/main'
          wx.navigateTo({ url })
        },
        orderViewTap () {
          const url = '../orderform/main'
          wx.navigateTo({ url })
        },
        // 商品总览
        pandectViewTap() {
          const url = '../finance/main'
          wx.navigateTo({ url })
        },
        // 财务
        financeViewTap () {
          const url = '../pandect/main'
          wx.navigateTo({ url })
        },
        message() {
            var _this = this
            this.$get('/restapi/bgoods-item/data',{id:this.merchant_id,login_time:this.login_time})
            .then(function (res) {
                if (!res.data.tag) {
                    _this.tenant = res.data
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
  },
  mounted() {
        wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#077cf4',
        })
        // this.merchant_name = wx.getStorageSync('merchant_name')
        // this.merchant_id = wx.getStorageSync('merchant_id')
        // this.login_time = wx.getStorageSync('login_time')
        // this.message()
  },
  onShow() {
      this.merchant_name = wx.getStorageSync('merchant_name')
      this.merchant_id = wx.getStorageSync('merchant_id')
      this.login_time = wx.getStorageSync('login_time')
      this.message()
  },
  created () {
  
  }
}
</script>

<style>
.nav_head {
    width: 100%;
    height: 300rpx;
    background-color: #077cf4;
    /* padding: 95rpx 0rpx; */
    box-sizing: border-box;
}
.nav_head_merchant_name {
    width: 100%;
    height: 95rpx;
    line-height: 95rpx;
    text-align: center;
    color: #fff;
}
.nav_head_title {
    width: 360rpx;
    margin: 0 auto;
}
.nav_head_img {
    width: 80rpx;
    height: 80rpx;
    padding: 20rpx 0rpx;
    float: left;
}
.nav_head_name {
    text-align: center;
    color: #fff;
}
/* 二级导航 */
.subnav_head_title {
    width: 100%;
    height: 210rpx;
    background-color: #3a9afc;
    display: flex;
}
.subnav_head_menu {
    flex: 1;
    text-align: center;
    padding: 38rpx 30rpx;
    font-size: 16px;
    color: #fff;
}
.subnav_head_img {
    width: 34rpx;
    height: 40rpx;
}
/* 导航 */
.nav_menu_tag {
    width: 100%;
    height: 293rpx;
    background-color: #eee;
    padding: 20rpx 0rpx;
    box-sizing: border-box;
}
.nav_submenu_tag {
    width: 100%;
    height: 253rpx;
    background-color: #fff;
}
.subnav_submenu_tag {
    width: 50%;
    height: 50%;
    padding: 30rpx 70rpx;
    border: 1rpx solid #eee;
    box-sizing: border-box;
    float: left;
    position: relative;
}
.subnav_submenu_img {
    width: 70rpx;
    height: 70rpx;
    float: left;
}
.subnav_submenu_name {
    padding: 10rpx 0rpx;
    float: right;
}
</style>
