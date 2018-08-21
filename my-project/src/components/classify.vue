<template>
    <div class="classify">
        <div class="classify_header_lfet">
            <div class="header_lfet_item" :class="itemid == '' ? 'lfet_item_white' : ''" @click="classifyone">
                <form @submit="submit" report-submit='true' class="tab_buttom_on">
                    <button type="default" formType="submit"></button>
                </form>
                全部
            </div>
            <div class="header_lfet_item" :class="itemid == item.id ? 'lfet_item_white' : ''" v-for="(item,index) in classify" :key="index" @click="classifyid(item.id)">
                <form @submit="submit" report-submit='true' class="tab_buttom_on">
                    <button type="default" formType="submit"></button>
                </form>
                {{item.name}}
            </div>
        </div>
        <div class="classify_header_right">
            <div class="header_right_link" v-for="(link,key) in commodity" :key="key">
                <img class="header_right_img" :src="http + link.thumb" alt="">
                <div class="header_right_content">
                    <div class="header_right_name">{{link.name}}</div>
                    <div class="header_right_knife">￥<span class="header_right_price">{{link.market_price}}</span></div>
                    <div class="header_right_volume">库存{{link.now_stock}}件</div>
                </div>
            </div>
            <div class="clearfix"></div>
        </div>
        <div class="clearfix"></div>
    </div>
    
</template>

<script>
export default {
    name:'classify',
    props:{
        classify:Array,
        commodity:Array
    },
    data() {
        return {
            itemid:'',
            http:'http://39.107.71.142/'
        }
    },
    methods: { 
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
        // 全部
        classifyone () {
            if (this.itemid != '') {
                this.itemid = ''
                this.$emit('dianji','')
            }
        },
        classifyid(id) {
            if (this.itemid != id) {
                this.itemid = id
                this.$emit('dianji',id)
            }
        }
    },
}
</script>

<style>
.classify {
    width: 100%;
    margin-top: 124rpx;
    height: 100%;
    background-color: #eaeaea;
    /* position: relative; */
}
.classify_header_lfet {
    position: fixed;
    top: 124rpx;
    left: 0;
    width: 145rpx;
    float: left;
    background-color: #eee;
    height: 100%;
    /* overflow-y: auto; */
}
.header_lfet_item {
    padding: 28rpx 13rpx;
    text-align: left;
    color: #898989;
    box-sizing: border-box;
    position: relative;
    font-size: 14px;
}
.lfet_item_white {
    color: #333;
    background-color: #fff;
}
.classify_header_right {
    width: 607rpx;
    float: right;
    background-color: #fff;
    overflow-y: auto;
}
/* 右侧商品栏 */
.header_right_link {
    width: 607rpx;
    height: 200rpx;
}
.header_right_img {
    width: 33%;
    height: 100%;
    float: left;
    box-sizing: border-box;
}
.header_right_content {
    float: right;
    width: 66%;
    padding: 7rpx;
    box-sizing: border-box;
}
.header_right_name {
    font-size: 18px;
    color: #333;
    display: -webkit-box; 
    -webkit-line-clamp: 2; 
    -webkit-box-orient: vertical; 
    overflow: hidden;
}
.header_right_knife {
    margin-top: 15rpx;
    font-size: 14px;
    color: #e24136;
}
.header_right_price{
    font-size: 18px;
    color: #e24136;
}
.header_right_volume {
    font-size: 16px;
    color: #a1a1a1;
}
</style>
