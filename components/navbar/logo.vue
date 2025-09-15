<template>
    <div class="navbar-brand">
        <nuxtLink to="/" class="navbar-item"
            ><img :src="$store.state.config['wiki.logo_url']" v-if="$store.state.config['wiki.logo_url']" />{{
                $store.state.config['wiki.site_name']
            }}</nuxtLink
        >
        <a
            :class="{ 'navbar-burger': true, 'is-active': isNavbarActive }"
            @click.prevent="toggleNavbarBurger"
            data-testid="navbar-activation-button-on-mobile"
        >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </a>
    </div>
</template>

<script setup>
const { isNavbarActive, toggleNavbarBurger } = defineProps(['isNavbarActive', 'toggleNavbarBurger']);
</script>
