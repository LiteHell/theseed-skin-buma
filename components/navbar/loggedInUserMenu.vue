<template>
    <b-dropdown right-dropdown :icon="faUser" :label="name">
        <SettingModalLink :class="bulma('navbar-item')">
            <span :class="bulma('icon')"> <font-awesome-icon :icon="faWrench" /> </span>&nbsp; 스킨 설정
        </SettingModalLink>
        <template v-for="(submenus, i) in menus">
            <nuxt-link :to="submenu.href" :class="bulma('navbar-item')" v-for="submenu in submenus">
                <span :class="bulma('icon')">
                    <font-awesome-icon :icon="submenu.icon" />
                </span>
                &nbsp;{{ submenu.text }}
            </nuxt-link>
            <div :class="bulma('navbar-divider')" v-if="i !== menus.length - 1"></div>
        </template>
    </b-dropdown>
</template>

<script>
import BDropdown from '../b-dropdown';
import Common from '~/mixins/common';
import SettingModalLink from './settingModalLink'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import bulma from '../../src/bulma';
import { faUserCircle, faStickyNote } from '@fortawesome/free-regular-svg-icons';
import { faFileAlt, faFileContract, faFileSignature, faBookmark, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faUser, faWrench } from '@fortawesome/free-solid-svg-icons';

export default {
    mixins: [Common],
    created() {
        this.faUser = faUser;
        this.faWrench = faWrench;
    },
    components: {
        BDropdown,
        FontAwesomeIcon
    },
    methods: {
        bulma
    },
    computed: {
        name() {
            return this.$store.state.session.account.name;
        },
        menus() {
            const name = this.$store.state.session.account.name;
            const uuid = this.$store.state.session.account.uuid;
            return [
                [
                    {
                        href: '/member/mypage',
                        icon: faUserCircle,
                        text: '내 정보'
                    }, {
                        href: this.doc_action_link(this.user_doc(name), 'w'),
                        icon: faStickyNote,
                        text: '내 사용자 문서'
                    }
                ], [
                    {
                        href: this.contribution_link(uuid),
                        icon: faFileAlt,
                        text: '내 문서 기여 목록'
                    }, {
                        href: this.contribution_link_discuss(uuid),
                        icon: faFileContract,
                        text: '내 토론 기여 목록'
                    }, {
                        href: this.contribution_link_edit_request(uuid),
                        icon: faFileSignature,
                        text: '내 편집 요청 기여 목록'
                    }, {
                        href: '/member/starred_documents',
                        icon: faBookmark,
                        text: '별찜한 문서'
                    }
                ], [
                    {
                        href: { path: '/member/logout', query: { redirect: this.$route.fullPath } },
                        icon: faSignOutAlt,
                        text: '로그아웃'
                    }
                ]];
        }
    }
}
</script>