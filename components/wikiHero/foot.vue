<template>
    <div class="hero-foot">
        <nav class="tabs is-left is-boxed" id="wiki-article-menu">
            <div class="container">
                <wikiTabs v-if="hasDocument" />

                <ul v-else>
                    <li class="is-active">
                        <a href="#">
                            <span class="icon">
                                <FontAwesomeIcon :icon="faCogs" />
                            </span>
                            <span class="wiki-article-menu-text"> 특수 문서</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import wikiTabs from './wikiTabs.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCogs } from '@fortawesome/free-solid-svg-icons';

const store = useStore();
const hasDocument = computed(() => {
    return !!store.state.page.data?.document;
});
</script>
