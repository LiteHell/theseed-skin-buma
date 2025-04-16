<template>
    <a href="#" @click.prevent="openSettingModal" :class="class">
        <slot></slot>
    </a>
</template>

<script>
import settingModal from '../settingModal.vue';

export default {
    props: {
        class: String
    },
    methods: {
        openSettingModal() {
            this.$vfm.show({ component: settingModal });
        }
    }
};
</script>
