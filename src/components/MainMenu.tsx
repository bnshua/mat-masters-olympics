import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trophy, Users, Dumbbell, Settings, BookOpen } from 'lucide-react';

interface MainMenuProps {
  onNavigate: (screen: 'career' | 'exhibition' | 'training' | 'settings' | 'dei-hub') => void;
}

const MainMenu = ({ onNavigate }: MainMenuProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gym-floor">
      <div className="text-center mb-8 animate-bounce-in">
        <h1 className="text-6xl font-bold mb-2 text-primary drop-shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">
          MATS2OLYMPICS
        </h1>
        <p className="text-xl text-secondary font-semibold">School Edition</p>
      </div>

      <Card className="w-full max-w-md p-8 retro-shadow retro-border bg-card">
        <div className="space-y-4">
          <Button 
            className="w-full h-14 text-lg font-bold retro-shadow hover:translate-x-1 hover:translate-y-1 transition-transform"
            variant="default"
            onClick={() => onNavigate('career')}
          >
            <Trophy className="mr-2 h-5 w-5" />
            Career Mode
          </Button>

          <Button 
            className="w-full h-14 text-lg font-bold retro-shadow hover:translate-x-1 hover:translate-y-1 transition-transform"
            variant="secondary"
            onClick={() => onNavigate('exhibition')}
          >
            <Users className="mr-2 h-5 w-5" />
            Exhibition Match
          </Button>

          <Button 
            className="w-full h-14 text-lg font-bold retro-shadow hover:translate-x-1 hover:translate-y-1 transition-transform"
            variant="outline"
            onClick={() => onNavigate('training')}
          >
            <Dumbbell className="mr-2 h-5 w-5" />
            Training Center
          </Button>

          <Button 
            className="w-full h-14 text-lg font-bold retro-shadow hover:translate-x-1 hover:translate-y-1 transition-transform"
            variant="outline"
            onClick={() => onNavigate('dei-hub')}
          >
            <BookOpen className="mr-2 h-5 w-5" />
            DEI Hub
          </Button>

          <Button 
            className="w-full h-14 text-lg font-bold retro-shadow hover:translate-x-1 hover:translate-y-1 transition-transform"
            variant="outline"
            onClick={() => onNavigate('settings')}
          >
            <Settings className="mr-2 h-5 w-5" />
            Settings
          </Button>
        </div>
      </Card>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>© 2025 Mats2Olympics • Building Champions with Respect & Inclusion</p>
      </div>
    </div>
  );
};

export default MainMenu;
