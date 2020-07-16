<template>
    <h1 class="heading title is-1">{{ message }}</h1>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({})
export default class Heading extends Vue {
    @Prop({ required: true })
    public message!: string;
}
</script>

<style lang="scss">
    .heading {
        color: red;
        text-align: center;
    }
</style>