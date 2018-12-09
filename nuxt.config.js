module.exports = {
    modules: [
        ['nuxt-buefy', {css: true, materialDesignIcons: false}],
        ['nuxt-fontawesome', {
            component: 'fontawesome',
            imports: [
                {
                    set: '@fortawesome/free-solid-svg-icons',
                    icons: ['fas']
                },
                {
                    set: '@fortawesome/free-regular-svg-icons',
                    icons: ['far']
                }
            ]
        }]
    ],
    head: {
        meta: [
            {chartset: 'utf-8'},
            {name:'viewport', content:'width=device-width, initial-scale=1'}
        ]
    }
}