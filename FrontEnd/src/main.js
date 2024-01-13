import './assets/main.css'
import './assets/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCar, faHome, faCircleInfo, faHeadset, faBars, faXmark, faUsers, faSuitcaseRolling, faGasPump, faGaugeSimpleHigh, faCalendarDays, faCreditCard, faCircleChevronRight, faPlus, faCircleXmark, faTrashCan, faUpload} from '@fortawesome/free-solid-svg-icons'
library.add(faCar, faHome, faCircleInfo, faHeadset, faBars, faXmark, faUsers, faSuitcaseRolling, faGasPump, faGaugeSimpleHigh, faCalendarDays, faCreditCard, faCircleChevronRight, faPlus, faCircleXmark, faTrashCan, faUpload)

const app = createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

const options = {
    //Toastification options
};

app.use(Toast, options);

app.mount('#app')
