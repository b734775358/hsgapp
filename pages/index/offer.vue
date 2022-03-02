<template>
	<view id="content">
		<view class="header">
			<image src="/static/ico-back.png" class="icon" @tap="getBack"></image>
			<view class="txt">新建报价申请</view>
			<view class="href" style="color:#444444" @click="submit" >
				提交
			</view>
		</view>
		<view class="tab-box">
			<block  v-for="(item,index) in items" :key="index" >
				<view class="item" :class="{'on':tabIndex == index}" @click="changeTab(index)">
					{{item}}
				</view>
			</block>
		</view>
		<block  v-if="tabIndex == 0">
			<view class="box-style">
				<view class="crumb-box">
					<view class="item">历史报价</view>
					<view class="item" @click="gogross">整单毛利分析</view>
					<view class="item" @click="godiscount">折扣</view>
				</view>
				<view class="title">基础信息</view>
				<view class="dl-style">
					<view class="dl">
						<view class="dt">报价日期<text class="f-red">*</text></view>
						<view class="dd">
							<!-- <picker :value="index" mode="date" :range="stardate" class="txt" disabled @change="offerDateChange">
								<view class="txt">{{essential.stardate}}</view>
							</picker> -->
							<input type="text" class="txt" disabled v-model="essential.stardate" />
						</view>
					</view>
					<view class="dl">
						<view class="dt">负责人<text class="f-red">*</text></view>
						<view class="dd">
							<!-- <picker :value="index" :range="stardate" class="txt">
								<view class="txt">{{stardate[index]}}</view>
							</picker> -->
							<input type="text" class="txt" disabled v-model="essential.principal" />
						</view>
					</view>
					<view class="dl">
						<view class="dt">商机号</view>
						<view class="dd">
							<picker :value="index" :range="stardate" class="txt" @change="firmChange">
								<view class="txt">{{essential.firm}}</view>
							</picker>
						</view>
					</view>
					<view class="dl">
						<view class="dt">报价备注</view>
						<view class="dd">
							<input type="text" class="txt" placeholder="请输入" v-model="essential.offer_remark" />
						</view>
					</view>	
				</view>
			</view>
			<view class="box-style">
				<view class="title">客户信息</view>
				<view class="dl-style">
					<view class="dl">
						<view class="dt">客户公司名称<text class="f-red">*</text></view>
						<view class="dd">
							<picker :value="index" :range="stardate" class="txt" @change="companyChange">
								<view class="txt">{{client.companyName}}</view>
							</picker>
						</view>
					</view>
					<view class="dl">
						<view class="dt">客户类型<text class="f-red">*</text></view>
						<view class="dd">
							<input type="text" class="txt" disabled v-model="array1[0]" />
						<!-- 	<picker :value="index" :range="stardate" class="txt">
								<view class="txt">{{stardate[index]}}</view>
							</picker> -->
						</view>
					</view>
					<view class="dl">
						<view class="dt">国家<text class="f-red">*</text></view>
						<view class="dd">
							<input type="text" class="txt" disabled v-model="array1[0]" />
							<!-- <picker :value="index" :range="stardate" class="txt">
								<view class="txt">{{stardate[index]}}</view>
							</picker> -->
						</view>
					</view>
					<view class="dl">
						<view class="dt">客户详细地址<text class="f-red">*</text></view>
						<view class="dd">
							<!-- <input type="text" class="txt" placeholder="请输入" /> -->
							<input type="text" class="txt" disabled v-model="array1[0]" />
						</view>
					</view>
				</view>
			</view>
			<view class="box-style">
				<view class="title">
					<text class="name">特殊申请</text>
				</view>
				<view class="dl-style">
					<view class="dl">
						<view class="dt">是否融资<text class="f-red">*</text></view>
						<view class="dd">
							<radio-group @change="financing">
								<label class="radio">
									<radio value="r1" checked="true" />否
								</label>
								<label class="radio">
									<radio value="r2" />是
								</label>
							</radio-group>
						</view>
					</view>
					<view class="dl" v-if="interestchoice">
						<view class="dt">是否贴息<text class="f-red">*</text></view>
						<view class="dd">
							<radio-group @change="interest" >
								<label class="radio">
									<radio value="r1"  @click="interestShow = false"/>否
								</label>
								<label class="radio" >
									<radio value="r2" checked="true" @click="interestShow = true"/>是
								</label>
							</radio-group>
						</view>
					</view>
					<view class="dl" v-if="interestShow">
						<view class="dt">贴息金额<text class="f-red">*</text></view>
						<view class="dd">
							<input type="text" class="txt" placeholder="请输入" v-model="special.amount" />
						</view>
					</view>
					<view class="dl" v-if="interestShow">
						<view class="dt">贴息利息<text class="f-red">*</text></view>
						<view class="dd">
							<input type="text" class="txt" placeholder="请输入" v-model="special.interests" />
						</view>
					</view>
					<view class="dl">
						<view class="dt">渠道代理费<text class="f-red">*</text></view>
						<view class="dd">
							<radio-group @change="channel" >
								<label class="radio">
									<radio value="r1" checked="true" @click="channelMoney = false" />否
								</label>
								<label class="radio" >
									<radio value="r2" @click="channelMoney = true"/>是
								</label>
							</radio-group>
						</view>
					</view>
					<view class="dl" v-if="channelMoney">
						<view class="dt">渠道代理费金额<text class="f-red">*</text></view>
						<view class="dd">
							<input type="text" class="txt" placeholder="请输入" v-model="special.channelSum" />
						</view>
					</view>
					
					<view class="dl">
						<view class="dt">是否有违约金<text class="f-red">*</text></view>
						<view class="dd">
							<radio-group @change="liquidated">
								<label class="radio">
									<radio value="r1" checked="true" />否
								</label>
								<label class="radio">
									<radio value="r2" />是
								</label>
							</radio-group>
						</view>
					</view>
					<view class="dl">
						<textarea placeholder="请输入违约金备注信息" class="txt textarea" v-model="special.remark" />
					</view>
				</view>
			</view>
			<view class="box-style">
				<view class="dl-style">
					<view class="dl">
						<view class="dt">成交方式（海外）<text class="f-red">*</text></view>
						<view class="dd">
							<picker :value="index" :range="array1" class="txt" @change="makeChange">
								<view class="txt">{{rest.maketype}}</view>
							</picker>
						</view>
					</view>
					<view class="dl">
						<view class="dt">海运费咨询申请</view>
						<view class="dd">
							<picker :value="index" :range="array1" class="txt" @change="consultChange">
								<view class="txt">{{rest.consult}}</view>
							</picker>
						</view>
					</view>
					<view class="dl">
						<view class="dt">包装方式</view>
						<view class="dd">
							<picker :value="index" :range="array1" class="txt" @change="packagingChange">
								<view class="txt">{{rest.packaging}}</view>
							</picker>
						</view>
					</view>
					
					<view class="dl">
						<view class="dt">客户授权申请</view>
						<view class="dd">
							<picker :value="index" :range="array1" class="txt" @change="authorizationChange">
								<view class="txt">{{rest.authorization}}</view>
							</picker>
						</view>
					</view>
					<view class="dl">
						<view class="dt">付款方式申请</view>
						<view class="dd">
							<picker :value="index" :range="array1" class="txt" @change="applyChange">
								<view class="txt">{{rest.way}}</view>
							</picker>
						</view>
					</view>
					<view class="dl">
						<view class="dt">渠道代理费</view>
						<view class="dd">
							<input type="text" class="txt" placeholder="请输入" v-model="rest.agency" />
						</view>
					</view>
					<view class="dl">
						<view class="dt">预估运费</view>
						<view class="dd">
							<input type="text" class="txt" placeholder="请输入"  v-model="rest.freight"/>
						</view>
					</view>
					<view class="dl">
						<view class="dt">赠送配件金额</view>
						<view class="dd">
							<!-- <picker :value="index" :range="array1" class="txt">
								<view class="txt">{{array1[index]}}</view>
							</picker> -->
							<input type="text" class="txt" placeholder="请输入" v-model="rest.present" />
						</view>
					</view>
					<view class="dl">
						<view class="dt">币种</view>
						<view class="dd">
							<input type="text" class="txt" disabled="" />
						</view>
					</view>
					<view class="dl">
						<view class="dt">汇率</view>
						<view class="dd">
							<input type="text" class="txt" disabled="" />
						</view>
					</view>
				</view>
			</view>
			<view class="box-style">
				<view class="title">
					<text class="name">付款方式</text>
					<text class="href" @click="addNPER()">添加</text>
				</view>
				<view class="addInfo-box">
					<block v-for="(item,inde) in nperitems" :keys="inde">
						<view class="item">
							<view class="dl-style">
								<view class="dl">
									<view class="dt">序号</view>
									<view class="dd">
										<text>{{item.id}}</text>
									</view>
								</view>
								<view class="dl">
									<view class="dt">付款方式</view>
									<view class="dd">
										<!-- <picker :value="index" :range="array1" class="txt" @change="detailChange($event,inde)" >
											<view class="txt">{{array1[index]}}</view>
										</picker> -->
										<picker :value="index" :range="array1" class="txt" @change="detailChange($event,inde)" >
											<view class="txt">{{nperitems[inde].way? nperitems[inde].way:array1[index]}}</view>
										</picker>
									</view>
								</view>
								<view class="dl">
									<view class="dt">付款类型</view>
									<view class="dd">
										<picker :value="index" :range="array1" class="txt" @change="wayChange($event,inde)">
											<view class="txt">{{nperitems[inde].paymentType ? nperitems[inde].paymentType : array1[index]}}</view>
										</picker>
									</view>
								</view>
								<view class="dl">
									<view class="dt">付款占比</view>
									<view class="dd">
										<input type="text" class="txt" disabled placeholder="请输入" />
									</view>
								</view>
								<view class="dl">
									<view class="dt">付款金额</view>
									<view class="dd">
										<input type="text" class="txt" placeholder="请输入" />
									</view>
								</view>
							</view>
							<view class="del" @click="deleteMessage()" v-if="deleteShowNum == item.id">
								<image src="/static/ico-del.png" class="ico"></image>删除信息
							</view>
						</view>
					</block>
				</view>
			</view>
		</block>
		<block v-if="tabIndex == 1" class="cont-box">
			<view class="box-style">
				<view class="title">
					<text class="name">产品信息</text>
					<text class="href" @click="productAdd">添加</text>
				</view>
				<view class="pro-wrap">
					<view class="info-box">
						<image src="/static/test002.png" class="img"></image>
						<view class="name">TM65 X900 3KW专业切管激光切割机整机</view>
						<!-- <view>申请报价：<text class="f-blue">￥86000</text></view> -->
						<view>申请报价：<text class="f-blue">￥</text> <input type="text" class="f-blue txt"
								v-model="specialMoney" /></view>
						<view>原价：￥90000</view>
						<view>数量：1</view>
					</view>
					<view class="price-box">
						<view class="item"><text>销售指导价：</text>￥1999</view>
						<view class="item"><text>标机成本：</text>￥1999</view>
						<view class="item"><text>选配浮动成本：</text>￥1999</view>
						<view class="item"><text>总成本：</text>￥1999</view>
					</view>
					<!-- <view class="btns-box">
						<button class="btn">编辑</button>
					</view> -->
				</view>
			</view>
		
			<view class="box-style">
				<view class="title">
					<text class="name">配件信息</text>
					<text class="href" @click="partsAdd">添加</text>
				</view>
				<view class="addInfo-box">
					<block v-for="(item,index) in parts" :keys="index">
						<view class="item">
							<view class="dl-style">
								<view class="dl">
									<view class="dt">产品名称</view>
									<view class="dd arrow">
										<input type="text" class="txt" disabled="" value="TMAIN 下料机" />
									</view>
								</view>
								<view class="dl">
									<view class="dt">单位</view>
									<view class="dd">
										<input type="text" class="txt" placeholder="PCS" />
									</view>
								</view>
								<view class="dl">
									<view class="dt">数量</view>
									<view class="dd">
										<input type="text" class="txt" value="1" />
									</view>
								</view>
								<view class="dl">
									<view class="dt">销售面额</view>
									<view class="dd">
										<input type="text" class="txt" value="199" />
									</view>
								</view>
								<view class="dl">
									<view class="dt">报价金额</view>
									<view class="dd">
										<input type="text" class="txt" value="108" />
									</view>
								</view>
							</view>
							<view class="del" @tap="configurationDelete">
								<image src="/static/ico-del.png" class="ico"></image>删除信息
							</view>
						</view>
					</block>
				</view>
			</view>
		
			<view class="box-style">
				<view class="title">
					<text class="name">特殊申请</text>
				</view>
				<view class="dl-style">
					<view class="dl">
						<view class="dt">赠送移机次数</view>
						<view class="dd">
							<view class="nums-box">
								<button class="n-b" @tap="specialSub('presenter')">-</button>
								<input type="number" class="n-t" value="0" v-model="special.presenter">
								<button class="n-b" @tap="specialAdd('presenter')">+</button>
							</view>
						</view>
					</view>
					<view class="dl">
						<view class="dt">移机服务费用</view>
						<view class="dd">
							<input type="text" class="txt" disabled="" />
						</view>
					</view>
					<view class="dl">
						<view class="dt">激光器延保（年）</view>
						<view class="dd">
							<view class="nums-box">
								<button class="n-b" @tap="specialSub('warranty')">-</button>
								<input type="number" class="n-t" value="0" v-model="special.warranty">
								<button class="n-b" @tap="specialAdd('warranty')">+</button>
							</view>
						</view>
					</view>
					<view class="dl">
						<view class="dt">激光器延保费用</view>
						<view class="dd">
							<input type="text" class="txt" disabled="" />
						</view>
					</view>
					<view class="dl">
						<view class="dt">机床延保（年）</view>
						<view class="dd">
							<view class="nums-box">
								<button class="n-b" @tap="specialSub('tool')">-</button>
								<input type="number" class="n-t" value="0" v-model="special.tool">
								<button class="n-b" @tap="specialAdd('tool')">+</button>
							</view>
						</view>
					</view>
					<view class="dl">
						<view class="dt">机床延保费用</view>
						<view class="dd">
							<input type="text" class="txt" disabled="" />
						</view>
					</view>
					<view class="dl">
						<view class="dt">赠送耗材金额</view>
						<view class="dd">
							<input type="text" class="txt" placeholder="请输入" v-model="special.consumable" />
						</view>
					</view>
					<view class="dl">
						<view class="dt">建议交期</view>
						<view class="dd">
							<input type="text" class="txt" placeholder="请输入" v-model="special.suggest" />
						</view>
					</view>
				</view>
			</view>
			<view class="box-style">
				<view class="dl-style">
					<view class="dl">
						<textarea class="txt textarea" placeholder="请输入备注信息" v-model="special.remark"></textarea>
					</view>
					<view class="upload-box">
						<view class="tit">特殊情况提前申请截图</view>
						<view class="a-upload">
							<image src="/static/ico-upload.png" @click="upload"></image>
						</view>
						<view class="upload-list" v-for="(img,Imgindex) in Imglist" :key="Imgindex">
							<view class="item">
								<image :src="img" @click="preImage(Imgindex)"></image>
								<view @tap="deleteimg(Imgindex)" class="close"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</block>
		
	
	</view>
