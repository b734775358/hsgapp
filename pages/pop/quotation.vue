<template>
	<view id="content">
		<view class="header">
			<image src="/static/ico-back.png" class="icon"></image>
			<view class="txt">选择报价单编号</view>
			<view class="icons">
				<image src="/static/ico-search.png" class="icon" @click="searchVis = true"></image>
			</view>
		</view>
		<form>
			<view class="search-box" v-if="searchVis">
				<view class="item">
					<text>客户名称</text>
					<input type="text" class="txt" />
				</view>
				<button type="submit" class="btn">搜索</button>
				<button type="default" class="btn-cancle" @click="searchVis = false">取消</button>
			</view>
		</form>
		<view class="pop-list">
			<view class="item">
				<image src="/static/ico-ok.png" class="ico"></image>
				<view class="name">广州通往科技有限公司</view>
				<view>报价产品名称：E20_瑞额_300W</view>
				<view>报价单编码：BJ-2020-1-25963</view>
				<view>关联商机：</view>
				<view>电话：13450856233</view>
				<view>报价日期：2021-02-04</view>
			</view>
			<view class="item">
				<image src="/static/ico-ok.png" class="ico"></image>
				<view class="name">广州通往科技有限公司</view>
				<view>报价产品名称：E20_瑞额_300W</view>
				<view>报价单编码：BJ-2020-1-25963</view>
				<view>关联商机：</view>
				<view>电话：13450856233</view>
				<view>报价日期：2021-02-04</view>
			</view>
			<view class="item on">
				<image src="/static/ico-ok.png" class="ico"></image>
				<view class="name">广州通往科技有限公司</view>
				<view>报价产品名称：E20_瑞额_300W</view>
				<view>报价单编码：BJ-2020-1-25963</view>
				<view>关联商机：</view>
				<view>电话：13450856233</view>
				<view>报价日期：2021-02-04</view>
			</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchVis:false,
				tabIndex: 0,
				items:['审核中','审核通过','审核不通过'],
				stardate: '开始时间',
				enddate:'结束时间'
			}
		},
		onLoad() {

		},
		computed: {
		},
		methods: {
			
			changeTab(e){
				this.tabIndex = e
			},
			bindDateChange: function(e) {
				this.stardate = e.target.value
			},
			bindDateChange1: function(e) {
				this.enddate = e.target.value
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	@import '~@/static/css/style.scss';
</style>
