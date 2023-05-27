const debug = process.env.NODE_ENV !== "production";

type Configuration = {
	userMaxCount: number;
	debug?: boolean;
};

const config: Configuration = {
	userMaxCount: 100,
	debug,
};

export default config;
