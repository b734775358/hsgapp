<template>
	<view id="content">
		<view class="header">
			<image src="/static/ico-back.png" class="icon" @click="goindex"></image>
			<view class="txt">选择负责人</view>
			<view class="icons">
				<image src="/static/ico-search.png" class="icon" @click="searchshow"></image>
			</view>
		</view>
		<form>
			<view class="search-box" v-if="searchVis">
				<view class="item">
					<text>负责人</text>
					<input type="text" class="txt" confirm-type="search" @confirm="searchpost" v-model="searchname" />
				</view>
				<button type="submit" class="btn" @click="searchpost">搜索</button>
				<button type="default" class="btn-cancle" @click="searchpost">取消</button>
			</view>
		</form>
		<view class="pop-list">
			
			<view class="item" :class="{'on':tabIndex == principalindex}"  v-for="(principalitem,principalindex) in principalList" :key="principalindex" @click="pitchon(principalitem,principalindex)">
				<image src="/static/ico-ok.png" class="ico"></image>
				<view class="name">{{principalitem.username}}</view>
				<view>姓名：{{principalitem.name}}</view>
				<view>手机：{{principalitem.mobile}}</view>
			</view>
			</view>
			<backTop :src="backTop.src" :scrollTop="backTop.scrollTop"></backTop>
		</view>
</template>

<script>
	import {principal_list} from '@/config/api';
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
				principalList:'',
				backTop: {
					src: '../../static/back-top/top.png',
					scrollTop: 0
				},
				pageid:1,
				searchname:''
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
			getlist(){
				let that = this;
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				that.$http(`${principal_list}`, {
					pageNumber: this.pageid,
					pageSize: 10,
					name:this.searchname
				}).then(res => {
					let principallist = JSON.parse(res.content)
					console.log(principallist,'负责人')
					let stat = res.type
					if (stat == "success") {
				
						
						if (principallist.content.length == 0) {
							uni.showToast({
								title: '没有更多数据',
								icon: 'none',
								duration: 2000
							})
						} else {
							
							this.principalList = [...this.principalList, ...principallist.content]
						
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
					key: 'principalId',
					data: item.id 
				});
				uni.setStorage({
					key: 'principalname',
					data: item.name 
				});
				
				uni.navigateTo({
					url:'../index/add'
				})
			},
			searchshow(){
				this.searchVis = true
				this.searchname = ''
			},
			searchpost(){
				this.searchVis = false
				this.pageid = 1
				this.principalList = []
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
