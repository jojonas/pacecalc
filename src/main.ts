import App from './App.svelte';

import "spectre.css/dist/spectre.min.css";
import "spectre.css/dist/spectre-exp.min.css";
import "spectre.css/dist/spectre-icons.min.css";

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('service-worker.js');
};

const app = new App({
	target: document.body,
});

export default app;