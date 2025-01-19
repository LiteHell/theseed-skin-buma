<template>
    <FontAwesomeIcon :icon="icon.replace('fa-regular', 'far').replace('fa-solid', 'fas')" />
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
    components: {
        FontAwesomeIcon
    },
    props: {
        icon: String
    }
};
</script>