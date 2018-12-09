<template>
    <nav class="navbar">
        <div class="navbar-brand">
            <a href="/" class="navbar-item">
                <img v-if="brand && brand.img" :src="brand.img" />
                <template v-if="brand && brand.text">
                    {{ brand.text }}
                </template>
            </a>
            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
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
