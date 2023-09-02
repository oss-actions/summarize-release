import { readFileSync } from "fs";
import { resolve } from "path";

export default JSON.parse(
	readFileSync(resolve(__dirname, "../package.json")).toString(),
).version;
