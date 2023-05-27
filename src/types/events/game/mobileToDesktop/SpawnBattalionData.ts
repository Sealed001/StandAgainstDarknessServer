import MobData from "../MobData";

type SpawnBattalionData = {
	actionType: number;
	mobData: MobData;
	spawnPosition: Vector3;
	targetPosition: Vector3;
};

export default SpawnBattalionData;
