<template>
    <div>
        <h1>Vue Template</h1>
        <p>Below are some basic component examples</p>
        <counter label="Click me" />
        <counter label="Don't click me" />
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component } from 'vue-property-decorator';

    // Components used by this view.
    import Counter from 'app/components/counter.vue';

    @Component({
        components: {
            Counter
        }
    })
    export default class HomeView extends Vue {
    }
</script>

<style lang="scss" scoped>
    h1 {
        margin-top: 4rem;
        text-align: center;
    }
</style>