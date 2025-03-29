<template>
    <a :href="href" :class="className">
        <slot>
        </slot>
    </a>
</template>

<script setup>
import { computed } from 'vue';

const { to, class: className} = defineProps(['to', 'class'])
const href = computed(() => typeof to === 'string' ? to : (
    (() => {
        let query = null;
        if (to.query) {
            const searchParams = new URLSearchParams(to.query)
            query = searchParams.toString();
        }

        return query ? (to.path + '?' + query) : to.path;
    })()
))
</script>