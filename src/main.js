// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* element-ui  样式引用 */
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue'
import App from './App'
import 'babel-polyfill'
import 'es6-promise/auto'
import router from './router'
import element_ui from "element-ui"
import axios from './api/axios/index'
import store from './store/index'
<<<<<<< HEAD
import tools from './plugins/tools'
import float_eval from './plugins/float_eval'
import "!style-loader!css-loader!less-loader!./less/index.less";

=======
import tools from './plugin/tools'
import float_eval from './plugin/float_eval'
import "!style-loader!css-loader!less-loader!./less/index.less";
>>>>>>> 187a96dc59ec39cde9a678fc405bb96c22609402
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$tools = tools;
Vue.prototype.$float_eval = float_eval;
<<<<<<< HEAD

/* eslint-disable no-new */
Vue.use(element_ui);

=======
/* eslint-disable no-new */
Vue.use(element_ui);
>>>>>>> 187a96dc59ec39cde9a678fc405bb96c22609402
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
