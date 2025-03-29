import { faBeer, faPause, faBan, faRandom, faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { faFrown, faQuestionCircle, faThumbsDown, faThumbsUp, faCopyright } from '@fortawesome/free-regular-svg-icons'

const toolMenus = [
    { href: '/NeededPages', icon: faBeer, text: '작성이 필요한 문서' },
    { href: '/OrphanedPages', icon: faFrown, text: '고립된 문서' },
    { href: '/OrphanedCategories', icon: faFrown, text: '고립된 분류' },
    { href: '/UncategorizedPages', icon: faQuestionCircle, text: '분류가 되지 않은 문서' },
    { href: '/OldPages', icon: faPause, text: '편집된 지 오래된 문서' },
    { href: '/ShortestPages', icon: faThumbsDown, text: '내용이 짧은 문서' },
    { href: '/LongestPages', icon: faThumbsUp, text: '내용이 긴 문서' },
    { href: '/BlockHistory', icon: faBan, text: '차단 내역' },
    { href: '/RandomPage', icon: faRandom, text: 'RandomPage' },
    { href: '/Upload', icon: faCloudUploadAlt, text: '파일 올리기' },
    { href: '/License', icon: faCopyright, text: '라이선스' }
];

export default toolMenus;