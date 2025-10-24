import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Trophy, Star, Award } from 'lucide-react';
import CharacterSelect from '@/components/CharacterSelect';
import MatchScreen from '@/components/MatchScreen';
import { Wrestler } from '@/types/game';
import { wrestlers } from '@/data/wrestlers';

interface CareerModeProps {
  onBack: () => void;
  customCharacter: {
    name: string;
    pronouns: string;
    spriteIndex: number;
  } | null;
}

type CareerPhase = 'intro' | 'character-select' | 'tournament' | 'match' | 'victory';

interface CareerProgress {
  level: number;
  wins: number;
  currentTournament: string;
  opponentIndex: number;
}

const CareerMode = ({ onBack, customCharacter }: CareerModeProps) => {
  const [phase, setPhase] = useState<CareerPhase>('intro');
  const [selectedPlayer, setSelectedPlayer] = useState<Wrestler | null>(null);
  const [currentOpponent, setCurrentOpponent] = useState<Wrestler | null>(null);
  const [progress, setProgress] = useState<CareerProgress>({
    level: 1,
    wins: 0,
    currentTournament: 'School Championship',
    opponentIndex: 0
  });

  const tournaments = [
    { name: 'School Championship', level: 1, opponents: 2 },
    { name: 'District Tournament', level: 2, opponents: 3 },
    { name: 'State Finals', level: 3, opponents: 4 },
    { name: 'National Championship', level: 4, opponents: 5 },
    { name: 'Olympic Trials', level: 5, opponents: 6 }
  ];

  const handleCharacterSelect = (wrestler: Wrestler) => {
    const playerWrestler = customCharacter 
      ? { ...wrestler, name: customCharacter.name, pronouns: customCharacter.pronouns, spriteIndex: customCharacter.spriteIndex }
      : wrestler;
    
    setSelectedPlayer(playerWrestler);
    setPhase('tournament');
  };

  const startMatch = () => {
    if (!selectedPlayer) return;
    
    const availableOpponents = wrestlers.filter(w => w.id !== selectedPlayer.id);
    const opponent = availableOpponents[progress.opponentIndex % availableOpponents.length];
    setCurrentOpponent(opponent);
    setPhase('match');
  };

  const handleMatchComplete = (won: boolean) => {
    if (won) {
      const currentTournament = tournaments.find(t => t.level === progress.level);
      const newWins = progress.wins + 1;
      
      if (currentTournament && newWins >= currentTournament.opponents) {
        // Tournament complete
        if (progress.level >= tournaments.length) {
          setPhase('victory');
        } else {
          setProgress(prev => ({
            ...prev,
            level: prev.level + 1,
            wins: 0,
            opponentIndex: 0,
            currentTournament: tournaments[prev.level].name
          }));
          setPhase('tournament');
        }
      } else {
        // Next match in tournament
        setProgress(prev => ({
          ...prev,
          wins: newWins,
          opponentIndex: prev.opponentIndex + 1
        }));
        setPhase('tournament');
      }
    } else {
      // Lost - back to tournament screen
      setPhase('tournament');
    }
  };

  if (phase === 'intro') {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-gym-floor">
        <Card className="max-w-3xl w-full p-12 retro-border bg-card">
          <div className="text-center space-y-6">
            <Trophy className="h-20 w-20 text-primary mx-auto animate-bounce" />
            <h1 className="text-5xl font-bold text-primary">Career Mode</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Begin your journey from school champion to Olympic glory! 
              Progress through 5 tournaments, face increasingly skilled opponents, 
              and prove yourself as the ultimate wrestler.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="p-4 bg-background rounded retro-border">
                <Star className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="font-bold">5 Tournaments</p>
              </div>
              <div className="p-4 bg-background rounded retro-border">
                <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="font-bold">20+ Matches</p>
              </div>
              <div className="p-4 bg-background rounded retro-border">
                <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="font-bold">Olympic Dream</p>
              </div>
            </div>
            <div className="flex gap-4 justify-center pt-4">
              <Button variant="outline" onClick={onBack} className="px-8">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button onClick={() => setPhase('character-select')} className="px-8 retro-shadow">
                Start Career
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (phase === 'character-select') {
    return (
      <CharacterSelect 
        onBack={() => setPhase('intro')}
        onSelect={handleCharacterSelect}
      />
    );
  }

  if (phase === 'tournament') {
    const currentTournament = tournaments.find(t => t.level === progress.level);
    
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-gym-floor">
        <Card className="max-w-2xl w-full p-8 retro-border bg-card">
          <div className="space-y-6">
            <div className="text-center">
              <Badge variant="secondary" className="mb-2">Level {progress.level}</Badge>
              <h2 className="text-3xl font-bold mb-2">{currentTournament?.name}</h2>
              <p className="text-muted-foreground">
                Win {currentTournament?.opponents} matches to advance
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Tournament Progress</span>
                <span>{progress.wins} / {currentTournament?.opponents} Wins</span>
              </div>
              <Progress value={(progress.wins / (currentTournament?.opponents || 1)) * 100} />
            </div>

            <div className="bg-background p-6 rounded retro-border text-center">
              <p className="text-lg font-bold mb-2">Next Opponent</p>
              <p className="text-muted-foreground mb-4">
                Face a skilled wrestler from another school
              </p>
              {selectedPlayer && (
                <div className="text-sm space-y-1 text-muted-foreground">
                  <p>Your Stats: Technique {selectedPlayer.stats.technique} • Strength {selectedPlayer.stats.strength}</p>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={onBack} className="flex-1">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Exit Career
              </Button>
              <Button onClick={startMatch} className="flex-1 retro-shadow">
                Start Match
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (phase === 'match' && selectedPlayer && currentOpponent) {
    return (
      <MatchScreen 
        player={selectedPlayer}
        opponent={currentOpponent}
        onBack={(won) => handleMatchComplete(won)}
        isCareerMode={true}
      />
    );
  }

  if (phase === 'victory') {
    const totalWins = tournaments.reduce((sum, t) => sum + t.opponents, 0);
    
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-gym-floor">
        <Card className="max-w-2xl w-full p-12 retro-border bg-card">
          <div className="text-center space-y-6">
            <Trophy className="h-24 w-24 text-primary mx-auto animate-pulse" />
            <h1 className="text-5xl font-bold text-primary">Olympic Champion!</h1>
            <p className="text-xl text-muted-foreground">
              Congratulations {selectedPlayer?.name}! You've completed your journey from 
              school champion to Olympic gold medalist!
            </p>
            <div className="bg-background p-6 rounded retro-border">
              <p className="text-2xl font-bold mb-2">Career Stats</p>
              <p className="text-lg">Total Wins: {totalWins}</p>
              <p className="text-lg">Tournaments Won: 5</p>
            </div>
            <Button onClick={onBack} className="px-12 retro-shadow">
              Return to Menu
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return null;
};

export default CareerMode;
