import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { wrestlers } from '@/data/wrestlers';
import { Wrestler } from '@/types/game';
import wrestlersImage from '@/assets/wrestlers.png';

interface CharacterSelectProps {
  onBack: () => void;
  onSelect: (wrestler: Wrestler) => void;
}

const CharacterSelect = ({ onBack, onSelect }: CharacterSelectProps) => {
  const [selectedWrestler, setSelectedWrestler] = useState<Wrestler | null>(null);

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

  return (
    <div className="min-h-screen p-8 bg-gym-floor">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="retro-shadow"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Menu
          </Button>
          <h1 className="text-4xl font-bold text-primary">Select Your Wrestler</h1>
          <div className="w-32" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {wrestlers.map((wrestler) => (
            <Card 
              key={wrestler.id}
              className={`p-6 cursor-pointer transition-all retro-border hover:scale-105 ${
                selectedWrestler?.id === wrestler.id 
                  ? 'ring-4 ring-primary bg-primary/10' 
                  : 'bg-card'
              }`}
              onClick={() => setSelectedWrestler(wrestler)}
            >
              <div className="flex flex-col items-center">
                <div 
                  className="pixel-art mb-4 retro-border"
                  style={getSpritePosition(wrestler.spriteIndex)}
                />
                <h3 className="text-xl font-bold mb-1">{wrestler.name}</h3>
                <Badge variant="secondary" className="mb-2">
                  {wrestler.pronouns}
                </Badge>
                <p className="text-sm text-muted-foreground mb-4">{wrestler.school}</p>
                
                <div className="w-full space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Technique:</span>
                    <span className="font-bold">{wrestler.stats.technique}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Strength:</span>
                    <span className="font-bold">{wrestler.stats.strength}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Speed:</span>
                    <span className="font-bold">{wrestler.stats.speed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Defense:</span>
                    <span className="font-bold">{wrestler.stats.defense}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Stamina:</span>
                    <span className="font-bold">{wrestler.stats.stamina}</span>
                  </div>
                </div>

                <Badge 
                  variant="outline" 
                  className="mt-4 capitalize"
                >
                  {wrestler.personality} Style
                </Badge>
              </div>
            </Card>
          ))}
        </div>

        {selectedWrestler && (
          <div className="flex justify-center animate-bounce-in">
            <Button 
              size="lg"
              className="text-xl px-12 py-6 retro-shadow animate-pulse-glow font-bold"
              onClick={() => onSelect(selectedWrestler)}
            >
              Start Match!
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterSelect;
