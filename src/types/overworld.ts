export interface Position {
  x: number;
  y: number;
}

export interface Building {
  id: string;
  name: string;
  position: Position;
  width: number;
  height: number;
  interactionDistance: number;
  color: string; // temporary until we have sprites
}

export interface PlayerStats {
  technique: number;
  strength: number;
  speed: number;
  defense: number;
  stamina: number;
}

export interface GameState {
  playerPosition: Position;
  currentTime: number; // minutes since midnight (0-1439)
  gpa: number;
  lastSchoolTime: number;
  stats: PlayerStats;
  currentLocation: 'overworld' | 'school' | 'wrestling-room' | 'weight-room' | 'dei-center';
  playerSprite: number; // sprite index from character creation
}

export type Direction = 'up' | 'down' | 'left' | 'right';
