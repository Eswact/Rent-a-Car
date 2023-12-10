import './assets/main.css'
import './assets/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCar, faHome, faCircleInfo, faHeadset, faBars, faXmark, faUsers, faSuitcaseRolling, faGasPump, faGaugeSimpleHigh, faCalendarDays, faCreditCard} from '@fortawesome/free-solid-svg-icons'
library.add(faCar, faHome, faCircleInfo, faHeadset, faBars, faXmark, faUsers, faSuitcaseRolling, faGasPump, faGaugeSimpleHigh, faCalendarDays, faCreditCard)

const app = createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

app.mount('#app')
