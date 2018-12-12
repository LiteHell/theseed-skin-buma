module.exports = {
    modules: [
        ['nuxt-buefy', {css: true, materialDesignIcons: false, defaultIconPack: 'fa'}],
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
    css: [
        {src: '~/assets/css/darkmode.sass', lang: 'sass'},
        '~/assets/jquery-ui.min.css'
    ],
    head: {
        meta: [
            {chartset: 'utf-8'},
            {name:'viewport', content:'width=device-width, initial-scale=1'}
        ],
        script: [
            {src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js'},
            {src: '/jquery-ui.min.js'},
            {src: '/layout.js'}
        ]
    }
}