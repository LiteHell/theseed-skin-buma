<template>
    <div :class="bulma('notification is-link')" v-if="destroyed">
        <button :class="bulma('delete')" v-if="deleteButton" @click.prevent="deleteMyself"></button>
        <slot></slot>
    </div>
</template>

<script>
import bulma from '../src/bulma'

export default {
    props: {
        deleteButton: {
            type: Boolean,
            required: false,
            default: true
        }
    },
    data: function () {
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
}
</script>