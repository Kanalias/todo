require('./bootstrap');
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from '@/js/views/App'
import 'es6-promise/auto'
import axios from 'axios'
import Vue from 'vue'
import VueAuth from '@websanova/vue-auth'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import auth from './auth'
import router from './routes'


Vue.use(BootstrapVue);
window.Vue = Vue;

Vue.router = router;
Vue.use(VueRouter);

Vue.use(VueAxios, axios);
Vue.use(VueAuth, auth);

axios.defaults.baseURL = `/api/`;

Vue.component('app', App);

const app = new Vue({
    el: '#app',
    router: router
});
