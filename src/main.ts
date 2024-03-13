import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import './assets/css/index.less'
import router from './router'
import store from './store'
import icons from './global/register-icons'

// 针对ELMessage和ELLoading等组件引入样式
// 1,全局引入   2 组件样式引入（找对应的    3，使用vite-plugin-style-import插件进行
// import 'element-plus/theme-chalk/el-message.css'

// 1， 全局注册element-plus   方便和简介 但是包多
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// app.use(ElementPlus)

// 2, 按需引入  插件
// import { ElButton } from 'element-plus'
// app.component(ElButton.name, ElButton)

// 3, 图标的全局注册

const app = createApp(App)
app.use(icons)
app.use(store)
app.use(router)
app.mount('#app')
