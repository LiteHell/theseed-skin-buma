/// <reference types="vitest" />
import { describe, it } from 'vitest';
import documentStoreState from './storeStates/documentStore.json';
import renderWithMockedStoreAndRouter from './testUtils/renderWithMockedStoreAndRouter';
import Layout from '../layout.vue'

describe('Buma skin', () => {
    it('renders document without error', () => {
        renderWithMockedStoreAndRouter(Layout, documentStoreState)
    })

    it('has navbar', () => {
        const { getByTestId } = renderWithMockedStoreAndRouter(Layout, documentStoreState)
        getByTestId('main-navbar');
    })
})