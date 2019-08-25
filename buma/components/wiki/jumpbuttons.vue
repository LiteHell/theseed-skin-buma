<template>
    <div class="jump-buttons">
        <ul>
            <li>
                <a class="jump-up" href="#top">
                    <fontawesome icon="arrow-up" />
                </a>
            </li>
            <li>
                <a class="jump-down" href="#bottom">
                    <fontawesome icon="arrow-down" />
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'jumpbuttons'
}
</script>

<style scoped lang="sass">
.jump-buttons
    position: fixed;
    bottom: 10px;
    right: 10px;
    &.lefthand
        left: 10px;
    ul
        list-style-type: none;
        li 
            display: inline-block;
            background: white;
            border: 1px solid white;
            font-size: 35px;
            line-height: 45px;
            text-align: center;
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 25px;
            border: 1px solid #d1d1d1;
            box-shadow: 0px 2px 2px gray;
            a 
                vertical-align: text-top;
        li+li 
            margin-left: 7px;
</style>
