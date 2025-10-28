import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Swords } from "lucide-react";

interface WrestlingRoomInteriorProps {
  onExit: () => void;
  onSelectMode: (mode: 'career' | 'exhibition') => void;
}

export const WrestlingRoomInterior = ({ onExit, onSelectMode }: WrestlingRoomInteriorProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center p-8">
      <Card className="max-w-2xl w-full p-8 retro-shadow">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary mb-2">Wrestling Room</h2>
          <p className="text-muted-foreground">
            Choose your match type
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Career Mode */}
          <Card
            className="p-6 hover:bg-accent transition-all cursor-pointer hover-scale"
            onClick={() => onSelectMode('career')}
          >
            <div className="flex flex-col items-center gap-4">
              <Trophy className="h-16 w-16 text-yellow-500" />
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Career Mode</h3>
                <p className="text-sm text-muted-foreground">
                  Compete in tournaments and climb the ranks from school to Olympic trials
                </p>
              </div>
            </div>
          </Card>

          {/* Exhibition Match */}
          <Card
            className="p-6 hover:bg-accent transition-all cursor-pointer hover-scale"
            onClick={() => onSelectMode('exhibition')}
          >
            <div className="flex flex-col items-center gap-4">
              <Swords className="h-16 w-16 text-blue-500" />
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Exhibition Match</h3>
                <p className="text-sm text-muted-foreground">
                  Quick match against any opponent of your choice
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Button
          variant="outline"
          onClick={onExit}
          className="w-full retro-shadow"
        >
          Exit Wrestling Room
        </Button>
      </Card>
    </div>
  );
};
