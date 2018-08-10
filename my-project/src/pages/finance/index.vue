<style>
.orderform_header {
    width: 100%;
    height: 103rpx;
    /* display: flex; */
}
.orderform_header_list {
    /* flex: 1; */
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
    top: 103rpx;
    right: 1rpx;
    font-size: 16px;
    line-height: 90rpx;
    color: #333;
    text-align: center;
    width: 170rpx;
    background-color: #fff;
}
.header_menu_list:hover {
    color: #077cf4;
}
.header_list_red {
    color: #e24136;
}
/* 本页css */
.finance_title {
    width: 100%;
    height: 225rpx;
    padding: 54rpx 0rpx;
    box-sizing: border-box;
    display: flex;
}
.finance_title_column {
    flex: 1;
    width: 100%;
    box-sizing: border-box;
}
.shuxian {
    margin-top: 10rpx;
    width: 3rpx;
    height: 85rpx;
    background-color: #eee;
}
.title_column_div {
    width: 100%;
    margin-bottom: 15rpx;
    text-align: center;
}
.title_column_divtwo {
    text-align: center;
}
.title_column_img {
    width: 35rpx;
    height: 32rpx;
    margin-right: 10rpx;
}
.title_column_span {
    color: #333;
    font-size: 17px;
}
.column_span_red {
    color: #ca0000;
}
.title_summary_span {
    font-size: 15px;
    color: #bbb;
}
/* 进度条 */
.finance_main_content {
    width: 100%;
    padding: 24rpx;
    box-sizing: border-box;
}
.finance_main_content_item {
    width: 100%;
    height: 70rpx;
    line-height: 70rpx;
}
.main_content_item_name {
    float: left;
    width: 30%;
    font-size: 18px;
    color: #666;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.main_content_item_strip {
    float: right;
    margin-top: 20rpx;
    width: 460rpx;
    height: 30rpx;
    border-radius: 15rpx;
    text-align: center;
    background-color: #e5d7da;
    overflow: hidden;
    position: relative;
}
.main_content_item_strip_red {
    height: 30rpx;
    border-radius: 15rpx;
    background-color: #fa6a61;
}
.main_content_item_strip_name {
    width: 60rpx;
    font-size: 16px;
    text-align: center;
    height: 30rpx;
    line-height: 30rpx;
    color: #fff;
    position: absolute;
    top: 0;
    left: 43%;
}
</style>

<template>
    <div>
        <div class="orderform_header">
            <div class="orderform_header_list" v-for="(list,key) in menus" :key="key" :class="listid == list.id ? 'header_list_red' : '' " @click="tabarrs(list.id)">{{list.name}}</div>
                <div class="orderform_header_xuan" @click="zidingyi()">自定义
                    <img class="orderform_header_xiajian" v-if="!meunshow" src="/static/image/xiajian.png" alt="">
                    <img class="orderform_header_xiajian" v-if="meunshow" src="/static/image/shangjian.png" alt="">
                </div>
            <div class="orderform_header_menu" v-show="meunshow">
                <picker mode="date" :value="date" start="1950-01-01" end="2200-12-31" v-on:change="bindDateChange">
                    <div class="header_menu_list">开始</div>
                </picker>
                <picker mode="date" :value="time" start="1950-01-01" end="2200-12-31" v-on:change="bindTimeChange">
                    <div class="header_menu_list">结束</div>
                </picker>
            </div>
        </div>
        <div class="zhanweifu"></div>
        <div class="finance_title">
            <div class="finance_title_column" @click="dianji('price',1)">
                <div class="title_column_div">
                    <img class="title_column_img" src="/static/image/qianbao.png" alt="">
                    <span class="title_column_span" :class="dj == 1 ? 'column_span_red' : ''">销售额</span>
                </div>
                <div class="title_column_divtwo">{{marketobj.allprice}}<span class="title_summary_span">(万元)</span></div>
            </div>
            <div class="shuxian"></div>
            <div class="finance_title_column" @click="dianji('num',2)">
                <div class="title_column_div">
                    <img class="title_column_img" src="/static/image/yingxiao.png" alt="">
                    <span class="title_column_span" :class="dj == 2 ? 'column_span_red' : ''">销售量</span>
                </div>
                <div class="title_column_divtwo">{{marketobj.allnum}}<span class="title_summary_span">(万件)</span></div>
            </div>
        </div>
        <div class="finance_main_content" v-if="loadingStatus && !abnorType">
            <div class="finance_main_content_item" v-for="(item,key) in marketobj.items" :key="key">
                <div class="main_content_item_name">{{item.goods_name}}</div>
                <div class="main_content_item_strip">
                    <div class="main_content_item_strip_red" :style="{width:item.nummax}"></div>
                    <div class="main_content_item_strip_name">{{item.number}}</div>
                </div>
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
          menus:[
            {name:'昨天',id:1},
            {name:'近一周',id:2},
            {name:'近一月',id:3},
            {name:'近一年',id:4}
          ],
          listid: 1,
          meunshow: false,
          marketobj: {},
          dj:1,
          time:'09:01',
          from: '',
          to: '',
          merchant_id:'',
          login_time:'',
          //   组件需要
          loadingStatus: false,
          requestStatus: ''
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
      this.merchant_id = wx.getStorageSync('merchant_id')
      this.login_time = wx.getStorageSync('login_time')
      this.from = ''
      this.to = ''
      this.bgoodsitme()
  },
  methods:{
      abnortap(){
          this.loadingStatus = false
          this.$refs.loading.show()
      },
      dianji (tag,i) {
          this.from = ''
          this.to = ''
          this.bgoodsitme(tag)
          this.dj = i
      },
      tabarrs(id) {
          this.from = ''
          this.to = ''
          this.listid = id
          this.bgoodsitme()
      },
      zidingyi () {
          this.meunshow = !this.meunshow
      },
      bgoodsitme(tag) {
            var _this = this
            this.$get('/restapi/bgoods-item',
              {
                id:this.merchant_id,
                login_time:this.login_time,
                time: this.listid ,
                tag: tag ||'price',
                from:this.from || '',
                to: this.to || ''
              }
            )
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
                    _this.marketobj = res.data
                    if (res.data.items.length != 0) {
                        var max = res.data.items[0].amount
                        for (var i=0;i<res.data.items.length;i++) {
                        if(max<res.data.items[i].amount)max=res.data.items[0].amount;
                            res.data.items[i]['nummax'] = Math.ceil(res.data.items[i].amount/max*100) + '%'
                            res.data.items[i]['number'] = Math.ceil(res.data.items[i].amount/max*100)
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
                        wx.reLaunch({ url })
                    },2000)
                }
            })
            .catch(function(res) {
                console.log(res)
            })
        },
        bindDateChange(e) {
            this.from = e.target.value + ' ' + '00:01'
        },

        bindTimeChange(e) {
            if (this.from != '') {
                this.to = e.target.value + ' ' + '23:59'
            }else {
                console.log('请填写日期')
            }
            this.listid = 5
            this.bgoodsitme()
        },
  }
}
</script>


