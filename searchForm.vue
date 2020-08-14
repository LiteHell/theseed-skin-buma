<!-- 리버티 스킨 참고함 -->

<template>
	<form v-on:submit.prevent>
		<div class="field has-addons">
			<div class="control has-icons-left">
				<input class="input is-primary" v-on:input="searchText = $event.target.value" type="text" placeholder="검색" id="wikiSearch">
				<span class="icon is-small is-left">
					<i class="fas fa-search"></i>
				</span>
			</div>
			<div class="control">
				<a href="#" class="button" id="wikiSearchBtn" @click="gotodoc">
					<span class="icon">
						<i class="fas fa-search"></i>
					</span>
				</a>
			</div>
			<div class="control">
				<a href="#" class="button" id="wikiGoRandomBtn" @click="random">
					<span class="icon">
						<i class="fas fa-random"></i>
					</span>
				</a>
			</div>
		</div>
		
       <div v-if="show" class="v-autocomplete-list">
           <div class="v-autocomplete-list-item" v-for="(item, i) in internalItems" @click="onClickItem(item)" v-bind:key="i" :class="{'v-autocomplete-item-active': i === cursor}" @mouseover="cursor = i">
		        <div>{{ item }}</div>
           </div>
		</div>
	</form>
</template>

<script>
import AutocompleteMixin from '~/mixins/autocomplete';
import Common from '~/mixins/common';

export default {
    mixins: [AutocompleteMixin],
    methods: {
        gotodoc() {
            if(!this.searchText) return;
            this.$router.push('/Go?q=' + encodeURIComponent(this.searchText));
        },
        random() {
            this.$router.push('/random');
        }
    }
}
</script>