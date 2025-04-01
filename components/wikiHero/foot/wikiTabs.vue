<template>
    <ul>
        <template v-for="menu in menus">
            <li v-if="menu.starTab" class="star-tab" v-bind:class="{ starred: menu.starred }">
                <nuxt-link :to="menu.starred ? menu.unstarLink : menu.starLink">
                    <span :class="bulma('icon')">
                        <FontAwesomeIcon :icon="faStar" />
                    </span>
                    <span class="wiki-article-menu-text"> {{ menu.starred ? '별찜 해제' : '별찜'}} (</span><span class="star-count">{{
                        menu.starCount }}</span><span class="wiki-article-menu-text">)</span>
                </nuxt-link>
            </li>
            <li v-else v-bind:class="bulma({ 'is-active': menu.active }, true)">
                <nuxt-link :to="menu.href">
                    <span :class="bulma('icon')">
                        <FontAwesomeIcon :icon="menu.icon" />
                    </span>
                    <span class="wiki-article-menu-text"> {{ menu.text }}</span>
                </nuxt-link>
            </li>
        </template>

    </ul>
</template>

<script>
import Common from '~/mixins/common';
import bulma from '../../../src/bulma';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faRandom } from '@fortawesome/free-solid-svg-icons';
import { faHistory } from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default {
    mixins: [Common],
    methods: { bulma },
    created() {
        this.faStar = faStar;
    },
    components: {
        FontAwesomeIcon
    },
    computed: {
        menus() {
            const viewName = this.$store.state.page.viewName;
            const document = this.$store.state.page?.data?.document;
            let menus = [
                {
                    active: ['wiki', 'notfound'].includes(viewName),
                    href: this.doc_action_link(document, 'w'),
                    icon: faEye,
                    text: '읽기'
                },
                {
                    active: ['edit', 'edit_request', 'edit_edit_request'].includes(viewName),
                    href: this.doc_action_link(document, 'edit'),
                    icon: faEdit,
                    text: '편집'
                },
                {
                    active: ['thread', 'thread_list', 'thread_list_clone'].includes(viewName),
                    href: this.doc_action_link(document, 'discuss'),
                    icon: faComments,
                    text: '토론'
                },
                {
                    active: viewName === 'move',
                    href: this.doc_action_link(document, 'move'),
                    icon: faArrowRight,
                    text: '이동'
                },
                {
                    active: viewName === 'delete',
                    href: this.doc_action_link(document, 'delete'),
                    icon: faTrashAlt,
                    text: '삭제'
                },
                {
                    active: viewName === 'backlink',
                    href: this.doc_action_link(document, 'backlink'),
                    icon: faRandom,
                    text: '역링크'
                },
                {
                    active: viewName === 'history',
                    href: this.doc_action_link(document, 'history'),
                    icon: faHistory,
                    text: '역사'
                },
                {
                    active: viewName === 'acl',
                    href: this.doc_action_link(document, 'acl'),
                    icon: faKey,
                    text: 'ACL'
                },
            ];

            if (viewName === 'wiki')
                menus.push(
                    {
                        starTab: true,
                        starred: this.$store.state.page.data.starred,
                        starCount: this.$store.state.page.data.star_count,
                        starLink: this.doc_action_link(document, 'member/star'),
                        unstarLink: this.doc_action_link(document, 'member/unstar')
                    }
                )

            if (this.$store.state.page.data.user)
                menus.push({
                    active: false,
                    href: this.contribution_link(this.$store.state.page.data.user.uuid),
                    icon: faChartLine,
                    text: '기여 목록'
                })

            return menus;
        }
    }
}
</script>