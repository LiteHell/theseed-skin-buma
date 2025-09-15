<template>
    <div v-if="!destroyed" :class="['notification', color, light ? 'is-light' : null]">
        <button v-if="deleteButton" @click="deleteMyself" class="delete"></button>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        deleteButton: {
            type: Boolean,
            default: true
        },
        color: {
            type: String,
            default: 'is-link'
        },
        light: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            destroyed: false
        };
    },
    methods: {
        deleteMyself() {
            this.destroyed = true;
        }
    }
};
</script>
