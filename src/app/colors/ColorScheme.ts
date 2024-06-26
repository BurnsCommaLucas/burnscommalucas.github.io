import { stripUnsafeCharacters } from "../helpers";

export class ColorScheme {
	constructor(
		public name: string,
		public primary: string,
		public secondary: string,
		public glow: boolean,
	) {}

	urlSafeName(): string {
		return stripUnsafeCharacters(this.name)
	}
}
