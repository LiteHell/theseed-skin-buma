<template>
    <div v-if="!destroyed" :class="bulma(['notification', color, light ? 'is-light' : null])">
        <button v-if="deleteButton" @click="deleteMyself" :class="bulma('delete')"></button>
        <slot></slot>
    </div>
</template>

<script>
import bulma from '../../src/bulma';

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
        },
        bulma
    }
};
</script>
