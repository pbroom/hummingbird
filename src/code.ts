import { createPalette } from './palettes';

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);
figma.ui.resize(320, 400);

figma.ui.onmessage = (pluginMessage) => {
	const hexColor = pluginMessage.color != '' ? pluginMessage.color : '#000000';
	const paletteName = pluginMessage.name != '' ? pluginMessage.name : 'color';

	createPalette({
		hexColor,
		paletteName,
	});

	console.log(pluginMessage.type);
	console.log(pluginMessage.color);
	console.log(pluginMessage.name);
	const frame = figma.createFrame();

	// Move to (50, 50)
	frame.x = Math.floor(figma.viewport.center.x);
	frame.y = Math.floor(figma.viewport.center.y);

	frame.resize(128, 56);
	frame.name = pluginMessage.name;
	frame.fills = [{ type: 'SOLID', color: { r: 1, g: 0, b: 0 } }];
};
