<template>
	<view id="content">
		<view class="header">
			<image src="/static/ico-back.png" class="icon" @click="goindex"></image>
			<view class="txt">选择客户名称</view>
			<view class="icons">
				<image src="/static/ico-search.png" class="icon" @click="searchshow"></image>
			</view>
		</view>
		<form>
			<view class="search-box" v-if="searchVis">
				<view class="item">
					<text>客户名称</text>
					<input confirm-type="search" type="text" class="txt" @confirm="searchpost" v-model="searchname" />
				</view>
				<button type="submit" class="btn" @click="searchpost">搜索</button>
				<button type="default" class="btn-cancle" @click="searchpost">取消</button>
			</view>
		</form>
		<view class="pop-list">
		<!-- 	<view class="item on">
				<image src="/static/ico-ok.png" class="ico"></image>
				<view class="name">广州通往科技有限公司</view>
				<view>客户姓名：李大大</view>
				<view>电话：13450856233</view>
				<view>负责人：张三</view>
			</view> -->
			<view class="item " :class="{'on':tabIndex == companyindex}"  v-for="(companyitem,companyindex) in companyList" :key="companyindex" @click="pitchon(companyitem,companyindex)">
				<image src="/static/ico-ok.png" class="ico"></image>
				<view class="name">{{companyitem.name}}</view>
				<view>机构：{{companyitem.name}}</view>
				<view>客户编码：{{companyitem.out_trade_no}}</view>
			<!-- 	<view>负责人：{{companyitem.name}}</view> -->
			</view>
			
		</view>
		<backTop :src="backTop.src" :scrollTop="backTop.scrollTop"></backTop>
	</view>
</template>

<script>
	import {company_list} from '@/config/api';
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
				customerlist:'',
				companyList:[],
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
			this.getcustomerlist ()
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
			pitchon(item,index) {
				 this.tabIndex = index
				uni.setStorage({
					key: 'companyId',
					data: item.id 
				});
				uni.setStorage({
					key: 'companyname',
					data: item.name 
				});
				uni.setStorage({
					key: 'customerType',
					data: item.customerType
				});
				uni.setStorage({
					key: 'countryName',
					data: item.countryName
				});
				uni.setStorage({
					key: 'cityArea',
					data: item.cityArea
				});
				uni.setStorage({
					key: 'address',
					data: item.address
				});
				uni.navigateTo({
					url:'../index/add'
				})
			},
			searchshow(){
				this.searchVis = true
				this.searchname = ''
			},
			getcustomerlist(){
				let that = this;
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				that.$http(`${company_list}`, {
					pageNumber: this.pageid,
					pageSize: 8,
					name:this.searchname
				}).then(res => {
					let companylist = JSON.parse(res.content)
					console.log(companylist,'公司名称')
					let stat = res.type
					if (stat == "success") {
						
						if (companylist.content.length == 0) {
							uni.showToast({
								title: '没有更多数据',
								icon: 'none',
								duration: 2000
							})
						} else {
							
							this.companyList = [...this.companyList, ...companylist.content]
						
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
			searchpost(){
				this.searchVis = false
				this.pageid = 1
				this.companyList = []
				this.getcustomerlist()
			},
			
		},
		onReachBottom() {
				this.pageid++
				this.getcustomerlist()
			
		}
	}
</script>

<style lang="scss" scoped>
	@import '~@/static/css/style.scss';
</style>
