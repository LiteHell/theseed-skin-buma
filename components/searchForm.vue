<!-- 리버티 스킨 참고함 -->

<template>
    <form v-on:submit.prevent>
        <div class="fullWidth" :class="bulma({'dropdown': true, 'is-active': show})">
            <div class="fullWidth" :class="bulma('dropdown-trigger')">
                <div :class="bulma('field has-addons')">
                    <div :class="bulma('control has-icons-left is-expanded')">
                        <input
                            :class="bulma('input is-primary')"
                            v-on:input="searchText = $event.target.value"
                            type="text"
                            autocomplete="off"
                            @blur="blur"
                            @focus="focus"
                            @input="inputChange"
                            @keyup.enter="keyEnter"
                            @keydown.tab="keyEnter"
                            @keydown.up="keyUp"
                            @keydown.down="keyDown"
                            placeholder="검색"
                        />
                        <span :class="bulma('icon is-small is-left')">
                            <buma-font-awesome-icon icon="fa-solid fa-search"></buma-font-awesome-icon>
                        </span>
                    </div>
                    <div :class="bulma('control')">
                        <a href="#" :class="bulma('button')" @click.prevent="gotodoc">
                            <span :class="bulma('icon')">
                            <buma-font-awesome-icon icon="fa-solid fa-search"></buma-font-awesome-icon>
                            </span>
                        </a>
                    </div>
                    <div :class="bulma('control')">
                        <a href="#" :class="bulma('button')" @click.prevent="random">
                            <span :class="bulma('icon')">
                            <buma-font-awesome-icon icon="fa-solid fa-random"></buma-font-awesome-icon>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
            <div :class="bulma('dropdown-menu')">
                <div :class="bulma('dropdown-content')">
                    <a
                        :class="bulma({'dropdown-item': true, 'is-active': i === cursor})"
                        v-for="(item, i) in internalItems"
                        @click.prevent="onClickItem_buma(item)"
                        :key="i"
                        @mouseover="cursor = i"
                        href="#"
                    >
                        {{ item }}
                    </a>
                </div>
            </div>
        </div>
    </form>
</template>

<style scoped>
.fullWidth {
    width: 100%;
}
</style>

<script>
import AutocompleteMixin from '~/mixins/autocomplete';
import bulma from '../src/bulma';
import bumaFontAwesomeIcon from './buma-font-awesome-icon.vue';

export default {
    components: {bumaFontAwesomeIcon},
    mixins: [AutocompleteMixin],
    methods: {
        gotodoc() {
            if (!this.searchText) return;
            this.$router.push('/Go?q=' + encodeURIComponent(this.searchText));
        },
        random() {
            this.$router.push('/random');
        },
        onClickItem_buma(item) {
            this.$router.push('/Go?q=' + encodeURIComponent(item));
        },
        bulma
    }
};
</script>
