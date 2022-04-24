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

    }
}