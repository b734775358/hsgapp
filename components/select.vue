<template>
	<!-- <view class="select-box">
		<view class="select-content" @click="optionsVisible = !optionsVisible">{{selectOption.label}}</view>
		<view class="options-box" v-show="optionsVisible">
			<text class="options-item_class" v-for="(item, index) in options" :key="index" @click="selectedFn(item)">{{item.label}}</text>
		</view>
	</view> -->
	<view class="select-box">
		<view class="select-current" @click.stop="openClose">
			<text class="current-name">{{current.name || currentName}}</text>
		</view>
		<view class="option-list" v-if="isShow" @click.stop="optionTap">
			<text class="option" data-id="defaultOption.id" data-name="defaultOption.name"
				v-if="hasDefaultOption">{{defaultOption.name}}</text>
			<text class="option" v-for="(item, index) in result" :key="item.id" data-id="item.id" data-name="item.name"
				@click.stop="optionTap(item)">{{item.name}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			propsData: {
				type: String,
				default: ''
			},
			options: {
				type: Array,
				default: []
			},
			defaultOption: {
				type: Object,
				default: () => ({
					id: '000',
					name: '全部城市'
				})
			},
			hasDefaultOption: {
				type: Boolean,
				default: false
			},
			currentName: {
				type: [String,Number],
				default: ''
			},
			keyParams: {
				type: String,
				default: 'id'
			},
			text: {
				type: String,
				default: 'name'
			}
		},
		data() {
			return {
				result: [],
				isShow: false,
				current: {},
				optionsVisible: false,
				selectOption: {
					label: null,
					value: null
				},
				// options: [{
				// 		label: '背景',
				// 		value: '1'
				// 	},
				// 	{
				// 		label: '背景',
				// 		value: '1'
				// 	},
				// 	{
				// 		label: '背景',
				// 		value: '1'
				// 	},
				// 	{
				// 		label: '背景',
				// 		value: '1'
				// 	},
				// 	{
				// 		label: '背景',
				// 		value: '1'
				// 	}
				// ]
			}
		},
		watch: {
			'options'(val) {
				this.result = val
			}
		},
		methods: {
			optionTap(data) {
				// let dataset = e.target.dataset
				this.current = data
				this.isShow = false
				// console.log(e)
				// 调用父组件方法，并传参
				this.$emit("change", {
					...data,
					key: this.propsData
				})
			},
			openClose() {
				this.isShow = !this.isShow
			},

			// 此方法供父组件调用
			close() {
				this.isShow = false
			},
			selectedFn(data) {
				this.selectOption = data
				this.optionsVisible = false
			}
		},
		mounted() {
			// 属性名称转换, 如果不是 { id: '', name:'' } 格式，则转为 { id: '', name:'' } 格式
			let result = []
			for (let item of this.options) {
				let {
					[this.keyParams]: id, [this.text]: name
				} = item
				result.push({
					id,
					name
				})
			}
			this.current = this.hasDefaultOption ? Object.assign({}, this.defaultOption) : {}
			this.result = result
		}
	}
</script>

<style lang="scss" scoped>
	// .select-box {
	// 	height: 36px;
	// 	position: relative;

	// 	.select-content {
	// 		height: 100%;
	// 		display: flex;
	// 		align-items: center;
	// 		justify-content: flex-end;
	// 	}

	// 	.options-box {
	// 		width: calc(100vw - 20px);
	// 		height: 180px;
	// 		overflow-y: auto;
	// 		box-shadow: 0px 0px 3px 1px #ccc;
	// 		position: absolute;
	// 		bottom: -188px;
	// 		left: -70px;
	// 		z-index: 2000;
	// 		padding: 5px 10px;
	// 		box-sizing: border-box;
	// 		background: #fff;

	// 		.options-item_class {
	// 			width: 100%;
	// 			border-bottom: 1px solid #ccc;
	// 			font-size: 14px;
	// 			color: #333;
	// 			line-height: 36px;
	// 			display: block;
	// 			;

	// 			&:last-child {
	// 				border-bottom: 0;
	// 			}
	// 		}
	// 	}
	// }
	.select-box {
		position: relative;
		width: 100%;
		font-size: 24rpx;
	}

	.select-current {
		position: relative;
		width: 100%;
		padding: 0 10rpx;
		height: 60rpx;
		border: 1rpx solid #ddd;
		border-radius: 6rpx;
		box-sizing: border-box;
	}

	.select-current::after {
		position: absolute;
		display: block;
		right: 16rpx;
		top: 25rpx;
		content: '';
		width: 0;
		height: 0;
		border: 10rpx solid transparent;
		border-top: 10rpx solid #999;
	}

	.current-name {
		display: flex;
		align-items: center;
		width: 85%;
		height: 100%;
		word-wrap: normal;
		overflow: hidden;
	}

	.option-list {
		position: absolute;
		left: 0;
		top: 76rpx;
		width: 100%;
		padding: 12rpx 20rpx 10rpx 20rpx;
		border-radius: 6rpx;
		box-sizing: border-box;
		z-index: 99;
		box-shadow: 0rpx 0rpx 1rpx 1rpx rgba(0, 0, 0, 0.2) inset;
		background-color: #fff;
	}

	.option {
		display: block;
		width: 100%;
		line-height: 70rpx;
		border-bottom: 1rpx solid #eee;
	}

	.option:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}
</style>
