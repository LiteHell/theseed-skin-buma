<template>
    <section class="hero is-{{ (error || skinInfo.viewName === 'notfound') ? 'danger' : 'primary'}}" id="wiki-main-title">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">
                    <slot name="title"></slot>
                </h1>
                <h2 class="subtitle">
                    <slot name="subtitle"></slot>
                </h2>
            </div>
        </div>
        <div class="hero-foot">
            <div class="container">
                <div class="tabs is-left is-boxed" id="wiki-article-menu">
                    <ul>
                        {% if document %}
                        <li {% if skinInfo.viewName=='wiki' %} class="is-active" {% endif %}>
                            <a href="/w/{{ document|encode_doc }}">
                                <span class="icon">
                                    <i class="fas fa-eye"></i>
                                </span>
                                <span class="wiki-article-menu-text"> 읽기</span>
                            </a>
                        </li>
                        <li {% if skinInfo.viewName=='edit' %} class="is-active" {% endif %}>
                            <a href="/edit/{{ document|encode_doc }}" class="edit-anchor">
                                <span class="icon">
                                    <i class="fas fa-edit"></i>
                                </span>
                                <span class="wiki-article-menu-text"> 편집</span>
                            </a>
                        </li>
                        <li {% if skinInfo.viewName=='thread' || skinInfo.viewName=='thread_list' || skinInfo.viewName=='thread_list_close'
                            %} class="is-active" {% endif %}>
                            <a href="/discuss/{{ document|encode_doc }}">
                                <span class="icon">
                                    <i class="far fa-comments"></i>
                                </span>
                                <span class="wiki-article-menu-text"> 토론</span>
                            </a>
                        </li>
                        <li {% if skinInfo.viewName=='move' %} class="is-active" {% endif %}>
                            <a href="/move/{{ document|encode_doc }}">
                                <span class="icon">
                                    <i class="fas fa-arrow-right"></i>
                                </span>
                                <span class="wiki-article-menu-text"> 이동</span>
                            </a>
                        </li>
                        <li {% if skinInfo.viewName=='delete' %} class="is-active" {% endif %}>
                            <a href="/delete/{{ document|encode_doc }}">
                                <span class="icon">
                                    <i class="far fa-trash-alt"></i>
                                </span>
                                <span class="wiki-article-menu-text"> 삭제</span>
                            </a>
                        </li>
                        <li {% if skinInfo.viewName=='xref' %} class="is-active" {% endif %}>
                            <a href="/xref/{{ document|encode_doc }}">
                                <span class="icon">
                                    <i class="fas fa-random"></i>
                                </span>
                                <span class="wiki-article-menu-text"> 역링크</span>
                            </a>
                        </li>
                        <li {% if skinInfo.viewName=='history' %} class="is-active" {% endif %}>
                            <a href="/history/{{ document|encode_doc }}" class="history-anchor">
                                <span class="icon">
                                    <i class="fas fa-history"></i>
                                </span>
                                <span class="wiki-article-menu-text"> 역사</span>
                            </a>
                        </li>
                        <li {% if skinInfo.viewName=='acl' %} class="is-active" {% endif %}>
                            <a href="/acl/{{ document|encode_doc }}">
                                <span class="icon">
                                    <i class="fas fa-key"></i>
                                </span>
                                <span class="wiki-article-menu-text"> ACL</span>
                            </a>
                        </li>
                        {% if star_count >= 0 %}
                        <li class="star-tab{% if starred %} starred {% endif %}">
                            <a href="/member/{% if starred %}un{% endif %}star/{{ document|encode_doc }}">
                                <span class="icon">
                                    <i class="fas fa-star"></i>
                                </span>
                                <span class="wiki-article-menu-text"> {% if starred %}별찜 해제{% else %}별찜{% endif %} (</span><span
                                    class="star-count">{{ star_count }}</span><span class="wiki-article-menu-text">)</span>
                            </a>
                        </li>
                        {% endif %}
                        {% if user %}
                        <li>
                            <a href="/contribution/author/{{ document.title|url_encode }}/document">
                                <span class="icon">
                                    <i class="fas fas fa-chart-line"></i>
                                </span>
                                <span class="wiki-article-menu-text"> 기여내역</span>
                            </a>
                        </li>
                        {% endif %}
                        {% else %}
                        <li class="is-active">
                            <a href="#">
                                <span class="icon">
                                    <i class="fas fa-cogs"></i>
                                </span>
                                <span class="wiki-article-menu-text"> 특수문서</span>
                            </a>
                        </li>
                        {% endif %}
                    </ul>
                </div>
            </div>
        </div>
    </section>
    <section class="section">
        <div class="container">
            {% if user_document_discuss %}
            <div class="notification is-link" data-id="{{ member.username }}-{{ user_document_discuss }}">
                <button class="delete"></button>
                <a href="/discuss/{{ member.username | encode_userdoc }}">사용자 토론</a>이 있습니다. 확인해주세요.
            </div>
            {% endif %}
            {% if config.getString('wiki.sitenotice', null) %}
            <div class="notification">
                <button class="delete"></button>
                {{ config.getString('wiki.sitenotice', '')|safe }}
            </div>
            {% endif %}
            <div class="wiki-article content">
                {% block content %}{% endblock %}
            </div>
        </div>
    </section>
    <footer class="footer">
        <div class="container">
            <div class="content has-text-centered">
                <p>
                    {{ config.getString('wiki.copyright_text', '') }}<br>
                    {{ config.getString('wiki.footer_text', '') }}<br>
                    theseed-skin-buma by LiteHell, the seed engine by theseed.io
                </p>
            </div>
        </div>
    </footer>
    <div class="modal settings-modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">buma 스킨 설정</p>
                <button class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                <article class="message is-info">
                    <div class="message-header">
                        <p>안내</p>
                    </div>
                    <div class="message-body">
                        스킨 설정은 새로고침해야 적용됩니다.
                    </div>
                </article>
                <h2 class="title is-4">위키 문서내 취소선</h2>
                <h2 class="subtitle is-6">위키 문서내 취소선을 싫어하시는 분들을 위한 설정입니다.</h3>
                    <div class="field">
                        <div class="control">
                            <label class="raido">
                                <input type="radio" name="hideDeletedOnWiki" value="hide"> 숨기기
                            </label>
                            <label class="raido">
                                <input type="radio" name="hideDeletedOnWiki" value="undelete"> 취소선 해제
                            </label>
                            <label class="raido">
                                <input type="radio" name="hideDeletedOnWiki" value="doNothing"> 아무것도 하지 않음
                            </label>
                            <label class="raido">
                                <input type="radio" name="hideDeletedOnWiki" value="skinDefault"> 스킨 기본값
                            </label>
                        </div>
                    </div>
                    <h2 class="title is-4">Animated gif를 동영상으로 보여주지 않기</h2>
                    <h2 class="subtitle is-6">GIF가 정상적으로 재생되지 않는 경우 변경하세요.</h3>
                        <div class="field">
                            <div class="control">
                                <label class="raido">
                                    <input type="radio" name="noVideoForGif" value="yes"> 네
                                </label>
                                <label class="raido">
                                    <input type="radio" name="noVideoForGif" value="no"> 아니오
                                </label>
                                <label class="raido">
                                    <input type="radio" name="noVideoForGif" value="skinDefault"> 스킨 기본값
                                </label>
                            </div>
                        </div>
                        <h2 class="title is-4">문단 제목 기본으로 접기</h2>
                        <h2 class="subtitle is-6">문단 제목을 기본으로 접을시의 여부입니다.</h3>
                            <div class="field">
                                <div class="control">
                                    <label class="raido">
                                        <input type="radio" name="foldHeadingsByDefault" value="yes"> 네
                                    </label>
                                    <label class="raido">
                                        <input type="radio" name="foldHeadingsByDefault" value="no"> 아니오
                                    </label>
                                    <label class="raido">
                                        <input type="radio" name="foldHeadingsByDefault" value="skinDefault"> 스킨 기본값
                                    </label>
                                </div>
                            </div>
                            <h2 class="title is-4">더블 클릭시 행동</h2>
                            <h2 class="subtitle is-6">더블 클릭시의 행동입니다.</h3>
                                <div class="field">
                                    <div class="control">
                                        <label class="raido">
                                            <input type="radio" name="behaviorWhenDblClick" value="edit"> 편집
                                        </label>
                                        <label class="raido">
                                            <input type="radio" name="behaviorWhenDblClick" value="history"> 역사
                                        </label>
                                        <label class="raido">
                                            <input type="radio" name="behaviorWhenDblClick" value="doNothing"> 아무것도 하지
                                            않음
                                        </label>
                                        <label class="raido">
                                            <input type="radio" name="behaviorWhenDblClick" value="skinDefault"> 스킨 기본값
                                        </label>
                                    </div>
                                </div>
                                <h2 class="title is-4">점프 버튼 활성화</h2>
                                <h2 class="subtitle is-6">위/아래로 이동하는 점프 버튼을 표시할지의 여부입니다</h3>
                                    <div class="field">
                                        <div class="control">
                                            <label class="raido">
                                                <input type="radio" name="enableJumpButtons" value="yes"> 활성화
                                            </label>
                                            <label class="raido">
                                                <input type="radio" name="enableJumpButtons" value="no"> 비활성화
                                            </label>
                                            <label class="raido">
                                                <input type="radio" name="enableJumpButtons" value="skinDefault"> 스킨
                                                기본값
                                            </label>
                                        </div>
                                    </div>
            </section>
        </div>
    </div>
    <div class="jump-buttons">
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
</template>

<script>
    import HelloWorld from "./components/HelloWorld.vue";

    export default {
        name: "app",
        components: {
            HelloWorld
        }
    };
</script>

<style lang="less">
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>