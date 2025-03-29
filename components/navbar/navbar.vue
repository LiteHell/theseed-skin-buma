<template>

    <nav :class="bulma('nav navbar')" role="navigation" aria-label="main navigation">
        <Logo :is-navbar-active="isNavbarActive" :toggle-navbar-burger="toggleNavbarBurger"/>
        <div :class="bulma({ 'navbar-menu': true, 'is-active': isNavbarActive })" id="mainNavbar" data-testid="main-navbar">
            <div :class="bulma('navbar-start')">
                <nuxt-link to="/RecentChanges" :class="bulma('navbar-item')">
                    <span :class="bulma('icon')"> <font-awesome-icon :icon="faBinoculars" /> </span>&nbsp;
                    최근 변경
                </nuxt-link>
                <nuxt-link to="/RecentDiscuss" :class="bulma('navbar-item')">
                    <span :class="bulma('icon')"> <font-awesome-icon :icon="faComments" /> </span>&nbsp;
                    최근 토론
                </nuxt-link>
                <b-dropdown icon="fas fa-cogs" label="도구">
                    <nuxt-link :class="bulma('navbar-item')" :to="menu.href" v-for="menu in toolMenus" :key="menu.href">
                        <span :class="bulma('icon')"><font-awesome-icon :icon="menu.icon" /></span>
                        {{  menu.text }}
                    </nuxt-link>
                </b-dropdown>
            </div>
            <div :class="bulma('navbar-end')">
                <div :class="bulma('navbar-item is-hidden-touch')">
                    <search-form />
                </div>
                <LoggedInUserMenu v-if="isLoggedIn" />
                <AnonymousUserMenu v-else />
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, computed } from 'vue';
import bulma from '../../src/bulma';
import Logo from './logo.vue';
import fixedToolMenus from './fixedToolMenus';
import LoggedInUserMenu from './loggedInUserMenu.vue';
import AnonymousUserMenu from './anonymousUserMenu.vue';
import { useStore } from 'vuex';
import BDropdown from '../b-dropdown';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import SearchForm from '../searchForm.vue';
import { faBinoculars, faComments } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons/faHeart';

let isNavbarActive = ref(false);
const toggleNavbarBurger = () => isNavbarActive = !isNavbarActive;
const store = useStore();

const toolMenus = computed(() => fixedToolMenus.concat((store.state.session.menus ?? []).map(i => ({
    icon: faHeart,
    text: i.t,
    href: i.l
}))));
const isLoggedIn = computed(() => store.state.session.account.type === 1);
</script>