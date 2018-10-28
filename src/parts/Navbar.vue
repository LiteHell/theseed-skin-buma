<template>
    <div class="nav navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a href="/" class="navbar-item"><img src="{{ config.getString('wiki.site_name', 'Wiki') }}">
                {{ config.getString('wiki.site_name', 'Wiki') }}</a>
            <button class="button navbar-burger" data-target="mainNavbar">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
        <div class="navbar-menu" id="mainNavbar">
            <div class="navbar-start">
                <NavbarItem href="/RecentChanges" icon="fas fa-binoculars" text="최근 변경" />
                <NavbarItem href="/RecentDiscuss" icon="fas fa-binoculars" text="최근 토론" />
                <NavbarDropdown icon="fas fa-cogs" text="도구">
                    <NavbarItem href="/NeededPagges" icon="fas fa-beer" text="작성이 필요한 문서" />
                    <NavbarItem href="/OrphanedPagges" icon="far fa-frown" text="고립된 문서" />
                    <NavbarItem href="/UncategorizedPages" icon="far fa-question-circle" text="분류되지 않은 문서" />
                    <NavbarItem href="/OldPages" icon="fas fa-pause" text="편집된 지 오래된 문서" />
                    <NavbarItem href="/LongestPages" icon="far fa-thumbs-up" text="내용이 긴 문서" />
                    <NavbarItem href="/ShortestPagges" icon="far fa-thumbs-down" text="내용이 잛은 문서" />
                    <NavbarItem href="/BlockHistory" icon="fas fa-ban" text="차단 내역" />
                    <NavbarItem href="/RandomPage" icon="fas fa-random" text="RandomPage" />
                    <NavbarItem href="/Upload" icon="fas fa-cloud-upload-alt" text="파일 올리기" />
                    <NavbarItem href="/License" icon="far fa-copyright" text="라이선스" />
                    <NavbarItem v-if="perms.has('ipacl')" href="/admin/ipacl" icon="fas fa-ban" text="[관리] IPACL" />
                    <NavbarItem v-if="perms.has('suspend_account')" href="/admin/suspend_account" icon="fas fa-ban"
                        text="[관리] 사용자 차단" />
                    <NavbarItem v-if="perms.has('grant')" href="/admin/grant" icon="fas fa-user-plus" text="[관리] 권한 부여" />
                    <NavbarItem v-if="perms.has('login_history')" href="/admin/login_history" icon="fas fa-history"
                        text="[관리] 로그인 내역 조회" />
                </NavbarDropdown>

            </div>
        </div>
        <div class="navbar-end">
            <div class="navbar-item">
                <div class="field has-addons">
                    <div class="control has-icons-left">
                        <input class="input is-primary" type="text" placeholder="검색" id="wikiSearch">
                        <span class="icon is-small is-left">
                            <i class="fas fa-search"></i>
                        </span>
                    </div>
                    <div class="control">
                        <a href="#" class="button" id="wikiSearchBtn">
                            <span class="icon">
                                <i class="fas fa-search"></i>
                            </span>
                        </a>
                    </div>
                    <div class="control">
                        <a href="#" class="button" id="wikiGoRandomBtn">
                            <span class="icon">
                                <i class="fas fa-random"></i>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
            <UserDropdown>
                <NavbarItem href="#" icon="fas fa-wrench" text="스킨 설정" id="skin-settings" />
                <NavbarItem href="#" icon="fas fa-adjust" text="다크테마 설정/해제" id="toggle-dark-theme" />
                <template v-if="member">
                    <NavbarItem href="/member/mypage" icon="far fa-user-circle" text="내정보" />
                    <NavbarItem href="/w/{{ encode_userdoc(member.username) }}" icon="far fa-sticky-note" text="내 사용자 문서" />
                    <NavbarItem href="/contribution/author/{{ member.username }}/document" icon="far fa-chart-line"
                        text="내 문서 기여 목록" />
                    <NavbarItem href="/contribution/author/{{ member.username }}/discuss" icon="far fa-chart-bar" text="내 토론 기여 목록" />
                    <NavbarItem href="/member/starred_documents" icon="far fa-bookmark" text="별찜한 문서들" />
                    <NavbarDivider />
                    <NavbarItem href="/member/logout?redirect={{ encodeURIComponent(url) }}" icon="fas fa-sign-out-alt"
                        text="로그아웃" />
                </template>
                <template v-else>
                    <NavbarItem href="/contribution/author/{{ member.username }}/document" icon="far fa-chart-line"
                        text="내 문서 기여 목록" />
                    <NavbarItem href="/contribution/author/{{ req_ip }}/document" icon="far fa-chart-line" text="내 문서 기여 목록" />
                    <NavbarItem href="/contribution/author/{{ req_ip }}/discuss" icon="far fa-chart-bar" text="내 토론 기여 목록" />
                    <NavbarDivider />
                    <NavbarItem href="/member/login?redirect={{ encodeURIComponent(url) }}" icon="fas fa-sign-in-alt"
                        text="로그인" />
                </template>
            </UserDropdown>
        </div>
    </div>
</template>