<template>
  <div class="navbar-item has-dropdown is-hoverable">
    <a href="#" class="navbar-link">
      <span class="icon">
        <i class="{{ icon }}"></i>
      </span> {{ text }}</a>
    <div class="navbar-dropdown">
      <slot></slot>
    </div>
  </div>
</template>


<script>
  export default {
    name: "NavbarDropdown",
    props: {
      icon: String,
      text: String
    }
  };
</script>