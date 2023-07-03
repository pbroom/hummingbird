const fs = require('fs');
module.exports = function (plop) {
	plop.setGenerator('update-css', {
		description: 'Update the CSS in the UI file',
		prompts: [], // you can add questions here if you need some data from the user
		actions: [
			{
				type: 'modify',
				path: 'src/ui.html',
				transform: function (fileContents) {
					// Remove the existing <style> tags and their content
					const removedStyleContents = fileContents.replace(
						/<style>[\s\S]*?<\/style>/,
						''
					);
					// Read the contents of the CSS file
					const cssContent = fs.readFileSync('src/tailwind.css', 'utf8');
					// Add the new <style> tags with the CSS content
					const newContents =
						removedStyleContents + `<style>\n${cssContent}\n</style>`;
					return newContents;
				},
			},
		],
	});
};
