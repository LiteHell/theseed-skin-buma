/// <reference types="vitest" />
import { describe, it } from 'vitest';
import documentStoreState from './storeStates/documentStore.json';
import renderWithMockedStoreAndRouter from './testUtils/renderWithMockedStoreAndRouter';
import Navbar from '../components/navbar/navbar.vue';
import tools from '../components/navbar/fixedToolMenus';
import { expect } from 'vitest';
import { fireEvent, waitFor } from '@testing-library/vue';

const expectPathnameToBe = (actual, expected) => expect((new URL(actual)).pathname).toBe(expected);

describe('Navbar', () => {
    it('Has RecentChanges link', () => {
        const { getByText } = renderWithMockedStoreAndRouter(Navbar, documentStoreState);
        const link = getByText('최근 변경');
        expectPathnameToBe(link.href, '/RecentChanges');
    });

    it('Has RecentDiscuss link', () => {
        const { getByText } = renderWithMockedStoreAndRouter(Navbar, documentStoreState);
        const link = getByText('최근 토론');
        expectPathnameToBe(link.href, '/RecentDiscuss');
    });

    it('Has links for tools', () => {
        const { getByText } = renderWithMockedStoreAndRouter(Navbar, documentStoreState);
        for (const tool of tools) {
            const link = getByText(tool.text);
            expectPathnameToBe(link.href, tool.href);
        }
    })

    it('Has additional tools if provided', () => {
        const storeState = {
            ...documentStoreState,
            session: {
                ...documentStoreState.session,
                menus: [{
                    t: 'Hello',
                    l: '/hello'
                }, {
                    t: 'World',
                    l: '/world'
                }]
            }
        };

        const { getByText } = renderWithMockedStoreAndRouter(Navbar, storeState);
        expectPathnameToBe(getByText('Hello').href, '/hello');
        expectPathnameToBe(getByText('World').href, '/world');
    })

    it('Displays menu well for account users', () => {
        const storeState = {
            ...documentStoreState,
            session: {
                account: {
                    type: 1,
                    name: 'Tester',
                    uuid: 'sample-uuid'
                }
            }
        };

        const { getByText } = renderWithMockedStoreAndRouter(Navbar, storeState);
        getByText('스킨 설정');
        getByText('내 정보');
        getByText('내 사용자 문서');
        getByText('내 문서 기여 목록');
        getByText('내 토론 기여 목록');
        getByText('내 편집 요청 기여 목록');
        getByText('별찜한 문서');
        getByText('로그아웃');
    })

    it('Displays menu well for annoymous users', () => {
        const { getByText } = renderWithMockedStoreAndRouter(Navbar, documentStoreState);
        getByText('스킨 설정');
        getByText('내 문서 기여 목록');
        getByText('내 토론 기여 목록');
        getByText('내 편집 요청 기여 목록');
        getByText('로그인');
    })

    it('Toggles menu on burger button click', () => {
        const { getByTestId } = renderWithMockedStoreAndRouter(Navbar, documentStoreState);
        const burger = getByTestId('navbar-activation-button-on-mobile');
        const mainNavbar = getByTestId('main-navbar');

        const previousMainNavbarClassName = mainNavbar.className;

        fireEvent.click(burger);
        waitFor(() => expect(mainNavbar.className).not.toBe(previousMainNavbarClassName))

        fireEvent.click(burger);
        waitFor(() => expect(mainNavbar.className).toBe(previousMainNavbarClassName))
    })
});
