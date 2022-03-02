<template>
	<view>
		<view class="form-container">
			<view class="title-box flex align-items_center">合同明细</view>
			<form-comp :searches="contractDetails" ref="contractDetails" />
		</view>
	</view>
</template>

<script>
	import formComp from '@/components/form.vue'
	import { uniEasyinput, uniIcons } from '@dcloudio/uni-ui'
	export default {
		components: {
			formComp,
			uniIcons,
			uniEasyinput
		},
		props:{
			id: {
				type: [Array, String, Number],
				default: null
			}
		},
		data() {
			return {
				// loadingText: '加载中...',
				// 基础信息
				contractDetails: [
					// 对外发文编号
					{
						prop: 'sn',
						label: '对外发文编号',
						compName: 'text',
						placeholder: '自动带出'
					},
					// 纸质合同编号
					{
						prop: 'contractStampSn',
						label: '纸质合同编号',
						compName: 'text',
						placeholder: '自动带出'
					},
					// 合同金额
					{
						prop: 'contract_amt',
						label: '合同金额',
						compName: 'text',
						placeholder: '自动带出'
					},
					// 用章名称
					{
						prop: 'sealName',
						label: '用章名称',
						compName: 'text',
						placeholder: '自动带出'
					},
					// 盖章先后
					{
						prop: 'sealedSuccessively',
						label: '盖章先后',
						compName: 'text',
						placeholder: '自动带出'
					},
					// 收件人
					{
						prop: 'consignee',
						label: '收件人',
						compName: 'text',
						placeholder: '自动带出'
					},
					// 收件人联系方式
					{
						prop: 'consignee',
						label: '收件人联系方式',
						compName: 'text',
						placeholder: '自动带出'
					},
					// 收件地址
					{
						prop: 'address',
						label: '收件地址',
						compName: 'text',
						placeholder: '自动带出'
					},
					// 备注
					{
						prop: 'memo',
						label: '备注',
						compName: 'textarea',
						placeholder: '自动带出',
						labelPosition: 'top',
						inputBorder: true,
						disabled:true
					},
				],
			}
		},
		watch: {
			// selectedProportion(data) {
			// 	const list = data.map(v => {
			// 		return {
			// 			name: v.name,
			// 			phone: v.phone,
			// 			id: v.id,
			// 			businessRate: null,
			// 			accountingRate: null,
			// 			desc: null
			// 		}
			// 	})
			// 	this.proportionList = [...list, ...this.proportionList]
			// },
			// 监听请求接口的数据有没发生变化
			id (data) {
				this.getDetails()
				console.log(data)
			}
		},
		methods: {
			submit(cb) {
				this.$refs.contractDetails.submit(data => {
					cb(data)
				})
			},
			// 获取表单数据
			getData() {
				const params = {
					...this.$refs.contractDetails.formData
				}
				return params
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
				this.$http('/b2b/contract_stamp/select_by_contract_id.jhtml', {
				  contractId: this.id
				 }) 
				 .then(res => {
					// console.log('contractDetails:'+res)
					let marketlist = JSON.parse(res.content)
					let list = marketlist[0]
					// console.log(list)
					let formData = {}
					// formData里面没有prop，直接就是key:value
					Object.keys(this.$refs.contractDetails.formData).map(v => {
						  // 如果查出来的字段没有就用原本的值
						formData[v] = list[v]?list[v]:this.$refs.contractDetails.formData[v]
					})
					this.$set(this.$refs.contractDetails, 'formData', formData )
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
</style>
