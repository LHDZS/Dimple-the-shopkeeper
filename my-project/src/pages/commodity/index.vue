<template>
  <div class="commodity">
      <div class="searchInput">
          <div class="searchInput_con">
              <!-- <div class="searchInput_left">
                <input class="searchInput_input_ipt" type="text" placeholder="搜索商品" v-model="inputv" :value="inputv" confirm-type="search" @confirm="onShow(inputv)">
                <img class="searchInput_input_img" src="/static/image/sousuo.png" alt="">
              </div>
              <div class="searchInput_right" @click="onShow(inputv)">搜索</div> -->
            <div class="zhanweizhi">
                <img class="header_rili" src="/static/image/jjw.png" alt="">
            </div>
            <div class="header_input">
                <input class="header_input_ipt" type="text" placeholder="搜索商品" confirm-type="search" @confirm="onShow($event)">
                <img class="header_input_img" src="/static/image/sousuo.png" alt="">
            </div>
          </div>
      </div>
      <classify :commodity="commodity" :classify="classify" v-on:dianji="dianji"></classify>
      <wk-loading ref="loading"></wk-loading>
  </div>
</template>

<script>
import classify from '@/components/classify'
import wkLoading from '@/components/loading'

export default {
    name:'commodity',
    data() {
        return {
            time:'',
            commodity:[],
            classify:[],
            inputv:'',
            merchant_id:'',
            login_time:'',
            //   最大页数
            currentPage: 1,
            maxPage: 1,
            perPage: 10,
            // 储存id
            djid:null,
        }
    },
    components: {
        classify,
        wkLoading
    },
    mounted() {
        wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#000',
        })
        this.$refs.loading.show()
        this.commodity = []
        this.currentPage = 1
        this.merchant_id = wx.getStorageSync('merchant_id')
        this.login_time = wx.getStorageSync('login_time')
        this.colum()
        this.clas()
    },
    methods:{ 
        colum(id,name) {
            var _this = this
            this.$get('/restapi/bgoods',{
                merchant_id:this.merchant_id,
                login_time:this.login_time,
                category_id:id || '',
                name: name || '',
                page: this.currentPage,
                'per-page': this.perPage
            })
            .then(function (res) {
                _this.$refs.loading.hide()
                if (!res.data.tag) {
                    for (var i=0;i<res.data.items.length;i++) {
                        _this.commodity.push(res.data.items[i])
                    }
                    _this.maxPage = res.data._meta.pageCount
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
        clas() {
            var _this = this
            this.$get('/restapi/goods/cate',)
            .then(function (res) {
                _this.classify = res.data
            })
            .catch(function(res) {
                console.log(res)
            })
        },
        dianji (id) {
            this.currentPage = 1
            this.commodity = []
            this.djid = id
            this.colum(id)
        },
        onShow (e) {
            this.currentPage = 1
            this.commodity = []
            this.colum('',e.target.value)
        }
    },
    onReachBottom(){
        this.currentPage++
        if(this.currentPage <= this.maxPage){
            this.$refs.loading.show()
            this.colum(this.djid)
        }
    },
}
</script>

<style>
.commodity {
    width: 100%;
    height: 100%;
}
.searchInput {
    width: 100%;
    height: 124rpx;
    padding: 27rpx;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
    box-sizing: border-box;
}
.searchInput_con {
    width: 100%;
    height: 70rpx;
    border-radius: 5px;
    overflow: hidden;
}
.searchInput_right {
    float: right;
    width: 165rpx;
    height: 70rpx;
    line-height: 70rpx;
    text-align: center;
    background-color: #b7b7b7;
    color: #fff;
}
.searchInput_left {
    float: left;
    width: 533rpx;
    height: 70rpx;
    background-color: #fff;
    position: relative;
}
.searchInput_input_img {
    width:50rpx;
    height:50rpx;
    position:absolute;
    top:10rpx;
    left:13rpx;
}
.searchInput_input_ipt {
    width: 83%;
    height: 70rpx;
    font-size: 16px;
    float: right;
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
</style>