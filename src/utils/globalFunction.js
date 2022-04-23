import MICRO_CONFIG from '@/utils/core/core.modules.js'
export default {
    install(Vue) {
        Vue.prototype.$showPic = (imgPath) => {
            if (!imgPath) {
                return
            }
            if (imgPath.slice(0, 4) == 'http') {
                return imgPath
            } else {
                return `${MICRO_CONFIG.baseUrl}/ApprovalFile/show?tplj=${imgPath}&tempToken=${sessionStorage.getItem("tempToken") || ""}`
            }

        }
        Vue.prototype.$showImg = (imgPath, isSY) => {
            if (!imgPath) {
                return
            }
            let pre = isSY == true ? '' : '&water=false';
            if (imgPath.slice(0, 4) == 'http') {
                return imgPath
            } else {
                return `${MICRO_CONFIG.storage}file/show?relativeFilePath=${imgPath}&tempToken=${sessionStorage.getItem("tempToken") || ""}${pre}`
            }

        }

    }
}