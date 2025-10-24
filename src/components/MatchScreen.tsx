import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Pause } from 'lucide-react';
import { Wrestler, MatchState } from '@/types/game';
import { moves } from '@/data/moves';
import wrestlersImage from '@/assets/wrestlers.png';

interface MatchScreenProps {
  player: Wrestler;
  opponent: Wrestler;
  onBack: (won?: boolean) => void;
  isCareerMode?: boolean;
}

const MatchScreen = ({ player, opponent, onBack, isCareerMode = false }: MatchScreenProps) => {
  const [matchState, setMatchState] = useState<MatchState>({
    round: 1,
    time: 180,
    playerScore: 0,
    opponentScore: 0,
    playerStamina: 100,
    opponentStamina: 100,
    playerHealth: 100,
    opponentHealth: 100,
    currentTurn: Math.random() > 0.5 ? 'player' : 'opponent',
    phase: 'coin-toss',
    winner: null,
    lastMove: null,
    commentary: ['Welcome to the match!', `${player.name} vs ${opponent.name}!`]
  });

  useEffect(() => {
    if (matchState.phase === 'coin-toss') {
      const timer = setTimeout(() => {
        setMatchState(prev => ({
          ...prev,
          phase: 'active',
          commentary: [`${matchState.currentTurn === 'player' ? player.name : opponent.name} wins the coin toss!`, 'Select your move!']
        }));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [matchState.phase]);

  useEffect(() => {
    if (matchState.phase === 'active' && matchState.currentTurn === 'opponent') {
      const timer = setTimeout(() => {
        handleOpponentMove();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [matchState.currentTurn, matchState.phase]);

  useEffect(() => {
    if (matchState.phase === 'active') {
      const timer = setInterval(() => {
        setMatchState(prev => {
          if (prev.time <= 0) {
            return {
              ...prev,
              phase: 'finished',
              winner: prev.playerScore > prev.opponentScore ? 'player' : 'opponent',
              commentary: ['Time expired!', `Winner: ${prev.playerScore > prev.opponentScore ? player.name : opponent.name}!`]
            };
          }
          return { ...prev, time: prev.time - 1 };
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [matchState.phase]);

  const handlePlayerMove = (moveId: string) => {
    const move = moves.find(m => m.id === moveId);
    if (!move || matchState.currentTurn !== 'player' || matchState.phase !== 'active') return;

    if (matchState.playerStamina < move.staminaCost) {
      setMatchState(prev => ({
        ...prev,
        commentary: ['Not enough stamina!', 'Choose a different move.']
      }));
      return;
    }

    const success = Math.random() > 0.3;
    const points = success ? move.power : 0;

    setMatchState(prev => ({
      ...prev,
      playerScore: prev.playerScore + points,
      playerStamina: Math.max(0, prev.playerStamina - move.staminaCost),
      opponentHealth: success ? Math.max(0, prev.opponentHealth - move.power) : prev.opponentHealth,
      currentTurn: 'opponent',
      lastMove: { attacker: 'player', move, success },
      commentary: success 
        ? [`${player.name} executes a ${move.name}!`, `${points} points scored!`]
        : [`${player.name} attempts ${move.name}...`, 'Move countered!'],
      winner: success && prev.opponentHealth - move.power <= 0 ? 'player' : null,
      phase: success && prev.opponentHealth - move.power <= 0 ? 'finished' : 'active'
    }));
  };

  const handleOpponentMove = () => {
    const availableMoves = moves.filter(m => matchState.opponentStamina >= m.staminaCost);
    if (availableMoves.length === 0) {
      setMatchState(prev => ({
        ...prev,
        phase: 'finished',
        winner: 'player',
        commentary: [`${opponent.name} is exhausted!`, `${player.name} wins!`]
      }));
      return;
    }

    const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    const success = Math.random() > 0.4;
    const points = success ? move.power : 0;

    setMatchState(prev => ({
      ...prev,
      opponentScore: prev.opponentScore + points,
      opponentStamina: Math.max(0, prev.opponentStamina - move.staminaCost),
      playerHealth: success ? Math.max(0, prev.playerHealth - move.power) : prev.playerHealth,
      currentTurn: 'player',
      lastMove: { attacker: 'opponent', move, success },
      commentary: success 
        ? [`${opponent.name} executes a ${move.name}!`, `${points} points scored!`]
        : [`${opponent.name} attempts ${move.name}...`, 'Move blocked!'],
      winner: success && prev.playerHealth - move.power <= 0 ? 'opponent' : null,
      phase: success && prev.playerHealth - move.power <= 0 ? 'finished' : 'active'
    }));
  };

  const getSpritePosition = (index: number) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    return {
      backgroundImage: `url(${wrestlersImage})`,
      backgroundPosition: `-${col * 100}px -${row * 100}px`,
      width: '100px',
      height: '100px',
      backgroundSize: '300px 200px'
    };
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen p-4 bg-gym-floor">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Button variant="outline" onClick={() => onBack()} className="retro-shadow">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Exit Match
          </Button>
          <div className="text-center">
            <div className="text-2xl font-bold">Round {matchState.round}</div>
            <div className="text-xl text-primary font-bold">{formatTime(matchState.time)}</div>
          </div>
          <Button variant="outline" className="retro-shadow">
            <Pause className="h-4 w-4" />
          </Button>
        </div>

        {/* Score Display */}
        <Card className="mb-4 p-4 retro-border bg-card">
          <div className="flex justify-between items-center">
            <div className="text-center flex-1">
              <div className="text-sm font-semibold mb-1">{player.school}</div>
              <div className="text-3xl font-bold text-primary">{matchState.playerScore}</div>
            </div>
            <div className="text-2xl font-bold px-4">VS</div>
            <div className="text-center flex-1">
              <div className="text-sm font-semibold mb-1">{opponent.school}</div>
              <div className="text-3xl font-bold text-secondary">{matchState.opponentScore}</div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Player Stats */}
          <Card className="lg:col-span-3 p-4 retro-border bg-card">
            <div className="text-center mb-4">
              <div 
                className="pixel-art mx-auto mb-2 retro-border"
                style={getSpritePosition(player.spriteIndex)}
              />
              <h3 className="font-bold">{player.name}</h3>
              <Badge variant="secondary" className="text-xs">{player.pronouns}</Badge>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Stamina</span>
                  <span className="font-bold">{matchState.playerStamina}%</span>
                </div>
                <Progress value={matchState.playerStamina} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Condition</span>
                  <span className="font-bold">{matchState.playerHealth}%</span>
                </div>
                <Progress value={matchState.playerHealth} className="h-2" />
              </div>
            </div>
          </Card>

          {/* Wrestling Mat */}
          <div className="lg:col-span-6">
            <Card className="aspect-square retro-border bg-mat-red flex flex-col items-center justify-center relative overflow-hidden">
              {/* Mat Circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full border-8 border-mat-border opacity-50" />
              </div>
              
              {/* Wrestlers */}
              <div className="flex gap-8 items-center justify-center relative z-10">
                <div 
                  className={`pixel-art retro-border transform scale-150 ${
                    matchState.currentTurn === 'player' ? 'animate-pulse-glow' : ''
                  }`}
                  style={getSpritePosition(player.spriteIndex)}
                />
                <div 
                  className={`pixel-art retro-border transform scale-150 ${
                    matchState.currentTurn === 'opponent' ? 'animate-pulse-glow' : ''
                  }`}
                  style={getSpritePosition(opponent.spriteIndex)}
                />
              </div>

              {/* Commentary Box */}
              <Card className="absolute bottom-4 left-4 right-4 p-3 retro-border bg-card/95">
                {matchState.commentary.map((comment, i) => (
                  <p key={i} className="text-sm font-semibold">{comment}</p>
                ))}
              </Card>

              {/* Phase Overlay */}
              {matchState.phase === 'coin-toss' && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-4xl font-bold text-white animate-bounce-in">
                    Coin Toss...
                  </div>
                </div>
              )}

              {matchState.phase === 'finished' && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-primary mb-4">
                      {matchState.winner === 'player' ? 'VICTORY!' : 'DEFEAT'}
                    </div>
                    <Button 
                      size="lg" 
                      onClick={() => isCareerMode ? onBack(matchState.winner === 'player') : onBack()} 
                      className="retro-shadow"
                    >
                      {isCareerMode ? 'Continue' : 'Return to Menu'}
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Opponent Stats */}
          <Card className="lg:col-span-3 p-4 retro-border bg-card">
            <div className="text-center mb-4">
              <div 
                className="pixel-art mx-auto mb-2 retro-border"
                style={getSpritePosition(opponent.spriteIndex)}
              />
              <h3 className="font-bold">{opponent.name}</h3>
              <Badge variant="secondary" className="text-xs">{opponent.pronouns}</Badge>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Stamina</span>
                  <span className="font-bold">{matchState.opponentStamina}%</span>
                </div>
                <Progress value={matchState.opponentStamina} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Condition</span>
                  <span className="font-bold">{matchState.opponentHealth}%</span>
                </div>
                <Progress value={matchState.opponentHealth} className="h-2" />
              </div>
            </div>
          </Card>
        </div>

        {/* Move Selection */}
        {matchState.phase === 'active' && (
          <Card className="mt-4 p-4 retro-border bg-card">
            <div className="mb-2 text-center font-bold text-lg">
              {matchState.currentTurn === 'player' ? 'Your Turn - Select a Move!' : "Opponent's Turn..."}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {moves.map((move) => (
                <Button
                  key={move.id}
                  onClick={() => handlePlayerMove(move.id)}
                  disabled={
                    matchState.currentTurn !== 'player' || 
                    matchState.playerStamina < move.staminaCost
                  }
                  className="h-auto py-4 flex flex-col items-start retro-shadow bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground border-2 border-primary-foreground/20"
                  variant={matchState.playerStamina < move.staminaCost ? 'outline' : 'default'}
                >
                  <div className="font-bold text-base mb-2">{move.name}</div>
                  <div className="text-xs space-y-1 text-left w-full opacity-90">
                    <div className="flex justify-between items-center">
                      <span>Power:</span>
                      <Badge variant="secondary" className="text-xs ml-2 bg-primary-foreground/20 text-primary-foreground border-0">{move.power}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Cost:</span>
                      <Badge variant="outline" className="text-xs ml-2 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/30">{move.staminaCost}</Badge>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MatchScreen;
