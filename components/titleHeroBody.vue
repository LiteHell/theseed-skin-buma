<template>
    <b-hero-body>
        <template #title>
            <template v-if="$store.state.page.data.document && $store.state.page.viewName !== 'error'">
                <span v-if="$store.state.page.data.document.forceShowNamespace !== false" class="namespace">{{ $store.state.page.data.document.namespace }}:</span>{{ $store.state.page.data.document.title }}
            </template>
            <template v-else>
                {{ $store.state.page.title }}
            </template>
        </template>
        <template #subtitle>
            <span v-if="$store.state.page.viewName === 'wiki' && $store.state.page.data.date">
                <local-date :date="$store.state.page.data.date" />에 마지막으로 수정됐습니다.
            </span>

            <span v-else-if="$store.state.page.viewName === 'notfound'"> 존재하지 않는 문서입니다. 직접 자유롭게 기여해보세요! </span>

            <span v-else> Powered by the seed engine </span>
        </template>
    </b-hero-body>
</template>

<style lang="css" scoped>
.namespace {
    opacity: 70%;
}
</style>

<script>
import BHeroBody from './b-heroBody.vue';
import Common from '~/mixins/common';
import localDate from '~/components/localDate.vue';

export default {
    mixins: [Common],
    components: {
        BHeroBody,
        localDate
    }
}
</script>
