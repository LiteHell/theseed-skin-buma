<template>
    <div class="jump-buttons">
        <ul>
            <li>
                <div class="icon jump-up">
                    <fontawesome icon="arrow-up" />
                </div>
            </li>
            <li>
                <div class="icon jump-down">
                    <fontawesome icon="arrow-down" />
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'jumpbuttons'
}
</script>

<style scoped lang="less">
.jump-buttons {
    position: fixed;
    bottom: 10px;
    right: 10px;

    ul {
        list-style-type: none;

        li {
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

        li+li {
            margin-left: 5px;
        }

        li>* {
            vertical-align: text-middle;
        }
    }
}
</style>
