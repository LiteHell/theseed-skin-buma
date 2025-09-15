<template>
    <form @submit.prevent>
        <div class="fullWidth" :class="{ dropdown: true, 'is-active': show }">
            <div class="fullWidth dropdown-trigger">
                <div class="field has-addons">
                    <div class="control has-icons-left is-expanded">
                        <input
                            class="input is-primary"
                            v-model="searchTextModel"
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
                        <span class="icon is-small is-left has-text-primary">
                            <FontAwesomeIcon :icon="faSearch" />
                        </span>
                    </div>
                    <div class="control">
                        <a href="#" class="button is-primary is-outlined" @click.prevent="gotodoc">
                            <span class="icon">
                                <FontAwesomeIcon :icon="faSearch" />
                            </span>
                        </a>
                    </div>
                    <div class="control">
                        <a href="#" class="button is-primary is-outlined" @click.prevent="random">
                            <span class="icon">
                                <FontAwesomeIcon :icon="faRandom" />
                            </span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="dropdown-menu">
                <div class="dropdown-content">
                    <a
                        :class="{ 'dropdown-item': true, 'is-active': i === cursor }"
                        v-for="(item, i) in internalItems"
                        @click.prevent="onClickItem(item)"
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
import autocompleteMixin from '~/mixins/autocomplete';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSearch, faRandom } from '@fortawesome/free-solid-svg-icons';

export default {
    components: { FontAwesomeIcon },
    mixins: [autocompleteMixin],
    created() {
        this.faSearch = faSearch;
        this.faRandom = faRandom;
    },
    methods: {
        gotodoc() {
            if (!this.searchText) return;
            this.$router.push('/Go?q=' + encodeURIComponent(this.searchText));
        },
        random() {
            this.$router.push('/random');
        }
    },
    watch: {
        $route() {
            this.reset();
        }
    }
};
</script>