</template>

<script>
	import {login_touken,postlist} from '@/config/api';
	export default {
		data() {
			return {
				tabIndex: 0,
				items:['基本信息','产品选配'],
				index:0,
				array1: ['请选择','选择1','选择2','选择3'],
				stardate:  ['请选择','选择1','选择2','选择3'],
				// 期数控制
				nperitems:[{
					id:'1'
				}],
				deleteShowNum:'1', //期数删除号显隐
				analysisVisible:false,
				discountVisible:false,
				// 基本信息
				essential: {
					stardate: '请选择', //报价日期
					principal: '请选择', //负责人
					firm: '请选择', //商号
					offer_remark: '' //报价备注
				},
				// 客户信息
				client: {
					companyName: '请选择', //公司名称
					companytype: '请选择', //公司类型
				},
				// 特殊申请
				special: {
					financingtype: '', //是否融资
					commission:'',//是否渠道代理费
					channelSum:'',//渠道代理费金额
					interesttype: '', //是否贴息
					amount:'',//贴息金额
					interests:'',//贴息利息
					liquidatedtype: '', //是否有违约金
					remark: '', //备注
				},
				channelMoney:false,//渠道代理费
				interestShow:false,//是否贴息
				interestchoice:false, //是否贴息选择显示
				// 其他
				rest: {
					maketype: '请选择', //成交方式
					consult: '请选择', //咨询申请
					packaging: '请选择', //包装方式
					authorization: '请选择', //授权申请
					way: '请选择', //方式
					agency: '', //渠道代理费
					freight: '' ,//运费承担
					present: '' ,//赠送金额
				},
				Imglist: [], //上传图片
				visiblePro: false, //添加报价单明细显隐
				visibleParts: false, //添加配件显隐
			
				specialMoney: '8999999', //产品选配申请报价
				
				parts: [{ //新建报价申请配件信息
					id: '1'
				}],
				// 产品选配特殊申请
				special: {
					presenter: '0', //赠次
					warranty: '0', //激光延保
					tool: '0', //机床延保
					consumable: '', //耗材
					suggest: '', //建议交期
					remark: '', //备注
				},
				// 非标方案选择
				schemelist: [{}],
				partsTab: ['添加配件', '添加上下料'],
				partstabIndex: 0,
				selectedPro: 0,
				quotationArray: [{ //添加报价单明细
					quoVisible: false,
					name: '板材激光切割板'
				}, {
					quoVisible: false,
					name: '激光焊接机'
				}, {
					quoVisible: false,
					name: '折弯机'
				}],
				ConfigurePro: false, //配置产品
				configurArray: [{ //配置产品
					visible: true,
					name: 'GH 30KW总线激光切割机'
				}, {
					visible: false,
					name: 'GT Pro 总线激光切割机'
				}, {
					visible: false,
					name: 'GF 大幅面总线激光切割机'
				}]
			}
		},
		onLoad() {
			this.shiji()
		},
		computed: {
		},
		methods: {
			// 获取时间
			shiji() {
				let date = new Date(); //创建时间对象  
			
				let year = date.getFullYear(); //获取年   
			
				let month = date.getMonth() + 1; //获取月
			
				let day = date.getDate(); //获取当日  
			
				this.essential.stardate = year + "-" + month + "-" + day; //组合时间  
			},
			getBack(){
				window.location.href = 'https://app.mockplus.cn/';
			},
			// 提醒
			remind(txt) {
				let txts = txt
				uni.showToast({
					title: txts,
					icon: 'none',
					duration: 2000
				})
			},
			changeTab(e){
				this.tabIndex = e
			},
			changeTab1(e) {
				this.partstabIndex = e
			},
			gogross(){
				uni.navigateTo({
					url:'./gross'
				})
			},
			godiscount(){
				uni.navigateTo({
					url:'./discount'
				})
			},
			// 已选产品展开收缩
			showpro() {
				if (this.selectedPro == 1) {
					this.selectedPro = 0
				} else {
					this.selectedPro = 1
				}
			},
			// 报价日期选择
			// offerDateChange(e) {
			// 	this.essential.stardate = e.target.value
			// },
			// 商机号
			firmChange(e) {
				let index = e.target.value
				this.essential.firm = this.array1[index]
			},
			// 公司名称
			companyChange(e) {
				let index = e.target.value
				this.client.companyName = this.array1[index]
			},
			// 是否融资
			financing(e) {
				console.log(e, "是否")
				// r1 否   r2是
				let value = e.detail.value
				console.log(e.detail.value, "否是")
				if( value == 'r1') {
					console.log(value, "否")
					this.interestShow = false//是否贴息
					this.interestchoice = false //是否贴息选择显示
					return
				}
				if(value == 'r2') {
					console.log(value, "是")
					this.interestShow = true//是否贴息
					this.interestchoice = true //是否贴息选择显示
					return
				}
				this.special.financingtype = value
			},
			// 渠道代理费
			channel(e){
				let value = e.detail.value
				this.special.commission = event.detail
			},
			//是否贴息
			interest(e) {
				console.log(e, "是否")
				// r1 否   r2是
				let value = e.detail.value
				this.special.interesttype = event.detail
			},
			// 违约金
			liquidated(e) {
				console.log(e, "是否")
				// r1 否   r2是
				let value = e.detail.value
				this.special.liquidatedtype = event.detail
			},
			// 成交方式
			makeChange(e) {
				let index = e.target.value
				this.rest.maketype = this.array1[index]
			},
			// 海运费咨询申请
			consultChange(e){
				let index = e.target.value
				this.rest.consult = this.array1[index]
			},
			// 包装方式
			packagingChange(e){
				let index = e.target.value
				this.rest.packaging = this.array1[index]
			},
			// 客户授权
			authorizationChange(e){
				let index = e.target.value
				this.rest.authorization = this.array1[index]
			},
			applyChange(e){
				let index = e.target.value
				this.rest.way = this.array1[index]
			},
			// 添加期数
			addNPER(){
				let add ={
					id : parseInt(this.nperitems.length) + 1
				}
				this.nperitems.push(add)
				this.deleteShowNum = add.id
				setTimeout(() => {
					uni.pageScrollTo({
						scrollTop: 99999,
						duration: 0
					});
				}, 50);
			},
			// 付款方式
			detailChange(e,inde){
				console.log(e.detail.value,inde)
				let add = {
					way: this.array1[e.detail.value],
				}
				this.nperitems[inde].way = add.way
				console.log("打印",this.nperitems)
				// 强制更新
				this.$forceUpdate();
			},
			// 付款类型
			wayChange(e,inde){
				console.log(e.detail.value,inde)
				let add = {
					paymentType: this.array1[e.detail.value],
				}
				this.nperitems[inde].paymentType = add.paymentType
				console.log("打印",this.nperitems)
				this.$forceUpdate();
			},
			// 删除期数
			deleteMessage(e) {
				uni.showModal({
					title: '提示',
					content: '您确定要删除该信息吗？',
					success: (res) => {
						if(this.nperitems.length == 1) {
							this.remind('不能再少了')
							return
						}
						this.nperitems.splice(this.nperitems.length-1,1)
						this.deleteShowNum = this.nperitems[this.nperitems.length-1].id
					}
				})
			},
			// 上传图片
			upload() {
				let that = this
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						let imgList = []
						imgList.push(...res.tempFilePaths)
						var e = res;
						var files = e.tempFiles;
						let that = this;
						for (let i = 0; i < imgList.length; i++) {
							that.$http('/common/fileurl.jhtml', {
			
							}, 'get').then(res => {
								console.log("-----上传第一次获取URL", res.objx);
								let _this = this;
								var url = this.urlHandlers(res.objx);
								console.log(url)
			
								const tempFilePaths = e.tempFilePaths;
								const uploadTask = uni.uploadFile({
									url: url, //仅为示例，非真实的接口地址
									filePath: tempFilePaths[i],
									name: 'file',
									success: (uploadFileRes) => {
										console.log(uploadFileRes.data);
										let paper_url = JSON.parse(uploadFileRes.data)
										if (paper_url.message.content == '上传文件格式或大小不正确') {
											let tip = '上传文件格式或大小不正确'
											this.proMpts(tip)
										} else {
											console.log('图片url', paper_url.file_info.url)
											that.Imglist.push(paper_url.file_info.url)
										}
									}
								});
							})
						}
					}
				});
			},
			urlHandlers(url) {
				var arr = url.split("companyCode=xxll");
				if (arr.length == 2) {
					url = arr[0] + "companyCode=xxll" + arr[1];
				}
				return url;
			},
			// 删除图片
			deleteimg(ind) {
				this.Imglist.splice(ind, 1)
			},
			// 预览图片
			preImage(index) {
				uni.previewImage({
						current: index,
						urls: this.Imglist,
						longPressActions: {
							itemList: ['发送给朋友', '保存图片', '收藏'],
						}
					})
					.then((res) => {
						resolve(res)
					})
					.catch((err) => {
						// reject(err)
					})
			},
			// 配置信息删除
			configurationDelete() {
				uni.showModal({
					title: '提示',
					content: '您确定要删除改信息吗？',
					success: (res) => {
						// 		if (res.confirm) {
						// 			this.$http('/customeronline/order2/order_confirm.jhtml', {
						// 				sn: this.listDatas.orderSn
						// 			}).then(res => {
						// 				console.log("确认按钮", res)
						// 				if (res.type) {
						// 					if (res.type == "success") {
			
						// 						this.$store.commit('pdf_url', res.objx.url)
						// 						uni.redirectTo({
						// 							url: '/pages/onlineReconciliation/sign'
						// 						});
			
						// 					} else {
						// 						uni.showToast({
						// 							title: res.content,
						// 							icon: 'none',
						// 							duration: 2000
						// 						})
						// 					}
						// 				}
						// 			}).catch(res => {
						// 				console.log(res)
						// 			})
						// 		}
					}
				})
			},
			
			// 特殊申请减号
			specialSub(type) {
				if (type == 'presenter') {
					if (this.special.presenter <= 0) {
						this.remind('不能再少了')
					} else {
						this.special.presenter--
					}
					return
				}
				if (type == 'warranty') {
					if (this.special.warranty <= 0) {
						this.remind('不能再少了')
					} else {
						this.special.warranty--
					}
					return
				}
				if (type == 'tool') {
					if (this.special.tool <= 0) {
						this.remind('不能再少了')
					} else {
						this.special.tool--
					}
					return
				}
			},
			
			
			// 特殊申请加号
			specialAdd(type) {
				if (type == 'presenter') {
					this.special.presenter++
					return
				}
				if (type == 'warranty') {
					this.special.warranty++
					return
				}
				if (type == 'tool') {
					this.special.tool++
					return
				}
			},
			//产品添加
			productAdd(){
				this.visiblePro = true
				uni.navigateTo({
					url:'./product'
				})
				
			},
			//配件添加
			partsAdd(){
				uni.navigateTo({
					url:'./accessories'
				})
			},
			
			// 提交
			submit() {
				console.log("提交")
				uni.navigateTo({
					url:'./index'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '~@/static/css/style.scss';
</style>
