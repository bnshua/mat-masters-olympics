export interface Wrestler {
  id: string;
  name: string;
  pronouns: string;
  school: string;
  singletColor: string;
  spriteIndex: number;
  stats: {
    technique: number;
    strength: number;
    speed: number;
    defense: number;
    stamina: number;
  };
  personality: 'aggressive' | 'defensive' | 'technical' | 'balanced';
}

export interface Move {
  id: string;
  name: string;
  category: 'grapple' | 'hold' | 'takedown' | 'counter' | 'escape' | 'pin';
  power: number;
  staminaCost: number;
  description: string;
  educationalTip: string;
}

export interface MatchState {
  round: number;
  time: number;
  playerScore: number;
  opponentScore: number;
  playerStamina: number;
  opponentStamina: number;
  playerHealth: number;
  opponentHealth: number;
  currentTurn: 'player' | 'opponent';
  phase: 'intro' | 'coin-toss' | 'active' | 'paused' | 'finished';
  winner: 'player' | 'opponent' | null;
  lastMove: {
    attacker: 'player' | 'opponent';
    move: Move;
    success: boolean;
  } | null;
  commentary: string[];
}
