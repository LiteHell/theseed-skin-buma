<template>
    <div class="buma">
        <div class="top-anchor"></div>
        <Navbar />
        <MobileSearchNavbar />
        <section
            id="wiki-main-title"
            :class="
                bulma({
                    hero: true,
                    [heroColor]: true
                })
            "
        >
            <TitleHeroBody />
            <HeroFoot />
        </section>
        <section :class="bulma('section')">
            <div :class="bulma('container')">
                <b-notification v-if="$store.state.config['wiki.sitenotice']" color="is-warning">
                    <span v-html="$store.state.config['wiki.sitenotice']" />
                </b-notification>

                <b-notification
                    v-if="hasUnreadUserDiscussion"
                    :class="bulma('is-link')"
                >
                    <nuxt-link :to="doc_action_link(user_doc($store.state.session.account.name), 'discuss')">사용자 토론</nuxt-link>이 있습니다.
                    확인해주세요.
                </b-notification>

                <div class="wiki-article" @dblclick="doBehaviorWhenDblClick">
                    <nuxt />

                    <skin-license v-if="$store.state.page.viewName === 'license'"></skin-license>
                </div>
            </div>
        </section>
        <BumaFooter />
        <jump-buttons />
    </div>
</template>

<style>
@import './css/bulma.min.css';
@import './css/layout.min.css';
</style>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import Common from '~/mixins/common';
import LocalDate from '~/components/localDate';
import SearchForm from './components/searchForm';
import BNotification from './components/b-notification';
import JumpButtons from './components/jumpButtons';
import BDropdown from './components/b-dropdown';
import skinLicense from './components/skinLicense';
import bulma from './src/bulma';
import TitleHeroBody from './components/titleHeroBody.vue';
import BumaFooter from './components/footer.vue';
import Navbar from './components/navbar/navbar.vue';
import MobileSearchNavbar from './components/navbar/mobileSearchNavbar.vue';
import HeroFoot from './components/heroFoot/heroFoot.vue';

library.add(fas, far);

export default {
    mixins: [Common],
    components: {
        FontAwesomeIcon,
        LocalDate,
        SearchForm,
        BNotification,
        JumpButtons,
        BDropdown,
        skinLicense,
        TitleHeroBody,
        BumaFooter,
        Navbar,
        MobileSearchNavbar,
        HeroFoot
    },
    loadingBarColor(isDark) {
        return isDark ? 'white' : 'black';
    },
    computed: {
        hasUnreadUserDiscussion() {
            return this.$store.state.session.user_document_discuss &&
                this.$store.state.localConfig['wiki.hide_user_document_discuss'] !== this.$store.state.session.user_document_discuss;
        },
        heroColor() {
            return this.$store.state.page.viewName === 'error' || this.$store.state.page.title === '오류'
                        ? 'is-danger'
                        : this.$store.state.page.viewName === 'notfound'
                        ? 'is-warning'
                        : 'is-primary'
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
