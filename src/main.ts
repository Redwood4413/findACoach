import { createApp } from 'vue';
import './style.scss';
import App from './App.vue';
import router from './router';
import store from './stores';
import BaseButton from './components/UI/BaseButton.vue';
import BaseDialog from './components/UI/BaseDialog.vue';
import BaseWrapper from './components/UI/BaseWrapper.vue';
import BaseRouterLink from './components/UI/BaseRouterLink.vue';
import BaseThrottleButton from './components/UI/BaseThrottleButton.vue';
import BaseDropdownMenu from './components/UI/BaseDropdownMenu.vue';
import BaseError from './components/UI/BaseError.vue';
import BaseSubmitButton from './components/UI/BaseSubmitButton.vue';
import BaseSuccess from './components/UI/BaseSuccess.vue';

const app = createApp(App);

app.use(store);
app.use(router);

app.component('BaseButton', BaseButton);
app.component('BaseDialog', BaseDialog);
app.component('BaseDrodownMenu', BaseDropdownMenu);
app.component('BaseError', BaseError);
app.component('BaseRouterLink', BaseRouterLink);
app.component('BaseSubmitButton', BaseSubmitButton);
app.component('BaseSuccess', BaseSuccess);
app.component('BaseThrottleButton', BaseThrottleButton);
app.component('BaseWrapper', BaseWrapper);

app.mount('#app');
