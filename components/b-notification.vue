<template>
    <div class="notification is-link" v-if="destroyed">
        <button class="delete" v-if="deleteButton" @click.prevent="deleteMyself"></button>
        <slot></slot>
    </div>
</template>

<script>
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
        }
    }
}
</script>