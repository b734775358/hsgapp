<template>
	<view id="content">
		<view class="pup-box">
			<view class="header">
				<view @click="goindex" class="icon">
					<image src="/static/ico-back.png"></image>
				</view>
				<view class="txt">添加报价单明细</view>
			</view>
			<view class="search-medium">
				<image src="/static/ico-search1.png" class="ico" @tap="detailSearch"></image>
				<input confirm-type="search" placeholder="产品名称/产品编号" class="txt" @confirm="detailSearch"
					v-model="searchlist" />
			</view>
			<view class="quotation-box">
				<block v-for="(item,index) in quotationArray" :key="index">
					<view class="item">
						<view class="title" :class="{'on':item.quoVisible}" @click="showquoInfo(item,index)">
							{{item.name}}
						</view>
						<view class="quotation-list" v-if="item.quoVisible"
							v-for="(proitem,proindex) in productMessageList" :key="proindex">
							<view class="item">
								<image src="/static/test002.png" class="img"></image>
								<view class="name"><text class="tag">{{proitem.product_three}}</text>{{proitem.name}}
								</view>
								<view><text>功率：</text>{{proitem.power}}</view>
								<view><text>产品铭牌：</text>{{proitem.nameplate}}</view>
								<!-- <view><text>销售面价：</text>￥360,000.00</view> -->
								<view class="nums-box">
									<button class="n-b" @tap="detailSub(proitem)">-</button>
									<input type="number" class="n-t" value="0" v-model="proitem.num"
										@input="proitemnum($event,proitem)">
									<button class="n-b" @tap="detailAdd(proitem)">+</button>
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
			<view class="quotation-box" v-if="selected_show">
				<view class="item">
					<!-- <view class="title" :class="{'on':item.quoVisible}" @click="showquoInfo(item,index)">
							{{item.name}}
						</view> -->
					<view class="quotation-list" v-for="(proitem,proindex) in productMessageList" :key="proindex">
						<view class="item">
							<image src="/static/test002.png" class="img"></image>
							<view class="name"><text class="tag">{{proitem.product_three}}</text>{{proitem.name}}
							</view>
							<view><text>功率：</text>{{proitem.power}}</view>
							<view><text>产品铭牌：</text>{{proitem.nameplate}}</view>
							<!-- <view><text>销售面价：</text>￥360,000.00</view> -->
							<view class="nums-box">
								<button class="n-b" @tap="detailSub(proitem)">-</button>
								<input type="number" class="n-t" value="0" v-model="proitem.num"
									@input="proitemnum($event,proitem)">
								<button class="n-b" @tap="detailAdd(proitem)">+</button>
							</view>
						</view>
					</view>
				</view>
			</view>
			<block v-if="selectedPro == 1">
				<view class="pup-mask" @click="showpro()"></view>
				<view class="select-pro">
					<view class="tit">已选产品</view>
					<view class="parts-list">
						<view class="item" v-for="(selitem,selindex) in selected_list" :key="selindex">
							<view class="name">{{selitem.name}}</view>
							<view><text>功率：</text>{{selitem.power}}</view>
							<view><text>数量：</text>{{selitem.num}}</view>
							<button class="close-btn" @tap="deleteproduct(selitem,selindex)"></button>
						</view>

					</view>
				</view>
			</block>
			<view style="height: 200rpx;"></view>
			<view class="operation-box">
				<view class="txt" :class="{'on':selectedPro == 1}" @click="showpro()">
					已选产品：<text class="f-blue arrow">{{selected_list.length}}</text>
				</view>
				<view class="btns">
					<button class="btn" @click="detailreset">重置</button>
					<button class="btn btn-blue" @click="detailconfirm">确定</button>
				</view>
			</view>
		</view>
		<backTop :src="backTop.src" :scrollTop="backTop.scrollTop"></backTop>
	</view>
</template>

