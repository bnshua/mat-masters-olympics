import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon } from "lucide-react";

interface HUDProps {
  time: string;
  gpa: number;
  onSettingsClick: () => void;
}

export const HUD = ({ time, gpa, onSettingsClick }: HUDProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="flex justify-between items-start p-4">
        <Button
          variant="outline"
          size="icon"
          onClick={onSettingsClick}
          className="pointer-events-auto retro-shadow"
        >
          <SettingsIcon className="h-4 w-4" />
        </Button>

        <div className="flex flex-col items-center gap-2 pointer-events-auto">
          <div className="bg-background/90 border-2 border-primary px-4 py-2 rounded-lg retro-shadow">
            <div className="text-sm font-bold text-primary">{time}</div>
          </div>
        </div>

        <div className="bg-background/90 border-2 border-primary px-4 py-2 rounded-lg retro-shadow pointer-events-auto">
          <div className="text-sm font-bold">
            GPA: <span className={gpa >= 3.0 ? "text-green-500" : gpa >= 2.5 ? "text-yellow-500" : "text-red-500"}>
              {gpa.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
