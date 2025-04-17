<template>
    <bDropdown right-dropdown :icon="faUserSecret" label="익명">
        <settingModalLink :class="bulma('navbar-item')">
            <span :class="bulma('icon')"> <FontAwesomeIcon :icon="faWrench" /> </span>&nbsp; 스킨 설정
        </settingModalLink>
        <template v-if="uuid">
            <nuxtLink :to="contribution_link(uuid)" :class="bulma('navbar-item')">
                <span :class="bulma('icon')"> <FontAwesomeIcon :icon="faFileAlt" /> </span>&nbsp; 내 문서 기여 목록
            </nuxtLink>
            <nuxtLink :to="contribution_link_discuss(uuid)" :class="bulma('navbar-item')">
                <span :class="bulma('icon')"> <FontAwesomeIcon :icon="faFileContract" /> </span>&nbsp; 내 토론 기여 목록
            </nuxtLink>
            <nuxtLink :to="contribution_link_edit_request(uuid)" :class="bulma('navbar-item')">
                <span :class="bulma('icon')"> <FontAwesomeIcon :icon="faFileSignature" /> </span>&nbsp; 내 편집 요청 기여 목록
            </nuxtLink>
        </template>
        <div :class="bulma('navbar-divider')"></div>
        <nuxtLink :to="{ path: '/member/login', query: { redirect: $route.fullPath } }" :class="bulma('navbar-item')">
            <span :class="bulma('icon')"> <FontAwesomeIcon :icon="faSignInAlt" /> </span>&nbsp; 로그인
        </nuxtLink>
    </bDropdown>
</template>

<script>
import common from '~/mixins/common';
import bulma from '../../src/bulma';
import bDropdown from '../bulma/b-dropdown.vue';
import settingModalLink from './settingModalLink.vue';
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
    mixins: [common],
    components: {
        bDropdown,
        settingModalLink,
        FontAwesomeIcon
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
};
</script>
