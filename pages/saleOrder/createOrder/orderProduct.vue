<template>
	<view>
		<view class="form-container">
			<view class="title-box flex align-items_center">产品配置</view>
			<form-comp :searches="orderProduct" ref="orderProduct" />
		</view>
	</view>
</template>

<script>
	import {uniEasyinput, uniIcons} from '@dcloudio/uni-ui'
	import formComp from '@/components/form.vue'
	export default {
		props: {
			id: {
				type: [Array, String, Number],
				default: null
			}
		},
		components: {
			uniEasyinput,
			uniIcons,
			formComp
		},
		data() {
			return {
				// loadingText: '加载中...',
				// 产品明细
				orderProduct: [
					// 订单机型编码
					{
						prop: 'orderVonderCode',
						label: '订单机型编码',
						compName: 'easyinput',
						placeholder: '请输入'
					},
					// 标记编码
					{
						prop: 'vonderCode',
						label: '标机编码',
						compName: 'text',
						placeholder: '自动带出'
					},
					// 产品名称
					{
						prop: 'name',
						label: '产品名称',
						compName: 'text',
						placeholder: '自动带出'
					},
					// 含税单价
					{
						prop: 'price',
						label: '含税单价',
						compName: 'text',
						placeholder: '自动带出'
					},
					// 数量
					{
						prop: 'quantity',
						label: '数量',
						compName: 'text',
						placeholder: '自动带出'
					},
					// 金额
					{
						prop: 'amount',
						label: '金额',
						compName: 'text',
						placeholder: '自动带出'
					},
					// 合同交期
					{
						prop: 'deliveryTime',
						label: '合同交期',
						compName: 'text',
						placeholder: '自动带出'
					},
					// PMC回复交期
					{
						prop: 'pmcDate',
						label: 'PMC回复交期',
						compName: 'easyinput',
						placeholder: '请输入'
					},
					// 订单类型
					// {
					// 	prop: 'sadasd',
					// 	label: '订单类型',
					// 	compName: 'text',
					// 	placeholder: '自动带出'
					// },
					// 定金金额
					// {
					// 	prop: 'sadasd',
					// 	label: '定金金额',
					// 	compName: 'text',
					// 	placeholder: '自动带出'
					// },
					// 赠送移机次数
					{
						prop: 'freeTransferService',
						label: '赠送移机次数',
						compName: 'text',
						placeholder: '自动带出'
					},
					// 机床延保（年）
					{
						prop: 'extendedmachinetool',
						label: '机床延保（年）',
						compName: 'text',
						placeholder: '自动带出'
					},
					// 激光器延保（年）
					{
						prop: 'laserextendedprotection',
						label: '激光器延保（年）',
						compName: 'text',
						placeholder: '自动带出'
					},
				],
				// 业绩占比分配数据， 业务员名称：name  业绩占比：businessRate   核算占比: accountingRate   说明: desc
			}
		},
		watch: {
			id (data) {
				this.getDetails()
				console.log(data)
			}
		},
		methods: {
			submit(cb) {
				this.$refs.orderProduct.submit(data => {
					if (data) {
						cb({
							...data,
							partsList: this.partsList
						})
					} else {
						cb(data)
					}
				})
			},

			getDetails() {
				uni.showLoading({
				 title: '加载中',
				 mask: true
				}); 
				// console.log(this.id)
				// setTimeout(() => {
				//  let obj = {}
				//  this.baseInfo.forEach((v, index) => {
				//   obj[v.prop] = index
				//  } )
				//  // Object.keys(this.$refs.baseInfo.formData).forEach(v => {
				//  //  this.$refs.baseInfo.formData[v] = obj[v]
				//  // })
				//  this.$set(this.$refs.baseInfo, 'formData', obj )
				//  uni.hideLoading()
				// },1000)
				this.$http('/b2b/contract/select_option.jhtml', {
				  contractId: this.id
				 }) 
				 .then(res => {
					// console.log('orderProduct:'+res.content)
					let marketlist = JSON.parse(res.content)
					let list = marketlist[0]
					// console.log(list)
					let formData = {}
					// formData里面没有prop，直接就是key:value
					Object.keys(this.$refs.orderProduct.formData).map(v => {
					  // 如果查出来的字段没有就用原本的值
					formData[v] = list[v]?list[v]:this.$refs.orderProduct.formData[v]
					})
					this.$set(this.$refs.orderProduct, 'formData', formData )
					uni.hideLoading()
				 })
							 
				// 获取数据失败
				// .catch((error) => {
				//  console.log(error)
				//  uni.showToast({
				//   title: '获取数据失败',
				//   icon: 'none',
				//   duration: 2000
				//  })
				// })
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.no-data_class {
		height: 80px;
		width: 100%;
		font-size: 14px;
		color: #ccc;
	}

	.form-container {
		margin-bottom: 15px;
		background: #fff;

		.title-box {
			padding: 0 10px;
			box-sizing: border-box;
			line-height: 40px;
			font-size: 14px;

			&::before {
				content: '';
				display: inline-block;
				height: 12px;
				background-color: #2979ff;
				border-radius: 10px;
				width: 4px;
				margin-right: 10px;
			}

			.title-box_content {
				flex: 1;
			}

			.text-mini_class {
				color: #ccc;
				font-size: 12px;
				margin-left: 10px;
			}

			.click-slot_text {
				color: blue;
				font-size: 14px;
			}

			.btn-class {
				margin: 0;
			}
		}
	}

	.list-box {
		padding: 10px;
		box-sizing: border-box;
		font-size: 14px;
		color: #333;

		.list-item_class {
			padding: 10px;
			box-sizing: border-box;
			border: 1px solid #F1F1F1;
			box-shadow: 0 0 5px 0 #ccc;
			border-radius: 10px;
			margin-bottom: 10px;

			.color-text {
				color: red;
			}

			.list-item_column {
				height: 36px;

				>text:not(.icon-class) {
					width: 80px;
				}

				.easyinput-class {
					flex: 1;
					height: 36px;
					font-size: 14px !important;

					/deep/ .uni-easyinput__content-input {
						padding: 0 10px;

						.uni-easyinput__placeholder-class {
							font-size: 14px;
						}
					}
				}
			}
		}
	}
</style>
