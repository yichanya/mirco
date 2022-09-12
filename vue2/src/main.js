import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';

Vue.config.productionTip = false

let instance = null;
console.log(instance);

//不在微前端环境下，就单独渲染
if (!window.__MICRO_WEB__) {
  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app-vue')
}

// 如果在微前端框架里，则执行下面的生命周期方法
//开始加载结构
export async function bootstrap() {
    console.log('vue app bootstraped');
  }

export async function mount() {
  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app-vue')
}
export async function unmount(ctx) {
  instance = null;
  const { container } = ctx
  if (container) {
    document.querySelector(container).innerHTML = ''
  }
}
