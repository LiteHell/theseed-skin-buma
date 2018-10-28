<template>
    <NavbarDropdown v-if="member" icon="fas fa-user" text="{{ member.username }}">
        <slot></slot>
    </NavbarDropdown>
    <NavbarDropdown v-else icon="fas fa-user-secret" text="익명">
        <slot></slot>
    </NavbarDropdown>
</template>


<script>
    import NavbarDropdown from "./NavbarDropdown.vue"

    export default {
        name: "UserDropdown",
        components: NavbarDropdown
    };
</script>