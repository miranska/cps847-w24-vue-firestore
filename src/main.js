import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import { VueFire } from 'vuefire'
import { initializeApp } from 'firebase/app'


export const firebaseApp = initializeApp({
    // Paste firebase app config here
})
  

const app = createApp(App)
app.use(VueFire, {
    firebaseApp,
    modules: [
      // we may use other modules later on
    ],
  })

createApp(App).mount('#app')


