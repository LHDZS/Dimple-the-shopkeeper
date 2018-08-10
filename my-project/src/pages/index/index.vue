<template>
  <div class="container">
    <div class="header">
        <div class="header_nav">
            <div class="zhanweizhi">
                <img class="header_rili" src="/static/image/jjw.png" alt="">
                <!-- <picker mode="date" :value="date" start="1950-01-01" end="2200-12-31" v-on:change="bindDateChange">
                    <span class="header_riqi">{{date}}</span>
                </picker> -->
            </div>
            <div class="header_input">
                <input class="header_input_ipt" type="text" placeholder="请输入桌号/手机号后四位" confirm-type="search" @confirm="confirm($event)">
                <img class="header_input_img" src="/static/image/sousuo.png" alt="">
            </div>
        </div>
        <div class="header_tab">
            <div class="tab_key" v-for="(item,index) in tabarr" :key="index" @click="tabred(index,item.name)">
                <span class="tab_span" :class="tabkey == index ? 'tab_red' : ''">{{item.name}}</span>
            </div>
        </div>
        <div class="tab_title" v-for="(item,index) in tabarr" :key="index" v-if="tabkey == index">{{item.name}}</div>
    </div>
    <div class="tab_layout" v-if="loadingStatus && !abnorType">
        <div class="tab_main" v-for="(link,key) in inquire" :key="key">
            <div class="tab_list">
                <span class="tab_list_left">下单时间</span>
                <span class="tab_list_right">{{link.created_at}}</span>
            </div>
            <div class="tab_list">
                <span class="tab_list_left">顾客姓名</span>
                <span class="tab_list_right">{{link.real_name}}</span>
            </div>
            <div class="tab_list">
                <span class="tab_list_left">手机号</span>
                <span class="tab_list_right">{{link.mobile}}</span>
            </div>
            <div class="tab_list">
                <span class="tab_list_left">桌号</span>
                <span class="tab_list_right">{{link.table_number}}号</span>
            </div>
            <div class="tab_list">
                <span class="tab_list_left">单号</span>
                <span class="tab_list_right">{{link.id}}</span>
            </div>
            <div class="tab_list_bottom">
                <span class="tab_list_left">商品名</span>
                <span class="tab_list_con">数量</span>
                <span class="tab_list_rig">小计</span>
            </div>
            <div class="tab_list_bottom" v-for="(itm,ind) in link.goods_items" :key="ind">
                <span class="tab_list_left">{{itm.goods_name}}</span>
                <span class="tab_list_con">{{itm.quantity}}</span>
                <span class="tab_list_rig">￥{{itm.price}}</span>
            </div>
            <div class="tab_list">
                <span class="tab_list_lefts">总价</span>
                <span class="tab_list_rights">￥{{link.goods_price}}</span>
            </div>
            <div class="tab_button" v-if="link.status == 1">
                <form @submit="submit" report-submit='true'>
                    <button class="tab_button_yes" @click="queren(link.id)" type="default" formType="submit">确认配送</button>
                </form>
                <!-- <span class="tab_button_yes" @click="queren(link.id)">确认配送</span> -->
                <div class="clear"></div>
            </div>
            <div class="fengefu"></div>
            <div class="clear"></div>
        </div>
    </div>
    <div class="tab_layout" v-if="loadingStatus && abnorType">
      <wk-abnor :type=" abnorType " @abnortap=" abnortap "></wk-abnor>
    </div>

    <wk-loading ref="loading"></wk-loading>
  </div>
</template>

<script>
import wkAbnor from '@/components/abnor'
import wkLoading from '@/components/loading'

