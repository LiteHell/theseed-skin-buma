<template>
    <div class="buma">
        <div class="top-anchor"></div>
        <nav :class="bulma('nav navbar')" role="navigation" aria-label="main navigation">
            <div :class="bulma('navbar-brand')">
                <nuxt-link to="/" :class="bulma('navbar-item')"
                    ><img :src="$store.state.config['wiki.logo_url']" v-if="$store.state.config['wiki.logo_url']" />{{
                        $store.state.config['wiki.site_name']
                    }}</nuxt-link
                >
                <a :class="bulma({ 'navbar-burger': true, 'is-active': isNavbarActive })" @click.prevent="toggleNavbarBurger">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
            </div>
            <div :class="bulma({ 'navbar-menu': true, 'is-active': isNavbarActive })" id="mainNavbar">
                <div :class="bulma('navbar-start')">
                    <nuxt-link to="/RecentChanges" :class="bulma('navbar-item')">
                        <span :class="bulma('icon')"> <font-awesome-icon icon="fas fa-binoculars" /> </span>&nbsp;
                        최근 변경
                    </nuxt-link>
                    <nuxt-link to="/RecentDiscuss" :class="bulma('navbar-item')">
                        <span :class="bulma('icon')"> <font-awesome-icon icon="far fa-comments" /> </span>&nbsp;
                        최근 토론
                    </nuxt-link>
                    <b-dropdown icon="fas fa-cogs" label="도구">
                        <nuxt-link :class="bulma('navbar-item')" to="/NeededPages">
                            <span :class="bulma('icon')"> <font-awesome-icon icon="fas fa-beer" /> </span>&nbsp;
                            작성이 필요한 문서
                        </nuxt-link>
                        <nuxt-link :class="bulma('navbar-item')" to="/OrphanedPages">
                            <span :class="bulma('icon')"> <font-awesome-icon icon="far fa-frown" /> </span>&nbsp;
                            고립된 문서
                        </nuxt-link>
                        <nuxt-link :class="bulma('navbar-item')" to="/OrphanedCategories">
                            <span :class="bulma('icon')"> <font-awesome-icon icon="far fa-frown" /> </span>&nbsp;
                            고립된 분류
                        </nuxt-link>
                        <nuxt-link :class="bulma('navbar-item')" to="/UncategorizedPages">
                            <span :class="bulma('icon')">
                                <font-awesome-icon icon="far fa-question-circle" /> </span
                            >&nbsp; 분류가 되지 않은 문서
                        </nuxt-link>
                        <nuxt-link :class="bulma('navbar-item')" to="/OldPages">
                            <span :class="bulma('icon')"> <font-awesome-icon icon="fas fa-pause" /> </span>&nbsp;
                            편집된 지 오래된 문서
                        </nuxt-link>
                        <nuxt-link :class="bulma('navbar-item')" to="/ShortestPages">
                            <span :class="bulma('icon')"> <font-awesome-icon icon="far fa-thumbs-down" /> </span
                            >&nbsp; 내용이 짧은 문서
                        </nuxt-link>
                        <nuxt-link :class="bulma('navbar-item')" to="/LongestPages">
                            <span :class="bulma('icon')"> <font-awesome-icon icon="far fa-thumbs-up" /> </span
                            >&nbsp; 내용이 긴 문서
                        </nuxt-link>
                        <nuxt-link :class="bulma('navbar-item')" to="/BlockHistory">
                            <span :class="bulma('icon')"> <font-awesome-icon icon="fas fa-ban" /> </span>&nbsp; 차단
                            내역
                        </nuxt-link>
                        <nuxt-link :class="bulma('navbar-item')" to="/RandomPage">
                            <span :class="bulma('icon')"> <font-awesome-icon icon="fas fa-random" /> </span>&nbsp;
                            RandomPage
                        </nuxt-link>
                        <nuxt-link :class="bulma('navbar-item')" to="/Upload">
                            <span :class="bulma('icon')"> <font-awesome-icon icon="fas fa-cloud-upload-alt" /> </span
                            >&nbsp; 파일 올리기
                        </nuxt-link>
                        <nuxt-link :class="bulma('navbar-item')" to="/License">
                            <span :class="bulma('icon')"> <font-awesome-icon icon="far fa-copyright" /> </span
                            >&nbsp; 라이선스
                        </nuxt-link>

                        <template v-if="$store.state.session.menus.length">
                            <nuxt-link v-for="m in $store.state.session.menus" :to="m.l" v-bind:key="m.l" :class="bulma('navbar-item')"
                                ><span :class="bulma('icon')"> <font-awesome-icon icon="far fa-heart" /> </span
                                >&nbsp; {{ m.t }}</nuxt-link
                            >
                        </template>
                    </b-dropdown>
                </div>
                <div :class="bulma('navbar-end')">
                    <div :class="bulma('navbar-item is-hidden-touch')">
                        <search-form />
                    </div>
                    <template v-if="$store.state.session.account.type === 1">
                        <b-dropdown right-dropdown icon="fas fa-user" :label="$store.state.session.account.name">
                            <a href="#" @click.prevent="openSettingModal" :class="bulma('navbar-item')">
                                <span :class="bulma('icon')"> <font-awesome-icon icon="fas fa-wrench" /> </span
                                >&nbsp; 스킨 설정
                            </a>
                            <nuxt-link to="/member/mypage" :class="bulma('navbar-item')">
                                <span :class="bulma('icon')">
                                    <font-awesome-icon icon="far fa-user-circle" /> </span
                                >&nbsp; 내 정보
                            </nuxt-link>
                            <nuxt-link :to="doc_action_link(user_doc($store.state.session.account.name), 'w')" :class="bulma('navbar-item')">
                                <span :class="bulma('icon')">
                                    <font-awesome-icon icon="far fa-sticky-note" /> </span
                                >&nbsp; 내 사용자 문서
                            </nuxt-link>
                            <div :class="bulma('navbar-divider')"></div>
                            <nuxt-link :to="contribution_link($store.state.session.account.uuid)" :class="bulma('navbar-item')">
                                <span :class="bulma('icon')"> <font-awesome-icon icon="fas fa-chart-line" /> </span
                                >&nbsp; 내 문서 기여 목록
                            </nuxt-link>
                            <nuxt-link :to="contribution_link_discuss($store.state.session.account.uuid)" :class="bulma('navbar-item')">
                                <span :class="bulma('icon')"> <font-awesome-icon icon="fas fa-chart-bar" /> </span
                                >&nbsp; 내 토론 기여 목록
                            </nuxt-link>
                            <nuxt-link to="/member/starred_documents" :class="bulma('navbar-item')">
                                <span :class="bulma('icon')"> <font-awesome-icon icon="fas fa-bookmark" /> </span
                                >&nbsp; 별찜한 문서
                            </nuxt-link>
                            <div :class="bulma('navbar-divider')"></div>
                            <nuxt-link :to="{ path: '/member/logout', query: { redirect: $route.fullPath } }" :class="bulma('navbar-item')">
                                <span :class="bulma('icon')"> <font-awesome-icon icon="fas fa-sign-out-alt" /> </span
                                >&nbsp; 로그아웃
                            </nuxt-link>
                        </b-dropdown>
                    </template>

                    <template v-else>
                        <b-dropdown right-dropdown icon="fas fa-user-secret" label="익명">
                            <a href="#" @click.prevent="openSettingModal" :class="bulma('navbar-item')">
                                <span :class="bulma('icon')"> <font-awesome-icon icon="fas fa-wrench" /> </span
                                >&nbsp; 스킨 설정
                            </a>
                            <nuxt-link :to="contribution_link($store.state.session.account.uuid)" :class="bulma('navbar-item')">
                                <span :class="bulma('icon')"> <font-awesome-icon icon="fas fa-chart-line" /> </span
                                >&nbsp; 내 문서 기여 목록
                            </nuxt-link>
                            <nuxt-link :to="contribution_link_discuss($store.state.session.account.uuid)" :class="bulma('navbar-item')">
                                <span :class="bulma('icon')"> <font-awesome-icon icon="fas fa-chart-bar" /> </span
                                >&nbsp; 내 토론 기여 목록
                            </nuxt-link>
                            <div :class="bulma('navbar-divider')"></div>
                            <nuxt-link :to="{ path: '/member/login', query: { redirect: $route.fullPath } }" :class="bulma('navbar-item')">
                                <span :class="bulma('icon')"> <font-awesome-icon icon="fas fa-sign-in-alt" /> </span
                                >&nbsp; 로그인
                            </nuxt-link>
                        </b-dropdown>
                    </template>
                </div>
            </div>
        </nav>
        <nav class="mobile-search-navbar" :class="bulma('nav navbar is-hidden-desktop')">
            <div :class="bulma('navbar-brand')">
                <div :class="bulma('navbar-item')">
                    <search-form />
                </div>
            </div>
        </nav>
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
            <div :class="bulma('hero-body')">
                <div :class="bulma('container')">
                    <h1 :class="bulma('title')" v-text="$store.state.page.title" />
                    <h2 :class="bulma('subtitle')">
                        <span v-if="$store.state.page.viewName === 'wiki' && $store.state.page.data.date">
                            <local-date :date="$store.state.page.data.date" />에 마지막으로 수정됐습니다.
                        </span>

                        <span v-else-if="$store.state.page.viewName === 'notfound'"> 존재하지 않는 문서입니다. 직접 자유롭게 기여해보세요! </span>

                        <span v-else> Powered by the seed engine </span>
                    </h2>
                </div>
            </div>
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
                    v-if="
                        $store.state.session.user_document_discuss &&
                        $store.state.localConfig['wiki.hide_user_document_discuss'] !== $store.state.session.user_document_discuss
                    "
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
        <footer :class="bulma('footer')">
            <div :class="bulma('container')">
                <div :class="bulma('content has-text-centered')">
                    <p>
                        <span v-html="$store.state.config['wiki.copyright_text']" />
                        <span v-html="$store.state.config['wiki.footer_text']" />

                        theseed-skin-buma by LiteHell, the seed engine by theseed.io <br />
                        theseed-skin-buma is distributed under
                        <a href="https://www.gnu.org/licenses/gpl-3.0.html">GNU General Public License Version 3</a>
                    </p>
                </div>
            </div>
        </footer>
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
import SettingModal from './components/settingModal';
import LocalDate from '~/components/localDate';
import SearchForm from './components/searchForm';
import BNotification from './components/b-notification';
import JumpButtons from './components/jumpButtons';
import BDropdown from './components/b-dropdown';
import skinLicense from './components/skinLicense';
import bulma from './src/bulma';

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
        skinLicense
    },
    loadingBarColor(isDark) {
        return isDark ? 'white' : 'black';
    },
    data: function () {
        return {
            isNavbarActive: false
        };
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
        toggleNavbarBurger() {
            this.isNavbarActive = !this.isNavbarActive;
        },
        openSettingModal() {
            this.$vfm.show({ component: SettingModal });
        },
        bulma
    },
    mounted() {
        this.changeTheme(this.$store.state.currentTheme);
    }
};
</script>
