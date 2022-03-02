<template>
	<view id="content">
		<view class="pup-box" >
			<view class="header">
				<view @click="goindex" class="icon">
					<image src="/static/ico-back.png"></image>
				</view>
				<view class="txt">添加配件</view>
			</view>
			<view class="tab-box">
				<block v-for="(item,index) in partsTab" :key="index">
					<view class="item" :class="{'on':partstabIndex == index}" @click="changeTab1(index)">
						{{item}}
					</view>
				</block>
			</view>
			<view class="search-medium">
				<image src="/static/ico-search1.png" class="ico" @tap="burdeningSearch"></image>
				<input confirm-type="search" placeholder="产品名称/产品编号" class="txt" 
					@confirm="burdeningSearch" v-model="searchlist" />
			</view>
			<block v-if="partstabIndex == 0">
				<view class="parts-list">
					<view class="item" v-for="(accitem,accindex) in accessoriesList" :key="accindex">
						<view class="name">{{accitem.name}}</view>
						<view><text>功率：</text>{{accitem.power}}</view>
						<view><text>产品编码：</text>{{accitem.product_three}}</view>
						<!-- <button class="add-btn" @click="accessoriesAdd"></button> -->
						<view class="nums-box">
							<button class="n-b" @tap="accessoriesSub(accitem)">-</button>
							<input type="number" class="n-t" value="0" v-model="accitem.num" @input="proitemnum($event,proitem)" >
							<button class="n-b" @tap="accessoriesAdd(accitem)">+</button>
						</view>
					</view>
				</view>
			</block>
			<!-- 添加上下料 -->
			<block v-if="partstabIndex == 1">
				<view class="parts-list">
					<view class="item">
						<view class="name">TXAL01-12全自动上料机</view>
						<view><text>规格：</text>2000w</view>
						<view><text>产品编码：</text>0508088025</view>
						<!-- <button class="add-btn" @tap="materialAdd"></button> -->
						<view class="nums-box">
							<button class="n-b" @tap="materialSub('tool')">-</button>
							<input type="number" class="n-t" value="0" v-model="special" >
							<button class="n-b" @tap="materialAdd('tool')">+</button>
						</view>
					</view>
				</view>
			</block>
			<block v-if="selectedPro == 1">
				<view class="pup-mask" @click="showpro"></view>
				<view class="select-pro">
					<view class="tit">已选产品</view>
					<view class="parts-list">
						<view class="item" v-for="(accselitem,accselindex) in accselected_list" :key="accselindex">
							<view class="name">{{accselitem.name}}</view>
							<view><text>功率：</text>{{accselitem.power}}</view>
							<view><text>数量：</text>{{accselitem.num}}</view>
							<button class="close-btn" @tap="accessoriesDelete(accselitem,accselindex)"></button>
						</view>
					</view>
				</view>
			</block>
			<view style="height: 200rpx;"></view>
			<view class="operation-box">
				<view class="txt" :class="{'on':selectedPro == 1}" @click="showpro()">
					已选产品：<text class="f-blue arrow">{{accselected_list.length}}</text>
				</view>
				<view class="btns">
					<button class="btn" @click="accessoriesReset">重置</button>
					<button class="btn btn-blue" @tap="accessoriesConfirm">确定</button>
				</view>
			</view>
		</view>
		<backTop :src="backTop.src" :scrollTop="backTop.scrollTop"></backTop>
	</view>
</template>

