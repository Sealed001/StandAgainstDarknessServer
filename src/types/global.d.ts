export {};

declare global {
	type Nullable<T> = T | null;
	type Vector3 = {
		x: number;
		y: number;
		z: number;
	};
}
