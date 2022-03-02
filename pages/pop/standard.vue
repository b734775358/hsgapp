<template>
	<view id="content">
		<view class="header">
			<image src="/static/ico-back.png" class="icon" @click="goproduct"></image>
			<view class="txt">选择非标方案</view>
			<view class="icons">
				<image src="/static/ico-search.png" class="icon" @click="searchshow"></image>
			</view>
		</view>
		<form>
			<view class="search-box" v-if="searchVis">
				<view class="item">
					<text>客户名称</text>
					<input type="text" class="txt" confirm-type="search" @confirm="searchpost" v-model="searchname"/>
				</view>
				<button type="submit" class="btn" @click="searchpost" >搜索</button>
				<button type="default" class="btn-cancle" @click="searchpost">取消</button>
			</view>
		</form>
		<view class="pop-list">
			<view class="item" :class="{'on':tabIndex == standardindex}"
				v-for="(standarditem,standardindex) in standardList" :key="standardindex"
				@click="pitchon(standarditem,standardindex)">
				<image src="/static/ico-ok.png" class="ico"></image>
				<view class="name">{{standarditem.store_name}}</view>
				<view>申请号：{{standarditem.sn}}</view>
				<view>来源商机：{{standarditem.management_sn}}</view>
				<view>客户编码：{{standarditem.out_trade_no}}</view>
				<view>客户类型：{{standarditem.type}}</view>
				<view>区域名称：{{standarditem.areaname}}</view>
				<view>负责人：{{standarditem.name}}</view>
				<view>状态:{{standarditem.state}}</view>
			</view>
		</view>
		<backTop :src="backTop.src" :scrollTop="backTop.scrollTop"></backTop>
	</view>
	
</template>

<script>
	import {
		standard
	} from '@/config/api';
	import backTop from '@/common/back-top/back-top.vue';
	export default {
		components: {
			backTop
		},
		data() {
			return {
				searchVis: false,
				tabIndex: 0,
				
				backTop: {
					src: '../../static/back-top/top.png',
					scrollTop: 0
				},
				standardList: [],
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
		computed: {},
		methods: {
			goproduct(){
				uni.navigateTo({
					url:'../index/product_detail'
				})
			},
			changeTab(e) {
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
			searchpost(){
				this.searchVis = false
				this.pageid = 1
				this.standardList = []
				this.getlist()
			},
			

			getlist() {
				let that = this;
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				that.$http(`${standard}`, {
					pageNumber: this.pageid,
					pageSize: 10,
					store_name: this.searchname
				}).then(res => {
					let standardlist = JSON.parse(res.content)
					console.log(standardlist, '负责人')
					let stat = res.type
					if (stat == "success") {


						if (standardlist.content.length == 0) {
							uni.showToast({
								title: '没有更多数据',
								icon: 'none',
								duration: 2000
							})
						} else {

							this.standardList = [...this.standardList, ...standardlist.content]

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
					key: 'standardId',
					data: item.id 
				});
				uni.setStorage({
					key: 'standardsn',
					data: item.sn
				});
				
				uni.navigateTo({
					url:'../index/product_detail'
				})
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
