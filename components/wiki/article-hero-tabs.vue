<template>
    <ul>
        <li :class="{'is-active': currentView == 'wiki'}">
            <a :href="createDocLink('wiki')">
                <fontawesome icon="eye" />&nbsp;<span class="wiki-article-menu-text">읽기</span>
            </a>
        </li>
        <li :class="{'is-active': currentView == 'edit'}">
            <a :href="createDocLink('edit')">
                <fontawesome icon="edit" />&nbsp;<span class="wiki-article-menu-text">편집</span>
            </a>
        </li>
        <li :class="{'is-active': currentView.startsWith('thread')}">
            <a :href="createDocLink('thread')">
                <fontawesome icon="comments" />&nbsp;<span class="wiki-article-menu-text">토론</span>
            </a>
        </li>
        <li :class="{'is-active': currentView == 'move'}">
            <a :href="createDocLink('move')">
                <fontawesome icon="arrow-right" />&nbsp;<span class="wiki-article-menu-text">이동</span>
            </a>
        </li>
        <li :class="{'is-active': currentView == 'delete'}">
            <a :href="createDocLink('delete')">
                <fontawesome icon="trash-alt" />&nbsp;<span class="wiki-article-menu-text">삭제</span>
            </a>
        </li>
        <li :class="{'is-active': currentView == 'xref'}">
            <a :href="createDocLink('xref')">
                <fontawesome icon="random" />&nbsp;<span class="wiki-article-menu-text">역링크</span>
            </a>
        </li>
        <li :class="{'is-active': currentView == 'history'}">
            <a :href="createDocLink('history')">
                <fontawesome icon="history" />&nbsp;<span class="wiki-article-menu-text">역사</span>
            </a>
        </li>
        <li :class="{'is-active': currentView == 'acl'}">
            <a :href="createDocLink('acl')">
                <fontawesome icon="key" />&nbsp;<span class="wiki-article-menu-text">ACL</span>
            </a>
        </li>
        <li :class="starTabClasses">
            <a :href="toggleStarLink">
                <fontawesome icon="star" />
                <span v-if="starred" class="wiki-article-menu-text">별찜 해제(</span>
                <span v-else class="wiki-article-menu-text">별찜(</span>
                <span class="star-count">{{ starCount }}</span>
                <span class="wiki-article-menu-text">)</span>
            </a>
        </li>
        <li v-if="username">
            <a :href="userContribsLink">
                <fontawesome icon="chart-line" />&nbsp;<span class="wiki-article-menu">기여내역</span>
            </a>
        </li>
    </ul>
</template>

<style lang="sass" scoped>
@import "~bulma/sass/utilities/mixins.sass";
ul li
    +desktop
        .wiki-article-menu-text
            display: none;
    &:hover,
    &.is-active
        .wiki-article-menu-text
            display: initial;
    &.star-tab.starred a
        color: goldenrod;
        border-color: gold;
        background: gold;
</style>


<script>
    export default {
        name: 'article-hero-tabs',
        props: {
            docname: {
                type: String,
                required: true
            },
            starred: {
                type: Boolean,
                required: true
            },
            starCount: {
                type: Number,
                required: false
            },
            currentView: {
                type: String,
                required: false
            },
            username: {
                type: String,
                required: false
            }
        },
        methods: {
            createDocLink: function (action) {
                return '/' + action + '/' + encodeURIComponent(this.docname);
            }
        },
        computed: {
            toggleStarLink: function () {
                return (this.starred ? '/member/unstar/' : '/member/star') + encodeURIComponent(this.docname)
            },
            starTabClasses: function () {
                return {
                    'star-tab': true,
                    'starred': this.starred
                }
            },
            userContribsLink: function () {
                return '/contribution/author/' + this.username + '/document';
            }
        }
    }
</script>