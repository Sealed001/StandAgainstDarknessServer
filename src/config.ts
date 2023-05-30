const debug = process.env.NODE_ENV !== "production";

type Configuration = {
	userMaxCount: number;
	partyNameSizeRange: [number, number];
	partyPasswordSizeRange: [number, number];
	debug?: boolean;
};

const config: Configuration = {
	partyNameSizeRange: [3, 35],
	partyPasswordSizeRange: [3, 20],
	userMaxCount: 100,
	debug,
};

export default config;
