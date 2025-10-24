import { useState } from 'react';
import MainMenu from '@/components/MainMenu';
import CharacterSelect from '@/components/CharacterSelect';
import MatchScreen from '@/components/MatchScreen';
import { Wrestler } from '@/types/game';
import { wrestlers } from '@/data/wrestlers';

type Screen = 'menu' | 'character-select' | 'match' | 'training' | 'settings' | 'dei-hub';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu');
  const [selectedPlayer, setSelectedPlayer] = useState<Wrestler | null>(null);
  const [selectedOpponent, setSelectedOpponent] = useState<Wrestler | null>(null);

  const handleCharacterSelect = (wrestler: Wrestler) => {
    setSelectedPlayer(wrestler);
    
    // Select random opponent (different from player)
    const opponents = wrestlers.filter(w => w.id !== wrestler.id);
    const randomOpponent = opponents[Math.floor(Math.random() * opponents.length)];
    setSelectedOpponent(randomOpponent);
    
    setCurrentScreen('match');
  };

  const handleBackToMenu = () => {
    setCurrentScreen('menu');
    setSelectedPlayer(null);
    setSelectedOpponent(null);
  };

  return (
    <>
      {currentScreen === 'menu' && (
        <MainMenu onNavigate={(screen) => setCurrentScreen(screen)} />
      )}
      
      {currentScreen === 'character-select' && (
        <CharacterSelect 
          onBack={handleBackToMenu}
          onSelect={handleCharacterSelect}
        />
      )}
      
      {currentScreen === 'match' && selectedPlayer && selectedOpponent && (
        <MatchScreen 
          player={selectedPlayer}
          opponent={selectedOpponent}
          onBack={handleBackToMenu}
        />
      )}

      {currentScreen === 'training' && (
        <div className="min-h-screen flex items-center justify-center bg-gym-floor">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Training Center</h1>
            <p className="text-xl mb-8">Coming Soon!</p>
            <button 
              onClick={handleBackToMenu}
              className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded retro-shadow"
            >
              Back to Menu
            </button>
          </div>
        </div>
      )}

      {currentScreen === 'dei-hub' && (
        <div className="min-h-screen flex items-center justify-center bg-gym-floor">
          <div className="text-center max-w-2xl p-8">
            <h1 className="text-4xl font-bold mb-4">DEI Hub</h1>
            <p className="text-lg mb-8">
              Learn about diversity, equity, and inclusion in wrestling. 
              Discover inspiring athletes from around the world who have broken barriers 
              and promoted respect and fairness in sports.
            </p>
            <button 
              onClick={handleBackToMenu}
              className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded retro-shadow"
            >
              Back to Menu
            </button>
          </div>
        </div>
      )}

      {currentScreen === 'settings' && (
        <div className="min-h-screen flex items-center justify-center bg-gym-floor">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Settings</h1>
            <p className="text-xl mb-8">Accessibility & Controls Coming Soon!</p>
            <button 
              onClick={handleBackToMenu}
              className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded retro-shadow"
            >
              Back to Menu
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
