/// <reference types="vitest" />
import { describe, it } from 'vitest';
import documentStoreState from '../storeStates/documentStore.json';
import licenseStoreState from '../storeStates/licenseStore.json';
import renderWithMockedStoreAndRouter from '../testUtils/renderWithMockedStoreAndRouter';
import { expect } from 'vitest';
import HeroFoot from '../../components/wikiHero/foot/foot';
import starredDocumentState from '../storeStates/starredDocumentStore.json';
import userDocumentState from '../storeStates/userDocumentStore.json';

describe('Wiki document hero foot tabs', () => {
    it('are visible on document', () => {
        const { getByText } = renderWithMockedStoreAndRouter(HeroFoot, documentStoreState)
        getByText("읽기")
    })

    it('are not visible on non-document', () => {
        const { queryByText } = renderWithMockedStoreAndRouter(HeroFoot, licenseStoreState)
        expect(queryByText('읽기')).toBe(null);
    })

    it('renders unstar button', () => {
        const { getByText } = renderWithMockedStoreAndRouter(HeroFoot, starredDocumentState)
        const unstarBtn = getByText("별찜 해제 (")
        expect(unstarBtn.parentElement.textContent.trim()).toBe('별찜 해제 (123)')
    })

    it('renders contribution menu on user document', () => {
        const { getByText } = renderWithMockedStoreAndRouter(HeroFoot, userDocumentState)
        getByText("기여 목록")
    })

})