<template>
    <div class="navbar-item has-dropdown is-hoverable">
        <div v-if="icon" class="navbar-link"><fontawesome :icon="icon" class="fa-icon"/>&nbsp;<span class="navbar-item-text" v-html="text" /></div>
        <div v-else class="navbar-link" v-html="text">
        </div>
        <div :class="dropdownClasses">
            <slot>
            </slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'b-navdropdown',
    props: {
        text: String,
        icon: String,
        right: {type: Boolean, default: false}
    },
    computed: {
        dropdownClasses: function() {
            return {
                'navbar-dropdown': true,
                'is-right': this.right
            };
        }
    }
}
</script>
