<template>
    <b-hero>
        <slot name="title">
            <template v-if="$store.state.page.data.document && $store.state.page.viewName !== 'error'">
                <span v-if="$store.state.page.data.document.forceShowNamespace !== false" class="namespace">
                    {{ $store.state.page.data.document.namespace }}:
                </span>
                {{ $store.state.page.data.document.title }}
            </template>
            <template v-else>
                {{ $store.state.page.title }}
            </template>
        </slot>
        <slot name="subtitle">
            <span v-if="$store.state.page.viewName === 'wiki' && $store.state.page.data.date">
                <local-date :date="$store.state.page.data.date" />에 마지막으로 수정됐습니다.
            </span>

            <span v-else-if="$store.state.page.viewName === 'notfound'"> 존재하지 않는 문서입니다. 직접 자유롭게 기여해보세요! </span>

            <span v-else> Powered by the seed engine </span>
        </slot>
    </b-hero>
</template>

<style lang="css" scoped>
.namespace {
    color: #545454;
}
</style>

<script>
import BHero from './b-hero.vue';
import Common from '~/mixins/common';

export default {
    mixins: [Common],
    components: {
        BHero
    }
}
</script>
