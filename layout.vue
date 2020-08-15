<template>
    <div class="buma">
        <div class="nav navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-menu" id="mainNavbar">
                <div class="navbar-start">
                    <div class="navbar-brand">
                        <nuxt-link to="/" class="navbar-item"></nuxt-link>
                        <button class="button navbar-burger" data-target="mainNavbar">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                    <nuxt-link to="/RecentChanges" class="navbar-item">
                        <span class="icon">
                            <i class="fas fa-binoculars"></i>
                        </span>
                        최근 변경
                    </nuxt-link>
                    <nuxt-link to="/RecentDiscuss" class="navbar-item">
                        <span class="icon">
                            <i class="far fa-comments"></i>
                        </span>
                        최근 토론
                    </nuxt-link>
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a href="#" class="navbar-link">
                            <span class="icon">
                                <i class="fas fa-cogs"></i>
                            </span>
                            도구
                        </a>
                        <div class="navbar-dropdown">
                            <nuxt-link class="navbar-item" to="/NeededPages">
                                <span class="icon">
                                    <i class="fas fa-beer"></i>
                                </span>
                                작성이 필요한 문서
                            </nuxt-link>
                            <nuxt-link class="navbar-item" to="/OrphanedPages">
                                <span class="icon">
                                    <i class="far fa-frown"></i>
                                </span>
                                고립된 문서
                            </nuxt-link>
                            <nuxt-link class="navbar-item" to="/UncategorizedPages">
                                <span class="icon">
                                    <i class="far fa-question-circle"></i>
                                </span>
                                분류가 되지 않은 문서
                            </nuxt-link>
                            <nuxt-link class="navbar-item" to="/OldPages">
                                <span class="icon">
                                    <i class="fas fa-pause"></i>
                                </span>
                                편집된 지 오래된 문서
                            </nuxt-link>
                            <nuxt-link class="navbar-item" to="/ShortestPages">
                                <span class="icon">
                                    <i class="far fa-thumbs-down"></i>
                                </span>
                                내용이 짧은 문서
                            </nuxt-link>
                            <nuxt-link class="navbar-item" to="/LongestPages">
                                <span class="icon">
                                    <i class="far fa-thumbs-up"></i>
                                </span>
                                내용이 긴 문서
                            </nuxt-link>
                            <nuxt-link class="navbar-item" to="/BlockHistory">
                                <span class="icon">
                                    <i class="fas fa-ban"></i>
                                </span>
                                차단 내역
                            </nuxt-link>
                            <nuxt-link class="navbar-item" to="/RandomPage">
                                <span class="icon">
                                    <i class="fas fa-random"></i>
                                </span>
                                RandomPage
                            </nuxt-link>
                            <nuxt-link class="navbar-item" to="/Upload">
                                <span class="icon">
                                    <i class="fas fa-cloud-upload-alt"></i>
                                </span>
                                파일 올리기
                            </nuxt-link>
                            <nuxt-link class="navbar-item" to="/License">
                                <span class="icon">
                                    <i class="far fa-copyright"></i>
                                </span>
                                라이선스
                            </nuxt-link>

                            <template v-if="$store.state.session.menus.length">
                                <nuxt-link v-for="m in $store.state.session.menus" :to="m.l" v-bind:key="m.l" class="navbar-item" v-text="m.t" />
                            </template>
                        </div>
                    </div>
                </div>
            </div>
            <div class="navbar-end">
                <div class="navbar-item">
                    <search-form />
                </div>

                <div class="navbar-item has-dropdown is-hoverable">
                    <template v-if="$store.state.session.member">
                        <a href="#" class="navbar-link">
                            <span class="icon">
                                <i class="fas fa-user"></i>
                            </span>
                            {{ $store.state.session.member.username }}
                        </a>

                        <div class="navbar-dropdown is-right">
                            <a href="#" @click.prevent="$modal.show('theseed-setting')" class="navbar-item">
                                <span class="icon">
                                    <i class="fas fa-wrench"></i>
                                </span>
                                스킨 설정
                            </a>
                            <nuxt-link to="/member/mypage" class="navbar-item">
                                <span class="icon">
                                    <i class="far fa-user-circle"></i>
                                </span>
                                내정보
                            </nuxt-link>
                            <nuxt-link :to="doc_action_link(user_doc($store.state.session.member.username), 'w')" class="navbar-item">
                                <span class="icon">
                                    <i class="far fa-sticky-note"></i>
                                </span>
                                내 사용자 문서
                            </nuxt-link>
                            <div class="navbar-divider"></div>
                            <nuxt-link :to="contribution_author_link($store.state.session.member.username)" class="navbar-item">
                                <span class="icon">
                                    <i class="fas fa-chart-line"></i>
                                </span>
                                내 문서 기여 목록
                            </nuxt-link>
                            <nuxt-link :to="contribution_author_link_discuss($store.state.session.member.username)" class="navbar-item">
                                <span class="icon">
                                    <i class="fas fa-chart-bar"></i>
                                </span>
                                내 토론 기여 목록
                            </nuxt-link>
                            <nuxt-link to="/member/starred_documents" class="navbar-item">
                                <span class="icon">
                                    <i class="fas fa-bookmark"></i>
                                </span>
                                별찜한 문서들
                            </nuxt-link>
                            <div class="navbar-divider"></div>
                            <nuxt-link :to="{ path: '/member/logout', query: { redirect: $route.fullPath } }" class="navbar-item">
                                <span class="icon">
                                    <i class="fas fa-sign-out-alt"></i>
                                </span>
                                로그아웃
                            </nuxt-link>
                        </div>
                    </template>

                    <template v-else>
                        <a href="#" class="navbar-link">
                            <span class="icon">
                                <i class="fas fa-user-secret"></i>
                            </span>
                            익명
                        </a>

                        <div class="navbar-dropdown is-right">
                            <a href="#" @click.prevent="$modal.show('theseed-setting')" class="navbar-item">
                                <span class="icon">
                                    <i class="fas fa-wrench"></i>
                                </span>
                                스킨 설정
                            </a>
                            <nuxt-link :to="contribution_ip_link($store.state.session.ip)" class="navbar-item">
                                <span class="icon">
                                    <i class="fas fa-chart-line"></i>
                                </span>
                                내 문서 기여 목록
                            </nuxt-link>
                            <nuxt-link :to="contribution_ip_link_discuss($store.state.session.ip)" class="navbar-item">
                                <span class="icon">
                                    <i class="fas fa-chart-bar"></i>
                                </span>
                                내 토론 기여 목록
                            </nuxt-link>
                            <div class="navbar-divider"></div>
                            <nuxt-link :to="{ path: '/member/login', query: { redirect: $route.fullPath } }" class="navbar-item">
                                <span class="icon">
                                    <i class="fas fa-sign-in-alt"></i>
                                </span>
                                로그인
                            </nuxt-link>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <section
            id="wiki-main-title"
            class="hero"
            v-bind:class="{ [$store.state.page.data.error || $store.state.page.viewName == 'notfound' ? 'is-danger' : 'is-primary']: true }"
        >
            <div class="hero-body">
                <div class="container">
                    <h1 class="title" v-text="$store.state.page.title" />
                    <h2 class="subtitle">
                        <span v-if="$store.state.page.viewName === 'wiki' && $store.state.page.data.date">
                            <local-date :date="$store.state.page.data.date" />에 마지막으로 수정됐습니다.
                        </span>

                        <span v-else-if="$store.state.page.viewName === 'notfound'">
                            존재하지 않는 문서입니다. 직접 자유롭게 기여해보세요!
                        </span>

                        <span v-else>
                            Powered by the seed engine
                        </span>
                    </h2>
                </div>
            </div>
            <div class="hero-foot">
                <div class="container">
                    <div class="tabs is-left is-boxed" id="wiki-article-menu">
                        <ul v-if="$store.state.page.data.document">
                            <li v-bind:class="{ 'is-active': $store.state.page.viewName === 'wiki' }">
                                <nuxt-link :to="doc_action_link($store.state.page.data.document, 'w')">
                                    <span class="icon">
                                        <i class="fas fa-eye"></i>
                                    </span>
                                    <span class="wiki-article-menu-text"> 읽기</span>
                                </nuxt-link>
                            </li>
                            <li v-bind:class="{ 'is-active': $store.state.page.viewName === 'edit' }">
                                <nuxt-link :to="doc_action_link($store.state.page.data.document, 'edit')" class="edit-anchor">
                                    <span class="icon">
                                        <i class="fas fa-edit"></i>
                                    </span>
                                    <span class="wiki-article-menu-text"> 편집</span>
                                </nuxt-link>
                            </li>
                            <li v-bind:class="{ 'is-active': ['thread', 'thread_list', 'thread_list_close'].includes($store.state.page.viewName) }">
                                <nuxt-link :to="doc_action_link($store.state.page.data.document, 'discuss')">
                                    <span class="icon">
                                        <i class="far fa-comments"></i>
                                    </span>
                                    <span class="wiki-article-menu-text"> 토론</span>
                                </nuxt-link>
                            </li>
                            <li v-bind:class="{ 'is-active': $store.state.page.viewName === 'move' }">
                                <nuxt-link :to="doc_action_link($store.state.page.data.document, 'move')">
                                    <span class="icon">
                                        <i class="fas fa-arrow-right"></i>
                                    </span>
                                    <span class="wiki-article-menu-text"> 이동</span>
                                </nuxt-link>
                            </li>
                            <li v-bind:class="{ 'is-active': $store.state.page.viewName === 'delete' }">
                                <nuxt-link :to="doc_action_link($store.state.page.data.document, 'delete')">
                                    <span class="icon">
                                        <i class="far fa-trash-alt"></i>
                                    </span>
                                    <span class="wiki-article-menu-text"> 삭제</span>
                                </nuxt-link>
                            </li>
                            <li v-bind:class="{ 'is-active': $store.state.page.viewName === 'backlink' }">
                                <nuxt-link :to="doc_action_link($store.state.page.data.document, 'backlink')">
                                    <span class="icon">
                                        <i class="fas fa-random"></i>
                                    </span>
                                    <span class="wiki-article-menu-text"> 역링크</span>
                                </nuxt-link>
                            </li>
                            <li v-bind:class="{ 'is-active': $store.state.page.viewName === 'history' }">
                                <nuxt-link :to="doc_action_link($store.state.page.data.document, 'history')">
                                    <span class="icon">
                                        <i class="fas fa-history"></i>
                                    </span>
                                    <span class="wiki-article-menu-text"> 역사</span>
                                </nuxt-link>
                            </li>
                            <li v-bind:class="{ 'is-active': $store.state.page.viewName === 'acl' }">
                                <nuxt-link :to="doc_action_link($store.state.page.data.document, 'acl')">
                                    <span class="icon">
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
                                    <span class="icon">
                                        <i class="fas fa-star"></i>
                                    </span>
                                    <span class="wiki-article-menu-text"> 별찜 해제 (</span
                                    ><span class="star-count">{{ $store.state.page.data.star_count ? $store.state.page.data.star_count : '' }}</span
                                    ><span class="wiki-article-menu-text">)</span>
                                </nuxt-link>
                                <nuxt-link v-else :to="doc_action_link($store.state.page.data.document, 'member/star')">
                                    <span class="icon">
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
                                    <span class="icon">
                                        <i class="fas fas fa-chart-line"></i>
                                    </span>
                                    <span class="wiki-article-menu-text"> 기여내역</span>
                                </nuxt-link>
                            </li>
                        </ul>

                        <ul v-else>
                            <li class="is-active">
                                <a href="#">
                                    <span class="icon">
                                        <i class="fas fa-cogs"></i>
                                    </span>
                                    <span class="wiki-article-menu-text"> 특수문서</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <div
                    v-if="
                        $store.state.session.member &&
                        $store.state.session.member.user_document_discuss &&
                        $store.state.localConfig['wiki.hide_user_document_discuss'] !== $store.state.session.member.user_document_discuss
                    "
                    class="notification is-link"
                >
                    <button class="delete"></button>
                    <nuxt-link :to="doc_action_link(user_doc($store.state.session.member.username), 'discuss')">사용자 토론</nuxt-link>이 있습니다.
                    확인해주세요.
                </div>

                <div class="notification" v-if="$store.state.config['wiki.sitenotice']">
                    <button class="delete"></button>
                    <span v-html="$store.state.config['wiki.sitenotice']" />
                </div>

                <div class="wiki-article content" @dblclick="doBehaviorWhenDblClick">
                    <nuxt />

                    <skin-license v-if="$store.state.page.viewName === 'license'"></skin-license>
                </div>
            </div>
        </section>
        <footer class="footer">
            <div class="container">
                <div class="content has-text-centered">
                    <p>
                        <span v-html="$store.state.config['wiki.copyright_text']" />
                        <span v-html="$store.state.config['wiki.footer_text']" />

                        theseed-skin-buma by LiteHell, the seed engine by theseed.io
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
        <div class="jump-buttons" v-if="$store.state.localConfig['buma.enableJumpButtons'] !== 'no'">
            <ul>
                <li>
                    <div class="icon jump-up">
                        <div class="fas fa-arrow-up"></div>
                    </div>
                </li>
                <li>
                    <div class="icon jump-down">
                        <div class="fas fa-arrow-down"></div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<!-- 리버티 스킨 참고함 -->

