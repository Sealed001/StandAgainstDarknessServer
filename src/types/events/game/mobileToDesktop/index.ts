import ChangeMobSlotData from "./ChangeMobSlotData";
import SpawnBattalionData from "./SpawnBattalionData";
import StartGameData from "./StartGameData";

import EventCallback from "../../EventCallback";

interface MobileToDesktopEvents {
	changeMobSlot: EventCallback<ChangeMobSlotData>;
	spawnBattalion: EventCallback<SpawnBattalionData>;
	startGame: EventCallback<StartGameData>;
}

type MobileToDesktopEventName = keyof MobileToDesktopEvents;

const mobileToDesktopEventNames: MobileToDesktopEventName[] =
	["changeMobSlot", "spawnBattalion", "startGame"];

export {
	MobileToDesktopEventName,
	mobileToDesktopEventNames,
};
export default MobileToDesktopEvents;
