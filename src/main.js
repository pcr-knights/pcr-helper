import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'

Vue.config.productionTip = false

Vue.use(Vuex)

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.use(BootstrapVueIcons)

const store = new Vuex.Store({
    state: {
        battle_screen_width: 1000,
        web_element_width: null,
        scale: null,

        // flush interval when simulating
        flush_interval: 100
    },
    mutations: {
        setElementWidth(state, width) {
            state.web_element_width = width;
            state.scale = width / state.battle_screen_width
        }
    }
})

new Vue({
    render: h => h(App),
    store
}).$mount('#app')
