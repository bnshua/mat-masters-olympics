import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import wrestlersImage from '@/assets/wrestlers.png';

interface CharacterCreationProps {
  onComplete: (character: {
    name: string;
    pronouns: string;
    spriteIndex: number;
  }) => void;
}

const CharacterCreation = ({ onComplete }: CharacterCreationProps) => {
  const [name, setName] = useState('');
  const [pronouns, setPronouns] = useState('They/Them');
  const [selectedSprite, setSelectedSprite] = useState(0);

  const pronounOptions = ['He/Him', 'She/Her', 'They/Them'];
  
  const spriteOptions = [
    { index: 0, label: 'Athlete 1' },
    { index: 1, label: 'Athlete 2' },
    { index: 2, label: 'Athlete 3' },
    { index: 3, label: 'Athlete 4' },
    { index: 4, label: 'Athlete 5' },
    { index: 5, label: 'Athlete 6' }
  ];

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

  const handleSubmit = () => {
    if (name.trim()) {
      onComplete({
        name: name.trim(),
        pronouns,
        spriteIndex: selectedSprite
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gym-floor">
      <Card className="max-w-2xl w-full p-8 retro-border bg-card">
        <h1 className="text-4xl font-bold text-primary text-center mb-8">Create Your Wrestler</h1>
        
        <div className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-lg">Wrestler Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="mt-2 text-lg retro-border"
              maxLength={30}
            />
          </div>

          <div>
            <Label className="text-lg mb-3 block">Pronouns</Label>
            <RadioGroup value={pronouns} onValueChange={setPronouns}>
              <div className="flex gap-4">
                {pronounOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option} className="cursor-pointer">{option}</Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label className="text-lg mb-3 block">Choose Your Appearance</Label>
            <div className="grid grid-cols-3 gap-4">
              {spriteOptions.map((sprite) => (
                <div
                  key={sprite.index}
                  onClick={() => setSelectedSprite(sprite.index)}
                  className={`cursor-pointer p-4 rounded retro-border transition-all hover:scale-105 ${
                    selectedSprite === sprite.index 
                      ? 'ring-4 ring-primary bg-primary/10' 
                      : 'bg-background'
                  }`}
                >
                  <div 
                    className="pixel-art mx-auto mb-2"
                    style={getSpritePosition(sprite.index)}
                  />
                  <p className="text-center text-sm">{sprite.label}</p>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="w-full text-xl py-6 retro-shadow animate-pulse-glow font-bold"
            size="lg"
          >
            Start Your Journey!
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CharacterCreation;
