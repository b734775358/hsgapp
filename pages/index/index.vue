<template>
	<view id="content">
		<view class="header">
			<image src="/static/ico-back.png" class="icon" @click="getBack"></image>
			<view class="txt">报价申请</view>
			<view class="icons">
				<image src="/static/ico-search.png" class="icon" @click="searchVis = true"></image>
				<image src="/static/ico-add.png" class="icon" @click="Toadd"></image>
			</view>
		</view>
		<form>
			<view class="search-box" v-if="searchVis">
				<view class="item">
					<text>报价单号</text>
					<input type="text" placeholder="请输入" class="txt" v-model="offer_sn" />
				</view>
				<view class="item">
					<text>客户名称</text>
					<input type="text" placeholder="请输入" class="txt" v-model="client_name" />
				</view>
				<view class="item">
					<text>负责人</text>
					<input type="text" placeholder="请输入" class="txt" v-model="principal" />
				</view>
				<view class="item">
					<text>创建时间</text>
					<view class="txt time">
						<picker mode="date" :value="stardate" @change="bindDateChange">
							<view class="t">{{stardate}}</view>
						</picker>
						<text>-</text>
						<picker mode="date" :value="enddate" @change="bindDateChange1">
							<view class="t">{{enddate}}</view>
						</picker>
					</view>

				</view>
				<button type="submit" class="btn" @tap="search" @confirm="search">搜索</button>
				<button type="default" class="btn-cancle" @click="cancel">取消</button>
			</view>

		</form>
		<view class="tab-box">
			<block v-for="(item,index) in items" :key="index">
				<view class="item" :class="{'on':tabIndex == index}" @click="changeTab(index)">
					{{item}}
				</view>
			</block>
		</view>
		<view class="list-box" v-if="tabIndex == 0">
			<!-- 	<block> -->
			<block v-for="(item,index) in offerList" :key="index">
				<view class="item">
					<view class="title">
						<text class="name">{{item.store_name}}</text>
						<text class="status f-orgn">审核中</text>
					</view>
					<view class="cont">
						<view><text>报价单号：</text>{{item.sn}}</view>
						<view><text>标准机型：</text>{{item.standardModel}}</view>
						<view><text>业务类型：</text>{{item.contract_type}}</view>
						<view><text>负责人：</text>{{item.sale_man}}</view>
						<view><text>申请时间：</text>{{item.contract_date}}</view>
					</view>
				</view>
			</block>
		</view>
		<view class="list-box" v-if="tabIndex == 1">

			<block v-for="(item,index) in offerList" :key="index">
				<view class="item">
					<view class="title">
						<text class="name">{{item.store_name}}</text>
						<text class="status f-green">审核通过</text>
					</view>
					<view class="cont">
						<view><text>报价单号：</text>{{item.sn}}</view>
						<view><text>标准机型：</text>{{item.standardModel}}</view>
						<view><text>业务类型：</text>{{item.contract_type}}</view>
						<view><text>负责人：</text>{{item.sale_man}}</view>
						<view><text>申请时间：</text>{{item.contract_date}}</view>
					</view>
				</view>
			</block>
		</view>
		<view class="list-box" v-if="tabIndex == 2">
			<block v-for="(item,index) in offerList" :key="index">
				<view class="item">
					<view class="title">
						<text class="name">{{item.store_name}}</text>
						<text class="status f-red">审核不通过</text>
					</view>
					<view class="cont">
						<view><text>报价单号：</text>{{item.sn}}</view>
						<view><text>标准机型：</text>{{item.standardModel}}</view>
						<view><text>业务类型：</text>{{item.contract_type}}</view>
						<view><text>负责人：</text>{{item.sale_man}}</view>
						<view><text>申请时间：</text>{{item.contract_date}}</view>
					</view>
				</view>
			</block>
		</view>
		<!-- 上拉加载组件 -->
		<view class="load-more" v-if="loadmore">
			<uni-load-more :status="uniload" color="#ffcc99"></uni-load-more>
		</view>
		<backTop :src="backTop.src" :scrollTop="backTop.scrollTop"></backTop>
	</view>
</template>

