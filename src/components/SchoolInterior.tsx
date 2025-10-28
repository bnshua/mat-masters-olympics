import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap, Calculator, FlaskConical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SchoolInteriorProps {
  onExit: () => void;
  onTaskComplete: () => void; // Called when any task is completed (+0.1 GPA)
}

const SCHOOL_TASKS = [
  { id: 'math', name: 'Math Class', icon: Calculator, duration: 60 },
  { id: 'english', name: 'English Class', icon: BookOpen, duration: 60 },
  { id: 'science', name: 'Science Class', icon: FlaskConical, duration: 60 },
  { id: 'study', name: 'Study Hall', icon: GraduationCap, duration: 30 },
];

export const SchoolInterior = ({ onExit, onTaskComplete }: SchoolInteriorProps) => {
  const [isAttending, setIsAttending] = useState(false);
  const { toast } = useToast();

  const handleAttendClass = (taskName: string) => {
    setIsAttending(true);
    toast({
      title: "Attending class...",
      description: `You're attending ${taskName}`,
    });

    setTimeout(() => {
      setIsAttending(false);
      onTaskComplete(); // This will increase GPA by 0.1
      toast({
        title: "Class complete!",
        description: "GPA +0.1",
      });
    }, 2000); // 2 seconds for demo purposes
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center p-8">
      <Card className="max-w-2xl w-full p-8 retro-shadow">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-primary mb-2">School</h2>
          <p className="text-muted-foreground">
            Attend classes to improve your GPA (+0.1 per task)
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {SCHOOL_TASKS.map((task) => (
            <Card
              key={task.id}
              className="p-4 hover:bg-accent transition-colors cursor-pointer"
              onClick={() => !isAttending && handleAttendClass(task.name)}
            >
              <div className="flex flex-col items-center gap-2">
                <task.icon className="h-8 w-8 text-primary" />
                <div className="text-sm font-bold text-center">{task.name}</div>
                <div className="text-xs text-muted-foreground">{task.duration} min</div>
              </div>
            </Card>
          ))}
        </div>

        <Button
          variant="outline"
          onClick={onExit}
          disabled={isAttending}
          className="w-full retro-shadow"
        >
          Exit School
        </Button>
      </Card>
    </div>
  );
};
