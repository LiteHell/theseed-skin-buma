<template>
    <section id="wiki-main-title" :class="bulma({
        hero: true,
        [heroColor]: true
    })
        ">
        <HeroBody />
        <HeroFoot />
    </section>
</template>


<script setup>
import { computed } from 'vue';
import bulma from '../../src/bulma';
import HeroBody from './body';
import HeroFoot from './foot/foot';
import { useStore } from 'vuex';

const store = useStore();
const heroColor = computed(() => {
    if (store.state.page.title === '오류')
        return 'is-danger';
    switch (store.state.page.viewName) {
        case 'error':
            return 'is-danger';
        case 'notfound':
            return 'is-warning';
        default:
            return 'is-primary'
    }
});
</script>
