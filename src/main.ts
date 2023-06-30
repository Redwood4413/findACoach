import { createApp } from 'vue';
import './style.scss';
import App from './App.vue';
import router from './router';
import store from './stores';
import BaseButton from './components/UI/BaseButton.vue';
import BaseDialog from './components/UI/BaseDialog.vue';
import BaseWrapper from './components/UI/BaseWrapper.vue';
import BaseRouterLink from './components/UI/BaseRouterLink.vue';

const app = createApp(App);

app.use(store);
app.use(router);
app.component('BaseButton', BaseButton);
app.component('BaseDialog', BaseDialog);
app.component('BaseWrapper', BaseWrapper);
app.component('BaseRouterLink', BaseRouterLink);

app.mount('#app');
