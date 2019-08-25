<template>
    <div>
        <a href="#" id="top"></a>
        <wikinav v-if="user.ip" :ip="user.ip" :brand="navbrand"/>
        <wikinav v-else :user="user" :brand="navbrand"/>
        <mobile-searchbar />
        <b-hero :title="viewInfo.title" :subtitle="subtitle">
            <article-hero-tabs v-if="docInfo && isUserDoc" :docname='docInfo.fullname' :starred="docInfo.starred" :star-count="docInfo.starCount" :current-view="viewInfo.viewName" :username="docInfo.name"/>
            <article-hero-tabs v-else-if="docInfo" :docname='docInfo.fullname' :starred="docInfo.starred" :star-count="docInfo.starCount" :current-view="viewInfo.viewName"/>
        </b-hero>
        <wikisection :has-userdiscuss="user.hasUserDiscuss || false" :username="user.username" :sitenotice="sitenotice">
            <nuxt />
        </wikisection>
        <footer class="footer">
            <div class="container">
            <div class="content">
                <p class="engine-license">
                theseed-skin-buma by LiteHell, Distributed under GPL-3.0+. Feel free to contribute via <a href="//github.com/litehell/theseed-skin-buma">github</a>.<br>
                the seed engine by <a href="//theseed.io/License">theseed.io</a>.
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
<style scoped src="buefy/dist/buefy.css">

</style>

<script>
    import wikinav from '~/buma/components/wiki/wikinav.vue';
    import bHero from '~/buma/components/b-hero.vue';
    import articleHeroTabs from '~/buma/components/wiki/article-hero-tabs.vue';
    import wikisection from '~/buma/components/wiki/wikisection.vue'
    import jumpbuttons from '~/buma/components/wiki/jumpbuttons.vue';
    import mobileSearchbar from '~/buma/components/wiki/mobile-searchbar.vue';
    // Buefy and fontawesome
    import Vue from 'vue';
    import { Buefy } from 'buefy';
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
                    text: 'ExampleWiki',
                    logourl: 'https://picsum.photos/64'
                }
            },
            user: function() {
                let user = {
                    username: 'Test',
                    hasUserDiscuss: true
                }; // or {ip: '127.0.0.1'} or null
                user.gravatar = this.gravatar;
                return user;
            },
            sitenotice: function() {
                return 'Siteotice! Yeahhhhhhhhhh'
            },
            viewInfo: function() {
                return {
                    viewName: 'wiki',
                    title: 'Lorem Ipsum'
                }
            },
            docInfo: function() {
                return {
                    namespace: '문서',
                    fullname: '문서:Lorem Ipsum',
                    name: 'Lorem Ipsum',
                    starred: true,
                    starCount: 255,
                    lastModifiedAt: new Date(1429196400000)
                }
            },
            isUserDoc: function() {
                return this.docInfo.namespace === '사용자';
            },
            subtitle: function() {
                if(this.docInfo)
                    return this.docInfo.lastModifiedAt.toString() + '에 마지막으로 수정됐습니다.';
                else
                    return 'Powered by the seed engine';
            },
            additionalFooter: function () {
                return 'License notice and additional footer here';
            },
            gravatar: function() {
                return 'https://picsum.photos/64';
            }
        }
    }
</script>