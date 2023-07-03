// import './style.css';
// import './tailwind.css';

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);
figma.ui.resize(320, 400);

figma.ui.onmessage = (pluginMessage) => {
	console.log(pluginMessage.type);
	console.log(pluginMessage.color);
	const frame = figma.createFrame();

	// Move to (50, 50)
	frame.x = 50;
	frame.y = 50;

	frame.resize(128, 56);
	frame.name = pluginMessage.color;
	frame.fills = [{ type: 'SOLID', color: { r: 1, g: 0, b: 0 } }];
};
