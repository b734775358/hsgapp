<template>
	<view class="box">
		<view class="fixed-top_box">
			<uni-nav-bar statusBar shadow leftIcon="arrowleft" rightIcon="plusempty" title="销售订单" @clickRight="submit" @clickLeft="goBack"/>
			<view class="tab-box flex align-items_center">
				<text class="tab-item_class flex align-items_center justify-content_center"
					:class="{'active-class': activeIndex === index}" v-for="(item, index) in tabList" :key="index"
					@click="changeTab(index)">{{item}}</text>
			</view>
			<uni-search-bar @confirm="searchConfirm" v-model="searchValue" class="search-bar_class"></uni-search-bar>
		</view>
		<view class="container">
			<block>
				<view v-for="(item, index) in (list.length ? list : 0)" :key="index" class="list-box">
					<view class="list-item flex align-items_center justify-content_between">
						<text class="name-class">{{item.store_name}}</text>
						<text class="status-class">{{tabList[activeIndex]}}</text>
					</view>
					<view class="list-item_content">
						<view class="list-item_msg flex align-items_center">
							<text class="text-align_justify">订单总额</text>
							<text class="dash-class">:</text>
							{{item.order_amount}}
						</view>
						<view class="list-item_msg flex align-items_center">
							<text class="text-align_justify">负责人</text>
							<text class="dash-class">:</text>
							{{item.salesman_name}}
						</view>
						<view class="list-item_msg flex align-items_center">
							<text class="text-align_justify">合同日期</text>
							<text class="dash-class">:</text>
							{{item.order_date}}
						</view>
						<view class="list-item_msg flex align-items_center">
							<text class="text-align_justify">订单编号</text>
							<text class="dash-class">:</text>
							{{item.sn}}
						</view>
						<view class="list-item_msg flex align-items_center">
							<text class="text-align_justify">报价单号</text>
							<text class="dash-class">:</text>
							{{item.contract_sn}}
						</view>
					</view>
				</view>
			</block>
		</view>
		<!-- <view class="loading">{{loadingText}}</view> -->
	</view>
</template>
<script>
	import {login_touken,principal_list} from '@/config/api';
	import {uniNavBar,uniSearchBar} from '@dcloudio/uni-ui'
	export default {
		components: {
			uniNavBar,
			uniSearchBar
		},
		data() {
			return {
				// 搜索的关键字
				searchValue: null,
				// 列表数据
				list: [],
				// tab切换下标
				activeIndex: 0,
				// tab的三个值，没有意义的
				tabList: ['审核中', '审核通过', '审核不通过'],
				// loadingText: '加载中...',
				paginationData: {
					pageNumber: 1,
					pageSize: 10,
				},
				isToEnd: false,
			}
		},
		
		// 下拉刷新
		onPullDownRefresh() {
			// 重置分页数据
			this.paginationData = {
				pageNumber: 1,
				pageSize: 10,
			}
			Promise.resolve(this.getList)
				.then(() => {
					uni.stopPullDownRefresh()
				})
		},

		// 上拉加载， 执行请求进行分页数据查询
		onReachBottom() {
			if (this.isToEnd) {
				return uni.showToast({
					title: '没有更多数据',
					icon: 'none',
					duration: 2000
				})
			}
			// 页码+1
			this.paginationData.pageNumber = this.paginationData.pageNumber + 1;
			this.getList()
		},
		mounted(){
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
					setTimeout(function() {
						uni.hideLoading();
					}, 1000);
					this.getList()
			
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
		methods: {
			// 返回上一页
			goBack () {
				uni.navigateBack({
				    delta: 1
				});
			},
			// 搜索
			searchConfirm (data) {
				const {value} = data
				// 根据value请求接口
				console.log(value)
			},
			
			// 添加订单
			submit() {
				uni.navigateTo({
					url: '/pages/saleOrder/createOrder/index'
				});
			},
			// 切换tab
			changeTab(index) {
				this.activeIndex = index;
				// 清除数据，页码还原
				this.list = [];
				this.paginationData = {
					pageNumber: 1,
					pageSize: 10,
				}
				this.getList()
			},
			//获取数据
			getList() {
				console.log(this.paginationData)
				let that = this;
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				that.$http(`/b2b/order_project/list_data.jhtml`, {
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
					...this.paginationData,
					// sn: this.searchValue==null?undefined:this.searchValue,
					order_status:this.tabList[this.activeIndex]
		
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
		
							this.list = [...this.list, ...marketlist.content]
		
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
		}
	}
</script>
<style lang="scss" scoped>
	.search-bar_class {
		background: #f8f8f8;
		/deep/ .uni-searchbar__box {
			background: #fff !important;
		}
	}
	.container {
		height: auto;
		overflow-y: unset;
	}

	.tab-box {
		height: 50px;

		.tab-item_class {
			flex: 1;
			height: 100%;
			font-size: 14px;
			position: relative;
			color: #ccc;
		}

		.active-class {
			color: #2979ff;

			&::before {
				content: '';
				position: absolute;
				width: 100%;
				height: 2px;
				background: #2979ff;
				bottom: 0;
			}
		}
	}

	.list-box {
		background: #fff;
		margin-bottom: 10px;
		padding: 0 10px;
		box-sizing: border-box;

		.list-item {
			height: 40px;
			border-bottom: 1px solid #F1F1F1;

			>text {
				font-size: 16px;
			}

			.name-class {
				color: #333;
			}

			.status-class {
				color: #F0AD4E;
			}
		}

		.list-item_content {
			font-size: 14px;

			.list-item_msg {
				height: 30px;
				color: #333;

				>text {
					color: #ccc;
					display: inline-block;
					width: 60px;
				}

				.dash-class {
					margin: 0 15px 0 5px;
					width: auto;
				}
			}
		}
	}

	.loading {
		text-align: center;
		line-height: 30px;
	}
</style>
