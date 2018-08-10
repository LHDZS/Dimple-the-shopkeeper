<template>
  <div class="pending">
      <div class="header_nav">
          <div class="zhanweizhi">
              <img class="header_rili" src="/static/image/rili.png" alt="">
              <picker mode="date" :value="date" start="1950-01-01" end="2200-12-31" v-on:change="bindDateChange">
                <span class="header_riqi">{{date}}</span>
              </picker>
          </div>
          <div class="header_input">
              <input class="header_input_ipt" type="text" placeholder="请输入姓名/手机号" confirm-type="search" @confirm="confirm($event)">
              <img class="header_input_img" src="/static/image/sousuo.png" alt="">
          </div>
      </div>
      <div class="header_tab">
          <div class="tab_key" v-for="(item,index) in tabarr" :key="index" @click="tabred(index,item.name)">
              <span class="tab_span" :class="tabkey == index ? 'tab_red' : ''">{{item.name}}</span>
          </div>
      </div>
      <div class="tab_layout" v-if="loadingStatus && !abnorType">
          <div class="tab_title" v-for="(item,index) in tabarr" :key="index" v-if="tabkey == index">{{item.name}}</div>
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
                  <span class="tab_list_right">{{link.desk_num}}号</span>
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
                  <span class="tab_button_yes" @click="queren(link.id)">确认配送</span>
                  <div class="clear"></div>
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
    name:'pending',
    props:{
        inquire:Array,
        loadingStatus: Boolean,
        requestStatus: String
    },
     components: {
        wkAbnor,
        wkLoading
    },
    data() {
        return {
            tabarr:[
                {name:'进行中'},
                {name:'已完成'},
                {name:'售后'},
            ],
            tabkey: 0,
            date:'5月8号',
        }
    },
    methods: {
        tabred(i,v) {
            this.tabkey = i
            console.log(v)
            var status = null
            if (v == '进行中') {
                status = 1
            }else if ( v == '已完成') {
                status = 3
            }else if ( v == '售后') {
                status = 4
            }
            this.$emit('tabredstu',status)
        },
        confirm(e) {
            console.log(e.target.value)
            this.$emit('sousuo',e.target.value)
        },
        queren(id) {
            this.$emit('queren',id)
        },
        bindDateChange(e) {
            var ss = e.target.value.substring(5)
            var aa = ss.substring(0,2).replace(/\b(0+)/gi,"")
            var bb = ss.substring(3).replace(/\b(0+)/gi,"")
            // console.log(aa + '月' + bb + '号')
            this.date = aa + '月' + bb + '号'
            // console.log(this.data)
            this.$emit('rili',e.target.value)
        },
    },
    created () {
        // 获取当前时间戳
        var timestamp = new Date();
        // 转换成当前时间
        function formatDate(nows) { 
            var now=new Date(nows); 
            var year=now.getFullYear(); 
            var month=now.getMonth()+1; 
            var date=now.getDate(); 
            var hour=now.getHours(); 
            var minute=now.getMinutes(); 
            var second=now.getSeconds(); 
            return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
        }
        var e = formatDate(timestamp)
        console.log(e)
        var ss = e.substring(5)
        console.log(ss)
        var tt = ss.substring(0,3)
        console.log(tt)
        var aa = tt.substring(0,1).replace(/\b(0+)/gi,"")
        var bb = tt.substring(2).replace(/\b(0+)/gi,"")

        this.date = aa + '月' + bb + '号'

    }
}
</script>

<style>
.pending {
    width: 100%;
}
.zhanweizhi {
    width: 25%;
    height: 60rpx;
    line-height: 60rpx;
    float: left;
}
.header_rili {
    width: 40rpx;
    height: 40rpx;
    margin-top: 12rpx;
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
    background-color: #eee;
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
    padding:0rpx 20rpx;
    margin-bottom: 28rpx;
    box-sizing: border-box;
    background-color: #fff;
}
.tab_list {
    width: 100%;
    height: 90rpx;
    line-height: 90rpx;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
}
.tab_list_left {
    display: block;
    width: 45%;
    float: left;
    color: #666;
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
    box-sizing: border-box;
}
.tab_button {
    width: 100%;
    height: 103rpx;
    margin-top: 20rpx;
    text-align: center;
}
.tab_button_yes {
    display: inline-block;
    padding: 5px;
    color: #ca0000;
    border: 1px solid #ca0000;
}
.clear{ clear:both}
</style>