<script>
	import {
		login_touken,
		postlist
	} from '@/config/api';
	import backTop from '@/common/back-top/back-top.vue';
	// 引入上拉加载组件
	import uniLoadMore from "@/common/uni-load-more/uni-load-more.vue"
	export default {
		components: {
			uniLoadMore,
			backTop
		},
		data() {
			return {
				searchVis: false,
				tabIndex: 0,
				items: ['审核中', '审核通过', '审核不通过'],
				stardate: '开始时间',
				enddate: '结束时间',
				offer_sn: '', //单号
				client_name: '', //客户名称
				principal: '', //负责人
				offerList: [],
				pageNum: 1,
				uniload: 'loading', //上拉加载的状态
				loadmore: false, //隐藏上拉加载
				backTop: {
					src: '../../static/back-top/top.png',
					scrollTop: 0
				},
			}
		},
		onPageScroll(e) {
			this.backTop.scrollTop = e.scrollTop;
		},
		onShow() {
			let url = location.href;
			let requestParams = {};
			if (url.indexOf('?') !== -1) {
				let str = url.substr(url.indexOf('?') + 1); //截取?后面的内容作为字符串
				console.log(str, '?后面的内容');
				let strs = str.split('&'); //将字符串内容以&分隔为一个数组
				console.log(strs, '以&切割的数组');
				for (let i = 0; i < strs.length; i++) {
					requestParams[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1]);
					// 将数组元素中'='左边的内容作为对象的属性名，'='右边的内容作为对象对应属性的属性值
				}
			}
			console.log(requestParams, "啦啦啦")

			// uni.setStorage({
			// 	key: 'token',
			// 	data: yaya.token
			// });

			this.get_touken()
		},
		computed: {},
		methods: {
			// 获取地址参数
			// getRequestParams() {
			// 	let url = location.href;
			// 	let requestParams = {};
			// 	if (url.indexOf('?') !== -1) {
			// 		let str = url.substr(url.indexOf('?') + 1); //截取?后面的内容作为字符串
			// 		console.log(str, '?后面的内容');
			// 		let strs = str.split('&'); //将字符串内容以&分隔为一个数组
			// 		console.log(strs, '以&切割的数组');
			// 		for (let i = 0; i < strs.length; i++) {
			// 			requestParams[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1]);
			// 			// 将数组元素中'='左边的内容作为对象的属性名，'='右边的内容作为对象对应属性的属性值
			// 		}
			// 	}
			// 	console.log(requestParams, '处理后的对象');
			// 	return requestParams;
			// },
			changeTab(e) {
				this.tabIndex = e
				this.pageNum = 1
				this.postlist()
			},
			bindDateChange: function(e) {
				this.stardate = e.target.value
			},
			bindDateChange1: function(e) {
				this.enddate = e.target.value
			},
			// 去添加
			Toadd() {
				uni.navigateTo({
					url: "./add"
				})
			},
			// 返回按钮
			getBack() {
				window.location.href = 'https://app.mockplus.cn/';
			},
			// 搜索
			search() {
				this.searchVis = false
				this.pageNum = 1
				this.offerList = []
				this.postlist()
			},
			// 取消
			cancel() {
				this.searchVis = false
				this.stardate = '开始时间',
				this.enddate = '结束时间',
				this.offer_sn = '',
				this.client_name = '',
				this.principal = ''
			},
			get_touken() {
				let that = this;
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				that.$http(`${login_touken}`, {
					username: "陈海涛",
					companyName: '宏石'
				}).then(res => {

					let stat = res.objx
					console.log(res.objx.token)
					uni.setStorage({
						key: 'token',
						data: res.objx.token
					});
					if (res.type == "success") {
						// uni.setStorage({
						// 	key: 'token',
						// 	data: yaya.token
						// });
						that.postlist()
						setTimeout(function() {
							uni.hideLoading();
						}, 1000);

					} else {
						uni.hideLoading();
						uni.showToast({
							title: res.content,
							icon: 'none',
							duration: 2000
						})
					}
				}).catch(res => {
					console.log("error", res)
				})
			},
			//获取数据
			postlist() {
				let that = this;
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				that.$http(`${postlist}`, {
					// this.stardate = '开始时间',
					// this.enddate = '结束时间',
					// this.offer_sn = '', 单号
					// this.client_name = '', 名称
					// this.principal = '' 负责人
					// isCheck: '',
					// contractType: 0,
					// sn:'',
					// xmmc:'',
					// storeName:'',
					// contract_date:'',
					// hasStamp:'', 
					sn:this.offer_sn,
					storeName:this.client_name,
					contractStatus: this.tabIndex,
					pageNumber: that.pageNum,
					pageSize: 6

				}).then(res => {
					let marketlist = JSON.parse(res.content)
					console.log(marketlist, "搜搜")
					let stat = res.type
					if (stat == "success") {

						if (marketlist.length == 0) {
							uni.showToast({
								title: '没有更多数据',
								icon: 'none',
								duration: 2000
							})
						} else {

							this.offerList = [...this.offerList, ...marketlist.content]

						}

						setTimeout(function() {
							uni.hideLoading();
						}, 1000);

					} else {
						uni.hideLoading();
						uni.showToast({
							title: res.content,
							icon: 'none',
							duration: 2000
						})
					}
				}).catch(res => {
					console.log("error", res)
				})
			}
		},
		onReachBottom() {
			this.pageNum++
			this.loadmore = true
			this.uniload = 'loading'
			this.postlist()
		}
	}
</script>

<style lang="scss" scoped>
	@import '~@/static/css/style.scss';
</style>
