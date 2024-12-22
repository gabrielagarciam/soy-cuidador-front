import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createHead } from "@vueuse/head";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faCopy,
  faShareFromSquare,
  faClock,
  faTimesCircle,
  faQuestionCircle,
  faHandPaper,
  faCheckCircle,
  faHeart,
  faEye,
  faEnvelopeOpen,
} from "@fortawesome/free-regular-svg-icons";

import {
  faHeart as fasHeart,
  faChevronRight,
  faChevronLeft,
  faTimes,
  faBars,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  faWhatsapp,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

/* add icons to the library */
library.add(
  faWhatsapp,
  faFacebook,
  faInstagram,
  faCopy,
  faShareFromSquare,
  faClock,
  faTimesCircle,
  faQuestionCircle,
  faHandPaper,
  faCheckCircle,
  faHeart,
  faEye,
  fasHeart,
  faEnvelopeOpen,
  faChevronRight,
  faChevronLeft,
  faTimes,
  faBars,
  faChevronDown
);

const app = createApp(App);

// Create and use head
const head = createHead();
app.use(head);

app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
