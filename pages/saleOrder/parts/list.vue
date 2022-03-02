<template>
	<view class="box">
		<view class="fixed-top_box" :style="{paddingTop: `${$statusBarHeight}px`}">
			<uni-search-bar @confirm="searchConfirm" v-model="searchValue" ></uni-search-bar>
		</view>
		
		<view class="container">
			<view class="list-box" v-if="list.length">
				<view class="list-item_box flex align-items_center justify-content_between" v-for="(item, index) in list" :key="index" @click="selectData(item)">
					<view class="list-item_columns">
						<view class="desc-box flex align-items_center">
							配件名称： <text>{{item.partName}}</text>
						</view>
						<view class="desc-box flex align-items_center">
							配件编码： <text>{{item.partCode}}</text>
						</view>
						<view class="desc-box flex align-items_center">
							配件价格： <text>{{item.partPrice}}</text>
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
import {uniSearchBar } from '@dcloudio/uni-ui'
	export default {
    components: {uniSearchBar},
		data()  {
			return {
				// 搜索内容
				searchValue: null,
				// 选中的数据
				selectList: [],
				list: [
					{partName: '配件名称', partCode: '配件编码', partPrice: 10, id: 0, isSelect: false },
					{partName: '配件名称', partCode: '配件编码', partPrice: 20, id: 1, isSelect: false },
					{partName: '配件名称', partCode: '配件编码', partPrice: 30, id: 2, isSelect: false },
				],
			}
		},
		methods: {
			// 选择用户
			selectData (row) {
				row.isSelect = !row.isSelect
				if (!row.isSelect) {
					const index = this.selectList.findIndex(v => v.id === row.id)
					return this.selectList.splice(index, 1)
				}
				this.selectList.push(row)
			},
			// 搜索
			searchConfirm (data) {
				const {value} = data
				// 根据value请求接口， 请求参数用value
				console.log(value)
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
				uni.$emit('updateParts', this.selectList)

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
	background: #fff;
	box-sizing: border-box;
	.list-item_box {
		border-bottom: 1px solid #f1f1f1;
		min-height: 40px;
		font-size: 14px;
		color: #333;
		.list-item_columns {
			.desc-box {
				height: 30px;
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
