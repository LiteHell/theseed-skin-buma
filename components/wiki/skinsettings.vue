<template>
    <b-modal class="skin-settings-modal" :active="true">
        <div class="card">
            <div class="card-header">
                <div class="card-header-title">
                    스킨 설정
                </div>
            </div>
            <div class="card-content">
                <section class="content">
                    <h1>스킨 설정</h1>
                    <p>buma스킨에만 적용되는 스킨 설정입니다.</p>
                    <h2>위키 문서내 취소선</h2>
                    <b-field>
                        <b-radio>숨기기</b-radio>
                        <b-radio>취소선 해제</b-radio>
                        <b-radio>아무것도 하지 않음</b-radio>
                        <b-radio>스킨 기본값</b-radio>
                    </b-field>
                    <h2>Animated gif를 동영상으로 보이주지 않기</h2>
                    <b-field>
                        <b-radio>네</b-radio>
                        <b-radio>아니오</b-radio>
                        <b-radio>스킨 기본값</b-radio>
                    </b-field>
                    <h2>문단 제목 기본으로 접기</h2>
                    <b-field>
                        <b-radio>네</b-radio>
                        <b-radio>아니오</b-radio>
                        <b-radio>스킨 기본값</b-radio>
                    </b-field>
                    <h2>더블 클릭시 행동</h2>
                </section>
            </div>
        </div>
    </b-modal>
</template>

<script>
export default {
    name: 'skinsettings'
}
</script>
