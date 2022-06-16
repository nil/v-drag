import { createApp } from 'vue';
import App from './components/App.vue';
import store from './store';
import drag from '../../dist/module';

createApp(App).use(store).use(drag).mount('#app');
