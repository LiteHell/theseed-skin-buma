<template>
    <b-dropdown right-dropdown :icon="faUserSecret" label="익명">
        <SettingModalLink :class="bulma('navbar-item')">
            <span :class="bulma('icon')"> <font-awesome-icon :icon="faWrench" /> </span>&nbsp; 스킨 설정
        </SettingModalLink>
        <template v-if="uuid">
            <nuxt-link :to="contribution_link(uuid)" :class="bulma('navbar-item')">
                <span :class="bulma('icon')"> <font-awesome-icon :icon="faFileAlt" /> </span>&nbsp;
                내 문서 기여 목록
            </nuxt-link>
            <nuxt-link :to="contribution_link_discuss(uuid)" :class="bulma('navbar-item')">
                <span :class="bulma('icon')"> <font-awesome-icon :icon="faFileContract" />
                </span>&nbsp; 내 토론 기여 목록
            </nuxt-link>
            <nuxt-link :to="contribution_link_edit_request(uuid)"
                :class="bulma('navbar-item')">
                <span :class="bulma('icon')"> <font-awesome-icon :icon="faFileSignature" />
                </span>&nbsp; 내 편집 요청 기여 목록
            </nuxt-link>
        </template>
        <div :class="bulma('navbar-divider')"></div>
        <nuxt-link :to="{ path: '/member/login', query: { redirect: $route.fullPath } }" :class="bulma('navbar-item')">
            <span :class="bulma('icon')"> <font-awesome-icon :icon="faSignInAlt" /> </span>&nbsp;
            로그인
        </nuxt-link>
    </b-dropdown>
</template>

<script>
import BDropdown from '../b-dropdown';
import Common from '~/mixins/common';
import bulma from '../../src/bulma';
import SettingModalLink from './settingModalLink.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faWrench, faFileAlt, faFileContract, faFileSignature, faSignInAlt, faUserSecret } from '@fortawesome/free-solid-svg-icons';

export default {
    created() {
        this.faWrench = faWrench;
        this.faFileAlt = faFileAlt;
        this.faFileContract = faFileContract;
        this.faFileSignature = faFileSignature;
        this.faSignInAlt = faSignInAlt;
        this.faUserSecret = faUserSecret;
    },
    mixins: [Common],
    components: {
        BDropdown,
        FontAwesomeIcon,
        SettingModalLink
    },
    methods: {
        bulma
    },
    computed: {
        name() {
            return this.$store.state.session.account.name;
        },
        uuid() {
            return this.$store.state.session.account.uuid;
        }
    }
}
</script>