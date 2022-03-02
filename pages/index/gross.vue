<template>
	<view id="content">
		<view class="pup-box" style="background: #F9F9FF;" >
			<view class="header">
				<image src="/static/ico-back.png" class="icon" @click="gooffer"></image>
				<view class="txt">整单毛利分析</view>
			</view>
			<view class="box-style">
				<view class="dl-style">
					<view class="dl">
						<view class="dt">整单机型数</view>
						<view class="dd">3</view>
					</view>
					<view class="dl">
						<view class="dt">下单总数量</view>
						<view class="dd">3</view>
					</view>
				</view>
			</view>
			<view class="box-style">
				<view class="dl-style">
					<view class="dl">
						<view class="dt">未税总额度</view>
						<view class="dd">￥301,290</view>
					</view>
					<view class="dl">
						<view class="dt">含税总额度</view>
						<view class="dd">￥356,211</view>
					</view>
					<view class="dl">
						<view class="dt">折扣总额度</view>
						<view class="dd">￥2,000</view>
					</view>
					<view class="dl">
						<view class="dt">成本总额度</view>
						<view class="dd">￥51,136</view>
					</view>
					<view class="dl">
						<view class="dt">整单毛利率</view>
						<view class="dd">￥1310</view>
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
