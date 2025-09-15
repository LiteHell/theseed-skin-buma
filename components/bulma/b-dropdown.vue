<template>
    <div class="navbar-item has-dropdown is-hoverable">
        <a href="#" class="navbar-link" @click.prevent="toggleNavbar">
            <span v-if="icon" class="icon">
                <FontAwesomeIcon :icon="icon" /> </span
            >&nbsp;
            {{ label }}
        </a>
        <div v-show="showDropdown" :class="{ 'navbar-dropdown': true, 'is-right': rightDropdown }">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
    components: {
        FontAwesomeIcon
    },
    props: {
        icon: {
            default: ''
        },
        label: {
            type: String,
            required: true
        },
        rightDropdown: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            showDropdown: false,
            screenResizeTimeout: null
        };
    },
    methods: {
        toggleNavbar() {
            this.showDropdown = !this.showDropdown;
        },
        handleResize() {
            if (this.screenResizeTimeout) clearTimeout(this.screenResizeTimeout);
            this.screenResizeTimeout = setTimeout(this.toggleBySize, 100);
        },
        toggleBySize() {
            const windowWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
            this.showDropdown = windowWidth < 1024 ? false : true;
        }
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
        this.toggleBySize();
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }
};
</script>
