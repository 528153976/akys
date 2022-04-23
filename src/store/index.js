import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
//自动导入其他module
const files = require.context(".", false, /\.js$/);
let modules = {};
let realModule = {};
files.keys().forEach(key => {
	if (key === "./index.js") return;
	let temp = key.replace(/(\.\/|\.js)/g, "");
	modules[temp] = files(key).default;
});

realModule = Object.assign({}, modules);
export default new Vuex.Store({
    modules: realModule
})