<template>
    <nav class="mobile-search-navbar" :class="bulma('nav navbar is-hidden-desktop')">
        <div :class="bulma('navbar-brand')">
            <div :class="bulma('navbar-item')">
                <searchForm />
            </div>
        </div>
    </nav>
</template>

<script setup>
import bulma from '../../src/bulma';
import searchForm from '../searchForm.vue';
</script>
