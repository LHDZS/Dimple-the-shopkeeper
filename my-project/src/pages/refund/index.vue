<style>
.refund_header {
  width: 100%;
  height: 115rpx;
  line-height: 115rpx;
  text-align: center;
}
/* 订单上部 */
.orderform_main_header {
    width: 100%;
    height: 77rpx;
    line-height: 77rpx;
    font-size: 16px;
    border-bottom: 1px solid #eee;
}
.orderform_main_left {
    float: left;
    max-width: 45%;
    margin-left: 25rpx;
    color: #262626;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.orderform_main_right {
    float: right;
    max-width: 45%;
    margin-right: 25rpx;
    color: #e8756f;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
/* 订单商品 */
.orderform_nav_container {
    width: 100%;
}
.orderform_nav_border {
    width: 100%;
    border-bottom: 1px solid #ccc;
}
.orderform_nav_item {
    width: 100%;
    height: 274rpx;
}
.orderform_nav_img {
    width: 137rpx;
    height: 137rpx;
    float: left;
    padding: 26rpx 22rpx 18rpx 30rpx;
}
.orderform_nav_div {
    width: 560rpx;
    height: 274rpx;
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
    float: right;
}
.orderform_nav_content_right {
    margin-left: 20rpx;
    font-size: 16px;
    color: #ca0000;
    float: right;
}
.refund_content_footer {
    width: 100%;
    height: 80rpx;
    padding: 20rpx;
    box-sizing: border-box;
}
.refund_content_quantity {
    font-size: 20px;
    line-height: 38rpx;
    float: right;
}
.content_quantity_jian {
    float: left;
    display: block;
    width: 40rpx;
    height: 40rpx;
    text-align: center;
    border: 1px solid #999;
    color: #666;
    border-radius: 50%;
}
.content_quantity_jia {
    float: right;
    display: block;
    width: 40rpx;
    height: 40rpx;
    text-align: center;
    border: 1px solid #999;
    color: #666;
    border-radius: 50%;
}
.content_quantity_jia:hover {
    color: #000;
    border: 1px solid #efb711;
    background-color: #efb711;
}
.content_quantity_jian:hover {
    color: #000;
    border: 1px solid #efb711;
    background-color: #efb711;
}
.content_quantity_num {
    font-size: 16px;
    margin: 0 18rpx;
}
/* 搜索 */
.orderform_nav_input {
    width: 100%;
    height: 100rpx;
    padding: 25rpx;
    box-sizing: border-box;
}
.orderform_nav_footer {
    width: 100%;
    height: 160rpx;
    background-color: #eee;
}
.orderform_nav_queren {
    width: 100%;
    height: 85rpx;
    line-height: 85rpx;
    text-align: center;
    color: #fff;
    background-color: #e24136;
    position: fixed;
    bottom: 0;
    left: 0;
}
</style>

<template>
  <div class="refund">
      <div class="refund_header">桌号：{{indent.table_number}}号</div>
      <div class="zhanweifu"></div>
      <div class="orderform_nav_container clearfix">
        <div class="orderform_main_header">
            <div class="orderform_main_left">订单编号：{{indent.id}}</div>
            <div class="orderform_main_right">{{indent.sta}}</div>
        </div>
        <div class="orderform_main_header">
            <div class="orderform_main_left">姓名：{{indent.real_name}}</div>
            <div class="orderform_main_right">手机号：{{indent.mobile}}</div>
        </div>
        <div class="orderform_nav_border clearfix">
            <div class="orderform_nav_item" v-for="(list,key) in dingdan" :key="key">
                <img class="orderform_nav_img" :src="list.thumb" alt="">
                <div class="orderform_nav_div">
                    <div class="orderform_nav_name">{{list.goods_name}}</div>
                    <div class="orderform_nav_specification">规格：{{list.props}}ml</div>
                    <div class="orderform_footer_price">
                        <div class="footer_price_left"><span>￥</span><span>{{list.price}}</span></div>
                        <div class="footer_price_centre">数量：{{list.quantity}}</div>
                        <div class="footer_price_right">小计：￥{{list.price*list.quantity}}</div>
                    </div>
                    <div class="refund_content_footer">
                        <div class="refund_content_quantity">
                            <span class="content_quantity_jian" @click="jian(key)">-</span>
                            <span class="content_quantity_num">{{list.amount}}</span>
                            <span class="content_quantity_jia" @click="jia(key)">+</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="orderform_nav_content_footer">
            <div class="orderform_nav_content_right">退款总计：￥{{totalprices}}</div>
            <div class="orderform_nav_content_left">退款总数量：{{totalamount}}件</div>
        </div>
        <div class="zhanweifu"></div>
        <div class="orderform_nav_input">
            <input type="text" placeholder="请输入退款原因" v-model="inputv" :value="inputv" confirm-type="done" @confirm="achieve(inputv)">
        </div>
        <div class="orderform_nav_footer"></div>
        <div class="orderform_nav_queren" @click="tuikuan()">确认退款</div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            indent:{},
            dingdan:[],
            totalprices:0,
            totalamount:0,
            inputv: '',
            merchant_id:'',
            login_time:'',
            fukuan:true,
        }
    },
    methods:{
        // 退款
        tuikuan () {
            var _this = this
            console.log(11111)
            if (this.totalamount == 0) {
                return wx.showToast({
                        title: '退款商品数量错误',
                        icon: 'none',
                        duration: 1000
                    })
            }
            
            let a = this.dingdan.map( item => {
                return {
                    amount:item.amount,
                    created_at:item.created_at,
                    delivery:item.delivery,
                    goods_id:item.goods_id,
                    goods_name:item.goods_name,
                    id:item.id,
                    order_id:item.order_id,
                    own_id:item.own_id,
                    price:this.totalprices,
                    props:item.props,
                    quantity:this.totalamount,
                    skucode:item.skucode,
                    status:item.status,
                    thumb:item.thumb,
                }
            })
            if ( this.fukuan ) {
                this.fukuan = false
                this.$post('/restapi/bgoods-order/cancel',{
                    merchant_id:this.merchant_id,
                    id:this.indent.id,
                    login_time:this.login_time,
                    reason:this.inputv,
                    amount:this.totalprices,
                    own_id: 'm' + this.merchant_id,
                    goods_news: JSON.stringify(a)
                })
                .then(function (res) {
                    if (res.success) {
                        if (!res.data.tag) {
                            _this.fukuan = true
                            const url = '../orderform/main?id=4'
                            wx.navigateTo({ url })
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
                    }else {
                        wx.showToast({
                            title: res.data.message,
                            icon: 'none',
                            duration: 3000
                        })
                        _this.fukuan = true
                    }
                    
                })
                .catch(function(res) {
                    console.log(res)
                })
            }else {
                wx.showToast({
                    title: '无法退款',
                    icon: 'none',
                    duration: 3000
                })
            }
        },
        // 完成
        achieve(e) {
            // 好像不需要这个了
            console.log(e)
        },
        // 加减
        jia(i) {
            if (this.dingdan[i].amount < this.dingdan[i].quantity) {
                this.dingdan[i].amount ++
                this.totalprices += 1*this.dingdan[i].price
                this.totalamount += 1
            }
        },
        jian(i) {
            if (this.dingdan[i].amount > 0) {
                this.dingdan[i].amount --
                this.totalprices -= 1*this.dingdan[i].price
                this.totalamount -= 1
            }
        },
        // 请求
        indentdetails(id) {
            var _this = this
            this.$get('/restapi/bgoods-order/view',{id:id || 10085,
            login_time:this.login_time,
            merchant_id: this.merchant_id})
            .then(function (res) {
                if (res.success) {
                    console.log(res)
                    _this.dingdan = res.data.goods_items
                    _this.indent = res.data.modle
                    for (var i=0; i<res.data.goods_items.length; i++) {
                        _this.dingdan[i]['amount'] = 0
                    }
                    if (res.data.modle.status == 0) {
                        _this.indent['sta'] = '待支付'
                    }else if (res.data.modle.status == 1) {
                        _this.indent['sta'] = '待配送'
                    }else if (res.data.modle.status == 2) {
                        _this.indent['sta'] = '配送中'
                    }else if (res.data.modle.status == 3) {
                        _this.indent['sta'] = '已完成'
                    }else if (res.data.modle.status == 4) {
                        _this.indent['sta'] = '已退款'
                    }else if (res.data.modle.status == 5) {
                        _this.indent['sta'] = '已取消'
                    }
                }else{
                    wx.showToast({
                        title: res.data.message,
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
    },
    mounted() {
        this.totalprices = 0
        this.totalamount = 0 
        this.merchant_id = wx.getStorageSync('merchant_id')
        this.login_time = wx.getStorageSync('login_time')
        var id = this.$root.$mp.query.id
        this.indentdetails(id)
    },
    created() {
        
    }
}
</script>


