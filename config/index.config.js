const baseConfig = {
	// 开发环境配置
	development: {
		baseUrl: 'http://hs.5mall.com', // 后台接口请求地址
		// fileUrl: 'https://mkfile.etwowin.com.cn'
	},
	// 生产环境配置
	production: {
		baseUrl: 'http://hs.5mall.com', // 后台接口请求地址
		// fileUrl: 'https://mkfile.etwowin.com.cn'
	}
 
};
export default baseConfig[process.env.NODE_ENV];