<template>
    <ul>
        <li :class="{'is-active': currentView == 'wiki'}">
            <nuxt-link :to="this.docname | doc_action_link('wiki')">
                <fontawesome icon="eye" />&nbsp;<span class="wiki-article-menu-text">읽기</span>
            </nuxt-link>
        </li>
        <li :class="{'is-active': currentView == 'edit'}">
            <nuxt-link :to="this.docname | doc_action_link('edit')">
                <fontawesome icon="edit" />&nbsp;<span class="wiki-article-menu-text">편집</span>
            </nuxt-link>
        </li>
        <li :class="{'is-active': currentView.startsWith('thread')}">
            <nuxt-link :to="this.docname | doc_action_link('thread')">
                <fontawesome icon="comments" />&nbsp;<span class="wiki-article-menu-text">토론</span>
            </nuxt-link>
        </li>
        <li :class="{'is-active': currentView == 'move'}">
            <nuxt-link :to="this.docname | doc_action_link('move')">
                <fontawesome icon="arrow-right" />&nbsp;<span class="wiki-article-menu-text">이동</span>
            </nuxt-link>
        </li>
        <li :class="{'is-active': currentView == 'delete'}">
            <nuxt-link :to="this.docname | doc_action_link('delete')">
                <fontawesome icon="trash-alt" />&nbsp;<span class="wiki-article-menu-text">삭제</span>
            </nuxt-link>
        </li>
        <li :class="{'is-active': currentView == 'xref'}">
            <nuxt-link :to="this.docname | doc_action_link('xref')">
                <fontawesome icon="random" />&nbsp;<span class="wiki-article-menu-text">역링크</span>
            </nuxt-link>
        </li>
        <li :class="{'is-active': currentView == 'history'}">
            <nuxt-link :to="this.docname | doc_action_link('history')">
                <fontawesome icon="history" />&nbsp;<span class="wiki-article-menu-text">역사</span>
            </nuxt-link>
        </li>
        <li :class="{'is-active': currentView == 'acl'}">
            <nuxt-link :to="this.docname | doc_action_link('acl')">
                <fontawesome icon="key" />&nbsp;<span class="wiki-article-menu-text">ACL</span>
            </nuxt-link>
        </li>
        <li :class="starTabClasses">
            <nuxt-link v-if="starred" :to="docname | doc_action_link('member/unstar')">
                <fontawesome icon="star" />
                <span class="wiki-article-menu-text">별찜 해제(</span>
                <span class="star-count">{{ starCount }}</span>
                <span class="wiki-article-menu-text">)</span>
            </nuxt-link>
            <nuxt-link v-else :to="docname | doc_action_link('member/star')">
                <fontawesome icon="star" />
                <span class="wiki-article-menu-text">별찜(</span>
                <span class="star-count">{{ starCount }}</span>
                <span class="wiki-article-menu-text">)</span>
            </nuxt-link>
        </li>
        <li v-if="username">
            <nuxt-link :to="userContribsLink">
                <fontawesome icon="chart-line" />&nbsp;<span class="wiki-article-menu">기여내역</span>
            </nuxt-link>
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
                type: Object,
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
        },
        computed: {
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