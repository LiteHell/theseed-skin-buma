<template>
    <a href="#" @click.prevent="openSettingModal" :class="class">
        <slot></slot>
    </a>
</template>

<script>
import SettingModal from '../settingModal.vue';

export default {
    props: {
        'class': String
    },
    methods: {
        openSettingModal() {
            this.$vfm.show({ component: SettingModal });
        }
    }
}
</script>