<template>
    <a class="navbar-item" :href="href">
        <template v-if="icon">
            <fontawesome :icon="icon" class="fa-icon" />&nbsp;<span class="navbar-item-text"><slot></slot></span>
        </template>
        <span class="text" v-else><slot></slot></span>
    </a>
</template>
<script>
export default {
    name: 'b-navlink',
    props: {
        href: String,
        icon: String
    }
}
</script>