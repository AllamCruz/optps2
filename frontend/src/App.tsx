
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import Index from "./pages/Index";
import Games from "./pages/Games";
import Emulation from "./pages/Emulation";
import Settings from "./pages/Settings";
import Performance from "./pages/Performance";
import Compatibility from "./pages/Compatibility";
import NotFound from "./pages/NotFound";
import SplashScreen from "./components/SplashScreen";

// Create a context to share device info across components
export const DeviceContext = createContext({
  deviceInfo: {
    isCompatible: false,
    isSnapdragon: false,
    isHighEndSnapdragon: false,
    processorName: "Unknown",
    checkComplete: false,
    performanceScore: 0,
    deviceModel: "Unknown",
    ram: "Unknown"
  },
  setDeviceInfo: (info: any) => {}
});

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [deviceInfo, setDeviceInfo] = useState({
    isCompatible: false,
    isSnapdragon: false,
    isHighEndSnapdragon: false,
    processorName: "Unknown",
    checkComplete: false,
    performanceScore: 0,
    deviceModel: "Unknown",
    ram: "Unknown"
  });

  useEffect(() => {
    // Hide splash screen after all checks are complete (approx 5 seconds)
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <DeviceContext.Provider value={{ deviceInfo, setDeviceInfo }}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {showSplash ? (
              <SplashScreen />
            ) : (
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/games" element={<Games />} />
                <Route path="/emulation/:gameId" element={<Emulation />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/performance" element={<Performance />} />
                <Route path="/compatibility" element={<Compatibility />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            )}
          </BrowserRouter>
        </TooltipProvider>
      </DeviceContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
