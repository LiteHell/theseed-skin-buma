<template>
    <div class="jump-buttons" v-if="$store.state.localConfig['buma.enableJumpButtons'] !== 'no'">
        <ul>
            <li>
                <div class="icon jump-up" @click.prevent="goUp">
                    <div class="fas fa-arrow-up"></div>
                </div>
            </li>
            <li>
                <div class="icon jump-down" @click.prevent="goDown">
                    <div class="fas fa-arrow-down"></div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import $ from "jquery";

export default {
    methods: {
        goUp() {
            $("#wiki-main-title").get(0).scrollIntoView();
        },
        goDown() {
            $("footer").get(0).scrollIntoView();
        }
    }
}
</script>