<script>
	import {accessorieslist} from '@/config/api';
	import backTop from '@/common/back-top/back-top.vue';
	export default {
		components: {
			backTop
		},
		data() {
			return {
					partsTab: ['添加配件', '添加上下料'],
					partstabIndex: 0,
					selectedPro:0,
						special:0,
					ConfigurePro: false, //配置产品
					
					backTop: {
						src: '../../static/back-top/top.png',
						scrollTop: 0
					},
					accessoriesList:[],
					accselected_list:[],
					pageid:'1',
					searchlist:'',
					makeType:0
					
			}
		},
		onPageScroll(e) {
			this.backTop.scrollTop = e.scrollTop;
		},
		onLoad() {
			this.product_list() //配件列表
		},
		methods: {
			
			changeTab1(e) {
				this.partstabIndex = e
			},
			goindex(){
				uni.navigateTo({
					url:'./index'
				})
			},
			 //配件列表
			product_list() {
				let that = this;
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				that.$http(`${accessorieslist}`, {
					type:that.makeType,
					isMarketable: '1',
					pageNumber: that.pageid,
					pageSize: '6',
					name:that.searchlist
				}).then(res => {
					let productlist = JSON.parse(res.content)
					console.log(productlist,'啦啦啦')
					let stat = res.type
					if (stat == "success") {
						if (productlist.length == 0) {
							uni.showToast({
								title: '没有更多数据',
								icon: 'none',
								duration: 2000
							})
						} else {
							productlist = productlist.content.map(i => {
								return {
									product_three: i.product_three,
									name: i.name,
									power: i.power,
									nameplate: i.nameplate,
									num: 0,
									company_info_id:i.id
								}
							})
							console.log(productlist)
							this.accessoriesList = [...this.accessoriesList, ...productlist]

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
			// 添加配件搜索
			burdeningSearch() {
				this.pageid = 1
				this.accessoriesList =[]
				this.product_list()
			},
			proitemnum(event,item) {
				let value = event.target.value;
				if (value < 1) {
					uni.showToast({
						title: '不能再少了',
						icon: 'none',
						duration: 2000
					})
					for (let i = 0; i < this.accselected_list.length; i++) {
						if (this.accselected_list[i].company_info_id == item.company_info_id) {
							this.accselected_list.splice(i,1)
							// console.log(i,'寄来',this.selected_list)
							this.$forceUpdate();
							return
						}
						
					}
				}
				
				for (let i = 0; i < this.accselected_list.length; i++) {
					if (this.accselected_list[i].company_info_id == item.company_info_id) {
						this.accselected_list[i].num = value
						return
					}
					
				}
				let add = {
					name :item.name,
					power:item.power,
					company_info_id:item.company_info_id,
					num:item.num
				}
				this.accselected_list.push(add)
				
				this.$forceUpdate();
			},
			// 添加配件减号
			accessoriesSub(item){
				if (item.num < 1) {
					
					uni.showToast({
						title: '不能再少了',
						icon: 'none',
						duration: 2000
					})
					for (let i = 0; i < this.accselected_list.length; i++) {
						if (this.accselected_list[i].company_info_id == item.company_info_id) {
							this.accselected_list.splice(i,1)
							return
						}
						
					}
				} else {
					item.num--
					if(item.num == 0) {
						this.accessoriesSub(item)
					}
					for (let i = 0; i < this.accselected_list.length; i++) {
						if (this.accselected_list[i].company_info_id == item.company_info_id) {
							this.accselected_list[i].num--
							return
						}
					}
				}
				this.$forceUpdate();
			},
			// 添加配件加号
			accessoriesAdd(item) {
				console.log(item)
				item.num++
				for (let i = 0; i < this.accselected_list.length; i++) {
					if (this.accselected_list[i].company_info_id == item.company_info_id) {
						this.accselected_list[i].num++
						return
					}
				}
				let add = {
					name :item.name,
					power:item.power,
					company_info_id:item.company_info_id,
					num:item.num
				}
				this.accselected_list.push(add)
				this.$forceUpdate();
			},
			// 添加配件上下料减号 
			materialSub(){
				
			},
			// 添加配件上下料加号 
			materialAdd() {
			
			},
			// 添加配件已选删除
			accessoriesDelete(item,index) {
				this.accselected_list.splice(index,1)
				for (let i = 0; i < this.accessoriesList.length; i++) {
					if (this.accessoriesList[i].company_info_id == item.company_info_id) {
						this.accessoriesList[i].num = 0
					}
					
				}
				
				if(this.accselected_list.length == 0) {
					this.selectedPro = 0
				}
			},
			// 添加配件重置
			accessoriesReset() {
				this.accselected_list = []
				this.selectedPro = 0
				for (let i=0 ; i <this.accessoriesList.length ;i++) {
					this.accessoriesList[i].num = 0
				}
			},
			// 添加配件确定
			accessoriesConfirm() {
				this.visibleParts = false
			},
			// 已选产品展开收缩
			showpro() {
				if (this.selectedPro == 1) {
					this.selectedPro = 0
				} else {
					if(this.accselected_list.length == 0){
						uni.showToast({
							title: '没有选择商品',
							icon: 'none',
							duration: 2000
						})
					} else {
						this.selectedPro = 1
					}
				}
			},
		},
		onReachBottom() {
			if(this.selectedPro == 0){
				this.pageid++
				this.product_list()
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~@/static/css/style.scss';
</style>
