<template>
	<view id="content">
		<view class="pup-box" v-if="!non_standard">
			<view class="header">
				<view @click="gopro()" class="icon">
					<image src="/static/ico-back.png"></image>
				</view>
				<view class="txt">配置产品</view>
			</view>
			<!-- 			<view class="configure-list">
				<block v-for="(item,configurindex) in configurArray" :key="configurindex">
					<view class="item">
						<view class="title" :class="{'on':item.visible}" @click="showconfInfo(item,configurindex)">
							{{item.name}}
						</view>
						<view class="cont" v-if="item.visible">
							<view class="dl-style">
								<view class="tit">产品信息</view>
								<view class="dl">
									<view class="dt">产品铭牌</view>
									<view class="dd">宏山</view>
								</view>
								<view class="dl">
									<view class="dt">功率</view>
									<view class="dd">3000</view>
								</view>
								<view class="tit">建议交期</view>
								<view class="dl">
									<view class="dt">产品标准交期</view>
									<view class="dd">5天</view>
								</view>
								<view class="dl">
									<view class="dt">产品浮动交期</view>
									<view class="dd">7天</view>
								</view>
								<view class="tit">价格信息</view>
								<view class="dl">
									<view class="dt">标准价格</view>
									<view class="dd">￥3,900</view>
								</view>
								<view class="dl">
									<view class="dt">合同交期</view>
									<view class="dd">
										<view class="nums-box">
											<button class="n-b" @tap="configurationSub('delivery')">-</button>
											<input type="number" class="n-t" value="0">
											<button class="n-b" @tap="configurationAdd('delivery')">+</button>
										</view>
									</view>
								</view>
								<view class="dl">
									<view class="dt">数量</view>
									<view class="dd">
										<view class="nums-box">
											<button class="n-b" @tap="configurationSub('quantity')">-</button>
											<input type="number" class="n-t" value="0">
											<button class="n-b" @tap="configurationAdd('quantity')">+</button>
										</view>
									</view>
								</view>
								<view class="dl">
									<view class="dt">订单金额</view>
									<view class="dd">￥5,999</view>
								</view>
								<view class="tit">产品选配明细</view>
								<view class="dl">
									<view class="dt">切割头</view>
									<view class="dd arrow">1P06切割头（100/190）<em class="tag">标</em></view>
								</view>
								<view class="dl">
									<view class="dt">水冷机</view>
									<view class="dd arrow">汉立HL-600Q-QG2<em class="tag orgn">7</em></view>
								</view>
								<view class="dl">
									<view class="dt">风机</view>
									<view class="dd arrow">无</view>
								</view>
								<view class="dl">
									<view class="dt">稳变器</view>
									<view class="dd arrow">无</view>
								</view>
								<view class="dl">
									<view class="dt">系统</view>
									<view class="dd arrow">ALPJHA A(GAII/GA IV/GC)<em class="tag">标</em>
									</view>
								</view>
								<view class="dl">
									<view class="dt">空压机</view>
									<view class="dd arrow">无</view>
								</view>
								<view class="dl" @click="schemeChange()">
									<view class="dt">非标方案</view>
									<view class="dd">
										<picker :value="index" :range="array1" class="txt" disabled
											@change="schemeChange()">
											<view class="txt">
												{{ schemelist}}
											</view>
										</picker>
										<input type="txt" value="" disabled v-model="schemelist"/>
									</view>
								</view>
							</view>
						</view>
					</view>
				</block>
			</view> -->
			<view class="configure-list">
				<block>
					<view class="item">
						<view class="title">
							{{detailsList.name}}
						</view>
						<view class="cont">
							<view class="dl-style">
								<view class="tit">产品信息</view>
								<view class="dl">
									<view class="dt">产品铭牌</view>
									<view class="dd">宏山</view>
								</view>
								<view class="dl">
									<view class="dt">功率</view>
									<view class="dd">{{detailsList.power}}</view>
								</view>
								<view class="tit">建议交期</view>
								<view class="dl">
									<view class="dt">产品标准交期</view>
									<view class="dd">{{systemList[0].RECOMMEND_A}}</view>
								</view>
								<view class="dl">
									<view class="dt">产品浮动交期</view>
									<view class="dd">{{systemList[0].RECOMMEND_B}}</view>
								</view>
								<view class="tit">价格信息</view>
								<view class="dl">
									<view class="dt">标准价格</view>
									<view class="dd">￥{{RKprice}}</view>
								</view>
								<view class="dl">
									<view class="dt">合同交期</view>
									<view class="dd">
										<view class="nums-box">
											<button class="n-b" @tap="configurationSub('delivery')">-</button>
											<input type="number" class="n-t" value="0" v-model="deliverynum">
											<button class="n-b" @tap="configurationAdd('delivery')">+</button>
										</view>
									</view>
								</view>
								<view class="dl">
									<view class="dt">数量</view>
									<view class="dd">
										<view class="nums-box">
											<button class="n-b" @tap="configurationSub('quantity')">-</button>
											<input type="number" class="n-t" value="0" v-model="quantitynum">
											<button class="n-b" @tap="configurationAdd('quantity')">+</button>
										</view>
									</view>
								</view>
								<view class="dl">
									<view class="dt">订单金额</view>
									<view class="dd">￥</view>
								</view>
								<view class="tit">产品选配明细</view>
								<view class="dl">
									<view class="dt">{{CuttingList[0].conf_name}}</view>
									<!-- <view class="dd arrow">1P06切割头（100/190）<em class="tag">标</em></view> -->
									<picker :value="Cuttingindex" :range="CuttingList" class="txt"
										@change="CuttingChange($event)" :range-key="leavevalue">
										<view class="dd arrow">{{CuttingList[Cuttingindex][leavevalue]}} <em class="tag"
												v-if=" CuttingList[Cuttingindex].isdefault== 0"> 标</em></view>
									</picker>
								</view>
								<view class="dl">
									<view class="dt">{{waterList[0].conf_name}}</view>
								<!-- 	<view class="dd arrow">汉立HL-600Q-QG2<em class="tag orgn">7</em></view> -->
									<picker :value="waterindex" :range="waterList" class="txt"
										@change="waterChange($event)" :range-key="leavevalue">
										<view class="dd arrow">{{waterList[waterindex][leavevalue]}} <em class="tag orgn"
												v-if=" waterList[waterindex].isdefault== 0"> 7</em></view>
									</picker>
								</view>
								<view class="dl">
									<view class="dt">{{draughtList[0].conf_name}}</view>
									<picker :value="draughtindex" :range="draughtList" class="txt"
										@change="draughtChange($event)" :range-key="leavevalue">
										<view class="dd arrow">{{draughtList[draughtindex][leavevalue]}} <em class="tag orgn"
												v-if=" draughtList[draughtindex].isdefault== 0"> 标</em></view>
									</picker>
								</view>
								<view class="dl">
									<view class="dt">{{steadyList[0].conf_name}}</view>
									<picker :value="steadyindex" :range="steadyList" class="txt"
										@change="steadyChange($event)" :range-key="leavevalue">
										<view class="dd arrow">{{steadyList[steadyindex][leavevalue]}} <em class="tag orgn"
												v-if=" steadyList[steadyindex].isdefault== 0"> 标</em></view>
									</picker>
								</view>
								<view class="dl">
									<view class="dt">{{systemList[0].conf_name}}</view>
									<picker :value="systemindex" :range="systemList" class="txt"
										@change="systemChange($event)" :range-key="leavevalue">
										<view class="dd arrow">{{systemList[systemindex][leavevalue]}} <em class="tag orgn"
												v-if=" systemList[systemindex].isdefault== 0"> 标</em></view>
									</picker>
								</view>
								<view class="dl">
									<view class="dt">{{pressureList[0].conf_name}}</view>
									<picker :value="pressureindex" :range="pressureList" class="txt"
										@change="pressureChange($event)" :range-key="leavevalue">
										<view class="dd arrow">{{pressureList[pressureindex][leavevalue]}} <em class="tag orgn"
												v-if=" pressureList[pressureindex].isdefault== 0"> 标</em></view>
									</picker>
								</view>
								<view class="dl">
									<view class="dt">{{opticalList[0].conf_name}}</view>
									<picker :value="opticalindex" :range="opticalList" class="txt"
										@change="opticalChange($event)" :range-key="leavevalue">
										<view class="dd arrow">{{opticalList[opticalindex][leavevalue]}} <em class="tag orgn"
												v-if=" opticalList[opticalindex].isdefault== 0"> 标</em></view>
									</picker>
								</view>
								<view class="dl" @click="schemeChange()">
									<view class="dt">非标方案</view>
									<view class="dd">
										<input type="txt" value="" disabled v-model="schemelist" />
									</view>
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
			<view class="configure-bottom">
				<view class="txt">
					配置产品：1
				</view>
				<view class="btns">
					<button class="btn btn-blue" @click="configurationEnsure">确定</button>
				</view>
			</view>
		</view>
	<view v-if="non_standard">
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
	</view>
	<backTop :src="backTop.src" :scrollTop="backTop.scrollTop"></backTop>
	</view>
