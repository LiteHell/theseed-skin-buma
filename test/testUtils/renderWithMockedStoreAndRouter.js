/// <reference types="vitest" />
import { render } from '@testing-library/vue';
import { createStore } from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';
import Nuxt from '../nuxtMock/nuxt.vue';
import NuxtLink from '../nuxtMock/nuxt-link.vue';

export default function renderWithMockedStoreAndRouter (component, storeState) {
    const store = createStore({
        state() {
            return storeState;
        }
    });
    const router = createRouter({
        history: createWebHistory(),
        routes: [{}]
    });
    return render(component, {
        global: {
            plugins: [store, router],
            components: { Nuxt, NuxtLink }
        }
    });
};
