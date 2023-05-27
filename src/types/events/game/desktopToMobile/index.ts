import DefinePortalPositionsData from "./DefinePortalPositionsData";
import EndGameData from "./EndGameData";
import RevealTempleData from "./RevealTempleData";
import UnlockNewCardData from "./UnlockNewCardData";
import UpdateBattalionStateData from "./UpdateBattalionStateData";
import UpdatePlayerLevelData from "./UpdatePlayerLevelData";
import UpdatePlayerStateData from "./UpdatePlayerStateData";
import UpdatePortalStateData from "./UpdatePortalStateData";
import UpdateTempleStateData from "./UpdateTempleStateData";

import EventCallback from "../../EventCallback";

interface DesktopToMobileEvents {
	definePortalPositions: EventCallback<DefinePortalPositionsData>;
	endGame: EventCallback<EndGameData>;
	revealTemple: EventCallback<RevealTempleData>;
	unlockNewCard: EventCallback<UnlockNewCardData>;
	updateBattalionState: EventCallback<UpdateBattalionStateData>;
	updatePlayerLevel: EventCallback<UpdatePlayerLevelData>;
	updatePlayerState: EventCallback<UpdatePlayerStateData>;
	updatePortalState: EventCallback<UpdatePortalStateData>;
	updateTempleState: EventCallback<UpdateTempleStateData>;
}

type DesktopToMobileEventName = keyof DesktopToMobileEvents;

const desktopToMobileEventNames: DesktopToMobileEventName[] = [
	"definePortalPositions",
	"endGame",
	"revealTemple",
	"unlockNewCard",
	"updateBattalionState",
	"updatePlayerLevel",
	"updatePlayerState",
	"updatePortalState",
	"updateTempleState",
];

export { DesktopToMobileEventName, desktopToMobileEventNames };
export default DesktopToMobileEvents;
