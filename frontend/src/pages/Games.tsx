
import React, { useState } from "react";
import { Gamepad2, Filter, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GameCard from "@/components/GameCard";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { MOCK_GAMES } from "@/constants/mockData";
import { toast } from "@/components/ui/toast-utils";
import { useNavigate } from "react-router-dom";

const Games = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredGames = MOCK_GAMES.filter(game => 
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePlayGame = (gameId: string) => {
    const game = MOCK_GAMES.find(g => g.id === gameId);
    if (game) {
      toast.success(`Starting ${game.title}`, {
        description: "Launching emulation...",
      });
      // In a real app, this would start the emulation
      navigate(`/emulation/${gameId}`);
    }
  };

  const handleGameInfo = (gameId: string) => {
    const game = MOCK_GAMES.find(g => g.id === gameId);
    if (game) {
      toast.info(`Game Info: ${game.title}`, {
        description: `${game.region} • ${game.size} • ${game.compatibility}% compatible`,
      });
      // In a real app, this would navigate to the game details
      navigate(`/games/${gameId}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 container px-4 py-6 max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold flex items-center">
            <Gamepad2 className="mr-2 h-6 w-6 text-ps-blue" />
            Game Library
          </h1>
        </div>

        <Card className="p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search games..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredGames.length > 0 ? (
            filteredGames.map((game) => (
              <GameCard 
                key={game.id} 
                game={game} 
                onPlay={handlePlayGame} 
                onInfo={handleGameInfo} 
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No games found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Games;
