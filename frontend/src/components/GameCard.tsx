import React from "react";
import { Play, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CustomProgress } from "@/components/ui/custom-progress";
import { cn } from "@/lib/utils";

export interface Game {
  id: string;
  title: string;
  coverImage: string;
  lastPlayed?: string;
  compatibility: number;
  region: "NTSC" | "PAL" | "NTSC-J";
  size: string;
}

interface GameCardProps {
  game: Game;
  onPlay: (gameId: string) => void;
  onInfo: (gameId: string) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onPlay, onInfo }) => {
  const getCompatibilityColor = (value: number) => {
    if (value >= 90) return "bg-green-500";
    if (value >= 70) return "bg-yellow-500";
    if (value >= 50) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col bg-card border-border hover:border-ps-blue/50 transition-all duration-200 group">
      <div className="relative">
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={game.coverImage}
            alt={game.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          <div 
            className={cn(
              "text-xs font-bold px-1.5 py-0.5 rounded bg-opacity-90",
              game.region === "NTSC" ? "bg-blue-600" : 
              game.region === "PAL" ? "bg-green-600" : "bg-red-600"
            )}
          >
            {game.region}
          </div>
        </div>
      </div>
      
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="font-bold text-sm line-clamp-2 mb-1">{game.title}</h3>
        
        <div className="mt-auto">
          <div className="flex justify-between items-center text-xs mb-1">
            <span>Compatibility</span>
            <span>{game.compatibility}%</span>
          </div>
          <CustomProgress
            value={game.compatibility}
            className="h-1.5 mb-3"
            indicatorClassName={getCompatibilityColor(game.compatibility)}
          />
          
          <div className="flex gap-1">
            <Button 
              className="flex-1 h-8 bg-ps-blue hover:bg-ps-blue/80 text-white" 
              size="sm"
              onClick={() => onPlay(game.id)}
            >
              <Play size={14} className="mr-1" /> Play
            </Button>
            <Button 
              className="h-8 px-2" 
              size="sm" 
              variant="outline"
              onClick={() => onInfo(game.id)}
            >
              <Info size={14} />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GameCard;
