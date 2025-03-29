/// <reference types="vitest" />
import { render } from '@testing-library/vue';
import { describe, it } from 'vitest';
import Layout from '../layout.vue';
import { createStore } from 'vuex';
import documentStoreState from './storeStates/documentStore.json';
import { createRouter, createWebHistory } from 'vue-router';
import Nuxt from './nuxtMock/nuxt.vue';
import NuxtLink from './nuxtMock/nuxt-link.vue';

describe('Buma skin', () => {
    it('renders document without error', () => {
        const store = createStore({
            state() {
                return documentStoreState;
            }
        })
        const router = createRouter({
            history: createWebHistory(),
            routes: [
                {}
            ],
          })
        render(
            Layout, {
                global: {
                    plugins: [store, router],
                    components: {Nuxt, NuxtLink}
                }
            }
        )
    })
})