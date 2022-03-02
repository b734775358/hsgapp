<template>
	<uni-forms ref="form" :modelValue="formData" :rules="rules" class="form-box">
		<uni-forms-item :required="item.isRequired" label-width="150"
			:class="{'form-item-top_class': item.labelPosition}" :label-position="item.labelPosition || 'left'"
			:label="item.label" :name="item.prop" v-for="(item, index) in parentData" :key="index" class="form-item_class"
			:hidden="item.hidden||false">

			<!-- 输入框 -->
			<uni-easyinput :class="{'text-align_right': !item.labelPosition}" :autoHeight="item.compName === 'textarea'"
				:type="item.compName === 'textarea' ? 'textarea' : 'text'" v-model="formData[item.prop]"
				:placeholder="item.placeholder || ''" :inputBorder="item.inputBorder || false"
				v-if="item.compName === 'easyinput' || item.compName === 'textarea'" :disabled="item.disabled" />

			<!-- 文本 -->
			<text v-else-if="item.compName === 'text'" class="text-class" style="color:#909399">{{formData[item.prop]}}</text>

			<!-- 下拉框 -->
			<select-comp v-else-if="item.compName === 'select'" id="select" :options="item.comboxList" keyParams="id"
				text="name" :currentName="formData[item.prop]" :propsData="item.prop" @change="selectCompanyFn">
			</select-comp>

			<!-- 日期 -->
			<uni-datetime-picker type="date" :value="formData[item.prop]" :start="item.start" :end="item.end"
				@change="dateChange" class="datetime-class"
				:class="{'text-align_right': item.align === 'right', 'datetime-align_right': item.align === 'right' && (!formData[item.prop] || item.defaultValue) }"
				:border="item.border || false" v-else-if="item.compName === 'datetimePicker'" />

			<!--区域-->
			<picker-address v-else-if="item.compName === 'area'" @change="areaChange">{{txt}}</picker-address>

			<!-- 链接 -->
			<!-- <uni-list v-else-if="item.compName === 'link'" :border="item.border || false"> -->
				<view :key="item.prop" v-else-if="item.compName === 'link'"  @click="returnLinkSource(item)" class="minHeight text-align_right">
					<text class="text-class">{{formData[item.prop]}}</text>
				</view>
			<!-- </uni-list> -->
			<!-- 上传 -->
			<upload-comp v-else-if="item.compName === 'upload'" />
		</uni-forms-item>
	</uni-forms>
</template>

<script>
	import {
		uniForms,
		uniFormsItem,
		uniEasyinput,
		uniDatetimePicker,
		uniList,
		uniListItem
	} from '@dcloudio/uni-ui'
	import selectComp from './select.vue'
	import uploadComp from './upload.vue'
	import pickerAddress from './area/pickerAddress.vue'
	export default {
		components: {
			uniForms,
			uniFormsItem,
			uniEasyinput,
			uniDatetimePicker,
			selectComp,
			uploadComp,
			pickerAddress,
			uniList,
			uniListItem
		},
		props: {
			searches: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				// 表单数据
				formData: {},
				rules: {},
				currentName: null,
				// 不用默认的selectOption，用传入参数自带的comboxList
				// selectOptions: [{
				// 	name: '背景',
				// 	id: '1'
				// }],
				txt: '选择地址',
				title: 'Hello',
				parentData:[],
			}
		},
		created() {
			let rules = {}
			this.parentData = this.searches
			this.parentData.forEach(v => {
				this.formData[v.prop] = v.defaultValue || null
				if (v.isRequired) {
					rules[v.prop] = {
						rules: [{
							required: v.isRequired
						}]
					}
				}
			})
			this.$set(this, 'rules', rules)
		},
		methods: {
			// 跳转链接点击
			link() {},

			// 区域选择
			areaChange(data) {
				this.txt = data.data.join('-')
			},

			// 下拉框选择
			selectCompanyFn(data) {
				// console.log(data)
				// this.currentName = data.id || null
				this.formData[data.key] = data.id || null
				// 本地保存一个值用来记录下拉框选项，用来触发动作
				this.$emit('changeSelect',{prop:data.key,...data})
			},
			/**
			 * 复写 binddata 方法，如果只是为了校验，无复杂自定义操作，可忽略此方法
			 * @param {String} name 字段名称
			 * @param {String} value 表单域的值
			 */
			// binddata(name,value){
			// 通过 input 事件设置表单指定 name 的值
			//   this.$refs.form.setValue(name, value)
			// },
			// 触发提交表单
			submit(cb) {
				this.$refs.form.validate(valid => {
					if (!valid) {
						cb(this.formData)
					} else {
						uni.showToast({
							icon: 'none',
							title: '必填项不允许为空'
						})
						cb(false)
					}
				})
			},

			// 日期选择
			dateChange(e) {
				console.log(e)
			},
			
			returnLinkSource(data){
				console.log(data.to)
				uni.$emit('returnLinkSource',data.prop)
				uni.navigateTo({
					url: `/${data.to}`
				});
			},
			// 强制刷新
			reload() {
				this.$forceUpdate();
			}
		},
		// watch:{
		// 	searches:{
		// 		handler(){
		// 			console.log(this.searches)
		// 		}
		// 	}
		// }
	}
</script>

<style lang="scss" scoped>
	.minHeight {
		height: 36px;
	}

	.form-box {
		padding: 0 10px;
		box-sizing: border-box;

		.text-class {
			text-align: right;
			font-size: 14px;
			display: block;
			line-height: 36px;
		}
	}

	.form-item-top_class {
		padding-bottom: 10px;
	}

	.form-item_class {
		margin-bottom: 10px;

		/deep/ .uni-error-message-text {
			display: none;
		}

		.datetime-class {

			/deep/ .uni-date__x-input,
			/deep/ .uni-date-x {
				padding: 0;
			}
		}

		.datetime-align_right {
			/deep/ .uni-input-input {
				padding-right: 36px;
				box-sizing: border-box;
			}
		}

		/deep/ .uni-forms-item__inner {
			padding: 0 !important;
			border-bottom: 1px solid #F1F1F1;
		}

		/deep/ .label-text {
			font-size: 14px !important;
			color: #333 !important;
		}
	}
</style>
