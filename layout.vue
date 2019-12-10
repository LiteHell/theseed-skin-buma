<template>
    <div>
        <a href="#" id="top"></a>
        <wikinav v-if="user.ip" :ip="user.ip" :brand="navbrand"/>
        <wikinav v-else :user="user" :brand="navbrand"/>
        <mobile-searchbar />
        <b-hero :title="viewInfo.title" :subtitle="subtitle">
            <article-hero-tabs v-if="docInfo && isUserDoc" :docname='docInfo.document' :starred="docInfo.starred" :star-count="docInfo.star_count" :current-view="viewInfo.viewName" :username="docInfo.document.title"/>
            <article-hero-tabs v-else-if="docInfo" :docname='docInfo.document' :starred="docInfo.starred" :star-count="docInfo.star_count" :current-view="viewInfo.viewName"/>
        </b-hero>
        <wikisection :has-userdiscuss="user.hasUserDiscuss || false" :username="user.username" :sitenotice="sitenotice">
            <nuxt />
        </wikisection>
        <footer class="footer">
            <div class="container">
            <div class="content">
                <p class="engine-license">
                theseed-skin-buma by LiteHell, Distributed under GPL-3.0+. Feel free to contribute via <a href="//github.com/litehell/theseed-skin-buma">github</a>.<br>
                the seed engine by <nuxt-link to="//theseed.io/License">theseed.io</nuxt-link>.
                </p>
                <p class="custom-footer" v-html="additionalFooter">

                </p>
            </div></div>
        </footer>
        <a href="#" id="bottom"></a>
        <jumpbuttons />
        <script src="~buma/assets/layout.js"></script>
    </div>
</template>

<style scoped>
footer .licenses {
    float: right;
}
</style>
<style src="buefy/dist/buefy.css">

</style>

<script>
    import wikinav from './buma/components/wiki/wikinav.vue';
    import bHero from './buma/components/b-hero.vue';
    import articleHeroTabs from './buma/components/wiki/article-hero-tabs.vue';
    import wikisection from './buma/components/wiki/wikisection.vue'
    import jumpbuttons from './buma/components/wiki/jumpbuttons.vue';
    import mobileSearchbar from './buma/components/wiki/mobile-searchbar.vue';
    // Buefy and fontawesome
    import Vue from 'vue';
    import Buefy from 'buefy';
    import { library } from '@fortawesome/fontawesome-svg-core'
    import { fas } from '@fortawesome/free-solid-svg-icons'
    import { far } from '@fortawesome/free-regular-svg-icons'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

    export default {
        created() {
            Vue.use(Buefy);
            library.add(fas);
            library.add(far);
            Vue.component('fontawesome', FontAwesomeIcon);
        },
        components: {
            wikinav, wikisection, bHero, articleHeroTabs, jumpbuttons, mobileSearchbar
        },
        computed: {
            navbrand: function() {
                return {
                    text: this.$store.state.config['wiki.site_name'] || 'Wiki',
                    logourl: this.$store.state.config['wiki.logo_url'] || ''
                };
            },
            user: function() {
                if (this.$store.state.session.member) {
                    return {
                        username: this.$store.state.session.member.username,
                        hasUserDiscuss: Boolean(this.$store.state.session.member.user_document_discuss)
                    }
                } else {
                    return {
                        ip: this.$store.state.session.ip
                    };
                }
            },
            sitenotice: function() {
                return this.$store.state.config['wiki.sitenotice'];
            },
            viewInfo: function() {
                return this.$store.state.page;
            },
            docInfo: function() {
                return this.$store.state.page.data;
            },
            isUserDoc: function() {
                return this.$store.state.page.data.user;
            },
            subtitle: function() {
                if (this.docInfo.date)
                    return (new Date(this.docInfo.date * 1000)).toString() + '에 마지막으로 수정됐습니다.';
                else
                    return 'Powered by the seed engine';
            },
            additionalFooter: function () {
                return (this.$store.state.config['wiki.footer_text'] || '') + (this.$store.state.config['wiki.copyright_text'] || '');
            },
            gravatar: function() {
                return this.$store.state.member.gravatar_url;
            }
        }
    }
</script>