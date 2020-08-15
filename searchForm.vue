<!-- 리버티 스킨 참고함 -->

<template>
	<form v-on:submit.prevent>
		<div class="field has-addons">
			<div class="control has-icons-left">
				<input class="input is-primary" v-on:input="searchText = $event.target.value" type="text" autocomplete="off"  @blur="blur" @focus="focus" @input="inputChange" @keyup.enter="keyEnter" @keydown.tab="keyEnter" @keydown.up="keyUp" @keydown.down="keyDown" placeholder="검색" id="wikiSearch">
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


<style scoped>
.v-autocomplete-list {
    position: absolute;
    z-index: 3;
    border: 1px solid #CCC;
    background-color: #fff;
    width: 10.8rem;
}
@media (max-width: 1023px) {
    .v-autocomplete-list {
        width: 100%;
    }
}
.theseed-dark-mode .v-autocomplete-list {
  background-color: #2d2f34;
    border: 1px solid #383b40;
}
.v-autocomplete-list-item {
  cursor: pointer;
  color: #373a3c;
  padding: 0.5rem;
}
.theseed-dark-mode .v-autocomplete-list-item {
  color: #ddd;
}
 .v-autocomplete-list-item.v-autocomplete-item-active {
  background-color: #f3f6fa;
}
.theseed-dark-mode .v-autocomplete-list-item.v-autocomplete-item-active {
  background-color: #383b40;
}
</style>

