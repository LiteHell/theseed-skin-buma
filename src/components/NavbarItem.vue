<template>
  <a href="{{ href }}" class="navbar-item">
      <span class="icon">
          <i class="{{ icon }}"></i>
      </span>{{ text }}</a>
</template>

<script>
export default {
  name: "NavbarItem",
  props: {
    href: String,
    icon: String,
    text: String
  }
};
</script>