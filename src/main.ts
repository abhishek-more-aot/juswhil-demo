import Vue, { DirectiveOptions } from 'vue'

import 'normalize.css'
import ElementUI from 'element-ui'
import SvgIcon from 'vue-svgicon'

import '@/styles/element-variables.scss'
import '@/styles/index.scss'
import Unicon from 'vue-unicons'

import App from '@/App.vue'
import store from '@/store'
import { AppModule } from '@/store/modules/app'
import router from '@/router'
import i18n from '@/lang'
import '@/icons/components'
import '@/permission'
import '@/utils/error-log'
import '@/pwa/register-service-worker'
import * as directives from '@/directives'
import * as filters from '@/filters'
import moment from 'vue-moment'
import LoadScript from 'vue-plugin-load-script'
import VueQrcode from '@chenfengyuan/vue-qrcode'
import Media from '@dongido/vue-viaudio'
import Viewer from 'v-viewer'
import AsyncComputed from 'vue-async-computed'
import * as icons from './icons'
import VueHtmlToPaper from 'vue-html-to-paper';
import VueOtp2 from 'vue-otp-2'
import Vue2Editor from 'vue2-editor'


const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css'
  ]
}

Vue.use(VueHtmlToPaper, options);
Vue.use(Media)
Vue.use(VueOtp2)
Vue.use(Viewer)
Vue.use(ElementUI, {
  size: AppModule.size, // Set element-ui default size
  i18n: (key: string, value: string) => i18n.t(key, value)
})
Vue.use(moment as any)
Vue.use(LoadScript)
Vue.component(VueQrcode.name, VueQrcode)
Vue.use(AsyncComputed)

Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

// Register global directives
Object.keys(directives).forEach(key => {
  Vue.directive(key, (directives as { [key: string]: DirectiveOptions })[key])
})

// Register global filter functions
Object.keys(filters).forEach(key => {
  Vue.filter(key, (filters as { [key: string]: Function })[key])
})

Vue.filter('truncate', function (text:any, stop:any, clamp:any) {
  return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app')

const temp:any = Object.values({ ...icons })
Unicon.add(temp)
Vue.use(Unicon)

Vue.use(Vue2Editor)