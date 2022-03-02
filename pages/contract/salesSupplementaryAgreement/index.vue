<template>
	<view class="box">
		<uni-nav-bar shadow leftIcon="arrowleft" right-text="提交" title="新建对外发文" @clickRight="submit" />
		<view class="container">
			<view class="form-container">
				<view class="title-box flex align-items_center">报价申请
					<button style="margin-right: 5px;" type="primary" size="mini" @click="delContract" class="btn-class">
						移除
					</button>
					<button style="margin: 0;" type="primary" size="mini" @click="addContract" class="btn-class">
						添加
					</button>
				</view>
				<form-comp :searches="contractInfo" ref="contractInfo"
				@updateContractId="updateContractId"
				@returnLinkSource="returnLinkSource"/>
			</view>
			<view class="form-container">
				<view class="title-box flex align-items_center">基础信息</view>
				<form-comp :searches="baseInfo" ref="baseInfo" 
				@changeSelect = 'changeSelect'/>
			</view>

			<view class="form-container">
				<view class="title-box flex align-items_center">收件人信息</view>
				<form-comp :searches="consigneeInfo" ref="consigneeInfo" />
			</view>

			<view class="form-container">
				<view class="title-box flex align-items_center">
					<view class="title-box_content flex align-items_center justify-content_between">
						<view>
							附件上传
							<text class="text-mini_class">(合同协议/委托付款协议)</text>
						</view>
						<!-- <text class="click-slot_text" @click="addFiles">添加</text> -->
						<upload-comp @select="selectFiles">
							<text slot="clickSlot" class="click-slot_text">添加</text>
						</upload-comp>
					</view>
				</view>
				<view class="select-list_box" v-if="selectList.length">
					<view class="select-list_item flex" v-for="(item, index) in selectList" :key="index">
						<image :src="item.url" class="flex-shrink" />
						<view class="content flex align-items_center justify-content_between">
							<view class="text-desc_box flex flex-f-d-c justify-content_between">
								<text class="name">{{item.name}}</text>
								<text class="desc"> {{item.selectedTime}}</text>
							</view>
							<uni-icons type="close" size="20" color="red" @click="deleteFiles(index)"></uni-icons>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		uniNavBar,
		uniIcons
	} from '@dcloudio/uni-ui'
	import formComp from '@/components/form.vue'
	import uploadComp from '@/components/upload.vue'
	import { company_list,postlist,login_touken } from '@/config/api.js'
	export default {
		components: {
			uniNavBar,
			uniIcons,
			formComp,
			uploadComp
		},
		data() {
			return {
				/*
				 * 表单输入框： {prop: 'name', label: '姓名', compName: 'easyinput',placeholder: '请输入'},
				 * 自动带出：   {prop: 'a', label: '姓名', compName: 'text',placeholder: '自动带出'},
				 * 下拉框选择   {prop: 'b', label: '姓名', compName: 'select',placeholder: '请选择', comboxList: [{value: 1, label: 2},{value: 1, label: 2},{value: 1, label: 2},{value: 1, label: 2}]},
				 * 跳转链接     {prop: 'name', label: '姓名', compName: 'text',placeholder: '自动带出', link:""},
				 * {prop: 'a', label: '姓名', compName: 'text',placeholder: '自动带出'},
				 * */
				// 基础信息
				baseInfo: [
					
					// 报价申请2
					// 报价申请3
					// 报价申请4
					// 对外发文类型ID
					{
						prop: 'StampTypeId',
						label: '对外发文类型',
						compName: 'select',
						placeholder: '请选择',
						comboxList: [{
							id: 1,
							name: '标准印刷版订购合同'
						},{
							id: 2,
							name: '非标准板订购合同'
						},{
							id: 3,
							name: '销售补充协议'
						},{
							id: 4,
							name: '技术类文件'
						},{
							id: 5,
							name: '其他类文件'
						}]
					},
					// 客户ID
					{
						prop: 'storeId',
						label: '客户名称',
						compName: 'text',
						placeholder: '自动带出',
						hidden:true
					},
					// 客户名称
					{
						prop: 'storeName',
						label: '客户名称',
						compName: 'text',
						placeholder: '自动带出'
					},
					// 等级
					{
						prop: 'storeContractPost',
						label: '客户等级',
						compName: 'text',
						placeholder: '自动带出'
					},
					// 负责人ID
					{
						prop: 'salesManId',
						label: '负责人',
						compName: 'text',
						placeholder: '自动带出',
						hidden:true
					},
					// 负责人
					{
						prop: 'salesManName',
						label: '负责人',
						compName: 'text',
						placeholder: '自动带出'
					},
					// 业务联系方式
					{
						prop: 'storeMobile',
						label: '业务联系方式',
						compName: 'text',
						placeholder: '自动带出'
					},
					// 合同编号
					// {
					// 	prop: 'sadas2321dasd',
					// 	label: '合同编号',
					// 	compName: 'text',
					// 	placeholder: '自动带出'
					// },
					// 最终使用客户
					// {
					// 	prop: 'dc',
					// 	label: '最终使用客户',
					// 	compName: 'select',
					// 	placeholder: '请选择',
					// 	comboxList: [{
					// 		id: 1,
					// 		name: 2
					// 	}]
					// },
					// 用章名称
					{
						prop: 'sealNameId',
						label: '用章名称',
						compName: 'select',
						placeholder: '请选择',
						comboxList: [{
							id: 1,
							name: '合同专用章'
						},{
							id: 2,
							name: '宏山中英文章'
						},{
							id: 3,
							name: '佛山包装公司用章'
						},{
							id: 4,
							name: '个人微信付款无需盖章'
						},{
							id: 5,
							name: '香港宏石章'
						},{
							id: 6,
							name: '宏石公章'
						},{
							id: 7,
							name: '综合章'
						},{
							id: 8,
							name: '电子销售合同章'
						},{
							id: 9,
							name: '销售合同章'
						},{
							id: 10,
							name: '其他'
						}]
					},
					// 盖章先后
					{
						prop: 'sealedSuccessively',
						label: '盖章先后',
						compName: 'select',
						placeholder: '请选择',
						comboxList: [{
							id: 1,
							name: '我司先盖章'
						},{
							id: 2,
							name: '客户先盖章'
						}]
					},
					// 纸质合同编号
					{
						prop: 'contractStampSn',
						label: '纸质合同编号',
						compName: 'easyinput',
						placeholder: '请输入'
					},
					// 合同金额
					{
						prop: 'contract_amt',
						label: '合同金额',
						compName: 'easyinput',
						placeholder: '自动带出'
					},
					// 技术方案
					{
						prop: 'intfTechnicalSchemeId',
						label: '技术方案',
						compName: 'select',
						placeholder: '请选择',
						comboxList: [{
							id: 1,
							name: 2
						}],
						hidden:true
					},
					// 补充协议内容（多选）
					{
						prop: 'paymentStatus',
						label: '补充协议内容（多选）',
						compName: 'select',
						placeholder: '请选择',
						comboxList: [{
							id: 1,
							name: '付款方式'
						},{
							id: 2,
							name: '付款安排'
						},{
							id: 3,
							name: '移机服务'
						},{
							id: 4,
							name: '赠送配件'
						},{
							id: 5,
							name: '机床延保'
						},{
							id: 6,
							name: '激光器延保'
						},{
							id: 7,
							name: '赠送耗材'
						},{
							id: 8,
							name: '其他'
						}],
						hidden:true,
						isSingle:false
					},
					// 原销售订单合同关联
					{
						prop: 'intfContractFinancId',
						label: '原销售订单合同关联',
						compName: 'select',
						placeholder: '请选择',
						comboxList: [{
							id: 1,
							name: 2
						}],
						hidden:true
					},
				],
				contractInfo:[// 报价申请1 ID
					{
						prop: 'contractId',
						label: '报价申请1ID',
						compName: 'text',
						placeholder: '自动带出',
						hidden:true
					},
					// 报价申请1
					{
						prop: 'contractSn',
						label: '报价申请1',
						compName: 'link',
						isRequired: true,
						placeholder: '请选择',
						to: 'pages/saleOrder/quotationNo/index'
					}],
				// 收件人信息
				consigneeInfo: [
					// 收件人
					{
						prop: 'consignee',
						label: '收件人',
						compName: 'easyinput',
						placeholder: '请输入'
					},
					// 收件人联系方式
					{
						prop: 'mobile',
						label: '收件人联系方式',
						compName: 'easyinput',
						placeholder: '请输入'
					},
					// 收件地址
					{
						prop: 'address',
						label: '收件地址',
						compName: 'easyinput',
						placeholder: '请输入'
					}
				],
				// 上传附件列表
				selectList: [],
				// 对外发文类型的值
				StampType:uni.getStorageSync('StampTypeId')||{},
				contractId:null,
				linkSource:null,
			}
		},
		onShow() {
			// 返回上一页带的报价单号id
			uni.$on('updateContractId', data => {
				this.contractId = data;
			})
			uni.$on('returnLinkSource', data => {
				this.linkSource = data;
				// console.log(this.linkSource)
			})
		},
		methods: {
			selectFiles(data) {
				data.tempFiles.forEach(v => {
					v.selectedTime = this.formatTime(new Date())
					this.selectList.push(v)
				})
			},
			addFiles() {

			},
			// 删除附件
			deleteFiles(index) {
				uni.showModal({
					title: '提示',
			 	content: '确定删除？',
					success: (res) => {
						if (res.confirm) {
							this.selectList.splice(index, 1)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},

			// 提交
			submit() {
				const params = {
					...this.$refs.contractInfo.submit(),
					...this.$refs.baseInfo.submit(),
					...this.$refs.consigneeInfo.submit()
				}
				// 请求接口

			},

			formatTime(date) {
				const year = date.getFullYear()
				const month = date.getMonth() + 1
				const day = date.getDate()
				const hour = date.getHours()
				const minute = date.getMinutes()
				// const second = date.getSeconds()

				return [year, month, day].map(this.formatNumber).join('-') + ' ' + [hour, minute].map(this.formatNumber)
					.join(':')
			},

			formatNumber(n) {
				n = n.toString()
				return n[1] ? n : '0' + n
			},
			
			// 处理对外发文类型变化
			changeSelect(data){
				this.StampType = data
			},
			// 执行多个报价申请替换的
			getDetails() {
				let that = this;
				uni.showLoading({
				 title: '加载中',
				 mask: true
				}); 
				this.$http(postlist, {
				  id: this.contractId
				 }) 
				 .then(res => {
					 console.log(res)
					 let marketlist = JSON.parse(res.content)
					 let list = marketlist.content[0]
					// 更新报价申请部分数据
				  that.$set(that.$refs.contractInfo.formData, this.linkSource, list.sn )
				  this.$set(this.$refs.contractInfo.formData, this.linkSource.replace('Sn','Id'), list.id )
				  that.$set(that.$refs.contractInfo.formData, 'storeId', list.store )
				  that.$set(that.$refs.contractInfo.formData, 'storeName', list.store_name )
				  // console.log(that.$refs.baseInfo.formData)
				  this.$refs.contractInfo.reload()
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
			
			addContract(){
				if(this.contractInfo.length<8){
					let length = parseInt(this.contractInfo.length/2);
					this.contractInfo.push({
						prop: `contractId${length}`,
						label: `报价申请${length+1}ID`,
						compName: 'text',
						placeholder: '自动带出',
						hidden:true
					},
					// 报价申请1
					{
						prop: `contractSn${length}`,
						label: `报价申请${length+1}`,
						compName: 'link',
						isRequired: true,
						placeholder: '请选择',
						to: 'pages/saleOrder/quotationNo/index'
					})
				} else {
					 uni.showToast({
					  title: '最多只能存在4个报价申请！',
					  icon: 'none',
					  duration: 2000
					 })
				}
				// this.$refs.contractInfo.reload()
			},
			
			delContract(){
				if(this.contractInfo.length > 2){
					this.contractInfo.pop()
					this.contractInfo.pop()
				} else {
					uni.showToast({
					 title: '必须存在1个或以上的报价申请！',
					 icon: 'none',
					 duration: 2000
					})
				}
			},
			
			getToken(){
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
		mounted(){
			this.getToken()
		},
		watch:{
			// 控制特定字段显示
			StampType:{
				handler(){
					if(this.StampType!={}&&this.StampType.prop=='StampTypeId'){
						let id = this.StampType.id;
						switch(id){
							case null:							// 空 
								this.baseInfo.map(item=>{
									if(item.prop == 'paymentStatus' || item.prop == 'intfContractFinancId' || item.prop == 'intfTechnicalSchemeId'){
										// 隐藏原销售订单合同关联和补充协议内容，清空表单字段
										item.hidden = true;
										this.$refs.baseInfo.formData[item.prop] = null;
									}
								})
								break;
								
							case 1:								// 标准印刷版订购合同
								this.baseInfo.map(item=>{
									if(item.prop == 'paymentStatus' || item.prop == 'intfContractFinancId' || item.prop == 'intfTechnicalSchemeId'){
										// 隐藏原销售订单合同关联和补充协议内容，清空表单字段
										item.hidden = true;
										this.$refs.baseInfo.formData[item.prop] = null;
									}
								})
								break;
							case 2:								// 非标准版订购合同
								this.baseInfo.map(item=>{
									if(item.prop == 'paymentStatus' || item.prop == 'intfContractFinancId' || item.prop == 'intfTechnicalSchemeId'){
										// 隐藏原销售订单合同关联和补充协议内容，清空表单字段
										item.hidden = true;
										this.$refs.baseInfo.formData[item.prop] = null;
									}
								})
								break
							// 销售补充协议
							case 3:								// 销售补充协议
								this.baseInfo.map(item=>{
									if(item.prop == 'paymentStatus' || item.prop == 'intfContractFinancId'){
										// 隐藏原销售订单合同关联和补充协议内容，清空表单字段
										item.hidden = false;
									} else if (item.prop == 'intfTechnicalSchemeId'){
										item.hidden = true;
										this.$refs.baseInfo.formData[item.prop] = null;
									}
								})
								break
							case 4:								// 技术类文件
								this.baseInfo.map(item=>{
									if(item.prop == 'intfTechnicalSchemeId' || item.prop == 'intfContractFinancId'){
										// 显示原销售订单合同关联和技术方案
										item.hidden = false;
									} else if(item.prop == 'paymentStatus'){
										item.hidden = true;
										this.$refs.baseInfo.formData[item.prop] = null;
									}
								})
								break
							case 5:								// 其他类文件
								this.baseInfo.map(item=>{
									if(item.prop == 'intfContractFinancId'){
										// 显示原销售订单合同关联
										item.hidden = false;
									} else if (item.prop == 'intfTechnicalSchemeId' || item.prop == 'intfContractFinancId'){
										item.hidden = true;
									}
								})
								break
						}
					}
				}
			},
			
			contractId:{
				handler(){
					// console.log(this.contractId)
					if(this.contractId&&this.contractId!=null){
						this.getDetails()
					}
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.flex {
		display: flex;
	}

	.align-items_center {
		align-items: center;
	}

	.justify-content_between {
		justify-content: space-between;
	}

	.flex-f-d-c {
		flex-direction: column;
	}

	.flex-shrink {
		flex-shrink: 0;
	}

	.container {
		height: calc(100vh - 40px);
		overflow-y: auto;
		padding-bottom: 20px;
		box-sizing: border-box;

		.form-container {
			margin-bottom: 15px;

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
			}
		}

		.select-list_box {
			padding: 0 10px;
			box-sizing: border-box;

			.select-list_item {
				padding: 10px 0;
				box-sizing: border-box;
				border-bottom: 1px solid #F1F1F1;

				>image {
					width: 40px;
					height: 40px;
				}

				.content {
					flex: 1;

					.text-desc_box {
						margin-left: 15px;

						.name {
							font-size: 16px;
							color: #333;
						}

						.desc {
							font-size: 12px;
							color: #ccc;
						}
					}
				}
			}
		}
	}
</style>
