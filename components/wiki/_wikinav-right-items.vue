<template>
    <div>
        <template v-if="user">
            <b-navlink href="#">
                <article class="media">
                    <figure class="media-left">
                        <p class="image is-32x32">
                            <img class="is-rounded" :src="user.gravatar">
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <strong>{{ user.username }}</strong><br>
                            Member
                        </div>
                    </div>
                </article>
            </b-navlink>
            <b-navdivider />
        </template>
        <b-navlink icon="wrench" class="skin-settings">스킨 설정</b-navlink>
        <b-navlink icon="adjust" class="toggle-dark">어두운테마 설정/해제</b-navlink>
        <b-navdivider v-if="user || ip" />
        <template v-if="user">
            <b-navlink href="/member/mypage" icon="user-circle">내 정보</b-navlink>
            <b-navlink :href="userdocLink" icon="sticky-note">내 사용자 문서</b-navlink>
            <b-navlink :href="docContribLink" icon="chart-line">내 문서 기여 목록</b-navlink>
            <b-navlink :href="discussContribLink" icon="chart-bar">내 토론 기여 목록</b-navlink>
            <b-navlink href="/member/starred_documents" icon="bookmark">별찜한 문서들</b-navlink>
            <b-navdivider />
            <b-navlink :href="logoutLink" icon="sign-out-alt">로그아웃</b-navlink>
        </template>
        <template v-else-if="ip">
            <b-navlink :href="docContribLink" icon="chart-line">내 문서 기여 목록</b-navlink>
            <b-navlink :href="discussContribLink" icon="chart-bar">내 토론 기여 목록</b-navlink>
            <b-navdivider />
            <b-navlink :href="loginLink" icon="sign-in-alt">로그인</b-navlink>
        </template>
    </div>
</template>
<script>
    import bNavlink from '~/components/b-navlink.vue';
    import bNavdivider from '~/components/b-navdivider.vue';

    export default {
        name: 'wikinav-right-items',
        components: {
            bNavlink,
            bNavdivider
        },
        props: {
            user: Object,
            ip: String
        },
        computed: {
            userdocLink: function () {
                return '/w/사용자:' + this.user.username
            },
            docContribLink: function () {
                return '/contributions/author/' + (this.user ? this.user.username : this.ip) + '/document'
            },
            discussContribLink: function () {
                return '/contributions/author/' + (this.user ? this.user.username : this.ip) + '/discuss'
            },
            logoutLink: function () {
                return '/member/logout?redirect' + encodeURIComponent(this.$route.fullPath)
            },
            loginLink: function () {
                return '/member/login?redirect=' + encodeURIComponent(this.$route.fullPath)
            }
        }
    }
</script>