<script>
	import {
		detail_list,
		detail_list_shwo,
		detail_confirm
	} from '@/config/api';
	import backTop from '@/common/back-top/back-top.vue';
	export default {
		components: {
			backTop
		},
		data() {
			return {
				quotationArray: [], //添加报价单明细
				productMessageList: [], //添加报价单明细产品
				selectedPro: 0,
				pageid: 1,
				productCategoryindex: '',
				productCategoryId: '',
				backTop: {
					src: '../../static/back-top/top.png',
					scrollTop: 0
				},
				selected_list: [],
				searchlist: '',
				selected_show: false,
				makeType: 0


			}
		},
		onPageScroll(e) {
			this.backTop.scrollTop = e.scrollTop;
		},
		onLoad() {
			this.product_list()
		},
		methods: {
			goindex() {
				uni.navigateTo({
					url: './index'
				})
			},
			product_list() {
				let that = this;
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				that.$http(`${detail_list}`, {

				}).then(res => {
					// let productlist  =  JSON.parse(res.content)
					let productlist = res
					let stat = res.type
					this.quotationArray = res.map(i => {
						return {
							quoVisible: false,
							name: i.name,
							id: i.id,
							num: 0
						}
					})

					if (stat == "success") {

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
			// 添加报价明细明细分类展开收缩
			showquoInfo(item, index) {
				if (item.id) {
					this.productMessageList = []
					this.pageid = 1
					this.productCategoryId = item.id
					this.productCategoryindex = index
				}
				this.showquoInfolist()
				this.quotationArray.forEach(i => {
					if (i.quoVisible !== this.quotationArray[index].quoVisible) {
						i.quoVisible = false;
					}
				})

				item.quoVisible = !item.quoVisible
				if (item.quoVisible == true) {
					this.quotationArray.splice(index + 1, this.quotationArray.length - index)
				} else {
					this.product_list()
				}
			},
			showquoInfolist(item, index) {

				let that = this;


				uni.showLoading({
					title: '加载中',
					mask: true
				});
				that.$http(`${detail_list_shwo}`, {
					type: that.makeType,
					productCategoryId: that.productCategoryId,
					isMarketable: '1',
					pageNumber: that.pageid,
					pageSize: '6',
					name: that.searchlist
				}).then(res => {
					let productlist = JSON.parse(res.content)
					console.log(productlist, "搜搜")
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
									company_info_id: i.id
								}
							})

							this.productMessageList = [...this.productMessageList, ...productlist]

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
			// 已选产品展开收缩
			showpro() {
				if (this.selectedPro == 1) {
					this.selectedPro = 0

				} else {
					if (this.selected_list.length == 0) {
						uni.showToast({
							title: '没有选择商品',
							icon: 'none',
							duration: 2000
						})
					} else {
						this.selectedPro = 1
					}


					// setTimeout(() => {
					// 	uni.pageScrollTo({
					// 		scrollTop: 99999,
					// 		duration: 0
					// 	});
					// }, 50);
				}
			},

			// 添加报价单明细搜索
			detailSearch() {
				if (this.searchlist == '') {
					this.pageid = 1
					this.productMessageList = []
					this.selected_show = false
					this.product_list()
					return
				}
				this.pageid = 1
				this.quotationArray = []
				this.productMessageList = []
				this.selected_show = true
				let that = this;


				uni.showLoading({
					title: '加载中',
					mask: true
				});
				that.$http(`${detail_list_shwo}`, {
					type: that.makeType,
					productCategoryId: '',
					isMarketable: '1',
					pageNumber: that.pageid,
					pageSize: '6',
					name: that.searchlist
				}).then(res => {
					let productlist = JSON.parse(res.content)

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
									company_info_id: i.id
								}
							})

							this.productMessageList = [...this.productMessageList, ...productlist]
							console.log(this.productMessageList, "搜搜")
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
			// 添加报价单明细减号
			detailSub(item) {

				if (item.num < 1) {

					uni.showToast({
						title: '不能再少了',
						icon: 'none',
						duration: 2000
					})
					for (let i = 0; i < this.selected_list.length; i++) {
						if (this.selected_list[i].company_info_id == item.company_info_id) {
							this.selected_list.splice(i, 1)
							return
						}

					}
				} else {
					item.num--
					if (item.num == 0) {
						this.detailSub(item)
					}
					for (let i = 0; i < this.selected_list.length; i++) {
						if (this.selected_list[i].company_info_id == item.company_info_id) {
							this.selected_list[i].num--
							return
						}
					}
				}
				this.$forceUpdate();
			},
			// 添加报价单明细加号
			detailAdd(item) {
				item.num++
				for (let i = 0; i < this.selected_list.length; i++) {
					if (this.selected_list[i].company_info_id == item.company_info_id) {
						this.selected_list[i].num++
						return
					}

				}
				this.selected_list = [] //单选
				let add = {
					name: item.name,
					power: item.power,
					company_info_id: item.company_info_id,
					num: item.num
				}
				this.selected_list.push(add)

				this.$forceUpdate();
			},
			proitemnum(event, item) {
				let value = event.target.value;
				if (value < 1) {
					uni.showToast({
						title: '不能再少了',
						icon: 'none',
						duration: 2000
					})
					for (let i = 0; i < this.selected_list.length; i++) {
						if (this.selected_list[i].company_info_id == item.company_info_id) {
							this.selected_list.splice(i, 1)
							// console.log(i,'寄来',this.selected_list)
							this.$forceUpdate();
							return
						}

					}
				}

				for (let i = 0; i < this.selected_list.length; i++) {
					if (this.selected_list[i].company_info_id == item.company_info_id) {
						this.selected_list[i].num = value
						return
					}

				}
				this.selected_list = [] //单选
				let add = {
					name: item.name,
					power: item.power,
					company_info_id: item.company_info_id,
					num: item.num
				}
				this.selected_list.push(add)

				this.$forceUpdate();
			},
			// 添加报价单明细已选删除
			deleteproduct(item, index) {
				this.selected_list.splice(index, 1)
				for (let i = 0; i < this.productMessageList.length; i++) {
					if (this.productMessageList[i].company_info_id == item.company_info_id) {
						this.productMessageList[i].num = 0
					}

				}

				if (this.selected_list.length == 0) {
					this.selectedPro = 0
				}
			},
			// 添加报价单明细重置
			detailreset() {
				this.selected_list = []
				this.selectedPro = 0
				for (let i = 0; i < this.productMessageList.length; i++) {
					this.productMessageList[i].num = 0
				}

			},
			// 添加报价单明细确定
			detailconfirm() {
				if (this.selected_list.length == 0) {
					uni.showToast({
						title: '没有选择商品',
						icon: 'none',
						duration: 2000
					})
					return
				}
				
				let that = this;
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				that.$http(`${detail_confirm}`, {
					product:this.selected_list[0].company_info_id
				}).then(res => {
						console.log(res.objx)
					if (res.type == "success") {

						setTimeout(function() {
							uni.hideLoading();
						}, 1000);
						if(res.objx == 0) {
							uni.showToast({
								title: "没有配置项",
								icon: 'none',
								duration: 2000
							})
						} else {
							uni.setStorage({
								key: 'company_info_id',
								data: this.selected_list[0].company_info_id
							});
							uni.navigateTo({
								url: './product_detail'
								
							})
						}
						
						

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
				
			}



		},
		// 上拉加载
		onReachBottom() {
			if (this.selectedPro == 0) {
				this.pageid++
				this.showquoInfolist(this.productCategoryId, this.productCategoryindex)
			}
		}

	}
</script>

<style lang="scss" scoped>
	@import '~@/static/css/style.scss';

	.load-more {
		margin-bottom: 100rpx;
	}
</style>
