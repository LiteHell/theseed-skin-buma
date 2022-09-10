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
                <a :class="bulma({'navbar-burger': true, 'is-active': isNavbarActive})" @click.prevent="toggleNavbarBurger">
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
            </div>
            <div :class="bulma({'navbar-menu': true, 'is-active': isNavbarActive})" id="mainNavbar">
                <div :class="bulma('navbar-start')">
                    <nuxt-link to="/RecentChanges" :class="bulma('navbar-item')">
                        <span :class="bulma('icon')">
                            <i class="fas fa-binoculars"></i> </span
                        >&nbsp; 최근 변경
                    </nuxt-link>
                    <nuxt-link to="/RecentDiscuss" :class="bulma('navbar-item')">
                        <span :class="bulma('icon')">
                            <i class="far fa-comments"></i> </span
                        >&nbsp; 최근 토론
                    </nuxt-link>
                    <b-dropdown icon="fas fa-cogs" label="도구">
                        <nuxt-link :class="bulma('navbar-item')" to="/NeededPages">
                            <span :class="bulma('icon')">
                                <i class="fas fa-beer"></i> </span
                            >&nbsp; 작성이 필요한 문서
                        </nuxt-link>
                        <nuxt-link :class="bulma('navbar-item')" to="/OrphanedPages">
                            <span :class="bulma('icon')">
                                <i class="far fa-frown"></i> </span
                            >&nbsp; 고립된 문서
                        </nuxt-link>
                        <nuxt-link :class="bulma('navbar-item')" to="/UncategorizedPages">
                            <span :class="bulma('icon')">
                                <i class="far fa-question-circle"></i> </span
                            >&nbsp; 분류가 되지 않은 문서
                        </nuxt-link>
                        <nuxt-link :class="bulma('navbar-item')" to="/OldPages">
                            <span :class="bulma('icon')">
                                <i class="fas fa-pause"></i> </span
                            >&nbsp; 편집된 지 오래된 문서
                        </nuxt-link>
                        <nuxt-link :class="bulma('navbar-item')" to="/ShortestPages">
                            <span :class="bulma('icon')">
                                <i class="far fa-thumbs-down"></i> </span
                            >&nbsp; 내용이 짧은 문서
                        </nuxt-link>
                        <nuxt-link :class="bulma('navbar-item')" to="/LongestPages">
                            <span :class="bulma('icon')">
                                <i class="far fa-thumbs-up"></i> </span
                            >&nbsp; 내용이 긴 문서
                        </nuxt-link>
                        <nuxt-link :class="bulma('navbar-item')" to="/BlockHistory">
                            <span :class="bulma('icon')">
                                <i class="fas fa-ban"></i> </span
                            >&nbsp; 차단 내역
                        </nuxt-link>
                        <nuxt-link :class="bulma('navbar-item')" to="/RandomPage">
                            <span :class="bulma('icon')">
                                <i class="fas fa-random"></i> </span
                            >&nbsp; RandomPage
                        </nuxt-link>
                        <nuxt-link :class="bulma('navbar-item')" to="/Upload">
                            <span :class="bulma('icon')">
                                <i class="fas fa-cloud-upload-alt"></i> </span
                            >&nbsp; 파일 올리기
                        </nuxt-link>
                        <nuxt-link :class="bulma('navbar-item')" to="/License">
                            <span :class="bulma('icon')">
                                <i class="far fa-copyright"></i> </span
                            >&nbsp; 라이선스
                        </nuxt-link>

                        <template v-if="$store.state.session.menus.length">
                            <nuxt-link v-for="m in $store.state.session.menus" :to="m.l" v-bind:key="m.l" :class="bulma('navbar-item')" v-text="m.t" />
                        </template>
                    </b-dropdown>
                </div>
                <div :class="bulma('navbar-end')">
                    <div :class="bulma('navbar-item is-hidden-touch')">
                        <search-form />
                    </div>
                    <template v-if="$store.state.session.member">
                        <b-dropdown right-dropdown icon="fas fa-user" :label="$store.state.session.member.username">
                            <a href="#" @click.prevent="$modal.show('theseed-setting')" :class="bulma('navbar-item')">
                                <span :class="bulma('icon')">
                                    <i class="fas fa-wrench"></i>
                                </span>&nbsp;
                                스킨 설정
                            </a>
                            <nuxt-link to="/member/mypage" :class="bulma('navbar-item')">
                                <span :class="bulma('icon')">
                                    <i class="far fa-user-circle"></i>
                                </span>&nbsp;
                                내정보
                            </nuxt-link>
                            <nuxt-link :to="doc_action_link(user_doc($store.state.session.member.username), 'w')" :class="bulma('navbar-item')">
                                <span :class="bulma('icon')">
                                    <i class="far fa-sticky-note"></i>
                                </span>&nbsp;
                                내 사용자 문서
                            </nuxt-link>
                            <div :class="bulma('navbar-divider')"></div>
                            <nuxt-link :to="contribution_author_link($store.state.session.member.username)" :class="bulma('navbar-item')">
                                <span :class="bulma('icon')">
                                    <i class="fas fa-chart-line"></i>
                                </span>&nbsp;
                                내 문서 기여 목록
                            </nuxt-link>
                            <nuxt-link :to="contribution_author_link_discuss($store.state.session.member.username)" :class="bulma('navbar-item')">
                                <span :class="bulma('icon')">
                                    <i class="fas fa-chart-bar"></i>
                                </span>&nbsp;
                                내 토론 기여 목록
                            </nuxt-link>
                            <nuxt-link to="/member/starred_documents" :class="bulma('navbar-item')">
                                <span :class="bulma('icon')">
                                    <i class="fas fa-bookmark"></i>
                                </span>&nbsp;
                                별찜한 문서들
                            </nuxt-link>
                            <div :class="bulma('navbar-divider')"></div>
                            <nuxt-link :to="{ path: '/member/logout', query: { redirect: $route.fullPath } }" :class="bulma('navbar-item')">
                                <span :class="bulma('icon')">
                                    <i class="fas fa-sign-out-alt"></i>
                                </span>&nbsp;
                                로그아웃
                            </nuxt-link>
                        </b-dropdown>
                    </template>

                    <template v-else>
                        <b-dropdown right-dropdown icon="fas fa-user-secret" label="익명">
                            <a href="#" @click.prevent="$modal.show('theseed-setting')" :class="bulma('navbar-item')">
                                <span :class="bulma('icon')">
                                    <i class="fas fa-wrench"></i>
                                </span>&nbsp;
                                스킨 설정
                            </a>
                            <nuxt-link :to="contribution_ip_link($store.state.session.ip)" :class="bulma('navbar-item')">
                                <span :class="bulma('icon')">
                                    <i class="fas fa-chart-line"></i>
                                </span>&nbsp;
                                내 문서 기여 목록
                            </nuxt-link>
                            <nuxt-link :to="contribution_ip_link_discuss($store.state.session.ip)" :class="bulma('navbar-item')">
                                <span :class="bulma('icon')">
                                    <i class="fas fa-chart-bar"></i>
                                </span>&nbsp;
                                내 토론 기여 목록
                            </nuxt-link>
                            <div :class="bulma('navbar-divider')"></div>
                            <nuxt-link :to="{ path: '/member/login', query: { redirect: $route.fullPath } }" :class="bulma('navbar-item')">
                                <span :class="bulma('icon')">
                                    <i class="fas fa-sign-in-alt"></i>
                                </span>&nbsp;
                                로그인
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
            :class="bulma({ 'hero': true, [$store.state.page.data.error || $store.state.page.viewName == 'notfound' ? 'is-danger' : 'is-primary']: true })"
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
                            <li v-bind:class="bulma({ 'is-active': $store.state.page.viewName === 'wiki' }, true)">
                                <nuxt-link :to="doc_action_link($store.state.page.data.document, 'w')">
                                    <span :class="bulma('icon')">
                                        <i class="fas fa-eye"></i>
                                    </span>
                                    <span class="wiki-article-menu-text"> 읽기</span>
                                </nuxt-link>
                            </li>
                            <li v-bind:class="bulma({ 'is-active': $store.state.page.viewName === 'edit' }, true)">
                                <nuxt-link :to="doc_action_link($store.state.page.data.document, 'edit')" class="edit-anchor">
                                    <span :class="bulma('icon')">
                                        <i class="fas fa-edit"></i>
                                    </span>
                                    <span class="wiki-article-menu-text"> 편집</span>
                                </nuxt-link>
                            </li>
                            <li v-bind:class="bulma({ 'is-active': ['thread', 'thread_list', 'thread_list_close'].includes($store.state.page.viewName) }, true)">
                                <nuxt-link :to="doc_action_link($store.state.page.data.document, 'discuss')">
                                    <span :class="bulma('icon')">
                                        <i class="far fa-comments"></i>
                                    </span>
                                    <span class="wiki-article-menu-text"> 토론</span>
                                </nuxt-link>
                            </li>
                            <li v-bind:class="bulma({ 'is-active': $store.state.page.viewName === 'move' }, true)">
                                <nuxt-link :to="doc_action_link($store.state.page.data.document, 'move')">
                                    <span :class="bulma('icon')">
                                        <i class="fas fa-arrow-right"></i>
                                    </span>
                                    <span class="wiki-article-menu-text"> 이동</span>
                                </nuxt-link>
                            </li>
                            <li v-bind:class="bulma({ 'is-active': $store.state.page.viewName === 'delete' }, true)">
                                <nuxt-link :to="doc_action_link($store.state.page.data.document, 'delete')">
                                    <span :class="bulma('icon')">
                                        <i class="far fa-trash-alt"></i>
                                    </span>
                                    <span class="wiki-article-menu-text"> 삭제</span>
                                </nuxt-link>
                            </li>
                            <li v-bind:class="bulma({ 'is-active': $store.state.page.viewName === 'backlink' }, true)">
                                <nuxt-link :to="doc_action_link($store.state.page.data.document, 'backlink')">
                                    <span :class="bulma('icon')">
                                        <i class="fas fa-random"></i>
                                    </span>
                                    <span class="wiki-article-menu-text"> 역링크</span>
                                </nuxt-link>
                            </li>
                            <li v-bind:class="bulma({ 'is-active': $store.state.page.viewName === 'history' }, true)">
                                <nuxt-link :to="doc_action_link($store.state.page.data.document, 'history')">
                                    <span :class="bulma('icon')">
                                        <i class="fas fa-history"></i>
                                    </span>
                                    <span class="wiki-article-menu-text"> 역사</span>
                                </nuxt-link>
                            </li>
                            <li v-bind:class="bulma({ 'is-active': $store.state.page.viewName === 'acl' }, true)">
                                <nuxt-link :to="doc_action_link($store.state.page.data.document, 'acl')">
                                    <span :class="bulma('icon')">
                                        <i class="fas fa-key"></i>
                                    </span>
                                    <span class="wiki-article-menu-text"> ACL</span>
                                </nuxt-link>
                            </li>

                            <!-- [나무위키] main.b9faec2b37c8d51a1d7e.js 참고함 -->
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
                                        <i class="fas fa-star"></i>
                                    </span>
                                    <span class="wiki-article-menu-text"> 별찜 해제 (</span
                                    ><span class="star-count">{{ $store.state.page.data.star_count ? $store.state.page.data.star_count : '' }}</span
                                    ><span class="wiki-article-menu-text">)</span>
                                </nuxt-link>
                                <nuxt-link v-else :to="doc_action_link($store.state.page.data.document, 'member/star')">
                                    <span :class="bulma('icon')">
                                        <i class="fas fa-star"></i>
                                    </span>
                                    <span class="wiki-article-menu-text"> 별찜 (</span
                                    ><span class="star-count">{{ $store.state.page.data.star_count ? $store.state.page.data.star_count : '' }}</span
                                    ><span class="wiki-article-menu-text">)</span>
                                </nuxt-link>
                            </li>

                            <!-- [나무위키] main.a65ef46d6b3879416d5f.js 및 main.b9faec2b37c8d51a1d7e.js 참고함 -->
                            <li v-if="$store.state.page.data.user">
                                <nuxt-link :to="contribution_author_link($store.state.page.data.document.title)">
                                    <span :class="bulma('icon')">
                                        <i class="fas fas fa-chart-line"></i>
                                    </span>
                                    <span class="wiki-article-menu-text"> 기여내역</span>
                                </nuxt-link>
                            </li>
                        </ul>

                        <ul v-else>
                            <li :class="bulma('is-active')">
                                <a href="#">
                                    <span :class="bulma('icon')">
                                        <i class="fas fa-cogs"></i>
                                    </span>
                                    <span class="wiki-article-menu-text"> 특수문서</span>
                                </a>
                            </li>
                        </ul>
                </div>
                    </nav>
            </div>
        </section>
        <section :class="bulma('section')">
            <div :class="bulma('container')">
                <b-notification
                    v-if="
                        $store.state.session.member &&
                        $store.state.session.member.user_document_discuss &&
                        $store.state.localConfig['wiki.hide_user_document_discuss'] !== $store.state.session.member.user_document_discuss
                    "
                    :class="bulma('is-link')"
                >
                    <nuxt-link :to="doc_action_link(user_doc($store.state.session.member.username), 'discuss')">사용자 토론</nuxt-link>이 있습니다.
                    확인해주세요.
                </b-notification>

                <b-notification v-if="$store.state.config['wiki.sitenotice']">
                    <span v-html="$store.state.config['wiki.sitenotice']" />
                </b-notification>

                <div class="wiki-article" :class="bulma('content')" @dblclick="doBehaviorWhenDblClick">
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

                        theseed-skin-buma by LiteHell, the seed engine by theseed.io <br>
                        theseed-skin-buma is distributed under <a href="https://www.gnu.org/licenses/gpl-3.0.html">GNU General Public License Version 3</a>
                    </p>
                </div>
            </div>
        </footer>
        <setting>
            <setting-item-select label="더블 클릭시 행동" ckey="buma.behaviorWhenDblClick" default="skinDefault" note="더블 클릭시의 행동입니다">
                <option value="edit">편집</option>
                <option value="history">역사</option>
                <option value="doNohting">아무것도 하지 않음</option>
                <option value="skinDefault">스킨 기본값</option>
            </setting-item-select>
            <setting-item-select
                label="점프 버튼 활성화"
                ckey="buma.enableJumpButtons"
                default="skinDefault"
                note="위/아래로 이동하는 점프 버튼을 표시할지의 여부입니다"
            >
                <option value="yes">활성화</option>
                <option value="no">비활성화</option>
                <option value="skinDefault">스킨 기본값</option>
            </setting-item-select>
        </setting>
        <jump-buttons />
    </div>
