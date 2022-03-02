<template>
	<view id="content">
		<view class="header">
			<image src="/static/ico-back.png" class="icon" @click="Toindex"></image>
			<view class="txt">新建报价申请</view>
			<view @click="submit" class="href" >提交</view>
		</view>
		<view class="tab-box">
			<block v-for="(item,index) in items" :key="index">
				<view class="item" :class="{'on':tabIndex == index}" @click="changeTab(index)">
					{{item}}
				</view>
			</block>
		</view>
		<block v-if="tabIndex == 0" class="cont-box">
			<view class="box-style">
				<view class="title">
					<text class="name">基础信息</text>
					<text class="href">历史报价</text>
				</view>
				<view class="dl-style">
					<view class="dl">
						<view class="dt">报价日期<text class="f-red">*</text></view>
						<view class="dd">
							<!-- <picker mode="date" :value="essential.stardate" disabled @change="offerDateChange">
								<view class="txt">{{essential.stardate}}</view>
							</picker> -->
							<input type="text" class="txt" disabled v-model="essential.stardate" />
						</view>
					</view>
					<view class="dl">
						<view class="dt">负责人<text class="f-red">*</text></view>
						 
						<view class="dd" @click="principalChange">
					<!-- 		<input type="text" class="txt" disabled v-model="array1[0]" /> -->
							<picker :value="index" :range="array1"   class="txt" disabled  @change="principalChange">
								<view class="txt">{{essential.principal}}</view>
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
				<view class="title">
					<text class="name">客户信息</text>
				</view>
				<view class="dl-style">
					<view class="dl">
						<view class="dt">客户公司名称<text class="f-red">*</text></view>
						<view class="dd" @click="companyChange">
							<picker :value="index" :range="array1" class="txt" disabled @change="companyChange">
								<view class="txt">{{client.companyName}}</view>
							</picker>
						</view>
					</view>
					<view class="dl">
						<view class="dt">商机号</view>
						<view class="dd" @click="firmChange">
							<picker :value="index" :range="array1" class="txt" disabled @change="firmChange">
								<view class="txt">{{essential.firm}}</view>
							</picker>
						</view>
					</view>
					<view class="dl">
						<view class="dt">客户类型<text class="f-red">*</text></view>
						<view class="dd">
							<input type="text" class="txt" disabled v-model="client.customerType" />
							<!-- <picker :value="index" :range="array1" class="txt" @change="typeChange">
								<view class="txt">{{client.companytype}}</view>
							</picker> -->
						</view>
					</view>
					<view class="dl">
						<view class="dt">客户行业</view>
						<view class="dd">
							<input type="text" class="txt" disabled  />
						</view>
					</view>
					<view class="dl">
						<view class="dt">所属区域</view>
						<view class="dd">
							<input type="text" class="txt" disabled  />
						</view>
					</view>
					<view class="dl">
						<view class="dt">国家<text class="f-red">*</text></view>
						<view class="dd">
							<input type="text" class="txt" disabled v-model="client.countryName" />
						</view>
					</view>
					<view class="dl">
						<view class="dt">省市区<text class="f-red">*</text></view>
						<view class="dd">
							<input type="text" class="txt" disabled v-model="client.cityArea" />
						</view>
					</view>
					<view class="dl">
						<view class="dt">客户详细地址<text class="f-red">*</text></view>
						<view class="dd">
							<input type="text" class="txt" disabled v-model="client.address " />
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
									<radio value="0" checked="true" />否
								</label>
								<label class="radio">
									<radio value="1" />是
								</label>
							</radio-group>
						</view>
					</view>
					<view class="dl" v-if="interestchoice">
						<view class="dt">是否贴息<text class="f-red">*</text></view>
						<view class="dd">
							<radio-group @change="interest">
								<label class="radio">
									<radio value="0" @click="interestShow = false" />否
								</label>
								<label class="radio">
									<radio value="1" checked="true" @click="interestShow = true" />是
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
							<radio-group @change="channel">
								<label class="radio">
									<radio value="0" checked="true" @click="channelMoney = false" />否
								</label>
								<label class="radio">
									<radio value="1" @click="channelMoney = true" />是
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
									<radio value="0" checked="true" />否
								</label>
								<label class="radio">
									<radio value="1" />是
								</label>
							</radio-group>
						</view>
					</view>
					<view class="dl">
						<textarea placeholder="请输入违约金备注信息" class="txt textarea" v-model="special.remark" />


					</view>
				</view>
			</view>
			<!-- <view class="box-style">
				<view class="title">
					<text class="name">赠送配件明细</text>
					<text class="href">选择配件</text>
				</view>
				<view class="dl-style">
					<view class="dl">
						<view class="dt">配件名称</view>
						<view class="dd">
							<input type="text" class="txt" disabled="" />
						</view>
					</view>
					<view class="dl">
						<view class="dt">配件编码</view>
						<view class="dd">
							<input type="text" class="txt" disabled="" />
						</view>
					</view>
					<view class="dl">
						<view class="dt">销售价格</view>
						<view class="dd">
							<input type="text" class="txt" disabled="" />
						</view>
					</view>
					<view class="dl">
						<view class="dt">数量</view>
						<view class="dd">
							<input type="text" class="txt" disabled="" />
						</view>
					</view>
					<view class="dl">
						<view class="dt">金额</view>
						<view class="dd">
							<input type="text" class="txt" disabled v-model="array1[0]" />
						</view>
					</view>
				</view>
			</view> -->
			<view class="box-style">
				<view class="dl-style">
					<!-- <view class="dl">
						<view class="dt">成交方式（海外）<text class="f-red">*</text></view>
						<view class="dd">
							<picker :value="index" :range="array1" class="txt" @change="makeChange">
								<view class="txt">{{rest.maketype}}</view>
							</picker>
						</view>
					</view> -->
					<view class="dl">
						<view class="dt">纠纷解决争议地</view>
						<view class="dd">
							<picker :value="rest.disputeindex" :range="disputelist" class="txt" @change="disputeChange">
								<view class="txt">{{disputelist[rest.disputeindex]}}</view>
							</picker>
						</view>
					</view>
					<view class="dl">
						<view class="dt">销售组织</view>
						<view class="dd">
							<input type="text" class="txt" disabled v-model="rest.organization" />
							<!-- <picker :value="index" :range="array1" class="txt" @change="organizationChange">
								<view class="txt">{{array1[index]}}</view>
							</picker> -->
						</view>
					</view>
					<!-- 	<view class="dl">
						<view class="dt">包装方式</view>
						<view class="dd">
							<picker :value="index" :range="array1" class="txt" @change="packagingChange">
								<view class="txt">{{rest.packaging}}</view>
							</picker>
						</view>
					</view> -->
					<view class="dl">
						<view class="dt">渠道代理费</view>
						<view class="dd">
							<picker :value="index" :range="channelList" class="txt" @change="channelChange">
								<view class="txt">{{channelList[index]}}</view>
							</picker>
						</view>
					</view>
					<view class="dl">
						<view class="dt">交期期限</view>
						<view class="dd">
							<input type="text" class="txt" placeholder="请输入" v-model="rest.delivery" />
						</view>
					</view>
					<view class="dl">
						<view class="dt">运费承担方</view>
						<view class="dd">
							<picker :value="rest.bearerindex" :range="bearerlist" class="txt" @change="bearerChange">
								<view class="txt">{{bearerlist[rest.bearerindex]}}</view>
							</picker>
						</view>
					</view>
					<view class="dl">
						<view class="dt">赠送配件金额</view>
						<view class="dd">
							<input type="text" class="txt" placeholder="请输入" v-model="rest.present" />
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
										<picker :value="index" :range="detailList" class="txt"
											@change="detailChange($event,inde)">
											<view class="txt">{{nperitems[inde].way? nperitems[inde].way:detailList[index]}}
											</view>
										</picker>
									</view>
								</view>
								<view class="dl">
									<view class="dt">付款类型</view>
									<view class="dd" >
										<picker :value="index" :range="detailType" class="txt"
											@change="wayChange($event,inde)">
											<view class="txt">
												{{nperitems[inde].paymentType ? nperitems[inde].paymentType : detailType[index]}}
											</view>
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
								<input type="number" class="n-t" value="0" v-model="product_special.presenter">
								<button class="n-b" @tap="specialAdd('presenter')">+</button>
							</view>
						</view>
					</view>
					<view class="dl">
						<view class="dt">移机服务费用</view>
						<view class="dd">
							<input type="text" class="txt" disabled v-model="MovingSum" />
						</view>
					</view>
					<view class="dl">
						<view class="dt">激光器延保（年）</view>
						<view class="dd">
							<view class="nums-box">
								<button class="n-b" @tap="specialSub('warranty')">-</button>
								<input type="number" class="n-t" value="0" v-model="product_special.warranty">
								<button class="n-b" @tap="specialAdd('warranty')">+</button>
							</view>
						</view>
					</view>
					<view class="dl">
						<view class="dt">激光器延保费用</view>
						<view class="dd">
							<input type="text" class="txt" disabled="" v-model="JGQSum" />
						</view>
					</view>
					<view class="dl">
						<view class="dt">机床延保（年）</view>
						<view class="dd">
							<view class="nums-box">
								<button class="n-b" @tap="specialSub('tool')">-</button>
								<input type="number" class="n-t" value="0" v-model="product_special.tool">
								<button class="n-b" @tap="specialAdd('tool')">+</button>
							</view>
						</view>
					</view>
					<view class="dl">
						<view class="dt">机床延保费用</view>
						<view class="dd">
							<input type="text" class="txt" disabled="" v-model="JCYBSum"/>
						</view>
					</view>
					<view class="dl">
						<view class="dt">赠送耗材金额</view>
						<view class="dd">
							<input type="text" class="txt" placeholder="请输入" v-model="product_special.consumable" />
						</view>
					</view>
					<view class="dl">
						<view class="dt">建议交期</view>
						<view class="dd">
							<input type="text" class="txt" placeholder="请输入" v-model="product_special.suggest" />
						</view>
					</view>
				</view>
			</view>
			<view class="box-style">
				<view class="dl-style">
					<view class="dl">
						<textarea class="txt textarea" placeholder="请输入备注信息" v-model="product_special.remark"></textarea>
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



		<!-- 上拉加载组件 -->
		<view class="load-more" v-if="loadmore">
			<uni-load-more :status="uniload" color="#ffcc99"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import {principal_list,company_list,firm_list,way_list,channel_list,detail_list,detail_list_shwo,contract} from '@/config/api';
	// 引入上拉加载组件
	import uniLoadMore from "@/common/uni-load-more/uni-load-more.vue"
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				loadmore: false, //隐藏上拉加载
				tabIndex: 0,
				index: 0,
				items: ['基本信息', '产品选配'],
				// 基本信息
				essential: {
					stardate: '请选择', //报价日期
					principal: uni.getStorageSync('principalname') || '' , //负责人
					principalId: uni.getStorageSync('principalId') || '' , //负责人id
					firm: uni.getStorageSync('firmSn') || '', //商号
					firmId: uni.getStorageSync('firmId') || '', //商机Id
					offer_remark: '' //报价备注
				},
				// 客户信息
				client: {
					companyName: uni.getStorageSync('companyname') || '', //公司名称
					companyId: uni.getStorageSync('companyId') || '', //公司名称id
					companytype: '请选择', //公司类型
					customerType: uni.getStorageSync('customerType') || '',//客户类型
					countryName:uni.getStorageSync('countryName') || '',//国家
					address:uni.getStorageSync('address') || '',//详细地址
					cityArea:uni.getStorageSync('cityArea') || '',//省
				},
				// 特殊申请
				special: {
					financingtype: '0', //是否融资
					commission: '0', //是否渠道代理费
					channelSum: '', //渠道代理费金额
					interesttype: '0', //是否贴息
					amount: '', //贴息金额
					interests: '', //贴息利息
					liquidatedtype: '0', //是否有违约金
					remark: '', //备注
				},
				channelMoney: false, //渠道代理费
				interestShow: false, //是否贴息
				interestchoice: false, //是否贴息选择显示
				// 其他
				rest: {
					maketype: '请选择', //成交方式
					disputeindex: 0, //纠纷
					organization: '请选择', //销售组织
					packaging: '请选择', //包装方式
					channelindex: '0', //渠道
					delivery: '', //交期
					bearerindex: '0', //运费承担
					present: '' //赠送金额
				},
				disputelist:['甲方所在地','乙方所在地'],//其他纠纷
				channelList:[],//渠道代理
				channelId:[],
				bearerlist:['甲方','乙方'],//运费承担方
				specialMoney: '8999999', //产品选配申请报价
				// 产品选配特殊申请
				product_special: {
					presenter: '0', //赠次
					warranty: '0', //激光延保
					tool: '0', //机床延保
					consumable: '', //耗材
					suggest: '', //建议交期
					remark: '', //备注
				},
				Moving_Money:'',//移机服务费
				JGQ_Money:'', //激光延保费用
				JCYB_Money:'',//机床延保
				Imglist: [], //上传图片
				array1: ['请选择', '选择2', '选择3', '选择2', '选择3'],
				detailList:['定金','出机款','验收款','尾款'], //付款方式
				detailType:['现金','汇票'],//付款类型
				nperitems: [{ //付款期数
					id: '1'
				}],
				deleteShowNum: '1', //期数删除号显隐
				parts: [{ //新建报价申请配件信息
					id: '1'
				}],
				
				visibleParts: false, //添加配件显隐
			
				
				selectedPro: 0,
				visiblePro: false //添加报价单明细显隐
				
			}
		},
		onLoad(e) {
			this.shiji()
			this.way_list() //付款类型
			this.salesOrganization() //销售组织
			this.Moving_list () //移机服务费
			this.JGQ_list() //激光延保
			this.JCYB_list() //机床延保
			this.channel_list() // 获取渠道代理费
			
		},
		computed: {
			MovingSum () {
				let sum = 0
				sum = this.product_special.presenter * this.Moving_Money
				return sum
			},//移机服务费
			JGQSum() {
				let sum = 0
				sum = this.product_special.warranty * this.JGQ_Money
				return sum
			}, //激光延保费用
			JCYBSum () {
				let sum = 0
				sum = this.product_special.tool * this.JCYB_Money
				return sum
			},//机床延保
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
			// 提醒
			remind(txt) {
				let txts = txt
				uni.showToast({
					title: txts,
					icon: 'none',
					duration: 2000
				})
			},
			// 基础数据保存
			changeTab(e) {
				if(e == 1) {
					// if(this.essential.principal == '') {
					// 	this.remind ('还未选择负责人')
					// 	return
					// }
					// if(this.essential.principalId == '') {
					// 	this.remind ('还未选择客户公司名称')
					// 	return
					// }
					// if(this.essential.firm == '') {
					// 	this.remind ('还未选择商机号')
					// 	return
					// }
					let that = this;
					uni.showLoading({
						title: '加载中',
						mask: true
					});
					that.$http(`${contract}`, {
						name:"contractType", 
						value:"inside",
						contract_date:this.essential.stardate, //报价日期
						salesManName:this.essential.principal, //负责人
						salesManId:this.essential.principalId, //负责人id
						storeId:this.client.companyId, //公司名称id,
						xm_no:this.essential.firm,//商机单号
						managementSnId:this.essential.firmId,  //商机id
						customer_type:this.client.customerType,//客户类型
						country:this.client.countryName,//国家
						address:this.client.address,//详细地址
						city:this.client.cityArea,//省
						is_financing:this.special.financingtype, //是否融资
						proxyDeliverRateId:this.special.commission, //是否渠道代理费
						proxyDeliverRateAmount:this.special.channelSum, //渠道代理费金额
						is_discount:this.special.interesttype, //是否贴息
						discountamounts:this.special.amount, //贴息金额
						discountrate:this.special.interests, //贴息利息
						is_Liquidated_damages:this.special.liquidatedtype, //是否有违约金
						is_temporary:this.special.remark, //备注
						issue:this.rest.disputeindex,//纠纷
							//this.rest.organization //销售组织
							//this.rest.channelindex //渠道
							//this.rest.delivery //交期
						freight_carrier:this.rest.bearerindex //运费承担
							//this.rest.present //赠送金额
						
					}).then(res => {
						let makelist  =  JSON.parse(res.content)
						console.log(makelist,'转换')
						let stat = res.type
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
				}
				
				this.tabIndex = e
			},
			

			
			// 返回
			Toindex() {
				console.log("返回")
				uni.navigateTo({
					url: "./index"
				})
			},
			// 报价日期选择
			// offerDateChange(e) {
			// 	this.essential.stardate = e.target.value
			// },
			// 负责人选择
			principalChange(e) {
				uni.navigateTo({
					url:'../pop/principal'
				})
			
				let index = e.target.value
				this.essential.principal = this.array1[index]
			},
			// 公司名称
			companyChange(e) {
				uni.navigateTo({
					url:'../pop/customer'
				})
				// let index = e.target.value
				// this.client.companyName = this.array1[index]
			},
			// 商机号
			firmChange(e) {
				uni.navigateTo({
					url:'../pop/business'
				})
			},
			
			//公司类型
			typeChange(e) {
				let index = e.target.value
				this.client.companytype = this.array1[index]
			},
			// 是否融资
			financing(e) {
				console.log(e, "是否")
				// r1 否   r2是
				let value = e.detail.value
				console.log(e.detail.value, "否是")
				if (value == '0') {
					console.log(value, "否")
					this.interestShow = false //是否贴息
					this.interestchoice = false //是否贴息选择显示
					return
				}
				if (value == '1') {
					console.log(value, "是")
					this.interestShow = true //是否贴息
					this.interestchoice = true //是否贴息选择显示
					return
				}
				this.special.financingtype = value
			},
			// 渠道代理费
			channel(e) {
				this.special.commission = e.detail.value
			},
			//是否贴息
			interest(e) {
				console.log(e, "是否")
				// r1 否   r2是
				this.special.interesttype = e.detail.value
			},
			// 违约金
			liquidated(e) {
				console.log(e, "是否")
				// r1 否   r2是
				this.special.liquidatedtype = e.detail.value
			},
			// 成交方式
			makeChange(e) {
				let that = this;
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				that.$http(`${make_list}`, {
					
				}).then(res => {
					let makelist  =  JSON.parse(res.content)
					console.log(makelist,'转换')
					let stat = res.type
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
				
				let index = e.target.value
				this.rest.maketype = this.array1[index]
			},
			//纠纷
			disputeChange(e) {
				let index = e.target.value
				this.rest.disputeindex = index
			},
			// 销售组织
			organizationChange(e) {
				let index = e.target.value
				this.rest.organization = this.array1[index]
			},
			// 包装方式
			// packagingChange(e) {
			// 	let index = e.target.value
			// 	this.rest.packaging = this.array1[index]
			// },
			// 渠道代理费
			channelChange(e) {
				let index = e.target.value
				this.rest.channelindex = index
			},
			//运费承担
			bearerChange(e) {
				let index = e.target.value
				this.rest.bearerindex = index
			},
			// 添加期数
			addNPER() {
				let add = {
					id: parseInt(this.nperitems.length) + 1,
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
			detailChange(e, inde) {
				console.log(e.detail.value, inde)
				let add = {
					way: this.detailList[e.detail.value],
				}
				this.nperitems[inde].way = add.way
				console.log("打印", this.nperitems)
				// 强制更新
				this.$forceUpdate();
			},
			// 获取付款类型
			way_list(){
				let that = this;
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				that.$http(`${way_list}`, {
					code:'PaymentStyle',
				}).then(res => {
					let waylist  =  JSON.parse(res.content)
					console.log(waylist,'转换')
					
					let stat = res.type
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
			// 销售组织
			salesOrganization() {
				let that = this;
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				that.$http(`${way_list}`, {
					code:'salesOrganization',
				}).then(res => {
					let list  =  JSON.parse(res.content)
					console.log(list,'销售')
					this.rest.organization = list.content[1].value
					
					let stat = res.type
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
			// 移机服务费
			Moving_list(){
				let that = this;
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				that.$http(`${channel_list}`, {
					code:'MoveFee',
				}).then(res => {
					let list  =  JSON.parse(res.content)
					
					
					let stat = res.type
					if (stat == "success") {
						this.Moving_Money =  list.content[0].spare1
						
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
			// 机床
			JGQ_list(){
				let that = this;
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				that.$http(`${channel_list}`, {
					code:'JCYBFee',
				}).then(res => {
					let list  =  JSON.parse(res.content)
					
					let stat = res.type
					if (stat == "success") {
						this.JGQ_Money =  list.content[0].spare1
						console.log(list,'钱')
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
			// 移机服务费
			JCYB_list(){
				let that = this;
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				that.$http(`${channel_list}`, {
					code:'JGQYBFee',
				}).then(res => {
					let list  =  JSON.parse(res.content)
					let stat = res.type
					if (stat == "success") {
						this.JCYB_Money =  list.content[0].spare1
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
			// 获取渠道代理费
			channel_list(){
				let that = this;
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				that.$http(`${channel_list}`, {
					code:'proxyDeliverRate',
				}).then(res => {
					let list  =  JSON.parse(res.content)
					
					for(let i = 0 ;i <list.length ; i++){
						this.channelId.push(list[i].id)
						this.channelList.push(list[i].value)
					}
					console.log(this.channelList,"代理费")
					// channelList
					let stat = res.type
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
			// 付款类型
			wayChange(e, inde) {
				console.log(e.detail.value, inde)
				let add = {
					paymentType: this.detailType[e.detail.value],
				}
				this.nperitems[inde].paymentType = add.paymentType
				
				this.$forceUpdate();
			},
			// 删除期数
			deleteMessage(e) {
				uni.showModal({
					title: '提示',
					content: '您确定要删除该信息吗？',
					success: (res) => {
						if (this.nperitems.length == 1) {
							this.remind('不能再少了')
							return
						}
						this.nperitems.splice(this.nperitems.length - 1, 1)
						this.deleteShowNum = this.nperitems[this.nperitems.length - 1].id
					}
				})
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
					if (this.product_special.presenter <= 0) {
						this.remind('不能再少了')
					} else {
						this.product_special.presenter--
					}
					return
				}
				if (type == 'warranty') {
					if (this.product_special.warranty <= 0) {
						this.remind('不能再少了')
					} else {
						this.product_special.warranty--
					}
					return
				}
				if (type == 'tool') {
					if (this.product_special.tool <= 0) {
						this.remind('不能再少了')
					} else {
						this.product_special.tool--
					}
					return
				}
			},


			// 特殊申请加号
			specialAdd(type) {
				if (type == 'presenter') {
					this.product_special.presenter++
					return
				}
				if (type == 'warranty') {
					this.product_special.warranty++
					return
				}
				if (type == 'tool') {
					this.product_special.tool++
					return
				}
			},
			
			
			
		
			
			
		
			// 提交
			submit() {
				console.log("提交")
				uni.navigateTo({
					url:'./index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~@/static/css/style.scss';
</style>
