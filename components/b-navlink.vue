<template>
    <a class="navbar-item" :href="href">
        <template v-if="icon">
            <fontawesome :icon="icon" />&nbsp;<slot></slot>
        </template>
        <slot v-else></slot>
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