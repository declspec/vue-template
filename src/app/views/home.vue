<template>
    <div>
        <heading message="Welcome to the app"></heading>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Component } from 'vue-property-decorator'

    // Components used by this view.
    import Heading from 'app/components/heading.vue';

    @Component({
        components: {
            Heading
        }
    })
    export default class HomeView extends Vue {
    }
</script>