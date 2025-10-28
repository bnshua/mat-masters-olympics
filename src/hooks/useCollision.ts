import { Position, Building } from "@/types/overworld";

export const useCollision = () => {
  const checkCollision = (
    playerPos: Position,
    playerSize: number,
    buildings: Building[]
  ): boolean => {
    return buildings.some(building => {
      const playerRight = playerPos.x + playerSize;
      const playerBottom = playerPos.y + playerSize;
      const buildingRight = building.position.x + building.width;
      const buildingBottom = building.position.y + building.height;

      return (
        playerPos.x < buildingRight &&
        playerRight > building.position.x &&
        playerPos.y < buildingBottom &&
        playerBottom > building.position.y
      );
    });
  };

  const getNearbyBuilding = (
    playerPos: Position,
    playerSize: number,
    buildings: Building[]
  ): Building | null => {
    const playerCenterX = playerPos.x + playerSize / 2;
    const playerCenterY = playerPos.y + playerSize / 2;

    for (const building of buildings) {
      const buildingCenterX = building.position.x + building.width / 2;
      const buildingCenterY = building.position.y + building.height / 2;
      
      const distance = Math.sqrt(
        Math.pow(playerCenterX - buildingCenterX, 2) +
        Math.pow(playerCenterY - buildingCenterY, 2)
      );

      if (distance < building.interactionDistance + playerSize) {
        return building;
      }
    }

    return null;
  };

  return { checkCollision, getNearbyBuilding };
};