</template>

<!-- 리버티 스킨 참고함 -->

<style>
@import './css/bulma.min.css';
@import './css/layout.min.css';
</style>

<script>
import Common from '~/mixins/common';
import Setting from '~/components/setting';
import LocalDate from '~/components/localDate';
import SettingItemCheckbox from '~/components/settingItemCheckbox';
import SettingItemSelect from '~/components/settingItemSelect';
import SearchForm from './components/searchForm';
import SkinLicense from './components/skinLicense';
import BNotification from './components/b-notification';
import JumpButtons from './components/jumpButtons';
import BDropdown from './components/b-dropdown';
import bulma from './src/bulma';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowUp, faArrowDown, faSearch, faRandom } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faArrowUp, faArrowDown, faSearch, faRandom);
Vue.component('buma-font-awesome-icon', FontAwesomeIcon)

export default {
    mixins: [Common],
    components: {
        Setting,
        LocalDate,
        SettingItemSelect,
        SettingItemCheckbox,
        SearchForm,
        SkinLicense,
        BNotification,
        JumpButtons,
        BDropdown
    },
    loadingBarColor(isDark) {
        return isDark ? 'white' : 'black';
    },
    data: function () {
        return {
            isNavbarActive: false
        };
    },
    methods: {
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
        bulma
    }
};
</script>
