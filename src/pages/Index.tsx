import { useState } from 'react';
import MainMenu from '@/components/MainMenu';
import CharacterSelect from '@/components/CharacterSelect';
import CharacterCreation from '@/components/CharacterCreation';
import CareerMode from '@/components/CareerMode';
import MatchScreen from '@/components/MatchScreen';
import TrainingCenter from '@/components/TrainingCenter';
import DEIHub from '@/components/DEIHub';
import Settings from '@/components/Settings';
import { Overworld } from '@/components/Overworld';
import { SchoolInterior } from '@/components/SchoolInterior';
import { WeightRoomInterior } from '@/components/WeightRoomInterior';
import { WrestlingRoomInterior } from '@/components/WrestlingRoomInterior';
import { Wrestler } from '@/types/game';
import { GameState } from '@/types/overworld';
import { wrestlers } from '@/data/wrestlers';

type Screen = 'character-creation' | 'overworld' | 'school' | 'wrestling-room-interior' | 'weight-room' | 'menu' | 'career' | 'exhibition' | 'match' | 'training' | 'settings' | 'dei-hub';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('character-creation');
  const [selectedPlayer, setSelectedPlayer] = useState<Wrestler | null>(null);
  const [selectedOpponent, setSelectedOpponent] = useState<Wrestler | null>(null);
  const [customCharacter, setCustomCharacter] = useState<{
    name: string;
    pronouns: string;
    spriteIndex: number;
  } | null>(null);
  
  const [gameState, setGameState] = useState<GameState>({
    playerPosition: { x: 50, y: 50 },
    currentTime: 480, // 8:00 AM
    gpa: 3.0,
    lastSchoolTime: 480,
    stats: {
      technique: 50,
      strength: 50,
      speed: 50,
      defense: 50,
      stamina: 100,
    },
    currentLocation: 'overworld',
    playerSprite: 0,
  });

  const handleCharacterCreation = (character: { name: string; pronouns: string; spriteIndex: number }) => {
    setCustomCharacter(character);
    setGameState(prev => ({ ...prev, playerSprite: character.spriteIndex }));
    setCurrentScreen('overworld');
  };

  const handleGameStateChange = (updates: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...updates }));
  };

  const handleEnterBuilding = (buildingId: string) => {
    switch (buildingId) {
      case 'school':
        setGameState(prev => ({ ...prev, currentLocation: 'school' }));
        setCurrentScreen('school');
        break;
      case 'wrestling-room':
        setGameState(prev => ({ ...prev, currentLocation: 'wrestling-room' }));
        setCurrentScreen('wrestling-room-interior');
        break;
      case 'weight-room':
        setGameState(prev => ({ ...prev, currentLocation: 'weight-room' }));
        setCurrentScreen('weight-room');
        break;
      case 'dei-center':
        setGameState(prev => ({ ...prev, currentLocation: 'dei-center' }));
        setCurrentScreen('dei-hub');
        break;
    }
  };

  const handleExitToOverworld = () => {
    setGameState(prev => ({ ...prev, currentLocation: 'overworld' }));
    setCurrentScreen('overworld');
  };

  const handleSchoolTaskComplete = () => {
    setGameState(prev => ({
      ...prev,
      gpa: Math.min(4.0, prev.gpa + 0.1),
      lastSchoolTime: prev.currentTime,
    }));
  };

  const handleStatBoost = (stat: keyof GameState['stats'], amount: number) => {
    setGameState(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        [stat]: Math.min(100, prev.stats[stat] + amount),
      }
    }));
  };

  const handleWrestlingModeSelect = (mode: 'career' | 'exhibition') => {
    if (mode === 'career') {
      setCurrentScreen('career');
    } else {
      setCurrentScreen('exhibition');
    }
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
    setCurrentScreen('overworld');
    setSelectedPlayer(null);
    setSelectedOpponent(null);
  };

  return (
    <>
      {currentScreen === 'character-creation' && (
        <CharacterCreation onComplete={handleCharacterCreation} />
      )}

      {currentScreen === 'overworld' && (
        <Overworld
          gameState={gameState}
          onGameStateChange={handleGameStateChange}
          onEnterBuilding={handleEnterBuilding}
          onSettingsClick={() => setCurrentScreen('settings')}
        />
      )}

      {currentScreen === 'school' && (
        <SchoolInterior
          onExit={handleExitToOverworld}
          onTaskComplete={handleSchoolTaskComplete}
        />
      )}

      {currentScreen === 'wrestling-room-interior' && (
        <WrestlingRoomInterior
          onExit={handleExitToOverworld}
          onSelectMode={handleWrestlingModeSelect}
        />
      )}

      {currentScreen === 'weight-room' && (
        <WeightRoomInterior
          onExit={handleExitToOverworld}
          currentStats={gameState.stats}
          onStatBoost={handleStatBoost}
        />
      )}

      {currentScreen === 'menu' && (
        <MainMenu onNavigate={(screen) => setCurrentScreen(screen)} />
      )}

      {currentScreen === 'career' && (
        <CareerMode onBack={handleExitToOverworld} customCharacter={customCharacter} />
      )}
      
      {currentScreen === 'exhibition' && (
        <CharacterSelect 
          onBack={handleExitToOverworld}
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


      {currentScreen === 'dei-hub' && (
        <DEIHub onBack={handleExitToOverworld} />
      )}

      {currentScreen === 'settings' && (
        <Settings onBack={() => setCurrentScreen('overworld')} />
      )}
    </>
  );
};

export default Index;
