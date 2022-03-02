<template>
	<view>
		<view class="form-container">
			<view class="title-box flex align-items_center">基础信息</view>
			<form-comp :searches="baseInfo" ref="baseInfo" @getData="getData" />
		</view>

		<view class="form-container">
			<view class="title-box flex align-items_center">
				<view class="title-box_content flex align-items_center justify-content_between">
					<view>业绩占比分配</view>
					<button type="primary" size="mini" @click="selectBusinessManager" class="btn-class">选择业务员</button>
				</view>
			</view>
			<view class="list-box" v-if="proportionList.length">
				<view class="list-item_class" v-for="(item, index) in proportionList" :key="index">
					<!-- 业务员的ID，隐藏 -->
					<view class="list-item_column flex align-items_center justify-content_between" :hidden="true">
						<text>业务员ID</text> {{item.salesmanId}}
					</view>
					<view class="list-item_column flex align-items_center justify-content_between">
						<text>业务员</text> {{item.salesmanName}}
					</view>
					<view class="list-item_column flex align-items_center justify-content_between">
						<text>业绩占比</text>
						<uni-easyinput class="easyinput-class text-align_right" type="text" v-model="item.businessRate"
							placeholder="请输入" :inputBorder="false" />
					</view>
					<view class="list-item_column flex align-items_center justify-content_between">
						<text>核算占比</text>
						<uni-easyinput class="easyinput-class text-align_right" type="text"
							v-model="item.accountingRate" placeholder="请输入" :inputBorder="false" />
					</view>
					<view class="list-item_column flex align-items_center justify-content_between">
						<text>说明</text>
						<uni-easyinput class="easyinput-class text-align_right" type="text" v-model="item.desc"
							placeholder="请输入" :inputBorder="false" />
					</view>
					<view class="list-item_column flex align-items_center justify-content_center color-text"
						@click="deleteBusinessManager(index)">
						<uni-icons type="trash" size="20" color="red" class="icon-class" />删除信息
					</view>
				</view>
			</view>
			<view v-else class="no-data_class flex justify-content_center align-items_center">暂无添加数据</view>
		</view>
		<view class="form-container">
			<view class="title-box flex align-items_center">
				<view class="title-box_content flex align-items_center justify-content_between">
					<view>赠送配件明细</view>
					<button type="primary" size="mini" @click="selectParts" class="btn-class">选择配件</button>
				</view>
			</view>
			<view class="list-box" v-if="partsList.length">
				<view class="list-item_class" v-for="(item, index) in partsList" :key="index">
					<view class="list-item_column flex align-items_center justify-content_between">
						<text>配件名称</text> {{item.partName}}
					</view>
					<view class="list-item_column flex align-items_center justify-content_between">
						<text>配件编码</text>{{item.partCode}}
					</view>
					<view class="list-item_column flex align-items_center justify-content_between">
						<text>销售价格</text>{{item.partPrice}}
					</view>
					<view class="list-item_column flex align-items_center justify-content_between">
						<text>数量</text>
						<uni-easyinput class="easyinput-class text-align_right" type="number" v-model="item.number"
							placeholder="请输入" :inputBorder="false" />
					</view>
					<view class="list-item_column flex align-items_center justify-content_between">
						<text>金额</text>{{item.partPrice * item.number}}
					</view>
					<view class="list-item_column flex align-items_center justify-content_center color-text"
						@click="deleteParts(index)">
						<uni-icons type="trash" size="20" color="red" class="icon-class" />删除信息
					</view>
				</view>
			</view>
			<view v-else class="no-data_class flex justify-content_center align-items_center">暂无添加数据</view>
		</view>
	</view>
</template>

