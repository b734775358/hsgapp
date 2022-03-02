<template>
	<view id="content">
		<view class="pup-box" style="background: #F9F9FF;">
			<view class="header">
				<image src="/static/ico-back.png" class="icon" @click="gooffer"></image>
				<view class="txt">折扣</view>
			</view>
			<view class="box-style">
				<view class="dl-style">
					<view class="dl">
						<view class="dt">客户佣金余额</view>
						<view class="dd">￥23,000</view>
					</view>
					<view class="dl">
						<view class="dt">本单使用金额</view>
						<view class="dd">￥12,000</view>
					</view>
					<view class="dl">
						<view class="dt">占本单比例</view>
						<view class="dd">50%</view>
					</view>
				</view>
			</view>
			<view class="box-style">
				<view class="dl-style">
					<view class="dl">
						<view class="dt">客户推广补贴余额</view>
						<view class="dd">￥23,000</view>
					</view>
					<view class="dl">
						<view class="dt">本单使用金额</view>
						<view class="dd">￥12,000</view>
					</view>
					<view class="dl">
						<view class="dt">占本单比例</view>
						<view class="dd">50%</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			gooffer(){
				uni.navigateTo({
					url:'./offer'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~@/static/css/style.scss';
</style>
