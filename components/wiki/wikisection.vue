<template>
    <section class="section">
        <div class="container">
            <b-notification v-if="hasUserdiscuss">
                <a :href="discussLink">사용자 토론</a>이 있습니다. 확인해주세요.
            </b-notification>
            <b-notification v-if="sitenotice">
                <div class="sitenotice" v-html="sitenotice"></div>
            </b-notification>
            <div class="wiki-article content">
                <slot />
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'wikisection',
        props: {
            "hasUserdiscuss": Boolean,
            "username": String,
            "sitenotice": String
        },
        computed: {
            discussLink: function () {
                return '/discuss/' + encodeURIComponent('사용자:' + this.username)
            }
        }
    }
</script>