</template>

<script>
	import {
		APPfindoption2,
		AppfindProduct,
		selectbpRKprice,
		standard
		
	} from '@/config/api';
	import backTop from '@/common/back-top/back-top.vue';
	export default {
		components: {
			backTop
		},
		data() {
			return {
				non_standard:false,
				// 非标方案选择
				schemelist:'',
				Cuttingindex: 0,
				waterindex:0,
				draughtindex:0,
				steadyindex:0,
				systemindex:0,
				pressureindex:0,
				opticalindex:0,
				leavevalue:'option_name',
				array1: ['请选择', '选择2', '选择3', '选择2', '选择3'],
				configurArray: [{ //配置产品
					visible: true,
					name: 'GH 30KW总线激光切割机'
				}, {
					visible: false,
					name: 'GT Pro 总线激光切割机'
				}, {
					visible: false,
					name: 'GF 大幅面总线激光切割机'
				}],
				detailsList: '',
				CuttingList: [], //切割头
				waterList:[],//冷水机
				draughtList:[], //风机
				steadyList:[],//喷嘴
				systemList:[], //平面激光
				pressureList:[],//比例阀
				opticalList:[],//光纤
				company_info_id: uni.getStorageSync('company_info_id') || '1239087',
				RKprice:'',
				searchVis: false,
				tabIndex: 0,
				backTop: {
					src: '../../static/back-top/top.png',
					scrollTop: 0
				},
				standardList: [],
				searchname:'',
				pageid:1,
				deliverynum:0, //合同交期
				quantitynum:0 //数量
			}
		},
		onLoad() {
			// this.company_info_id = e.company_info_id
			

			this.getlist_details()
			this.getlist()
			this.price()
			this.non_getlist()
		},
		methods: {
			non_getlist() {
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
			getlist() {
				let that = this;
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				that.$http(`${APPfindoption2}`, {
					product: this.company_info_id
				}).then(res => {

					if (res.type == "success") {

						
						var arr = []
						for (let i in res.objx) {
							let o = {};
							o = res.objx[i]; //即添加了key值也赋了value值 o[i] 相当于o.name 此时i为变量
							arr.push(o)
						}
						
						this.systemList = arr[2].map(i => {
							return {
								RECOMMEND_A:i.RECOMMEND_A,
								RECOMMEND_B:i.RECOMMEND_B,
								conf_name:i.conf_name,
								isdefault: i.isdefault,
								option_name: i.option_name,
								class_id: i.class_id,
								num: 0
							}
						})
						
						this.CuttingList = arr[3].map(i => {
							return {
								conf_name:i.conf_name,
								isdefault: i.isdefault,
								option_name: i.option_name,
								class_id: i.class_id,
								num: 0
							}
						})
						
						this.draughtList = arr[4].map(i => {
							return {
								conf_name:i.conf_name,
								isdefault: i.isdefault,
								option_name: i.option_name,
								class_id: i.class_id,
								num: 0
							}
						})
						this.pressureList = arr[5].map(i => {
							return {
								conf_name:i.conf_name,
								isdefault: i.isdefault,
								option_name: i.option_name,
								class_id: i.class_id,
								num: 0
							}
						})
						this.steadyList = arr[6].map(i => {
							return {
								conf_name:i.conf_name,
								isdefault: i.isdefault,
								option_name: i.option_name,
								class_id: i.class_id,
								num: 0
							}
						})
						this.opticalList = arr[7].map(i => {
							return {
								conf_name:i.conf_name,
								isdefault: i.isdefault,
								option_name: i.option_name,
								class_id: i.class_id,
								num: 0
							}
						})
						
						this.waterList = arr[9].map(i => {
							return {
								conf_name:i.conf_name,
								isdefault: i.isdefault,
								option_name: i.option_name,
								class_id: i.class_id,
								num: 0
							}
						})
						
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
			getlist_details() {
				let that = this;
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				that.$http(`${AppfindProduct}`, {
					id: this.company_info_id
				}).then(res => {
					let list = JSON.parse(res.objx)
					console.log(list)
					if (res.type == "success") {
						this.detailsList = list

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
			price(){
				let that = this;
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				that.$http(`${selectbpRKprice}`, {
					id: this.company_info_id
				},'get').then(res => {
					
					if (res.type == "success") {
						this.RKprice = res.objx
				
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
			// 配置产品的明细展开收缩
			showconfInfo(item, index) {
				this.getlist(item.name)

				this.configurArray.forEach(i => {
					if (i.visible !== this.configurArray[index].visible) {
						i.visible = false;
					}
				})
				item.visible = !item.visible
			},

			// 配置产品确定
			configurationEnsure() {
				this.ConfigurePro = false
				this.visiblePro = false
			},
			// 配置产品减号
			configurationSub(type) {
				if (type == 'delivery') { //合同交期
				if (this.deliverynum == 0 ) {
					uni.showToast({
						title: '不能再少了',
						icon: 'none',
						duration: 2000
					})
					return
				}
					this.deliverynum--
				}
				if (type == 'quantity') { //数量
				if (this.quantitynum == 0 ) {
					uni.showToast({
						title: '不能再少了',
						icon: 'none',
						duration: 2000
					})
					return
				}
					this.quantitynum--
				}

			},
			// 配置产品加号
			configurationAdd(type) {
				if (type == 'delivery') { //合同交期
					this.deliverynum++
				}
				if (type == 'quantity') { //数量
					this.quantitynum++
				}
			},
			CuttingChange(e) {
					this.Cuttingindex = e.target.value
			},
			waterChange(e){
				this.waterindex = e.target.value
			},
			draughtChange(e){
				this.draughtindex = e.target.value
			},
			steadyChange(e) {
				this.steadyindex = e.target.value
			},
			systemChange(e) {
				this.systemindex = e.target.value
			},
			pressureChange(e) {
				this.pressureindex = e.target.value
			},
			opticalChange(e) {
				this.opticalindex = e.target.value
			},
			// 非标方案选择
			schemeChange(e, inde) {
				this.non_standard = true
				// uni.navigateTo({
				// 	url: '../pop/standard'
				// })
				// this.schemelist = this.configurArray.map(i =>
				// 	{
				// 		return {
				// 			name: i.name,
				// 			select: ''
				// 		}
				// 	})

				// let scheme = this.array1[e.detail.value]
				// this.schemelist.select = scheme
				// this.$forceUpdate();
			},
			searchshow(){
				this.searchVis = true
				this.searchname = ''
			},
			searchpost(){
				this.searchVis = false
				this.pageid = 1
				this.standardList = []
				this.non_getlist()
			},
			pitchon(item,index) {
				this.schemelist = item.sn
				 this.tabIndex = index
				 this.non_standard =false
				 setTimeout(() => {
				 	uni.pageScrollTo({
				 		scrollTop: 99999,
				 		duration: 0
				 	});
				 }, 1000);
			},
			goproduct(){
				 this.non_standard =false
			},
			gopro(){
				uni.navigateTo({
					url:'./product'
				})
			}
		},
		onReachBottom() {
			this.pageid++
			this.non_getlist()
		
		}
	}
</script>

<style lang="scss" scoped>
	@import '~@/static/css/style.scss';
</style>
