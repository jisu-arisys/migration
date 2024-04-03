import { createApp, ref  } from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router'

// new
import './assets/sass/light-bootstrap-dashboard.scss' //need 'sass-loader'
import './assets/css/demo.css'

import dayjs from "dayjs"
import createCalculator from "./module/dateCalculator" //dayjs : 사용자 정의 계산식 함수가 포함된 .js 호출
import createfilters from "./module/filters" //사용자정의 테이블 옵션, 필터링, 페이징 함수가 포함된 .js 호출

import globalComponet from './globalComponent/globalComponet'

import {pinia} from './module/pinia'
import { createPersistPlugin } from 'pinia-persist-plugin'

const persistPlugin = createPersistPlugin();
pinia.use(persistPlugin);

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(globalComponet)

// sidebarStore를 ref로 반응성 객체를 정의합니다.
const sidebarStore = ref({
  showSidebar: false,
  sidebarLinks: [

  ],
  // 외부에서 값을 변경하기 위한 displaySidebar 메서드를 정의합니다.
  displaySidebar(value) {
    this.showSidebar = value;
  }
})

app.config.globalProperties.$sidebar = {
  get showSidebar() {
    return sidebarStore.value.showSidebar;
  },
  set showSidebar(value) {
    sidebarStore.value.showSidebar = value;
  },
  displaySidebar(value) {
    sidebarStore.value.displaySidebar(value);
  }
}
app.config.globalProperties.$dayjs = dayjs
app.config.globalProperties.$cal = createCalculator(dayjs)
app.config.globalProperties.$filter = createfilters()

app.mount('#app')
