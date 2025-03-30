<template>
    <div class="buma">
        <div class="top-anchor"></div>
        <Navbar />
        <MobileSearchNavbar />
        <section
            id="wiki-main-title"
            :class="
                bulma({
                    hero: true,
                    [$store.state.page.viewName === 'error' || $store.state.page.title === '오류'
                        ? 'is-danger'
                        : $store.state.page.viewName === 'notfound'
                        ? 'is-warning'
                        : 'is-primary']: true
                })
            "
        >
            <TitleHeroBody />
            <div :class="bulma('hero-foot')">
                <nav :class="bulma('tabs is-left is-boxed')" id="wiki-article-menu">
                    <div :class="bulma('container')">
                        <ul v-if="$store.state.page.data.document">
                            <li
                                v-bind:class="
                                    bulma({ 'is-active': $store.state.page.viewName === 'wiki' || $store.state.page.viewName === 'notfound' }, true)
                                "
                            >
                                <nuxt-link :to="doc_action_link($store.state.page.data.document, 'w')">
                                    <span :class="bulma('icon')">
                                        <font-awesome-icon icon="fas fa-eye" />
                                    </span>
                                    <span class="wiki-article-menu-text"> 읽기</span>
                                </nuxt-link>
                            </li>
                            <li
                                v-bind:class="
                                    bulma(
                                        {
                                            'is-active':
                                                $store.state.page.viewName === 'edit' ||
                                                $store.state.page.viewName === 'edit_request' ||
                                                $store.state.page.viewName === 'edit_edit_request'
                                        },
                                        true
                                    )
                                "
                            >
                                <nuxt-link :to="doc_action_link($store.state.page.data.document, 'edit')" class="edit-anchor">
                                    <span :class="bulma('icon')">
                                        <font-awesome-icon icon="fas fa-edit" />
                                    </span>
                                    <span class="wiki-article-menu-text"> 편집</span>
                                </nuxt-link>
                            </li>
                            <li
                                v-bind:class="
                                    bulma({ 'is-active': ['thread', 'thread_list', 'thread_list_close'].includes($store.state.page.viewName) }, true)
                                "
                            >
                                <nuxt-link :to="doc_action_link($store.state.page.data.document, 'discuss')">
                                    <span :class="bulma('icon')">
                                        <font-awesome-icon icon="far fa-comments" />
                                    </span>
                                    <span class="wiki-article-menu-text"> 토론</span>
                                </nuxt-link>
                            </li>
                            <li v-bind:class="bulma({ 'is-active': $store.state.page.viewName === 'move' }, true)">
                                <nuxt-link :to="doc_action_link($store.state.page.data.document, 'move')">
                                    <span :class="bulma('icon')">
                                        <font-awesome-icon icon="fas fa-arrow-right" />
                                    </span>
                                    <span class="wiki-article-menu-text"> 이동</span>
                                </nuxt-link>
                            </li>
                            <li v-bind:class="bulma({ 'is-active': $store.state.page.viewName === 'delete' }, true)">
                                <nuxt-link :to="doc_action_link($store.state.page.data.document, 'delete')">
                                    <span :class="bulma('icon')">
                                        <font-awesome-icon icon="far fa-trash-alt" />
                                    </span>
                                    <span class="wiki-article-menu-text"> 삭제</span>
                                </nuxt-link>
                            </li>
                            <li v-bind:class="bulma({ 'is-active': $store.state.page.viewName === 'backlink' }, true)">
                                <nuxt-link :to="doc_action_link($store.state.page.data.document, 'backlink')">
                                    <span :class="bulma('icon')">
                                        <font-awesome-icon icon="fas fa-random" />
                                    </span>
                                    <span class="wiki-article-menu-text"> 역링크</span>
                                </nuxt-link>
                            </li>
                            <li v-bind:class="bulma({ 'is-active': $store.state.page.viewName === 'history' }, true)">
                                <nuxt-link :to="doc_action_link($store.state.page.data.document, 'history')">
                                    <span :class="bulma('icon')">
                                        <font-awesome-icon icon="fas fa-history" />
                                    </span>
                                    <span class="wiki-article-menu-text"> 역사</span>
                                </nuxt-link>
                            </li>
                            <li v-bind:class="bulma({ 'is-active': $store.state.page.viewName === 'acl' }, true)">
                                <nuxt-link :to="doc_action_link($store.state.page.data.document, 'acl')">
                                    <span :class="bulma('icon')">
                                        <font-awesome-icon icon="fas fa-key" />
                                    </span>
                                    <span class="wiki-article-menu-text"> ACL</span>
                                </nuxt-link>
                            </li>

                            <li
                                v-if="$store.state.page.viewName === 'wiki'"
                                class="star-tab"
                                v-bind:class="{ starred: $store.state.page.data.starred }"
                            >
                                <nuxt-link
                                    v-if="$store.state.page.data.starred"
                                    :to="doc_action_link($store.state.page.data.document, 'member/unstar')"
                                >
                                    <span :class="bulma('icon')">
                                        <font-awesome-icon icon="fas fa-star" />
                                    </span>
                                    <span class="wiki-article-menu-text"> 별찜 해제 (</span
                                    ><span class="star-count">{{ $store.state.page.data.star_count }}</span
                                    ><span class="wiki-article-menu-text">)</span>
                                </nuxt-link>
                                <nuxt-link
                                    v-else-if="$store.state.page.data.star_count >= 0"
                                    :to="doc_action_link($store.state.page.data.document, 'member/star')"
                                >
                                    <span :class="bulma('icon')">
                                        <font-awesome-icon icon="fas fa-star" />
                                    </span>
                                    <span class="wiki-article-menu-text"> 별찜 (</span
                                    ><span class="star-count">{{ $store.state.page.data.star_count }}</span
                                    ><span class="wiki-article-menu-text">)</span>
                                </nuxt-link>
                            </li>

                            <li v-if="$store.state.page.data.user">
                                <nuxt-link :to="contribution_link($store.state.page.data.user.uuid)">
                                    <span :class="bulma('icon')">
                                        <font-awesome-icon icon="fas fa-chart-line" />
                                    </span>
                                    <span class="wiki-article-menu-text"> 기여 목록</span>
                                </nuxt-link>
                            </li>
                        </ul>

                        <ul v-else>
                            <li :class="bulma('is-active', true)">
                                <a href="#">
                                    <span :class="bulma('icon')">
                                        <font-awesome-icon icon="fas fa-cogs" />
                                    </span>
                                    <span class="wiki-article-menu-text"> 특수 문서</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </section>
        <section :class="bulma('section')">
            <div :class="bulma('container')">
                <b-notification v-if="$store.state.config['wiki.sitenotice']" color="is-warning">
                    <span v-html="$store.state.config['wiki.sitenotice']" />
                </b-notification>

                <b-notification
                    v-if="hasUnreadUserDiscussion"
                    :class="bulma('is-link')"
                >
                    <nuxt-link :to="doc_action_link(user_doc($store.state.session.account.name), 'discuss')">사용자 토론</nuxt-link>이 있습니다.
                    확인해주세요.
                </b-notification>

                <div class="wiki-article" @dblclick="doBehaviorWhenDblClick">
                    <nuxt />

                    <skin-license v-if="$store.state.page.viewName === 'license'"></skin-license>
                </div>
            </div>
        </section>
        <BumaFooter />
        <jump-buttons />
    </div>
