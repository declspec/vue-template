import Vue from 'vue';
import VueRouter from 'vue-router';

import Routes from 'app/config/routes';
import Layout from 'app/layout.vue';

import 'app/styles/main.scss';

Vue.use(VueRouter);

const vm = new Vue({
    el: '#app',
    render: r => r(Layout),
    router: new VueRouter({
        routes: Routes
    }),
});