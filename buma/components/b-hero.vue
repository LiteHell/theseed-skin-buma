<template>
    <section class="hero is-primary">
        <div class="hero-body">
            <div class="container">
                <h1 class="title" v-html="title"></h1>
                <h2 class="subtitle" v-html="subtitle"></h2>
            </div>
        </div>
        <div class="hero-foot">
            <nav class="tabs is-left is-boxed">
                <div class="container">
                    <slot>

                    </slot>
                </div>
            </nav>
        </div>
    </section>
</template>

<script>
export default {
    name: 'b-hero',
    props: {
        title: {type: String, required: true},
        subtitle: {type: String, default: 'powered by the seed engine'}
    }
}
</script>
