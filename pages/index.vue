<template>
    <div>
        <h1>Hello, World!</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga officiis quidem ex in. Dolor quibusdam
            repellat atque laborum, quae ea nostrum soluta inventore cumque illum maiores corporis sint voluptatem
            distinctio!</p>
    </div>
</template>

<script>
    export default {
        layout: 'wiki-default',
        fetch({store}) {
            let testAsIp = true;
            let testUserDoc = false;

            // user contributor or ip contributor? used in navbar and user-discuss-link(You have user discussion! check it out!)
            if (testAsIp) {
                store.commit('setUserIp', '123.123.123.123');
            } else {
                store.commit('setUserId', 'PPPP');
                store.commit('markHasUserDiscuss');
            }

            store.commit('setWikiInfo', {
                name: '병신위키',
                logourl: '/logo.png'
            });
            store.commit('setSitenotice', 'This is mockup of vue-ported theseed-skin-buma. Press X to pay respect to swig version.');
            store.commit('setViewInfo', {
                viewName: 'wiki',
                title: 'Lorem Ipsum'
            });
            store.commit('setDocInfo', {
                namespace: '문서',
                fullname: '문서:Lorem Ipsum',
                name: 'Lorem Ipsum',
                starred: true,
                starCount: 255,
                lastModifiedAt: new Date(1429196400000)
            });
            store.commit('setLicense', 'cc-by-nc-sa');
        }
    }
</script>