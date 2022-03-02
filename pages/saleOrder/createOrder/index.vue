<template>
	<view class="box">
		<view class="fixed-top_box" :style="{paddingTop: `${$statusBarHeight}px`}">
			<uni-nav-bar shadow leftIcon="arrowleft" right-text="提交" title="订单下达" @clickRight="submit"
				@clickLeft="goBack" />
			<view class="tab-box flex align-items_center">
				<text class="tab-item_class flex align-items_center justify-content_center"
					:class="{'active-class': activeIndex === index}" v-for="(item, index) in tabList" :key="index"
					@click="changeTab(index)">{{item}}</text>
			</view>
		</view>
		<view class="container">
			<!-- 基础信息 -->
			<base-info-comp v-show="!activeIndex" ref="baseInfoComp" :selectedProportion="proportionList"  :selectedParts="partsList" :id="contractId"/>
			<!-- 订单产品 -->
			<order-product-comp v-show="activeIndex === 1" ref="orderProductComp" :id="contractId"/>
			<!-- 合同信息 -->
			<contract-details-comp v-show="activeIndex === 2" ref="contractDetailsComp" :id="contractId"/>
		</view>
	</view>
</template>

<script>
	import {
		uniNavBar,
		uniSearchBar,
		uniEasyinput,
		uniIcons
	} from '@dcloudio/uni-ui'
	import formComp from '@/components/form.vue'
	import baseInfoComp from './baseInfo.vue'
	import orderProductComp from './orderProduct.vue'
	import contractDetailsComp from './contractDetails.vue'
	export default {
		components: {
			uniNavBar,
			uniEasyinput,
			uniIcons,
			formComp,
			baseInfoComp,
			orderProductComp,
			contractDetailsComp
		},
		data() {
			return {
				activeIndex: 0,
				tabList: ['基础信息', '产品配置', '合同信息'],
				// 选中的业务员数据
				proportionList: [],
				// 选中的配件数据
				partsList: [],
				// 选中的报价单号id
				contractId: null
				// loadingText: '加载中...',
			}
		},
		onShow() {
			uni.$on('updateData', data => {
				this.proportionList = data
			})
			// 返回上一页带的配件数
			uni.$on('updateParts', data => {
				this.partsList = data
			})
			// 返回上一页带的报价单号id
			uni.$on('updateContractId', data => {
				this.contractId = data
			})
		},
		methods: {
			// 返回上一页
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},

			// 切换tab
			changeTab(index) {
				this.activeIndex = index
			},

			// 提交
			submit() {
				let params = {}
				new Promise((resolve, reject) => {
						// 只是执行了表单验证，没有真的把数据提交到后台
						this.$refs.baseInfoComp.submit(data => {
							if (data) {
								params = Object.assign(params, data)
								resolve(params)
							} else {
								reject(data)
							}
						})
					})
					.then(params => {
						this.$refs.orderProductComp.submit(data => {
							if (data) {
								params = {
									...params,
									...this.$refs.contractDetailsComp.getData()
								}
								// 照理来说这里已经去到了所有数据了
								// 发起请求， 请求参数用params作为参数, 请求成功跳回列表页
								uni.redirectTo({
									url: '/pages/saleOrder/orderList/index'
								})
							}
						})
					})
					.catch(error => {
						console.log(error)
					})
				// 请求接口
			},
		}
	}
</script>
<style lang="scss" scoped>
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
</style>
