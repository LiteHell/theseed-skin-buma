<template>
    <div class="buma">
        <div class="top-anchor"></div>
        <navbar />
        <mobileSearchNavbar />
        <wikiHero />
        <section :class="bulma('section')">
            <div :class="bulma('container')">
                <bNotification v-if="$store.state.config['wiki.sitenotice']" color="is-warning">
                    <span v-html="$store.state.config['wiki.sitenotice']"></span>
                </bNotification>

                <bNotification v-if="hasUnreadUserDiscussion" :class="bulma('is-link')">
                    <nuxtLink :to="doc_action_link(user_doc($store.state.session.account.name), 'discuss')">사용자 토론</nuxtLink>이 있습니다.
                    확인해주세요.
                </bNotification>

                <div class="wiki-article" @dblclick="doBehaviorWhenDblClick">
                    <nuxt />

                    <skinLicense v-if="$store.state.page.viewName === 'license'"></skinLicense>
                </div>
            </div>
        </section>
        <bumaFooter />
        <jumpButtons />
    </div>
</template>

<style>
@import './css/bulma.min.css';
@import './css/layout.min.css';
</style>

<script>
import common from '~/mixins/common';
import bulma from './src/bulma';
import navbar from './components/navbar';
import mobileSearchNavbar from './components/navbar/mobileSearchNavbar.vue';
import wikiHero from './components/wikiHero';
import bNotification from './components/bulma/b-notification.vue';
import jumpButtons from './components/jumpButtons.vue';
import skinLicense from './components/skinLicense.vue';
import bumaFooter from './components/footer.vue';

export default {
    mixins: [common],
    components: {
        navbar,
        mobileSearchNavbar,
        wikiHero,
        bNotification,
        jumpButtons,
        skinLicense,
        bumaFooter
    },
    loadingBarColor(isDark) {
        return isDark ? 'white' : 'black';
    },
    computed: {
        hasUnreadUserDiscussion() {
            return (
                this.$store.state.session.user_document_discuss &&
                this.$store.state.localConfig['wiki.hide_user_document_discuss'] !== this.$store.state.session.user_document_discuss
            );
        }
    },
    watch: {
        '$store.state.currentTheme'(newValue) {
            this.changeTheme(newValue);
        }
    },
    methods: {
        changeTheme(theme) {
            document.documentElement.dataset.theme = theme;
        },
        doBehaviorWhenDblClick() {
            if (!this.$store.state.page.data.document) return;

            const action = this.$store.state.localConfig['buma.behaviorWhenDblClick'];
            switch (action) {
                case 'edit':
                case 'history':
                    const link = this.doc_action_link(this.$store.state.page.data.document, action);
                    this.$router.push(link);
                    break;
                case 'doNothing':
                case 'skinDefault':
                default:
                    break;
            }
        },
        bulma
    },
    mounted() {
        this.changeTheme(this.$store.state.currentTheme);
    }
};
</script>
