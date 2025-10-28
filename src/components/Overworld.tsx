import { useState, useEffect, useRef } from "react";
import { Position, GameState } from "@/types/overworld";
import { BUILDINGS } from "@/data/buildings";
import { useCollision } from "@/hooks/useCollision";
import { useGameTime } from "@/hooks/useGameTime";
import { HUD } from "@/components/HUD";
import { Card } from "@/components/ui/card";

interface OverworldProps {
  gameState: GameState;
  onGameStateChange: (state: Partial<GameState>) => void;
  onEnterBuilding: (buildingId: string) => void;
  onSettingsClick: () => void;
}

const PLAYER_SIZE = 30;
const MOVE_SPEED = 5;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

export const Overworld = ({ gameState, onGameStateChange, onEnterBuilding, onSettingsClick }: OverworldProps) => {
  const [playerPos, setPlayerPos] = useState<Position>(gameState.playerPosition);
  const [keys, setKeys] = useState<Set<string>>(new Set());
  const { checkCollision, getNearbyBuilding } = useCollision();
  const { currentTime, formatTime, isSchoolHours, setCurrentTime } = useGameTime(gameState.currentTime);
  const lastGPACheckRef = useRef(currentTime);

  // Sync time with game state
  useEffect(() => {
    onGameStateChange({ currentTime });
  }, [currentTime]);

  // GPA decrease system
  useEffect(() => {
    const minutesPassed = currentTime - lastGPACheckRef.current;
    
    if (minutesPassed >= 60) { // Check every hour
      if (isSchoolHours(currentTime) && gameState.currentLocation === 'overworld') {
        const hoursNotInSchool = Math.floor(minutesPassed / 60);
        const gpaLoss = hoursNotInSchool * 0.1;
        const newGPA = Math.max(0, gameState.gpa - gpaLoss);
        onGameStateChange({ gpa: newGPA });
      }
      lastGPACheckRef.current = currentTime;
    }
  }, [currentTime, gameState.currentLocation, isSchoolHours]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(key)) {
        e.preventDefault();
        setKeys(prev => new Set(prev).add(key));

        // Handle space bar for building interaction
        if (key === ' ') {
          const nearbyBuilding = getNearbyBuilding(playerPos, PLAYER_SIZE, BUILDINGS);
          if (nearbyBuilding) {
            onEnterBuilding(nearbyBuilding.id);
          }
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      setKeys(prev => {
        const newKeys = new Set(prev);
        newKeys.delete(key);
        return newKeys;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [playerPos, getNearbyBuilding, onEnterBuilding]);

  // Movement loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (keys.size === 0) return;

      let newX = playerPos.x;
      let newY = playerPos.y;

      if (keys.has('w') || keys.has('arrowup')) newY -= MOVE_SPEED;
      if (keys.has('s') || keys.has('arrowdown')) newY += MOVE_SPEED;
      if (keys.has('a') || keys.has('arrowleft')) newX -= MOVE_SPEED;
      if (keys.has('d') || keys.has('arrowright')) newX += MOVE_SPEED;

      // Boundary checks
      newX = Math.max(0, Math.min(CANVAS_WIDTH - PLAYER_SIZE, newX));
      newY = Math.max(0, Math.min(CANVAS_HEIGHT - PLAYER_SIZE, newY));

      const newPos = { x: newX, y: newY };

      // Check collision with buildings
      if (!checkCollision(newPos, PLAYER_SIZE, BUILDINGS)) {
        setPlayerPos(newPos);
        onGameStateChange({ playerPosition: newPos });
      }
    }, 1000 / 60); // 60 FPS

    return () => clearInterval(interval);
  }, [keys, playerPos, checkCollision, onGameStateChange]);

  const nearbyBuilding = getNearbyBuilding(playerPos, PLAYER_SIZE, BUILDINGS);

  // Get sprite position based on sprite index
  const getSpritePosition = (index: number) => {
    const cols = 4;
    const row = Math.floor(index / cols);
    const col = index % cols;
    return {
      backgroundPosition: `-${col * 64}px -${row * 64}px`,
      backgroundSize: '256px 256px',
    };
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-green-900 to-green-700 overflow-hidden">
      <HUD
        time={formatTime(currentTime)}
        gpa={gameState.gpa}
        onSettingsClick={onSettingsClick}
      />

      <div className="flex items-center justify-center h-full">
        <div
          className="relative border-4 border-primary rounded-lg overflow-hidden retro-shadow"
          style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
        >
          {/* Ground */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-500" />

          {/* Buildings */}
          {BUILDINGS.map((building) => (
            <div
              key={building.id}
              className="absolute border-2 border-foreground rounded cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center"
              style={{
                left: building.position.x,
                top: building.position.y,
                width: building.width,
                height: building.height,
                backgroundColor: building.color,
              }}
              onClick={() => {
                const distance = Math.sqrt(
                  Math.pow((playerPos.x + PLAYER_SIZE / 2) - (building.position.x + building.width / 2), 2) +
                  Math.pow((playerPos.y + PLAYER_SIZE / 2) - (building.position.y + building.height / 2), 2)
                );
                if (distance < building.interactionDistance + PLAYER_SIZE) {
                  onEnterBuilding(building.id);
                }
              }}
            >
              <div className="text-center text-white font-bold text-sm px-2">
                {building.name}
              </div>
            </div>
          ))}

          {/* Player */}
          <div
            className="absolute border-2 border-foreground rounded"
            style={{
              left: playerPos.x,
              top: playerPos.y,
              width: PLAYER_SIZE,
              height: PLAYER_SIZE,
              backgroundImage: `url(/src/assets/wrestlers.png)`,
              ...getSpritePosition(gameState.playerSprite),
              imageRendering: 'pixelated',
            }}
          />

          {/* Interaction prompt */}
          {nearbyBuilding && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <Card className="px-4 py-2 bg-background/90 border-2 border-primary retro-shadow">
                <p className="text-sm font-bold">
                  Press SPACE to enter {nearbyBuilding.name}
                </p>
              </Card>
            </div>
          )}

          {/* Controls hint */}
          <div className="absolute top-4 left-4">
            <Card className="px-3 py-2 bg-background/80 text-xs">
              <p className="font-bold mb-1">Controls:</p>
              <p>WASD / Arrow Keys: Move</p>
              <p>SPACE: Enter Building</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
