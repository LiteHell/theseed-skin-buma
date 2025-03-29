<template>
    <div :class="bulma('navbar-brand')">
        <nuxt-link to="/" :class="bulma('navbar-item')"><img :src="$store.state.config['wiki.logo_url']"
                v-if="$store.state.config['wiki.logo_url']" />{{
                    $store.state.config['wiki.site_name']
                }}</nuxt-link>
        <a :class="bulma({ 'navbar-burger': true, 'is-active': isNavbarActive })" @click.prevent="toggleNavbarBurger" data-testid="navbar-activation-button-on-mobile">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </a>
    </div>

</template>

<script setup>
import bulma from '../../src/bulma';

const { isNavbarActive, toggleNavbarBurger } = defineProps(['isNavbarActive', 'toggleNavbarBurger']);
</script>