<template>
    <div class="mobile-searchbar">
        <b-field>
            <b-input placeholder="검색" type="search" icon="search" class="wikinav-query"></b-input>
            <p class="control">
                <button class="button wikinav-random"><fontawesome icon="random"/></button>
            </p>
            <p class="control">
                <button class="button is-primary wikinav-search"><fontawesome icon="search"/></button>
            </p>
        </b-field>
    </div>
</template>

<style lang="sass" scoped>
@import "~bulma/sass/utilities/mixins.sass";
.mobile-searchbar
    +touch
        display: none;

</style>


<script>
export default {
    name:'mobile-searchbar'
}
</script>
