// ensure the styling gets bundled.
import 'app/styling/layout.scss';

(async () => {
    const { default: Vue } = await import('vue');
    const { default: HomeView } = await import('app/views/home.vue');

    return new Vue({
        el: '#app',
        render: r => r(HomeView)
    });
})();