import config from "@config";

let date: Nullable<Date> = null;

export default function (...messages: any[]) {
	const currentDate: Date = new Date();

	if (config.debug === false) {
		return;
	}

	if (
		date === null ||
		date.getDate() !== currentDate.getDate() ||
		date.getMonth() !== currentDate.getMonth() ||
		date.getFullYear() !== currentDate.getFullYear()
	) {
		date = currentDate;
		console.log(`[${date.toLocaleDateString("en-GB")}]`);
	}

	const timeString: string = `[${currentDate.toLocaleTimeString(
		"en-GB"
	)}]`;

	console.log(timeString, ...messages);
}
