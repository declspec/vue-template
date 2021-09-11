import { RouteConfig } from 'vue-router/types/index';

const Routes: RouteConfig[] = [
    { path: '/', component: () => import('app/views/home.vue') },
];

export default Routes;