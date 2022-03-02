<template>
	<view :class="{ 'hidden-list_box': hidden }">
		<uni-file-picker
			:list-styles="listStyles"
			v-model="uploadData"  
			file-mediatype="all"
			mode="list"
			file-extname="png,jpg"
			:limit="5"
			@progress="progress" 
			@success="success" 
			@fail="fail" 
			@select="select"
		>
			<slot name="clickSlot"></slot>
		</uni-file-picker>
	</view>
</template>

<script>
import {uniFilePicker} from '@dcloudio/uni-ui'
	export default {
	    components: {uniFilePicker},
		props: {
			hidden: {
				type: Boolean,
				default: true
			}
		},
		data () {
			return {
				uploadData: [],				
				listStyles:{
					// 是否显示边框
					border: true,
					// 是否显示分隔线
					dividline: true,
					// 线条样式
					borderStyle: {
						width:1,
						color:'blue',
						radius:2
					}
				},
			}
		},
		methods: {
			progress(data) {
				console.log('progress',data)
			},
			success(data) {
				console.log('success',data)
			},
			fail(data) {
				console.log('fail',data)
			},
			select(data) {
				this.$emit('select', data)
			},
			deleteFn(data) {
				console.log('delete', data)
			}
		}
	}
</script>

<style scoped>
.hidden-list_box  /deep/ .uni-file-picker__lists {
	display: none !important;
}
</style>
