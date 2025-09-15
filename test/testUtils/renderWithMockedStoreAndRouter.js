/// <reference types="vitest" />
import { render } from '@testing-library/vue';
import { createStore } from 'vuex';
import { createRouter, createWebHistory, RouterLink, RouterView } from 'vue-router';
import { createVfm } from 'vue-final-modal';
import View from '../theseedMock/view/test.vue';

export default function renderWithMockedStoreAndRouter (component, storeState) {
    const store = createStore({
        state() {
            return storeState;
        }
    });
    const router = createRouter({
        history: createWebHistory(),
        routes: [   
            { path: '/:pathMatch(.*)*', component: View },
        ]
    });
    const vfm = createVfm();
    return render(component, {
        global: {
            plugins: [store, router, vfm],
            components: { Nuxt: RouterView, NuxtLink: RouterLink }
        }
    });
};
