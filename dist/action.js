"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const glob_1 = require("glob");
const jamesons_actions_toolkit_1 = require("jamesons-actions-toolkit");
async function action() {
    const releases = new Set();
    for (const file of (0, glob_1.globSync)("**/build/publications/*/module.json")) {
        try {
            const component = JSON.parse((0, fs_1.readFileSync)(file).toString()).component;
            releases.add(`${component.group}:${component.module}:${component.version}`);
        }
        catch (_a) {
            // ignore
        }
    }
    await (0, jamesons_actions_toolkit_1.jobSummary) `
		# Implementations

		**Gradle (Kotlin)**
		\`\`\`kotlin
		${[...releases].map((id) => `implementation("${id}")`).join("\n")}
		\`\`\`

		**Gradle (Groovy)**
		\`\`\`kotlin
		${[...releases].map((id) => `implementation "${id}"`).join("\n")}
		\`\`\`
	`;
}
exports.default = action;