export default {
  data () {
    return {
      userInfo:'',
      inquire:[],
      openid:null,
      merchant_id: null,
      login_time: null,
      //   组件需要
      loadingStatus: false,
      requestStatus: '',
      //   组件结束
      tabarr:[
          {name:'进行中'},
          {name:'已完成'},
          {name:'售后'},
      ],
      tabkey: 0,
      ontabkey: 0,
    //   date:'',
      status: 1,
      grabble: '',
      search: '',
      //   最大页数
      currentPage: 1,
      maxPage: 1,
      perPage: 10,
    }
  },
  components: {
    wkAbnor,
    wkLoading
  },
//   watch: {
//     merchant_id(val, oldVal) {
//       this.indent(1)
//     }
//   },
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
        wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#000',
        })
        this.$refs.loading.show()
        this.openid = wx.getStorageSync('openid')
        this.inquire = []
        this.grabble = ''
        this.search = ''
        this.merchant_id = wx.getStorageSync('merchant_id')
        this.login_time = wx.getStorageSync('login_time')
        this.currentPage = 1
        
        if (!this.merchant_id) {
          const url = '../disembark/main'
          wx.redirectTo({ url })
          return
        }
        this.indent(1)
  },
  methods: {
    abnortap(){
        this.loadingStatus = false
        this.$refs.loading.show()
    },
    indent () {
      var _this = this
      this.$get('/restapi/bgoods-order',{
      id:this.merchant_id,
      login_time:this.login_time,
      status: this.status,
      search: this.search,
      created_at: this.grabble,
      page: _this.currentPage,
      'per-page': _this.perPage
      })
      .then(function (res) {
          if(!res.data.tag) {
                _this.loadingStatus = true
                _this.$refs.loading.hide()
                if(res.data.items.length == 0){
                    _this.requestStatus = 404
                    return
                }else {
                    _this.requestStatus = ''
                }
                _this.maxPage = res.data._meta.pageCount
                for (var i=0;i<res.data.items.length;i++) {
                    _this.inquire.push(res.data.items[i])
                }
          }else {
            wx.showToast({
                title: res.data.data,
                icon: 'success',
                duration: 1000
            })
            setTimeout(function(){
                const url = '../disembark/main'
                wx.reLaunch({ url })
            },3000)
          }
        
      })
      .catch(function (res) {
          console.log(res)
      })
    },
    submit(e) {
        this.formid = e.target.formId
    },
    queren(id) {
      var _this = this
      this.$post('/restapi/bgoods-order/finished',{
          id: id,
          login_time: _this.login_time,
          merchant_id: _this.merchant_id,
          form_id: _this.formid,
          openid:_this.openid,
        })
      .then(function (res) {
          wx.showToast({
            title: '操作成功',
            icon: 'success',
            duration: 1000
          })
          _this.tabkey = 1
          _this.ontabkey = 1
          _this.status = 3
          _this.currentPage = 1
          _this.inquire = []
          _this.indent()
      })
      .catch(function(res) {
          console.log(res)
      })
    },
    tabred(i,v) {
          this.tabkey = i
          if (this.tabkey == this.ontabkey) {
              return
          }
          this.ontabkey = this.tabkey
          this.currentPage = 1
          this.grabble = ''
          this.search = ''
          this.inquire = []
          if (v == '进行中') {
              console.log(111111)
              this.status = 1
              this.indent()
          }else if ( v == '已完成') {
              console.log(222222)
              this.status = 3
              this.indent()
          }else if ( v == '售后') {
              console.log(333333)
              this.status = 4
              this.indent()
          }
      },
      confirm(e) {
          this.status = ''
          this.search = e.target.value
          this.inquire = []
          this.indent()
      },
      bindDateChange(e) {
          console.log(e)
          var ss = e.target.value.substring(5)
          var aa = ss.substring(0,2).replace(/\b(0+)/gi,"")
          var bb = ss.substring(3).replace(/\b(0+)/gi,"")
          this.date = aa + '月' + bb + '号'
          this.status = ''
          this.grabble = e.target.value
          this.indent()
      },
  },
  onReachBottom(){
    this.currentPage++
    if(this.currentPage <= this.maxPage){
        this.$refs.loading.show()
        this.indent()
    }
  },
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
.clear{ clear:both}
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
.header_riqi {
    float: left;
    margin-left: 10rpx;
    font-size: 16px;
    color: #999;
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
.header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
    z-index: 999;
}
.header_nav {
    width: 100%;
    height: 105rpx;
    padding: 20rpx;
    box-sizing: border-box;
}
.header_tab {
    width: 100%;
    height: 125rpx;
    display: flex;
}
.tab_layout {
    margin-top: 325rpx;
    /* background-color: #eee; */
}
.tab_key {
    flex:1;
    line-height: 125rpx;
    text-align: center;
    cursor: pointer;
}
.tab_span {
    color: #989898;
    padding: 5px 0px;
}
.tab_red {
    color: #ca0000;
    border-bottom: 2px solid #ca0000;
}
.tab_title {
    width: 100%;
    height: 90rpx;
    padding: 20rpx;
    background-color: #eee;
    color: #999;
    box-sizing: border-box;
}
/* 搜索条目 */
.tab_main {
    width: 100%;
    /* margin-bottom: 28rpx; */
    box-sizing: border-box;
    background-color: #fff;
}
.tab_list {
    width: 100%;
    height: 90rpx;
    line-height: 90rpx;
    padding:0rpx 20rpx;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
}
.tab_list_left {
    display: block;
    width: 45%;
    float: left;
    color: #666;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.tab_list_right {
    display: block;
    float: right;
    width: 55%;
    color: #9a9a9a;
}
.tab_list_lefts {
    display: block;
    width: 79%;
    float: left;
    color: #666;
}
.tab_list_rights {
    display: block;
    float: right;
    width: 21%;
    color: #9a9a9a;
    text-align: right;
}
.tab_list_con {
    display: block;
    float: left;
    width: 25%;
    color: #9a9a9a;
}
.tab_list_rig {
    display: block;
    float: right;
    width: 25%;
    color: #9a9a9a;
    text-align: right;
}
.tab_list_bottom {
    width: 100%;
    height: 90rpx;
    line-height: 90rpx;
    padding:0rpx 20rpx;
    box-sizing: border-box;
}
.tab_button {
    width: 100%;
    height: 103rpx;
    margin-top: 20rpx;
    text-align: center;
}
.tab_button_yes {
    display: inline;
    padding: 5px;
    color: #ca0000;
    border: 1px solid #ca0000;
    /* position: absolute; */
}
.fengefu {
    width: 100%;
    height: 30rpx;
    background-color: #eee;
}
</style>
