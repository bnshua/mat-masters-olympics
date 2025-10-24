import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface SettingsProps {
  onBack: () => void;
}

const Settings = ({ onBack }: SettingsProps) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [narrationEnabled, setNarrationEnabled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [volume, setVolume] = useState([80]);

  return (
    <div className="min-h-screen p-8 bg-gym-floor">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="retro-shadow"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Menu
          </Button>
          <h1 className="text-4xl font-bold text-primary">Settings</h1>
          <div className="w-32" />
        </div>

        <div className="space-y-6">
          <Card className="p-6 retro-border bg-card">
            <h2 className="text-2xl font-bold mb-4">Audio</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="sound">Sound Effects</Label>
                <Switch 
                  id="sound" 
                  checked={soundEnabled}
                  onCheckedChange={setSoundEnabled}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="music">Background Music</Label>
                <Switch 
                  id="music" 
                  checked={musicEnabled}
                  onCheckedChange={setMusicEnabled}
                />
              </div>
              <div className="space-y-2">
                <Label>Master Volume</Label>
                <Slider 
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6 retro-border bg-card">
            <h2 className="text-2xl font-bold mb-4">Accessibility</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="narration">Audio Narration</Label>
                  <p className="text-sm text-muted-foreground">Voiceover for visually impaired</p>
                </div>
                <Switch 
                  id="narration" 
                  checked={narrationEnabled}
                  onCheckedChange={setNarrationEnabled}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="motion">Reduced Motion</Label>
                  <p className="text-sm text-muted-foreground">Minimize animations</p>
                </div>
                <Switch 
                  id="motion" 
                  checked={reducedMotion}
                  onCheckedChange={setReducedMotion}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6 retro-border bg-card">
            <h2 className="text-2xl font-bold mb-4">Controls</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>• Click moves to select during your turn</p>
              <p>• Watch stamina and health bars carefully</p>
              <p>• Plan ahead - resource management is key!</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
