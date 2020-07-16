<template>
    <div>
        <button type="button" @click="increment()">
            {{ label || 'Click me' }}
        </button>
        {{ total }} clicks
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({})
export default class Heading extends Vue {
    // props
    @Prop({ required: false, default: null })
    public label!: string | null;

    // data (reactive)
    public total: number = 0;

    public increment() {
        this.total++;
    }
}
</script>