import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Heart, Users, Globe } from 'lucide-react';

interface DEIHubProps {
  onBack: () => void;
}

const DEIHub = ({ onBack }: DEIHubProps) => {
  const spotlights = [
    {
      name: "Helen Maroulis",
      country: "USA",
      achievement: "First American woman to win Olympic gold in wrestling",
      year: "2016",
      impact: "Broke gender barriers and inspired young female wrestlers worldwide"
    },
    {
      name: "Abdulrashid Sadulaev",
      country: "Russia",
      achievement: "Three-time Olympic champion known for sportsmanship",
      year: "2020",
      impact: "Demonstrates respect and fairness across all competitions"
    },
    {
      name: "Risako Kawai",
      country: "Japan",
      achievement: "Olympic gold medalist in women's freestyle wrestling",
      year: "2016, 2020",
      impact: "Advocates for women's sports and equality in athletics"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Respect",
      description: "Treat all athletes with dignity regardless of background"
    },
    {
      icon: Users,
      title: "Inclusion",
      description: "Everyone deserves equal opportunity to compete and excel"
    },
    {
      icon: Globe,
      title: "Diversity",
      description: "Wrestling brings together people from all cultures and identities"
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
          <h1 className="text-4xl font-bold text-primary">DEI Hub</h1>
          <div className="w-32" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {values.map((value, index) => (
            <Card key={index} className="p-6 retro-border bg-card text-center">
              <value.icon className="h-10 w-10 text-primary mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </Card>
          ))}
        </div>

        <h2 className="text-3xl font-bold mb-6 text-center">Athlete Spotlights</h2>
        
        <div className="space-y-6">
          {spotlights.map((athlete, index) => (
            <Card key={index} className="p-6 retro-border bg-card">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-2xl font-bold">{athlete.name}</h3>
                  <Badge variant="secondary" className="mt-1">{athlete.country}</Badge>
                </div>
                <Badge variant="outline">{athlete.year}</Badge>
              </div>
              <p className="text-lg mb-2 text-primary">{athlete.achievement}</p>
              <p className="text-muted-foreground">{athlete.impact}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DEIHub;
