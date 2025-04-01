<template>
    <div :class="bulma('hero-foot')">
        <nav :class="bulma('tabs is-left is-boxed')" id="wiki-article-menu">
            <div :class="bulma('container')">
                <WikiTabs v-if="hasDocument">
                </WikiTabs>

                <ul v-else>
                    <li :class="bulma('is-active', true)">
                        <a href="#">
                            <span :class="bulma('icon')">
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

<script>
import WikiTabs from './wikiTabs.vue';
import bulma from '../../../src/bulma';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCogs } from '@fortawesome/free-solid-svg-icons';

export default {
    created() {
        this.faCogs = faCogs;
    },
    components: {
        WikiTabs,
        FontAwesomeIcon
    },
    methods: {
        bulma
    },
    computed: {
        hasDocument() {
            return !!this.$store.state.page?.data?.document;
        }
    }
}
</script>