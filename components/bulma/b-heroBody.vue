<template>
    <div :class="bulma('hero-body')">
        <div :class="bulma('container')">
            <h1 :class="bulma('title')">
                <slot name="title"></slot>
            </h1>
            <h2 :class="bulma('subtitle')">
                <slot name="subtitle"></slot>
            </h2>
        </div>
    </div>
</template>

<script setup>
import bulma from '../../src/bulma';
</script>
