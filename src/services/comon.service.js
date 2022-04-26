import axios from "axios";
import MICRO_CONFIG from "@/utils/core/core.modules";
import { Row } from "element-ui";



const loginService = {
	login(data) {
		return axios.request({
			url: MICRO_CONFIG.api + 'guess/doLogin',
			method: 'post',
			data: data,
			responseType: 'json'
		})
	},
	listuser(data) {
		return axios.request({
			url: MICRO_CONFIG.api + '/user/listuser',
			method: 'post',
			data: data,
			responseType: 'json'
		})
	},
	userSave(data) {
		return axios.request({
			url: MICRO_CONFIG.api + '/user/save',
			method: 'post',
			data: data,
			responseType: 'json'
		})
	},
	deleteInfo(row) {
		return axios.request({
			url: MICRO_CONFIG.api + '/user/delete/' + row.id,
			method: 'get',
			responseType: 'json'
		})
	},
	fileUpload(params, data) {
		return axios.request({
			url: MICRO_CONFIG.api + 'file/upload',
			method: 'post',
			params: params,
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
	},
	deleteFile(id) {
		return axios.request({
			url: MICRO_CONFIG.api + 'file/delete/' + id,
			method: 'get',
			responseType: 'json'
		})
	},
	fileWater(id) {
		return axios.request({
			url: MICRO_CONFIG.api + 'file/water',
			method: 'get',
			params: {
				id
			},
			responseType: 'json'
		})
	},


}
export default loginService
