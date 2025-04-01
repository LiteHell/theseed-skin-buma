/// <reference types="vitest" />
import { describe, it } from 'vitest';
import documentStoreState from './storeStates/documentStore.json';
import licenseStoreState from './storeStates/licenseStore.json';
import renderWithMockedStoreAndRouter from './testUtils/renderWithMockedStoreAndRouter';
import { expect } from 'vitest';
import HeroFoot from '../components/heroFoot/heroFoot.vue';

describe('Wiki document hero foot tabs', () => {
    it('are visible on document', () => {
        const { getByText } = renderWithMockedStoreAndRouter(HeroFoot, documentStoreState)
        getByText("읽기")
    })

    it('are not visible on non-document', () => {
        const { queryByText } = renderWithMockedStoreAndRouter(HeroFoot, licenseStoreState)
        expect(queryByText('읽기')).toBe(null);
    })
})