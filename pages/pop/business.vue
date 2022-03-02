<template>
	<view id="content">
		<view class="header">
			<image src="/static/ico-back.png" class="icon" @click="goindex"></image>
			<view class="txt">选择商机</view>
			<view class="icons">
				<image src="/static/ico-search.png" class="icon" @click="searchshow"></image>
			</view>
		</view>
		<form>
			<view class="search-box" v-if="searchVis">
				<view class="item">
					<text>商机名称</text>
					<input type="text" class="txt" confirm-type="search" @confirm="searchpost" v-model="searchname" />
				</view>
				<button type="submit" class="btn" @click="searchpost">搜索</button>
				<button type="default" class="btn-cancle" @click="searchpost">取消</button>
			</view>
		</form>
		<view class="pop-list">
			<view class="item " :class="{'on':tabIndex == firmindex}"  v-for="(firmitem,firmindex) in firmList" :key="firmindex" @click="pitchon(firmitem,firmindex)">
				<image src="/static/ico-ok.png" class="ico"></image>
				<view class="name">{{firmitem.project_name}}</view>
				<!-- <view>商机名称：{{firmitem.project_name}}</view> -->
				<view>商机编号：{{firmitem.sn}}</view>
			</view>
			<!-- <view class="item on">
				<image src="/static/ico-ok.png" class="ico"></image>
				<view class="name">瑞田商机</view>
				<view>客户姓名：广州通往科技有限公司</view>
				<view>负责人：张三</view>
				<view>商机阶段：技术参数确认</view>
				<view>预计下单时间：2022-02-27</view>
			</view> -->
		</view>
		<backTop :src="backTop.src" :scrollTop="backTop.scrollTop"></backTop>
	</view>
</template>

<script>
	import {firm_list} from '@/config/api';
	import backTop from '@/common/back-top/back-top.vue';
	export default {
		components: {
			backTop
		},
		data() {
			return {
				searchVis:false,
				tabIndex: 0,
				items:['审核中','审核通过','审核不通过'],
				stardate: '开始时间',
				enddate:'结束时间',
				firmList:[],
				backTop: {
					src: '../../static/back-top/top.png',
					scrollTop: 0
				},
				searchname:'',
				pageid:1
			}
		},
		onPageScroll(e) {
			this.backTop.scrollTop = e.scrollTop;
		},
		onLoad() {
			this.getlist()
		},
		computed: {
		},
		methods: {
			goindex() {
				uni.navigateTo({
					url:'../index/add'
				})
			},
			changeTab(e){
				this.tabIndex = e
			},
			bindDateChange: function(e) {
				this.stardate = e.target.value
			},
			bindDateChange1: function(e) {
				this.enddate = e.target.value
			},
			searchshow(){
				this.searchVis = true
				this.searchname = ''
			},
			getlist () {
				let that = this;
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				that.$http(`${firm_list}`, {
					pageNumber: 1,
					pageSize: 10,
					name:this.searchname
				}).then(res => {
					let firmlist  =  JSON.parse(res.content)
					console.log(firmlist,'商机')
					let stat = res.type
					if (stat == "success") {
						
						
						if (firmlist.content.length == 0) {
							uni.showToast({
								title: '没有更多数据',
								icon: 'none',
								duration: 2000
							})
						} else {
							
							this.firmList = [...this.firmList, ...firmlist.content]
						
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
			},
			pitchon(item,index) {
				
				 this.tabIndex = index
				uni.setStorage({
					key: 'firmId',
					data: item.id 
				});
				uni.setStorage({
					key: 'firmSn',
					data: item.sn
				});
				
				uni.navigateTo({
					url:'../index/add'
				})
			},
			searchpost(){
				this.searchVis = false
				this.pageid = 1
				this.firmList = []
				this.getlist()
			},
			
		},
		onReachBottom() {
				this.pageid++
				this.getlist()
			
		}
	}
</script>

<style lang="scss" scoped>
	@import '~@/static/css/style.scss';
</style>
