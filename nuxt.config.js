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
        ],
        script: [
            {src:  'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js'},
            {src:  'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js'},
            {src: '/layout.js'}
        ]
    }
}