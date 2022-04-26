import MICRO_CONFIG from '@/utils/core/core.modules.js'
export default {
    install(Vue) {
        Vue.prototype.$showPic = (imgPath, water) => {
            return `${MICRO_CONFIG.api}/file/show?filePath=${imgPath}&water=${water || "false"}`
        }
        Vue.prototype.$showVideo = (imgPath, water) => {
            return `${MICRO_CONFIG.api}/video/player?filePath=${imgPath}&water=${water || "false"}`
        }

    }
}