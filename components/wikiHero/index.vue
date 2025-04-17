<template>
    <section
        id="wiki-main-title"
        :class="
            bulma({
                hero: true,
                [heroColor]: true
            })
        "
    >
        <heroBody />
        <heroFoot />
    </section>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import bulma from '../../src/bulma';
import heroBody from './body';
import heroFoot from './foot';

const store = useStore();
const heroColor = computed(() => {
    if (store.state.page.title === '오류') return 'is-danger';
    switch (store.state.page.viewName) {
        case 'error':
            return 'is-danger';
        case 'notfound':
            return 'is-warning';
        default:
            return 'is-primary';
    }
});
</script>
