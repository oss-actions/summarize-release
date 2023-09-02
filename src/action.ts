import { readFileSync } from "fs";
import { globSync } from "glob";
import { jobSummary } from "jamesons-actions-toolkit";

export default async function action() {
	const releases = new Set<string>();

	for (const file of globSync("**/build/publications/*/module.json")) {
		try {
			const component = JSON.parse(readFileSync(file).toString()).component;
			releases.add(
				`${component.group}:${component.module}:${component.version}`,
			);
		} catch {
			// ignore
		}
	}

	await jobSummary`
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
