const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body><input type="text" id="input_data" placeholder="Type the data input here" value="{&quot;color&quot;: &quot;red&quot;}"/></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
	const props = Object.getOwnPropertyNames(src)
		.filter(prop => typeof target[prop] === 'undefined')
		.reduce((result, prop) => ({
			...result,
			[prop]: Object.getOwnPropertyDescriptor(src, prop),
		}), {});
	Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
	userAgent: 'node.js',
};
copyProps(window, global);
