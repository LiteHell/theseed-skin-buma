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
                <p>
                <p class="licenses" v-if="licenseImg">
                    <img :src="licenseImg" alt="license">
                </p>
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
    </div>
</template>

<style scoped>
footer .licenses {
    float: right;
}
</style>


<script>
    import wikinav from '~/components/wiki/wikinav.vue';
    import bHero from '~/components/b-hero.vue';
    import articleHeroTabs from '~/components/wiki/article-hero-tabs.vue';
    import wikisection from '~/components/wiki/wikisection.vue'
    import jumpbuttons from '~/components/wiki/jumpbuttons.vue';
    import mobileSearchbar from '~/components/wiki/mobile-searchbar.vue';

    export default {
        components: {
            wikinav, wikisection, bHero, articleHeroTabs, jumpbuttons, mobileSearchbar
        },
        computed: {
            navbrand: function() {
                let result = {};
                if(this.$store.state.wikiname) result.text = this.$store.state.wikiname;
                if(this.$store.state.logourl) result.img = this.$store.state.logourl;
                return result;
            },
            licenseImg: function() {
                let supported = ['cc-by', 'cc-by-nc', 'cc-by-nc-nd', 'cc-by-nc-sa', 'cc-by-nd', 'cc-by-sa', 'cc-zero', 'pd'];
                return (this.$store.state.license && supported.includes(this.$store.state.license)) ? ('/img/licenses/' + this.$store.state.license + '.png') : null;
            },
            user: function() {
                if(!this.$store.state.user) return null;
                let user = this.$store.state.user;
                user.gravatar = this.gravatar;
                return user;
            },
            sitenotice: function() {
                return this.$store.state.sitenotice;
            },
            viewInfo: function() {
                return this.$store.state.viewInfo;
            },
            docInfo: function() {
                return this.$store.state.docInfo;
            },
            isUserDoc: function() {
                return this.$store.state.docInfo.namespace === '사용자';
            },
            subtitle: function() {
                if(this.docInfo)
                    return this.docInfo.lastModifiedAt.toString() + '에 마지막으로 수정됐습니다.';
                else
                    return 'Powered by the seed engine';
            },
            additionalFooter: function () {
                return (this.$store.state.licensetext || '') + '<br>' + (this.$store.state.footertext || '');
            },
            gravatar: function() {
                return '/test-identicon.svg';
            }
        }
    }
</script>