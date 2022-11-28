<template>
    <i :class="icon.replace('fa-regular', 'far').replace('fa-solid', 'fas')"></i>
</template>

<script>
/*
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faArrowRight,
    faBan,
    faBeer,
    faBinoculars,
    faBookmark,
    faChartBar,
    faChartLine,
    faCloudUploadAlt,
    faCogs,
    faEdit,
    faEye,
    faHistory,
    faKey,
    faPause,
    faRandom,
    faSignInAlt,
    faSignOutAlt,
    faStar,
    faWrench
} from '@fortawesome/free-solid-svg-icons';
import {
    faComments,
    faFrown,
    faQuestionCircle,
    faThumbsDown,
    faThumbsUp,
    faCopyright,
    faUserCircle,
    faStickyNote,
    faTrashAlt
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
    faBinoculars,
    faBeer,
    faPause,
    faBan,
    faRandom,
    faCloudUploadAlt,
    faWrench,
    faChartLine,
    faChartBar,
    faBookmark,
    faSignOutAlt,
    faSignInAlt,
    faEye,
    faEdit,
    faArrowRight,
    faHistory,
    faKey,
    faStar,
    faCogs
);
library.add(faComments, faFrown, faQuestionCircle, faThumbsDown, faThumbsUp, faCopyright, faUserCircle, faStickyNote, faTrashAlt);

*/
export default {
    /* component: {
        FontAwesomeIcon
    }, */
    props: {
        icon: String
    }
};
</script>
