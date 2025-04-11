import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Pause, Settings, Gamepad, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import EmulationControls from "@/components/EmulationControls";
import { MOCK_GAMES } from "@/constants/mockData";
import { toast } from "@/components/ui/toast-utils";

const Emulation = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [controlsVisible, setControlsVisible] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [fps, setFps] = useState(0);
  const [game, setGame] = useState(MOCK_GAMES.find(g => g.id === gameId));

  useEffect(() => {
    if (!game) {
      toast.error("Game not found", {
        description: "Cannot start emulation for unknown game",
      });
      navigate("/games");
      return;
    }

    // Simulate FPS counter
    const fpsInterval = setInterval(() => {
      const newFps = 55 + Math.floor(Math.random() * 10);
      setFps(newFps);
    }, 1000);

    // Set a loading time
    toast.loading(`Loading ${game.title}...`, {
      description: "Preparing emulation environment",
      duration: 3000,
    });

    return () => {
      clearInterval(fpsInterval);
    };
  }, [game, navigate]);

  const handleButtonPress = (button: string) => {
    console.log(`Button pressed: ${button}`);
    // In a real emulator, this would send input to the emulation core
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setFullscreen(true);
      }).catch(err => {
        toast.error("Fullscreen failed", {
          description: err.message,
        });
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setFullscreen(false);
        });
      }
    }
  };

  if (!game) {
    return null;
  }

  return (
    <div className="bg-black min-h-screen flex flex-col">
      {/* Game screen area (in a real emulator, this would be a canvas) */}
      <div className="relative flex-1 flex items-center justify-center bg-gray-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src={game.coverImage} 
            alt={game.title}
            className="max-w-full max-h-full object-contain opacity-20"
            style={{ filter: "blur(5px)" }}
          />
        </div>
        
        <div className="relative z-10 text-center">
          <img 
            src="https://www.pngall.com/wp-content/uploads/13/PlayStation-2-Logo-PNG-Image-HD.png" 
            alt="PlayStation 2" 
            className="w-48 mx-auto mb-4"
          />
          <h2 className="text-white text-xl font-bold mb-2">{game.title}</h2>
          <p className="text-gray-400 mb-4">Press any button to start</p>
          <p className="text-blue-400 text-sm">(In a real emulator, the game would be rendered here)</p>
        </div>

        {/* FPS Counter */}
        <div className="absolute top-2 right-2 bg-black/50 rounded px-2 py-1 text-sm">
          <span className={fps >= 55 ? "text-green-400" : "text-yellow-400"}>
            {fps} FPS
          </span>
        </div>
      </div>

      {/* Controls overlay */}
      <div className="flex items-center justify-between p-2 bg-gray-900 border-t border-gray-800">
        <Button 
          variant="ghost" 
          size="icon"
          className="text-white"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost"
            size="icon"
            className="text-white"
            onClick={() => setControlsVisible(!controlsVisible)}
          >
            <Gamepad className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost"
            size="icon"
            className="text-white"
            onClick={() => {
              toast.info("Paused", {
                description: "Game emulation paused",
              });
            }}
          >
            <Pause className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost"
            size="icon"
            className="text-white"
            onClick={() => {
              toast.info("Settings", {
                description: "Emulation settings opened",
              });
            }}
          >
            <Settings className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost"
            size="icon"
            className="text-white"
            onClick={toggleFullscreen}
          >
            <Maximize className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <EmulationControls visible={controlsVisible} onButtonPress={handleButtonPress} />
    </div>
  );
};

export default Emulation;
