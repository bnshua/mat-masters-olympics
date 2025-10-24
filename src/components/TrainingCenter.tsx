import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Dumbbell, BookOpen, Trophy } from 'lucide-react';

interface TrainingCenterProps {
  onBack: () => void;
}

const TrainingCenter = ({ onBack }: TrainingCenterProps) => {
  const tutorials = [
    {
      icon: Dumbbell,
      title: "Basic Moves",
      description: "Learn fundamental wrestling techniques like takedowns, escapes, and pins.",
      tips: ["Double Leg Takedown teaches leg drive", "Arm Drag emphasizes timing", "Half Nelson requires leverage"]
    },
    {
      icon: BookOpen,
      title: "Strategy Guide",
      description: "Understand when to attack, defend, or conserve stamina for the perfect moment.",
      tips: ["Save stamina for critical moments", "Counter moves when opponent is tired", "Pin attempts work best at low health"]
    },
    {
      icon: Trophy,
      title: "Match Rules",
      description: "Master the scoring system and win conditions in competitive wrestling.",
      tips: ["Pin = instant win", "Highest score wins if time runs out", "Each move costs stamina"]
    }
  ];

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
          <h1 className="text-4xl font-bold text-primary">Training Center</h1>
          <div className="w-32" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tutorials.map((tutorial, index) => (
            <Card key={index} className="p-6 retro-border bg-card hover:scale-105 transition-transform">
              <tutorial.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-2">{tutorial.title}</h3>
              <p className="text-muted-foreground mb-4">{tutorial.description}</p>
              <ul className="space-y-2">
                {tutorial.tips.map((tip, i) => (
                  <li key={i} className="text-sm flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainingCenter;
