import axios from "axios";
import MICRO_CONFIG from "@/utils/core/core.modules";



const loginService = {
	login(data) {
		return axios.request({
			url: MICRO_CONFIG.api + 'guess/doLogin',
			method: 'post',
			data: data,
			responseType: 'json'
		})
	},
	listFileInfo(data) {
		return axios.request({
			url: MICRO_CONFIG.api + 'file/listFileInfo',
			method: 'post',
			data: data,
			responseType: 'json'
		})
	}
}
export default loginService