<style>
@import './css/bootstrap-custom.css';
@import './css/bulma.min.css';
@import './css/jquery-ui.min.css';
@import './css/layout.css';
</style>

<script>
import Common from '~/mixins/common';
import Setting from '~/components/setting';
import LocalDate from '~/components/localDate';
import SettingItemCheckbox from '~/components/settingItemCheckbox';
import SettingItemSelect from '~/components/settingItemSelect';
import SearchForm from './searchForm';
import SkinLicense from './skinLicense';

if (process.browser) {
    try {
        require('./js/jquery.min.js');
    } catch (e) {
        console.log(e.stack);
    }
    try {
        require('./js/jquery-ui.min.js');
    } catch (e) {
        console.log(e.stack);
    }
    try {
        require('./js/bootstrap.min.js');
    } catch (e) {
        console.log(e.stack);
    }
    try {
        require('./js/layout.js');
    } catch (e) {
        console.log(e.stack);
    }
    try {
        require('./js/all.min.js');
    } catch (e) {
        console.log(e.stack);
    }
}
export default {
    mixins: [Common],
    components: {
        Setting,
        LocalDate,
        SettingItemSelect,
        SettingItemCheckbox,
        SearchForm,
        SkinLicense
    },
    loadingBarColor(isDark) {
        return isDark ? 'white' : 'black';
	},
	methods: {
		doBehaviorWhenDblClick() {
			if (!this.$store.state.page.data.document)
				return;
			
			const action = this.$store.state.localConfig['buma.behaviorWhenDblClick'];
			switch(action) {
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
		}
	}
};
</script>
