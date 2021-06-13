<template>
    <div class="navbar-item has-dropdown is-hoverable">
        <a href="#" class="navbar-link" @click.prevent="toggleNavbar">
            <span class="icon" v-if="icon">
                <i :class="icon"></i>
            </span>&nbsp;
            {{ label }}
        </a>
        <div class="navbar-dropdown" :class="{'is-right': rightDropdown}" :style="dropdownStyle">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        icon: String,
        label: String,
        rightDropdown: Boolean
    },
    data () {
        return {
            dropdownStyle: {
                display: 'none'
            },
            screenResizeTimeout: null
        };
    },
    methods: {
        toggleNavbar() {
            if (this.dropdownStyle.display === 'none')
                this.dropdownStyle.display = '';
            else
                this.dropdownStyle.display = 'none';
        },
        handleResize() {
            if (this.screenResizeTimeout)
                clearTimeout(this.screenResizeTimeout);
            this.screenResizeTimeout = setTimeout(this.toggleBySize, 100);
        },
        toggleBySize() {
            const windowWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
            if (windowWidth < 1024) {
                this.dropdownStyle.display = 'none';
            } else {
                this.dropdownStyle.display = '';
            }
        }
    },
    ready: function () {
        if (process.browser)
            window.addEventListener('resize', this.handleResize);
        this.toggleBySize();
    },
    beforeDestroy: function () {
        if (process.browser)
            window.addEventListener('resize', this.handleResize);
    }
}
</script>