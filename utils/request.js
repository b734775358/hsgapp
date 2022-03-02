import baseConfig from '@/config/index.config.js'
const baseUrl = baseConfig.baseUrl
const request = (url = '', reqData = {}, type = 'POST', header = {
}) => {
    return new Promise((resolve, reject) => {
		let getToken = uni.getStorageSync('token');
		var realUrl = '';
		if(url.indexOf("http://") >= 0 || url.indexOf("https://") >= 0){
			realUrl = url;
		}else{
			realUrl = baseUrl + url;
		}
		
		var defaultHeader = {
			 'content-type': 'application/x-www-form-urlencoded',
			 'Access-Control-Allow-Origin': '*',
			 'token': getToken,
			 'Authorization': getToken,
		};
		
		const newHeader = Object.assign(defaultHeader, header);
		
		uni.request({
            method: type,
            url: realUrl,
            data: reqData,
			header: newHeader,
            dataType: 'json',         
        }).then((response) => {
            let [error, res] = response;
			let flag = true;
			if(res){
				if(res.statusCode == 502){
					uni.showToast({
						title:'502：系统异常，请联系管理员',
						icon:'none',
						duration: 3000
					})
					reject(res);
					return;
				}else if(res.data && res.data.error == "invalid_token"){
					// 没有token
					uni.showToast({
						title:res.data.error,
						icon:'none',
						duration: 3000
					})
					return;
				}else if(res.statusCode == 404){
					uni.showToast({
						title:'404：'+realUrl,
						icon:'none',
						duration: 3000
					})
					reject(res);
					return;
				}else if(res.data.error){
					uni.showToast({
						title:res.data.error,
						icon:'none',
						duration: 3000
					})
					reject(res);
					return;
				}else{
					flag = false;
					setTimeout(function() {
					    uni.hideLoading();
						resolve(res.data);
					}, 200);
				}
			}else{
				flag = false;
				setTimeout(function() {
				    uni.hideLoading();
					resolve(res.data);
				}, 200);
			}
			if(flag){
				resolve(res.data);
			}            
        }).catch(error => {
            let [err, res] = error;
            reject(err)
        })
    });
}
export default request