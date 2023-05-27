import ChangeMobSlotData from "./ChangeMobSlotData";
import SpawnBattalionData from "./SpawnBattalionData";

import EventCallback from "../../EventCallback";

interface MobileToDesktopEvents {
	changeMobSlot: EventCallback<ChangeMobSlotData>;
	spawnBattalion: EventCallback<SpawnBattalionData>;
}

type MobileToDesktopEventName = keyof MobileToDesktopEvents;

const mobileToDesktopEventNames: MobileToDesktopEventName[] = ["changeMobSlot", "spawnBattalion"];

export { MobileToDesktopEventName, mobileToDesktopEventNames };
export default MobileToDesktopEvents;
