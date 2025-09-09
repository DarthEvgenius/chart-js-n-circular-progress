import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/scss/main.scss'
import 'vue-color/style.css';

const app = createApp(App)

app.use(router)

app.mount('#app')
