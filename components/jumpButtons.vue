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
    border: 1px solid #00d1b2;
    font-size: 35px;
    text-align: center;
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 25px;
}
.jump-buttons ul li + li {
    margin-left: 5px;
}
.jump-buttons ul li > * {
    vertical-align: text-middle;
}
</style>

<script>
export default {
    methods: {
        goUp() {
            document.querySelector("#wiki-main-title").scrollIntoView();
        },
        goDown() {
            document.querySelector("footer").scrollIntoView();
        }
    }
}
</script>