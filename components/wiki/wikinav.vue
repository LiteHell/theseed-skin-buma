<template>
    <b-navbar :brand="brand">
        <template slot="menu-right">
            <div class="navbar-item desktop-search">
                <b-field>
                    <b-input placeholder="검색" type="search" class="query"></b-input>
                    <p class="control">
                        <button class="button randomBtn"><fontawesome icon="random"/></button>
                    </p>
                    <p class="control">
                        <button class="button is-primary searchBtn"><fontawesome icon="search"/></button>
                    </p>
                </b-field>
            </div>
            <b-navlink href="#" icon="search" class="toggle-mobile-search">검색</b-navlink>
            <b-navdropdown v-if="user" right icon="user" :text="user.username">
                <wikinav-right-items :user="user" />
            </b-navdropdown>
            <b-navdropdown v-else-if="ip" right icon="user-secret" :text="ip" class="is-right">
                <wikinav-right-items :ip="ip" />
            </b-navdropdown>
        </template>
        <template>
            <b-navlink href="/RecentChanges" icon="binoculars">최근 변경</b-navlink>
            <b-navlink href="/RecentDiscuss" icon="comments">최근 토론</b-navlink>
            <b-navdropdown icon="cogs" text="도구">
                <b-navlink href="/NeededPages" icon="beer">작성이 필요한 문서들</b-navlink>
                <b-navlink href="/OrphanedPages" icon="frown">고립된 문서</b-navlink>
                <b-navlink href="/UncategorizedPages" icon="question-circle">분류가 되지 않은 문서</b-navlink>
                <b-navlink href="/OldPages" icon="pause">방치된 문서</b-navlink>
                <b-navlink href="/ShortestPages" icon="thumbs-down">내용이 짧은 문서</b-navlink>
                <b-navlink href="/LongestPages" icon="thumbs-up">내용이 긴 문서</b-navlink>
                <b-navlink href="/BlockHistory" icon="ban">차단기록</b-navlink>
                <b-navlink href="/RandomPage" icon="random">무작위 문서들</b-navlink>
                <b-navlink href="/Upload" icon="cloud-upload-alt">파일 올리기</b-navlink>
                <b-navdivider></b-navdivider>
                <b-navlink href="/License" icon="copyright">라이선스</b-navlink>
            </b-navdropdown>
        </template>
    </b-navbar>
</template>

<style lang="sass" scoped>
@import "~bulma/sass/utilities/mixins.sass";

.mobile-search-box.disabled
    display: none !important;
+touch
    .desktop-search
        display: none !important;
+desktop
    .toggle-mobile-search
        display: none !important;
</style>

<script>
import bNavbar from '~/components/b-navbar.vue';
import bNavlink from '~/components/b-navlink.vue';
import bNavdropdown from '~/components/b-navdropdown.vue';
import bNavdivider from '~/components/b-navdivider.vue';
import wikinavRightItems from '~/components/wiki/_wikinav-right-items.vue';

export default {
    name:'wikinav',
    components: {
        bNavbar, bNavlink, bNavdropdown, bNavdivider, wikinavRightItems
    },
    props: {
        user: Object,
        ip: String,
        brand: Object
    }
}
</script>