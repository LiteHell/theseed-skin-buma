<template>
    <div class="mobile-search disabled">
        <b-field class="search-fields">
            <b-input placeholder="검색" type="search" class="query" expanded></b-input>
            <p class="control">
                <button class="button searchBtn"><fontawesome icon="search"/></button>
            </p>
            <p class="control">
                <button class="button cancelBtn"><fontawesome icon="times"/></button>
            </p>
        </b-field>
    </div>
</template>

<style lang="sass" scoped>
@import "~bulma/sass/utilities/mixins.sass";
.mobile-search
    +desktop
        display: none;
    &.disabled
        display: none;
    background: white;
    height: 100%;
    padding: 8px 12px;
</style>


<script>
export default {
    name:'mobile-searchbar'
}
</script>
