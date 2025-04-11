
import React, { useState, useEffect, useContext } from "react";
import { Gamepad2, Clock, Info, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import DeviceChecker from "@/components/DeviceChecker";
import GameCard from "@/components/GameCard";
import { MOCK_GAMES } from "@/constants/mockData";
import { toast } from "@/components/ui/toast-utils";
import { useNavigate } from "react-router-dom";
import { DeviceContext } from "@/App";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [recentGames, setRecentGames] = useState(MOCK_GAMES.slice(0, 3));
  const navigate = useNavigate();
  const { deviceInfo } = useContext(DeviceContext);

  useEffect(() => {
    // Welcome toast on first load
    toast("Welcome to OptPS2 Emulator", {
      description: "Optimized for Snapdragon 7xx and 8xx series",
      action: {
        label: "Learn More",
        onClick: () => navigate("/compatibility"),
      },
    });
  }, [navigate]);

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
        {/* Use the DeviceChecker component without it performing a new check */}
        <DeviceChecker />

        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center">
              <Gamepad2 className="mr-2 h-6 w-6 text-ps-blue" />
              Welcome to OptPS2
            </h2>
            <Badge variant="outline" className="bg-ps-blue text-white hover:bg-ps-blue/90">
              v0.1 Beta
            </Badge>
          </div>

          <Card className="bg-card">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Optimized for Snapdragon</h3>
                  <p className="text-muted-foreground mb-4">
                    This emulator is specially tuned for Snapdragon 7xx and 8xx series processors, 
                    delivering the best possible PS2 gaming experience on Android devices.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="bg-ps-blue/20 p-2 rounded-full mr-3">
                        <PlayCircle className="h-5 w-5 text-ps-blue" />
                      </div>
                      <div>
                        <h4 className="font-medium">High Performance</h4>
                        <p className="text-sm text-muted-foreground">Advanced Vulkan rendering and 60+ FPS on supported games</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-ps-blue/20 p-2 rounded-full mr-3">
                        <Gamepad2 className="h-5 w-5 text-ps-blue" />
                      </div>
                      <div>
                        <h4 className="font-medium">Optimized Controls</h4>
                        <p className="text-sm text-muted-foreground">Customizable on-screen controls and gamepad support</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-ps-blue/20 p-2 rounded-full mr-3">
                        <Info className="h-5 w-5 text-ps-blue" />
                      </div>
                      <div>
                        <h4 className="font-medium">Game Compatibility</h4>
                        <p className="text-sm text-muted-foreground">Growing library of compatible PS2 games</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button 
                      className="bg-ps-blue hover:bg-ps-blue/90"
                      onClick={() => navigate("/games")}
                    >
                      Browse Games
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative w-full max-w-xs">
                    <div className="absolute inset-0 bg-ps-blue/20 blur-xl rounded-full"></div>
                    <img 
                      src="https://www.pngall.com/wp-content/uploads/13/PlayStation-2-PNG-Photo.png" 
                      alt="PlayStation 2 Console" 
                      className="relative z-10 w-full h-auto animate-float" 
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center">
              <Clock className="mr-2 h-5 w-5 text-ps-blue" />
              Recent Games
            </h2>
            <Button 
              variant="ghost" 
              className="text-ps-blue"
              onClick={() => navigate("/games")}
            >
              View All
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {recentGames.map((game) => (
              <GameCard 
                key={game.id} 
                game={game} 
                onPlay={handlePlayGame} 
                onInfo={handleGameInfo} 
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
