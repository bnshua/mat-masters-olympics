import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dumbbell, Heart, Zap, Shield, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WeightRoomInteriorProps {
  onExit: () => void;
  currentStats: {
    technique: number;
    strength: number;
    speed: number;
    defense: number;
    stamina: number;
  };
  onStatBoost: (stat: keyof WeightRoomInteriorProps['currentStats'], amount: number) => void;
}

const TRAINING_EXERCISES = [
  {
    id: 'strength',
    name: 'Bench Press',
    icon: Dumbbell,
    stat: 'strength' as const,
    boost: 5,
    duration: 30,
    color: 'text-red-500',
  },
  {
    id: 'stamina',
    name: 'Cardio Training',
    icon: Heart,
    stat: 'stamina' as const,
    boost: 10,
    duration: 45,
    color: 'text-pink-500',
  },
  {
    id: 'speed',
    name: 'Sprint Drills',
    icon: Zap,
    stat: 'speed' as const,
    boost: 5,
    duration: 30,
    color: 'text-yellow-500',
  },
  {
    id: 'defense',
    name: 'Defensive Practice',
    icon: Shield,
    stat: 'defense' as const,
    boost: 5,
    duration: 40,
    color: 'text-blue-500',
  },
  {
    id: 'technique',
    name: 'Technique Drills',
    icon: Brain,
    stat: 'technique' as const,
    boost: 5,
    duration: 35,
    color: 'text-purple-500',
  },
];

export const WeightRoomInterior = ({ onExit, currentStats, onStatBoost }: WeightRoomInteriorProps) => {
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const { toast } = useToast();

  const handleTrain = (exercise: typeof TRAINING_EXERCISES[0]) => {
    setIsTraining(true);
    setTrainingProgress(0);

    const interval = setInterval(() => {
      setTrainingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          onStatBoost(exercise.stat, exercise.boost);
          toast({
            title: "Training Complete!",
            description: `${exercise.stat.toUpperCase()} +${exercise.boost}`,
          });
          return 0;
        }
        return prev + 5;
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center p-8">
      <Card className="max-w-3xl w-full p-8 retro-shadow">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-primary mb-2">Weight Room</h2>
          <p className="text-muted-foreground">
            Train to boost your stats permanently
          </p>
        </div>

        {/* Current Stats Display */}
        <div className="grid grid-cols-5 gap-2 mb-6 p-4 bg-accent/50 rounded-lg">
          {Object.entries(currentStats).map(([stat, value]) => (
            <div key={stat} className="text-center">
              <div className="text-xs text-muted-foreground uppercase">{stat}</div>
              <div className="text-lg font-bold">{value}</div>
            </div>
          ))}
        </div>

        {/* Training in Progress */}
        {isTraining && (
          <div className="mb-6 p-4 bg-primary/10 rounded-lg animate-fade-in">
            <p className="text-sm font-bold mb-2 text-center">Training...</p>
            <Progress value={trainingProgress} className="h-2" />
          </div>
        )}

        {/* Training Options */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {TRAINING_EXERCISES.map((exercise) => (
            <Card
              key={exercise.id}
              className={`p-4 hover:bg-accent transition-all cursor-pointer ${
                isTraining ? 'opacity-50 pointer-events-none' : 'hover-scale'
              }`}
              onClick={() => !isTraining && handleTrain(exercise)}
            >
              <div className="flex flex-col items-center gap-2">
                <exercise.icon className={`h-10 w-10 ${exercise.color}`} />
                <div className="text-sm font-bold text-center">{exercise.name}</div>
                <div className="text-xs text-muted-foreground">{exercise.duration} min</div>
                <div className="text-xs font-bold text-primary">+{exercise.boost}</div>
              </div>
            </Card>
          ))}
        </div>

        <Button
          variant="outline"
          onClick={onExit}
          disabled={isTraining}
          className="w-full retro-shadow"
        >
          Exit Weight Room
        </Button>
      </Card>
    </div>
  );
};
