<template>
	<view class="box">
		<view class="fixed-top_box" :style="{paddingTop: `${$statusBarHeight}px`}">
			<uni-search-bar @confirm="searchConfirm" v-model="searchValue" ></uni-search-bar>
		</view>
		
		<view class="container">
			<view class="list-box" v-if="list.length">
				<view class="list-item_box flex align-items_center justify-content_between" v-for="(item, index) in list" :key="index" @click="selectData(item)">
					<view class="list-item_columns">
						<view v-for="(colItem, colIndex) in columns" :key="colIndex">
							<view class="desc-box flex align-items_center" v-if="!colItem.hasOwnProperty('hidden')">
								<view class="text-align_justify label-class">{{colItem.label}}</view>：
								<text>{{item[colItem.prop]}}</text>
							</view>
						</view>
					</view>
					<view class="circle-box flex align-items_center justify-content_center" :class="{'active-select_class': item.isSelect}">
						<text class="circle-selectd" v-show="item.isSelect"></text>
					</view>
				</view>
			</view>
			<view class="" v-else>没有数据</view>
		</view>
		<view class="save-box">
			<button type="primary" size="mini" @click="submit" class="btn-class">保存已选中（{{selectList.length}}）</button>
		</view>
	</view>
</template>


<script>
	import {uniSearchBar} from '@dcloudio/uni-ui'
	import {
		principal_list
	} from '@/config/api.js'
	export default {
    components: {uniSearchBar},
		data()  {
			return {		
				// 这个key是为了返回
				key: null,
				// 是否是单选项，true单选， false: 多选
				isSingle: true,
				// 分页接口必需字段
				paginationData: {
					pageNumber: 1,
					pageSize: 10,
				},
				// 是否滚动到底部
				isToEnd: false,
				// 搜索内容
				searchValue: null,
				// 选中的数据
				selectList: [],
				/*
					prop: 接口的字段
					label: 字段的描述
				*/
				columns: [
					{
						prop: 'id',
						label: '用户id',
						hidden: true
					},
					{
						prop: 'name',
						label: '姓名'
					},
					{
						prop: 'mobile',
						label: '电话'
					},
				],
				list: [],
			}
		},
		onLoad (options) {
			const {key, isSingle} = options
			console.log(key, !!isSingle)
			this.isSingle = !!isSingle
			this.key = key 
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
			this.getList()
		},
		
		mounted() {
			this.getList()
		},
		methods: {
			// 获取列表数据
			getList() {
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				// setTimeout(() => {
				// 	for (let i = 0; i < 10; i++) {
				// 		console.log(this.list.length)
				// 		// let index = ++(this.list.length)
				// 		this.list.push({
				// 			id: this.list.length,
				// 			name: this.list.length,
				// 			phone: '1'
				// 		})
				// 		uni.hideLoading()
				// 	}
				// 	this.isToEnd = this.list.length > 35
				// }, 4000)			
				this.$http(principal_list, {
						...this.paginationData,
						// name: this.searchValue
					})	
					.then(res => {
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
								// 到达底部
								this.isToEnd = true
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
					})
				// 获取数据失败
				// .catch((error) => {
				// 	console.log(error)
				// 	uni.showToast({
				// 		title: '获取数据失败',
				// 		icon: 'none',
				// 		duration: 2000
				// 	})
				// })
			},
			// 选择用户
			selectData(row) {
				if (this.isSingle) {
					this.list.forEach(v => {
						v.isSelect = false
					})
				}
				row.isSelect = !row.isSelect
				if (!row.isSelect) {
					const index = this.selectList.findIndex(v => v === row.id)
					return this.selectList.splice(index, 1)
				}
				if (this.isSingle) {
					this.selectList.splice(0, 1, row.id)
				} else {
					this.selectList.push(row.id)
				}
			},
			
			// 搜索
			searchConfirm(data) {
				const {
					value
				} = data
				// 根据value请求接口， 请求参数用value
				console.log(value)
				this.searchValue = value
				this.getList()
			},
			
			// 提交
			submit () {
				// //获取所有页面栈实例列表
				// const pages = getCurrentPages()
				//  //当前页页面实例
				// const nowPage = pages[ pages.length - 1] 
				// //上一页页面实例
				// const prevPage = pages[ pages.length - 2 ]  
				// // 修改上一页data里面的参数
				// prevPage.$vm.selectList = this.selectList   
				// //uni.navigateTo跳转的返回，默认1为返回上一级
				// uni.$emit('updateData', this.selectList)
				if (this.selectList.length) {
					// uni.$emit('updateContractId', this.isSingle ? this.selectList[0] : this.selectList)
					// 这里可以打印一下，看看值是啥，然后在哪个组件里面用到的就在哪个组件里面调用on方法，看baseInfo的created
					let updateList = this.list.filter(item=>{
						return this.selectList.findIndex(id=>id==item.id)!=-1
					})
					console.log(`update${this.key}`)
					console.log(this.selectList)
					this.$event.emit(`update${this.key}`, this.isSingle ? updateList[0] : updateList)
				}

				uni.navigateBack({  
				    delta: 1
				});
			},
		}
	}
</script>


<style lang="scss" scoped>
.container {
	min-height: calc(100vh - 111px);
}
.list-box {
	padding: 0 10px;
	box-sizing: border-box;
	background: #fff;
	.list-item_box {
		border-bottom: 1px solid #f1f1f1;
		min-height: 40px;
		font-size: 14px;
		color: #333;
		
		.list-item_columns {
			.desc-box {
				height: 30px;
		
				.label-class {
					min-width: 50px;
				}
		
				text {
					margin-left: 20px;
				}
			}
		}
		.active-select_class {
			border-color: #2979ff !important;
		}
		.circle-box {
			border-radius: 100%;
			width: 15px;
			height: 15px;
			border: 1px solid #f1f1f1;
			padding: 2px;
			box-sizing: border-box;
			.circle-selectd {
				display: inline-block;
				background: #2979ff;
				width: 100%;
				height: 100%;
				border-radius: 100%;
			}
		}
	}
}
.save-box {
	box-shadow: 0 0 3px #ccc;
	padding: 10px;
	box-sizing: border-box;
	background: #fff;
	position: sticky;
	bottom: 0;
	> button {
		display: block;
	}
}
</style>
