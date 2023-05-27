import DesktopToMobileEvents, { desktopToMobileEventNames } from "./desktopToMobile";
import MobileToDesktopEvents, { mobileToDesktopEventNames } from "./mobileToDesktop";

export default interface GameEvents extends DesktopToMobileEvents, MobileToDesktopEvents {}

export { desktopToMobileEventNames, mobileToDesktopEventNames };
