import { useState } from 'react';
import MainMenu from '@/components/MainMenu';
import CharacterSelect from '@/components/CharacterSelect';
import CharacterCreation from '@/components/CharacterCreation';
import MatchScreen from '@/components/MatchScreen';
import TrainingCenter from '@/components/TrainingCenter';
import DEIHub from '@/components/DEIHub';
import Settings from '@/components/Settings';
import { Wrestler } from '@/types/game';
import { wrestlers } from '@/data/wrestlers';

type Screen = 'character-creation' | 'menu' | 'character-select' | 'match' | 'training' | 'settings' | 'dei-hub';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('character-creation');
  const [selectedPlayer, setSelectedPlayer] = useState<Wrestler | null>(null);
  const [selectedOpponent, setSelectedOpponent] = useState<Wrestler | null>(null);
  const [customCharacter, setCustomCharacter] = useState<{
    name: string;
    pronouns: string;
    spriteIndex: number;
  } | null>(null);

  const handleCharacterCreation = (character: { name: string; pronouns: string; spriteIndex: number }) => {
    setCustomCharacter(character);
    setCurrentScreen('menu');
  };

  const handleCharacterSelect = (wrestler: Wrestler) => {
    // Use custom character data if available
    const playerWrestler = customCharacter 
      ? { ...wrestler, name: customCharacter.name, pronouns: customCharacter.pronouns, spriteIndex: customCharacter.spriteIndex }
      : wrestler;
    
    setSelectedPlayer(playerWrestler);
    
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
      {currentScreen === 'character-creation' && (
        <CharacterCreation onComplete={handleCharacterCreation} />
      )}

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
        <TrainingCenter onBack={handleBackToMenu} />
      )}

      {currentScreen === 'dei-hub' && (
        <DEIHub onBack={handleBackToMenu} />
      )}

      {currentScreen === 'settings' && (
        <Settings onBack={handleBackToMenu} />
      )}
    </>
  );
};

export default Index;
