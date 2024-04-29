import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { 
    RiSearchEyeLine,
    RiNotification4Line,
    RiAttachmentLine,
    MdSendSharp ,
    CoSend,
    MdAttachmentTwotone,
    RiMenu4Line,
    RiHomeLine,
    LaEdit,
    CoUser,
    BiHeart,
    BiHeartFill,
    CoCommentBubble,
    LaRetweetSolid,
    CoShare,
    CoInstagram,
    RiMoreFill,
    RiMore2Fill
 } 

from "oh-vue-icons/icons";

import router from './router.js'

const app = createApp(App)

addIcons(RiSearchEyeLine,
    RiNotification4Line,
    RiMenu4Line,
    RiHomeLine,
    LaEdit,
    CoUser,
    BiHeart,
    BiHeartFill,
    MdAttachmentTwotone,
    CoSend,
    MdSendSharp,
    CoCommentBubble,
    LaRetweetSolid,
    CoShare,
    CoInstagram,
    RiMoreFill,
    RiMore2Fill
    );


app.component('v-icon',OhVueIcon)
app.use(router)
app.mount('#app')
