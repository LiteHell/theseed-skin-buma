<template>
    <nav class="navbar buma-topnav">
        <div class="navbar-brand">
            <a href="/" class="navbar-item">
                <img v-if="brand && brand.img" :src="brand.img" />
                <template v-if="brand && brand.text">
                    {{ brand.text }}
                </template>
            </a>
            <div class="navbar-mobile">
                <div class="mobile-left">
                <slot>
                </slot></div>
                <div class="mobile-right">
                <slot name="menu-right"></slot>
                </div>
            </div>
        </div>
        <div class="navbar-menu">
            <div class="navbar-start">
                <slot>
                </slot>
            </div>
            <div class="navbar-end">
                <slot name="menu-right"></slot>
            </div>
        </div>
    </nav>
</template>

<!-- scoped not working due to slot -->
<style lang="sass">
@import "~bulma/sass/utilities/mixins.sass";
nav.buma-topnav
    .navbar-mobile
        +desktop
            display: none;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .mobile-right
            float: right;
            .navbar-dropdown
                right: 0;
        .mobile-left .navbar-dropdown
            left: 0;
        .mobile-left, .mobile-right
            display: flex;
            flow-direction: row;
            min-height: 100%;
            vertical-align: middle;
            > .navbar-item
                > .navbar-item-text
                    display: none;
                &.has-dropdown
                    .navbar-link .navbar-item-text
                        display: none;
                    .navbar-dropdown
                        display: none;
                        box-shadow: 0 8px 8px rgba($black, 0.1);
                    &:hover
                        .navbar-dropdown
                            display: block;
                            position: absolute;
                            top: 100%;
                            z-index: 20;
                            min-width: 100%;
                            background: white;
                            .navbar-item
                                padding: 0.375rem 1rem
                                white-space: nowrap
                                a.navbar-item
                                padding-right: 3rem;
</style>


<script>
export default {
    name: 'b-navbar',
    props: {
        "brand": {
            type: Object,
            default: {
                img: '',
                text: ''
            }
        }
    }
}
</script>