</template>

<style>
@import './css/bulma.min.css';
@import './css/layout.min.css';
</style>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import Common from '~/mixins/common';
import LocalDate from '~/components/localDate';
import SearchForm from './components/searchForm';
import BNotification from './components/b-notification';
import JumpButtons from './components/jumpButtons';
import BDropdown from './components/b-dropdown';
import skinLicense from './components/skinLicense';
import bulma from './src/bulma';
import TitleHeroBody from './components/titleHeroBody.vue';
import BumaFooter from './components/footer.vue';
import Navbar from './components/navbar/navbar.vue';
import MobileSearchNavbar from './components/navbar/mobileSearchNavbar.vue';

library.add(fas, far);

export default {
    mixins: [Common],
    components: {
        FontAwesomeIcon,
        LocalDate,
        SearchForm,
        BNotification,
        JumpButtons,
        BDropdown,
        skinLicense,
        TitleHeroBody,
        BumaFooter,
        Navbar,
        MobileSearchNavbar
    },
    loadingBarColor(isDark) {
        return isDark ? 'white' : 'black';
    },
    computed: {
        hasUnreadUserDiscussion() {
            return this.$store.state.session.user_document_discuss &&
                this.$store.state.localConfig['wiki.hide_user_document_discuss'] !== this.$store.state.session.user_document_discuss;
        }
    },
    watch: {
        '$store.state.currentTheme'(newValue) {
            this.changeTheme(newValue);
        }
    },
    methods: {
        changeTheme(theme) {
            document.documentElement.dataset.theme = theme;
        },
        doBehaviorWhenDblClick() {
            if (!this.$store.state.page.data.document) return;

            const action = this.$store.state.localConfig['buma.behaviorWhenDblClick'];
            switch (action) {
                case 'edit':
                case 'history':
                    const link = this.doc_action_link(this.$store.state.page.data.document, action);
                    this.$router.push(link);
                    break;
                case 'doNothing':
                case 'skinDefault':
                default:
                    break;
            }
        },
        bulma
    },
    mounted() {
        this.changeTheme(this.$store.state.currentTheme);
    }
};
</script>