<script>
	import { company_list,postlist,principal_list } from '@/config/api.js'
	import { uniEasyinput, uniIcons } from '@dcloudio/uni-ui'
	import formComp from '@/components/form.vue'
	export default {
		components: {
			uniEasyinput,
			uniIcons,
			formComp
		},
		props: {
			// 返回上一页时带回来的参数
			selectedParts: {
				type: Array,
				default: () => ([])
			},
			selectedProportion: {
				type: Array,
				default: () => ([])
			},
			id: {
				type: [Array, String, Number],
				default: null
			}
		},
		data() {
			return {
				// loadingText: '加载中...',
				// 基础信息
				// baseInfoRules: {
				// 	// 对name字段进行必填验证
				// 	name: {
				// 		rules: [{
				// 				required: true,
				// 				errorMessage: '请输入姓名',
				// 			},
				// 		]
				// 	},
				// },
				baseInfo: [
					// {
					// 	prop:'字段名',
					// 	label:'标签',
					// 	compName:'组件名',
					// 	isRequire:'是否必填',
					// 	placeholder:'占位',
					// 	comboxList:[{
					// 		id:1,
					// 		name:'下拉框选项'
					// 	}],
					// to: 跳转的链接 - compName === link
					// linkType: 跳转的方式 relaunch , navigateTo, switchTab, 请使用绝对路径， 默认是navigateTo - compName === link
					// 	defaultValue:'默认值',
					// start:'日期开始时间',
					// end:'日期结束时间',
					// 	另外还有些与属性相关的基本不管,其他按照实际情况引入
					// hidden:'是否隐藏',
					// }
					// 报价单ID
					{
						prop: 'contractId',
						label: '报价单ID',
						compName: 'text',
						isRequired: true,
						placeholder: '请选择',
						hidden:true
					},
					// 报价单号
					{
						prop: 'contractSn',
						label: '报价单号',
						compName: 'link',
						isRequired: true,
						placeholder: '请选择',
						to: 'pages/saleOrder/quotationNo/index'
					},
					// 客户公司名称
					{
						prop: 'storeName',
						label: '客户公司名称',
						compName: 'text',
						isRequired: true,
						placeholder: '自动带出'
					},
					// 客户公司ID
					{
						prop: 'storeId',
						label: '客户公司ID',
						compName: 'text',
						isRequired: true,
						placeholder: '自动带出',
						hidden:true
					},
					// 客户公司编码
					{
						prop: 'storeSn',
						label: '客户公司编码',
						compName: 'text',
						isRequired: true,
						placeholder: '自动带出',
						hidden:true
					},
					// 下单日期
					{
						prop: 'orderDate',
						label: '下单日期',
						compName: 'datetimePicker',
						isRequired: true,
						placeholder: '默认今天日期',
						align: 'right',
						defaultValue: new Date(),
						start: new Date().getTime()
					},
					// 订单总金额
					{
						prop: 'orderAmount',
						label: '订单总金额',
						compName: 'text',
						isRequired: true,
						placeholder: '自动带出'
					},
					// 配件赠送金额
					{
						prop: 'distributionAmount',
						label: '配件赠送金额',
						compName: 'text',
						isRequired: true,
						placeholder: '自动带出'
					},
					// 负责人
					// {
					// 	prop: 'user',
					// 	label: '负责人',
					// 	compName: 'link',
					// 	to: 'pages/saleOrder/businessManager/list?key=user&isSingle=true',
					// 	isRequired: true,
					// 	placeholder: '自动带出',
					// 	defaultValue: '陈海涛'
					// },
					// 负责人
					{
						prop: 'salesmanId',
						label: '负责人ID',
						compName: 'text',
						isRequired: true,
						placeholder: '自动带出'
					},
					// 负责人
					{
						prop: 'salesmanName',
						label: '负责人',
						compName: 'link',
						to: 'pages/saleOrder/businessManager/list?key=user&isSingle=true',
						isRequired: true,
						placeholder: '自动带出',
						defaultValue: '陈海涛'
					},
					// 部门ID
					// {
					// 	prop: 'saleOrgId',
					// 	label: '部门ID',
					// 	compName: 'text',
					// 	isRequired: true,
					// 	placeholder: '自动带出',
					// 	hidden:true
					// },
					// // 部门
					// {
					// 	prop: 'saleOrgName',
					// 	label: '部门',
					// 	compName: 'text',
					// 	isRequired: true,
					// 	placeholder: '自动带出',
					// },
					// 跟单员ID
					{
						prop: 'followmanId',
						label: '跟单员ID',
						compName: 'text',
						isRequired: true,
						placeholder: '请选择',
						hidden:true
					},
					// 跟单员
					// {
					// 	prop: 'followmanName',
					// 	label: '跟单员',
					// 	compName: 'select',
					// 	isRequired: true,
					// 	placeholder: '请选择',
					// 	comboxList: [{
					// 		id: 123,
					// 		name: '赵四'
					// 	}]
					// },
					// 跟单员
					{
						prop: 'followmanName',
						label: '跟单员',
						compName: 'link',
						to: 'pages/saleOrder/businessManager/list?key=followmanName&isSingle=true',
						isRequired: true,
						placeholder: '自动带出',
						defaultValue: '陈海涛'
					},
					// 定金金额
					{
						prop: 'depositAmount',
						label: '定金金额',
						compName: 'text',
						isRequired: true,
						placeholder: '自动带出'
					},
					// 合同发机时间
					{
						prop: 'sendDate',
						label: '合同发机时间',
						compName: 'datetimePicker',
						isRequired: true,
						placeholder: '默认今天日期',
						align: 'right',
						defaultValue: new Date(),
						start: new Date().getTime()
					},
					// 收货省市区
					// {
					// 	prop: 'dc',
					// 	label: '收货省市区',
					// 	compName: 'area',
					// 	isRequired: true,
					// 	placeholder: '请选择',
					// 	comboxList: [{
					// 		value: 1,
					// 		label: 2
					// 	}]
					// },
					// 收货人
					{
						prop: 'consignee',
						label: '收货人',
						compName: 'easyinput',
						isRequired: true,
						placeholder: '请输入'
					},
					// 联系方式
					{
						prop: 'mobile',
						label: '联系方式',
						compName: 'easyinput',
						isRequired: true,
						placeholder: '请输入'
					},
					// 收货详细地址
					{
						prop: 'district',
						label: '收货详细地址',
						compName: 'easyinput',
						isRequired: true,
						placeholder: '请输入'
					},
					// 业务类型
					{
						prop: 'contractType',
						label: '业务类型',
						compName: 'text',
						placeholder: '自动带出'
					},
					// 实收定金金额
					{
						prop: 'paidDepositAmount',
						label: '实收定金金额',
						compName: 'text',
						placeholder: '自动带出'
					},
					// 已回款金额
					{
						prop: 'hasReturnAmount',
						label: '已回款金额',
						compName: 'text',
						placeholder: '自动带出'
					},
					// 渠道代理费
					{
						prop: 'proxyDeliverRate',
						label: '渠道代理费',
						compName: 'text',
						placeholder: '自动带出'
					},
					// 是否融资
					{
						prop: 'is_financing',
						label: '是否融资',
						compName: 'text',
						placeholder: '自动带出'
					},
					// 是否贴息
					{
						prop: 'is_discount',
						label: '是否贴息',
						compName: 'text',
						placeholder: '自动带出'
					},
					// 贴息金额
					{
						prop: 'discountamounts',
						label: '贴息金额',
						compName: 'text',
						placeholder: '自动带出'
					},
					// 贴息利率（%）
					{
						prop: 'discountrate',
						label: '贴息利率（%）',
						compName: 'text',
						placeholder: '自动带出'
					},
					// 是否有违金
					{
						prop: 'is_Liquidated_damages',
						label: '是否有违金',
						compName: 'text',
						placeholder: '自动带出'
					},
					// 解决纠纷地
					{
						prop: 'issue',
						label: '解决纠纷地',
						compName: 'text',
						placeholder: '自动带出'
					},
					// 销售组织ID
					{
						prop: 'salesOrganizationId',
						label: '销售组织',
						compName: 'text',
						placeholder: '自动带出',
						hidden:'true'
					},
					// 销售组织
					{
						prop: 'salesOrganizationValue',
						label: '销售组织',
						compName: 'text',
						placeholder: '自动带出',
						disabled:true
					},
					// 交期期限（天）
					{
						prop: 'deadline',
						label: '交期期限（天）',
						compName: 'text',
						placeholder: '自动带出',
						disabled:true
					},
					// 报价单类型
					{
						prop: 'is_temporary',
						label: '报价单类型',
						compName: 'text',
						placeholder: '自动带出',
						disabled:true
					},
					// 组织id
					{
						prop: 'sales_organization',
						label: '组织ID',
						compName: 'text',
						placeholder: '自动带出',
						disabled:true,
						hidden:true
					},
					// 报价单类型
					{
						prop: 'sales_organization_name',
						label: '组织名称',
						compName: 'text',
						placeholder: '自动带出',
						disabled:true
					},
					// 违约金备注
					{
						prop: 'liquidatedDamagesNote',
						label: '违约金备注',
						compName: 'textarea',
						placeholder: '请输入',
						labelPosition: 'top',
						inputBorder: true,
						disabled:true
					},
				],
				// 业绩占比分配数据， 业务员名称：name  业绩占比：businessRate   核算占比: accountingRate   说明: desc
				proportionList: [],
				// 配件
				partsList: []
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
			},
			selectedParts(data) {
				const list = data.map(v => {
					return {
						partName: v.partName,
						partCode: v.partCode,
						partPrice: v.partPrice,
						id: v.id,
						number: 1
					}
				})
				this.partsList = [...list, ...this.partsList]
			},
		},
		created () {
			this.$event.on('updateuser', val => {
				// 替换表单参数
				this.$set(this.$refs.baseInfo.formData,'salesmanName',val.name)
				this.$set(this.$refs.baseInfo.formData,'salesmanId',val.id)
				console.log(this.$refs.baseInfo.formData)
				// this.$refs.baseInfo.formData.user = val;
				this.$refs.baseInfo.reload()
			})
			this.$event.on('updatefollowmanName', val => {
				// 替换表单参数
				this.$set(this.$refs.baseInfo.formData,'followmanName',val.name)
				this.$set(this.$refs.baseInfo.formData,'followmanId',val.id)
				console.log(this.$refs.baseInfo.formData)
				// this.$refs.baseInfo.formData.user = val;
				this.$refs.baseInfo.reload()
			})
			this.$event.on('updatebusiness', data => {
				// 替换表单参数
				console.log(data)
					const list = data.map(v => {
						return {
							salesmanId: v,
							salesmanName: v,
							businessRate: null,
							accountingRate: null,
							desc: null
						}
					})
					this.$set(this, 'proportionList', list)
				// this.$refs.baseInfo.formData.user = val
			})
		},
		beforeDestroy () {
			this.$event.off('updatesalesmanName');
		},
		methods: {
			// 选择配件
			selectParts() {
				uni.navigateTo({
					url: '/pages/saleOrder/parts/list'
				});
			},
			// 删除配件
			deleteParts(index) {
				this.partsList.splice(index, 1)
			},
			
			// 请求获取数据
			getDetails() {
			uni.showLoading({
			 title: '加载中',
			 mask: true
			}); 
			this.$http(postlist, {
			  id: this.id
			 }) 
			 .then(res => {
				 let marketlist = JSON.parse(res.content)
				 let list = marketlist.content[0]
				 console.log(list)
				 if(list){
					 this.$set(this.$refs.baseInfo.formData,'contractId',list.id)
					 this.$set(this.$refs.baseInfo.formData,'contractSn',list.sn)
					 this.$set(this.$refs.baseInfo.formData,'storeName',list.store_name)
					 this.$set(this.$refs.baseInfo.formData,'storeId',list.store)
					 this.$set(this.$refs.baseInfo.formData,'storeSn',list.out_trade_no)
					 this.$set(this.$refs.baseInfo.formData,'orderDate',list.create_date)
					 this.$set(this.$refs.baseInfo.formData,'orderAmount',list.totalAmount)
					 this.$set(this.$refs.baseInfo.formData,'distributionAmount',list.gift_price)
					 this.$set(this.$refs.baseInfo.formData,'proxyDeliverRate',list.proxy_deliver_rate_amount)
					 this.$set(this.$refs.baseInfo.formData,'is_financing',list.is_financing)
					 this.$set(this.$refs.baseInfo.formData,'contractType',list.contract_type)
					 this.$set(this.$refs.baseInfo.formData,'is_discount',list.is_discount)
					 this.$set(this.$refs.baseInfo.formData,'discountamounts',list.discountamounts)
					 this.$set(this.$refs.baseInfo.formData,'discountrate',list.discountrate)
					 this.$set(this.$refs.baseInfo.formData,'is_Liquidated_damages',list.is_Liquidated_damages)
					 this.$set(this.$refs.baseInfo.formData,'issue',list.issue)
					 this.$set(this.$refs.baseInfo.formData,'salesOrganizationId',list.sales_organization)
					 this.$set(this.$refs.baseInfo.formData,'salesOrganizationValue',list.sales_organization_name)
					 this.$set(this.$refs.baseInfo.formData,'deadline',list.deadline)
					 this.$set(this.$refs.baseInfo.formData,'is_temporary',list.is_temporary)
					 this.$set(this.$refs.baseInfo.formData,'liquidatedDamagesNote',list.liquidated_damages_note)
					 this.$refs.baseInfo.reload()
					 console.log(this.$refs.baseInfo.formData)
				 }
				  
			  // formData里面没有prop，直接就是key:value
			 //  Object.keys(this.$refs.baseInfo.formData).map(v => {
				//   // 如果查出来的字段没有就用原本的值
				// formData[v] = list[v]?list[v]:this.$refs.baseInfo.formData[v]
			 //  })
			  // console.log(formData)
			  // this.$set(this.$refs.baseInfo, 'formData', formData )
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

			
			// 选择业务员
			selectBusinessManager() {
				uni.navigateTo({
					url: '/pages/saleOrder/businessManager/list?key=business'
				});
			},
			// 删除业务员
			deleteBusinessManager(index) {
				this.proportionList.splice(index, 1)
			},

			submit(cb) {
				this.$refs.baseInfo.submit(data => {
					if (data) {
						cb({
							...data,
							proportionList: this.proportionList,
							partsList: this.partsList
						})
					} else {
						cb(false)
					}
				})
			},
			// 获取表单数据
			getData(data) {
				return {
					...data,
					proportionList: this.proportionList,
					partsList: this.partsList
				}
				// const params = {
				// 	...this.$refs.baseInfo.formData,
				// 	proportionList: this.proportionList
				// }
				// return params
			}
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
