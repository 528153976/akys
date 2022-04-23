import axios from "axios";
import MICRO_CONFIG from "@/utils/core/core.modules";
/**
 * 获取行政区枚举
 * @param {number} level  
 */
export const getXzqEnum = (level = 5) => {
	return axios.request({
		url: MICRO_CONFIG.baseUrl + 'generalEnum/getRegionTree?level=' + level,
		method: 'get',
		responseType: 'json'
	});
};
/**
 * 获取行政区枚举
 * @param {number} level  
 */
export const getXzqEnumPresentXzqdm = (level = 5, presentXzqdm) => {
	let pre = presentXzqdm ? "&presentXzqdm=" + presentXzqdm : "";
	return axios.request({
		url: MICRO_CONFIG.baseUrl + 'generalEnum/getRegionTree?level=' + level + pre,
		method: 'get',
		responseType: 'json'
	});
};
/**
 * 根据类型获取枚举值
 * @param {string} mjjsdm  枚举类型
 */
export const getEnumByMjjsdm = mjjsdm => {
	return axios.request({
		url: MICRO_CONFIG.baseUrl + 'generalEnum/selectByMjjsdm?mjjsdm=' + mjjsdm,
		method: 'get',
		responseType: 'json'
	});
};
/**
 * 设置枚举值列表
 * @param list 枚举列表
 * @param mjjsdm 枚举类型
 */
export const setEnum = async (list, mjjsdm, callback) => {
	let res = await getEnumByMjjsdm(mjjsdm)
	if (res.status == 200 && res.data != null) {
		list.length = 0;
		res.data.forEach(element => {
			list.push({
				value: element.mjz,
				label: element.mjmc
			})
		})
		if (callback) {
			callback(list)
		}
	} else {
		console.warn("查询枚举类型 " + mjjsdm + " 的枚举列表失败");
	}
};