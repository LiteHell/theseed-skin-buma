<template>
    <div class="jump-buttons" v-if="$store.state.localConfig['buma.enableJumpButtons'] !== 'no'">
        <ul>
            <li>
                <div class="jump-up" :class="bulma('icon')" @click.prevent="goUp" title="위로 이동">
                    <buma-font-awesome-icon icon="fa-solid fa-arrow-up"></buma-font-awesome-icon>
                </div>
            </li><li>
                <div class="jump-down" :class="bulma('icon')" @click.prevent="goDown" title="아래로 이동">
                    <buma-font-awesome-icon icon="fa-solid fa-arrow-down"></buma-font-awesome-icon>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.jump-buttons {
    position: fixed;
    bottom: 10px;
    right: 10px;
}
.jump-buttons ul {
    list-style-type: none;
}
.jump-buttons ul li {
    cursor: pointer;
    display: inline-block;
    background: #00d1b2;
    border: 1px solid #00c0a3;
    font-size: 30px;
    text-align: center;
    color: white;
    width: 50px;
    height: 45px;
}
.jump-buttons ul li:hover {
    background: #00917b
}
.jump-buttons ul li:first-child {
    border-radius: 5px 0px 0px 5px;
}
.jump-buttons ul li:last-child {
    border-radius: 0px 5px 5px 0px;
}
.jump-buttons ul li > * {
    vertical-align: text-middle;
}
</style>

<script>
import bulma from '../src/bulma';
import bumaFontAwesomeIcon from './buma-font-awesome-icon.vue';

export default {
    components: {
        bumaFontAwesomeIcon
    },
    methods: {
        goUp() {
            document.querySelector(".top-anchor").scrollIntoView({ behavior: 'smooth', block: 'start' });
        },
        goDown() {
            document.querySelector("footer").scrollIntoView({ behavior: 'smooth', block: 'end' });
        },
        bulma
    }
}
</script>