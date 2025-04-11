
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Cpu, LoaderCircle, Smartphone } from "lucide-react";
import { CustomProgress } from "@/components/ui/custom-progress";
import DeviceChecker from "@/components/DeviceChecker";
import { DeviceContext } from "@/App";

const SplashScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const { setDeviceInfo } = useContext(DeviceContext);

  useEffect(() => {
    // Simulate loading process
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            setTimeout(() => navigate("/"), 500);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
      <div className="w-full max-w-md px-4 flex flex-col items-center">
        {/* Logo */}
        <div className="relative mb-8 w-48 h-48 flex items-center justify-center">
          <div className="absolute inset-0 bg-ps-blue/20 blur-xl rounded-full"></div>
          <img 
            src="/lovable-uploads/8a68b858-b82f-4cf7-9cf8-a0dd77794366.png" 
            alt="OptPS2 Logo" 
            className="relative z-10 w-full h-full object-contain animate-pulse-light" 
          />
        </div>
        
        {/* Title */}
        <h1 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-500 to-pink-500 bg-clip-text text-transparent">
          OptPS2 Emulator
        </h1>
        
        {/* Loading indicator */}
        {loading ? (
          <div className="w-full space-y-4 mb-8">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center">
                <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
                Loading system...
              </span>
              <span>{progress}%</span>
            </div>
            <CustomProgress value={progress} 
              className="h-2 w-full" 
              indicatorClassName="bg-gradient-to-r from-cyan-500 to-pink-500" 
            />
          </div>
        ) : null}
        
        {/* Device compatibility checker */}
        <div className="w-full mt-4">
          <div className="flex items-center space-x-2 mb-2">
            <Cpu className="h-5 w-5 text-ps-blue" />
            <h2 className="text-lg font-medium">Device Compatibility</h2>
          </div>
          <DeviceChecker forceCheck={true} onDeviceCheck={(deviceInfo) => setDeviceInfo(deviceInfo)} />
        </div>
        
        {/* Footer text */}
        <p className="text-xs text-muted-foreground mt-8 text-center">
          Optimized for Snapdragon 7xx and 8xx series processors
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
