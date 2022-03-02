// 获取touken
const login_touken = '/app/login.jhtml'
// 获取报价申请列表
const postlist = '/b2b/contract/list_data.jhtml'
//负责人选择
const principal_list = '/member/store_member/select_saleman_data.jhtml'
// 客户公司名称列表
const company_list = '/member/store/sale_group_store_data.jhtml'
// 商机号列表
const firm_list = '/manage/management/select_management_data.jhtml'
// 付款类型  
const way_list = '/basic/system_dict/select_system_dict_data.jhtml'
//渠道代理费 //费用算
const channel_list = '/basic/system_dict/select_system_dict_data.jhtml'
// 添加产品列表
const detail_list = '/product/product/getNodes.jhtml'
// 添加产品列表展开详情
const detail_list_shwo = '/product/product/list_data.jhtml'
// 添加产品确定按钮
const detail_confirm= '/b2b/contract/findoption.jhtml'
// 添加产品选配
const APPfindoption2= '/b2b/contract/APPfindoption2.jhtml'
// 添加产品选配
const APPfindCconf2= '/b2b/contract/APPfindCconf2.jhtml'
// 添加产品选配
const AppfindProduct= '/product/product/AppfindProduct.jhtml'
// 添加产品金额
const selectbpRKprice= '/product/productSalesPrice2/selectbpRKprice.jhtml'
//基础数据保存
const contract= '/b2b/contract/save.jhtml'


// 非标方案
const standard = '/b2b/temporaryPlan/list_data.jhtml'
// 添加配件
const accessorieslist = '/product/product/list_data_price.jhtml'






export {
	login_touken,
	postlist,
	principal_list,
	company_list,
	firm_list,
	way_list,
	channel_list,
	detail_list,
	detail_list_shwo,
	accessorieslist,
	detail_confirm,
	APPfindoption2,
	APPfindCconf2,
	standard,
	AppfindProduct,
	selectbpRKprice,
	contract
	
};