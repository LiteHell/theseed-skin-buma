<!-- 리버티 스킨 참고함 -->

<template>
    <form v-on:submit.prevent>
        <div class="dropdown" :class="{'is-active': show}">
            <div class="dropdown-trigger">
                <div class="field has-addons">
                    <div class="control has-icons-left is-expanded">
                        <input
                            class="input is-primary"
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
                        <span class="icon is-small is-left">
                            <i class="fas fa-search"></i>
                        </span>
                    </div>
                    <div class="control">
                        <a href="#" class="button" @click.prevent="gotodoc">
                            <span class="icon">
                                <i class="fas fa-search"></i>
                            </span>
                        </a>
                    </div>
                    <div class="control">
                        <a href="#" class="button" @click.prevent="random">
                            <span class="icon">
                                <i class="fas fa-random"></i>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="dropdown-menu">
                <div class="dropdown-content">
                    <a
                        class="dropdown-item"
                        v-for="(item, i) in internalItems"
                        @click="onClickItem(item)"
                        v-bind:key="i"
                        :class="{ 'is-active': i === cursor }"
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
.dropdown, .dropdown-trigger {
    width: 100%;
}
</style>

<script>
import AutocompleteMixin from '~/mixins/autocomplete';

export default {
    mixins: [AutocompleteMixin],
    methods: {
        gotodoc() {
            if (!this.searchText) return;
            this.$router.push('/Go?q=' + encodeURIComponent(this.searchText));
        },
        random() {
            this.$router.push('/random');
        }
    }
};
</script>