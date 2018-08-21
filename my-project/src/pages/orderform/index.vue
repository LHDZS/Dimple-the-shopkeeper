<template>
    <div>
        <div class="orderfrom_header_top">
            <div class="header_nav">
                <div class="zhanweizhi">
                    <img class="header_rili" src="/static/image/jjw.png" alt="">
                </div>
                <div class="header_input">
                    <input class="header_input_ipt" type="text" placeholder="请输入桌号搜索" confirm-type="search" @confirm="confirm($event)">
                    <img class="header_input_img" src="/static/image/sousuo.png" alt="">
                </div>
            </div>
            <div class="orderform_header">
                <div class="orderform_header_list" v-for="(list,key) in tabarr" :key="key" :class="listid == list.id ? 'header_list_red' : '' " @click="tabarrs(list.id)">
                    {{list.name}}
                    <form @submit="submit" report-submit='true' class="tab_buttom_on">
                        <button type="default" formType="submit"></button>
                    </form>
                </div>
                <div class="orderform_header_xuan" @click="shaixuan()">筛选
                    <img class="orderform_header_xiajian" v-if="!meunshow" src="/static/image/xiajian.png" alt="">
                    <img class="orderform_header_xiajian" v-if="meunshow" src="/static/image/shangjian.png" alt="">
                    <div class="orderform_header_menu" v-show="meunshow">
                        <div class="header_menu_list" @click="delivery('堂食')">堂食</div>
                        <div class="header_menu_list" @click="delivery('外卖')">外卖</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="zhanweifu" style="margin-top: 208rpx;"></div>
        <div class="orderform_nav_matter" v-if="loadingStatus && !abnorType">
            <div class="orderform_nav_container clearfix" v-for="(item,index) in indent" :key="index">
                <div class="orderform_main_header_c">
                    <div class="orderform_main_left">订单编号：{{item.id}}</div>
                    <div class="orderform_main_right">{{item.sta}}</div>
                </div>
                <div class="orderform_main_header_c">
                    <div class="orderform_main_left">桌号&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp：{{item.table_number}}</div>
                </div>
                <div class="orderform_main_header_c">
                    <div class="orderform_main_left">下单时间：{{item.updated_at}}</div>
                </div>
                <div class="orderform_main_header_c">
                    <div class="orderform_main_left">顾客姓名：{{item.real_name}}</div>
                </div>
                <div class="orderform_main_header">
                    <div class="orderform_main_left">手机号&nbsp&nbsp&nbsp：{{item.mobile}}</div>
                </div>
                <div class="orderform_nav_border clearfix">
                    <div class="orderform_nav_item" v-for="(list,key) in item.goods_items" :key="key">
                        <img class="orderform_nav_img" :src="list.thumb" alt="">
                        <div class="orderform_nav_div">
                            <div class="orderform_nav_name">{{list.goods_name}}</div>
                            <div class="orderform_nav_specification">规格：{{list.props}}ml</div>
                            <div class="orderform_footer_price">
                                <div class="footer_price_left"><span>￥</span><span>{{list.price}}</span></div>
                                <div class="footer_price_centre">数量：{{list.quantity}}</div>
                                <div class="footer_price_right">小计：￥{{list.price*list.quantity}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="orderform_nav_content_footer">
                    <div class="orderform_nav_content_left">总计：￥{{item.goods_price}}</div>
                    <div class="orderform_nav_content_right">
                        <form @submit="submit" report-submit='true'>
                        <span class="nav_content_right_tuikuan" v-if="item.status != 4 && item.status != 0 && item.status != 5" @click="refund(item.id)">部分退款</span>
                            <button class="nav_content_right_peisong" style="color:#fff;background-color:#e24136;" v-if="item.status == 1" @click="peisong(item.id)" type="default" formType="submit">确认配送</button>
                        </form>
                        <!-- <span class="nav_content_right_peisong" v-if="item.status == 1" @click="peisong(item.id)">确认配送</span> -->
                    </div>
                </div>
                <div class="zhanweifu"></div>
            </div>
        </div>
        <div v-if="loadingStatus && abnorType">
            <wk-abnor :type=" abnorType " @abnortap=" abnortap "></wk-abnor>
        </div>

        <wk-loading ref="loading"></wk-loading>
    </div>
</template>

<script>
import wkAbnor from '@/components/abnor'
import wkLoading from '@/components/loading'

export default {
  components: {
    wkAbnor,
    wkLoading
  },
  data() {
      return {
          tabarr:[
            {name:'全部',id:''},
            {name:'待确认',id:1},
            {name:'已完成',id:3},
            {name:'退款/售后',id:4},
          ],
          listid: '',

          indent: [],
          meunshow: false,
          merchant_id: '',
          login_time: '',
        //   组件需要
          loadingStatus: false,
          requestStatus: '',
          //   最大页数
          currentPage: 1,
          maxPage: 1,
          perPage: 10,
        //   
          search: '',
          form_id:'',
          openid:null,
        //   防止重复点击
          entid: null
      }
  },
  computed: {
    abnorType(){
        // 0	网络错误
        // 1	请求超时
        // 2	文件下载成功，但保存失败，此错误只出现node环境下
        // >=200	http请求状态码
        if(this.requestStatus === 0 || this.requestStatus === 1){
            return 'REQUEST_ERROR'
        }else if(this.requestStatus === 404){
            return 'DATA'
        }
        return ''
    }
  },
  mounted() {
      this.$refs.loading.show()
      this.indent = []
      this.currentPage = 1
      var id = this.$root.$mp.query.id || ''
      this.listid = this.$root.$mp.query.id || ''
      this.openid = wx.getStorageSync('openid')
      this.merchant_id = wx.getStorageSync('merchant_id')
      this.login_time = wx.getStorageSync('login_time')
      this.order(id)
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
      abnortap(){
          this.loadingStatus = false
          this.$refs.loading.show()
      },
      //   搜索
      confirm(e) {
          this.search = e.target.value
          this.indent = []
          this.currentPage = 1
          this.order('')
      },
      //   
      refund(e,a) {
          const url = '../refund/main?id='+ e
          wx.navigateTo({ url })
      },
      delivery (e) {
          this.order('',e)
          this.listid = ''
      },
      shaixuan () {
          this.meunshow = !this.meunshow
      },
      tabarrs(id) {
          this.listid = id
          if (this.listid == this.entid) {
              return
          }
          this.currentPage = 1
          this.entid = this.listid
          this.indent = []
          this.search = ''
          this.order(id)
      },
      order(id,e) {
        var _this = this
        this.$get('/restapi/bgoods-order',{
            id:this.merchant_id,
            login_time:this.login_time,
            search: this.search,
            status: id || '', 
            delivery: e || '',
            page: _this.currentPage,
            'per-page': _this.perPage
        })
        .then(function (res) {
            if (!res.data.tag) {
                _this.loadingStatus = true
                _this.$refs.loading.hide()
                if(res.data.items.length == 0){
                    _this.requestStatus = 404
                    return
                }else {
                    _this.requestStatus = ''
                }
                _this.maxPage = res.data._meta.pageCount
                for (var j=0; j<res.data.items.length; j++) {
                     _this.indent.push(res.data.items[j])
                }
                for (var i=0; i<_this.indent.length; i++) {
                    if (_this.indent[i].status == 0) {
                        _this.indent[i]['sta'] = '待支付'
                    }else if (_this.indent[i].status == 1) {
                        _this.indent[i]['sta'] = '待配送'
                    }else if (_this.indent[i].status == 2) {
                        _this.indent[i]['sta'] = '配送中'
                    }else if (_this.indent[i].status == 3) {
                        _this.indent[i]['sta'] = '已完成'
                    }else if (_this.indent[i].status == 4) {
                        _this.indent[i]['sta'] = '已退款'
                    }else if (_this.indent[i].status == 5) {
                        _this.indent[i]['sta'] = '已取消'
                    }
                }
            }else {
                wx.showToast({
                    title: res.data.data,
                    icon: 'success',
                    duration: 1000
                })
                setTimeout(function(){
                    const url = '../disembark/main'
                    wx.switchTab({ url })
                },2000)
            }
        })
        .catch(function(res) {
            console.log(res)
        })
      },
      submit(e) {
        this.formid = e.target.formId
      },
      peisong(id) {
        var _this = this
        console.log(id)
        this.$post('/restapi/bgoods-order/finished',{
            id:id,
            login_time:_this.login_time,
            merchant_id: _this.merchant_id,
            form_id: _this.formid,
            openid:_this.openid,
        })
        .then(function (res) {
            if (res.success) {
                _this.indent = res.data.items
                _this.currentPage = 1
                _this.indent = []
                _this.order(3)
                _this.listid = 3
            }else {
                wx.showToast({
                    title: res.data.message,
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
  onReachBottom(){
    this.currentPage++
    if(this.currentPage <= this.maxPage){
        this.$refs.loading.show()
        var id = this.listid
        this.order(id)
    }
  },
  created() {
      
  },
}
</script>

<style>
.orderfrom_header_top {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
    z-index: 2999;
}
.orderform_header {
    width: 100%;
    height: 103rpx;
    /* position: relative; */
}
.orderform_header_list {
    float: left;
    height: 100%;
    padding: 10rpx 0rpx;
    padding-left: 3.8%;
    padding-right: 3.8%;
    line-height: 90rpx;
    font-size: 16px;
    box-sizing: border-box;
    color: #333;
    text-align: center;
    position: relative;
    z-index: 2999;
}
.orderform_header_xuan {
    float: left;
    height: 100%;
    padding: 10rpx 0rpx;
    padding-left: 3.8%;
    padding-right: 3.8%;
    line-height: 90rpx;
    font-size: 16px;
    box-sizing: border-box;
    color: #333;
    text-align: center;
    position: relative;
}
.orderform_header_xiajian {
    width:19rpx;
    height:12rpx;
    position:absolute;
    top:53rpx;
    right:3rpx;
}
.orderform_header_menu {
    position: absolute;
    top: 100rpx;
    right: -10rpx;
    font-size: 16px;
    line-height: 90rpx;
    color: #333;
    text-align: center;
    width: 140rpx;
    background-color: #fff;
}
.header_menu_list:hover {
    color: #077cf4;
}
.header_list_red {
    color: #f0aba7;
}
/*  */
.orderform_nav_matter {
    width: 100%;
}
/* 订单上部 */
.orderform_main_header_c {
    width: 100%;
    height: 77rpx;
    line-height: 77rpx;
    font-size: 16px;
}
.orderform_main_header {
    width: 100%;
    height: 77rpx;
    line-height: 77rpx;
    font-size: 16px;
    border-bottom: 1px solid #eee;
}
.orderform_main_left {
    float: left;
    margin-left: 25rpx;
    color: #262626;
}
.orderform_main_right {
    float: right;
    margin-right: 25rpx;
    color: #e8756f;
}
/* 订单商品 */
.orderform_nav_container {
    width: 100%;
    z-index: 2000;
}
.orderform_nav_border {
    width: 100%;
    border-bottom: 1px solid #ccc;
}
.orderform_nav_item {
    width: 100%;
    height: 194rpx;
}
.orderform_nav_img {
    width: 137rpx;
    height: 137rpx;
    float: left;
    padding: 26rpx 22rpx 18rpx 30rpx;
}
.orderform_nav_div {
    width: 560rpx;
    height: 194rpx;
    float: right;
    padding: 31rpx 31rpx 23rpx 0rpx;
    box-sizing: border-box;
    border-bottom: 1rpx solid #ccc;
}
.orderform_nav_item:last-child .orderform_nav_div {
    border-bottom: none;
}
.orderform_nav_name {
    width: 100%;
    height: 65rpx;
    font-size: 13px;
    color: #333;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
.orderform_nav_specification {
    font-size: 13px;
    margin-top: 10rpx;
    margin-bottom: 12rpx;
    color: #666;
}
/* 价格 */
.orderform_footer_price {
    width: 100%;
    height: 30rpx;
    line-height: 30rpx;
}
.footer_price_left {
    float: left;
    color: #ca0000;
    margin-right: 53rpx;
    font-size: 16px;
}
.footer_price_centre {
    float: left;
    font-size: 14px;
    color: #666;
}
.footer_price_right {
    float: right;
    font-size: 16px;
    color: #ca0000;
}
/* 页脚 */
.orderform_nav_content_footer {
    width: 100%;
    height: 95rpx;
    padding: 22rpx 24rpx;
    box-sizing: border-box;
}
.orderform_nav_content_left {
    font-size: 16px;
    color: #ca0000;
    float: left;
}
.orderform_nav_content_right {
    float: right;
}
.nav_content_right_tuikuan {
    padding: 10rpx 15rpx;
    border-radius: 10rpx;
    font-size: 14px;
    color: #fff;
    background-color: #9d9d9d;
}
.nav_content_right_peisong {
    display: inline;
    margin-left: 20rpx;
    padding: 10rpx 15rpx;
    border-radius: 10rpx;
    font-size: 14px;
    color: #fff;
    background-color: #e24136;
}
/* 搜索 */
.header_nav {
    width: 100%;
    height: 105rpx;
    padding: 20rpx;
    box-sizing: border-box;
}
.zhanweizhi {
    width: 25%;
    height: 60rpx;
    line-height: 60rpx;
    float: left;
}
.header_rili {
    width: 100%;
    height: 65rpx;
    float: left;
}
.header_input {
    float: right;
    width: 72%;
    height: 60rpx;
    background-color: #eee;
    position: relative;
}
.header_input_img {
    width:50rpx;
    height:50rpx;
    position:absolute;
    top:5rpx;
    left:13rpx;
}
.header_input_ipt {
    width: 83%;
    font-size: 15px;
    float: right;
    height:60rpx;
    line-height:60rpx;
}
</style>
