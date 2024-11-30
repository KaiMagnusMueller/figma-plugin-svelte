import { mount } from 'svelte';
import App from './index.svelte';

const app = mount(App, { target: document.body });

export default app;
