<template>
    <div>
        <counter label="Click me" />
        <counter label="Don't click me" />
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Component } from 'vue-property-decorator'

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