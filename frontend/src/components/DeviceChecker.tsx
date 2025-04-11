
import React, { useState, useEffect, useContext } from "react";
import { AlertCircle, CheckCircle2, Cpu, Smartphone, HardDrive } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CustomProgress } from "@/components/ui/custom-progress";
import { DeviceContext } from "@/App";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DeviceCheckerProps {
  onDeviceCheck?: (deviceInfo: any) => void;
  forceCheck?: boolean;
}

const DeviceChecker: React.FC<DeviceCheckerProps> = ({ onDeviceCheck, forceCheck = false }) => {
  const { deviceInfo: contextDeviceInfo, setDeviceInfo: setContextDeviceInfo } = useContext(DeviceContext);
  const [deviceInfo, setDeviceInfo] = useState(contextDeviceInfo);
  const [checking, setChecking] = useState(!contextDeviceInfo.checkComplete && forceCheck);

  useEffect(() => {
    // Only run the device check if it hasn't been completed yet or if forceCheck is true
    if (!contextDeviceInfo.checkComplete || forceCheck) {
      checkDevice();
    } else {
      setDeviceInfo(contextDeviceInfo);
      setChecking(false);
      // If callback is provided, notify parent component
      if (onDeviceCheck) {
        onDeviceCheck(contextDeviceInfo);
      }
    }
  }, [contextDeviceInfo, onDeviceCheck, forceCheck]);

  // Simulate device detection
  const checkDevice = async () => {
    setChecking(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // This is a simulation - in a real app you would use device detection APIs
    // For this demo, we'll randomly choose a compatible device
    const randomDevice = Math.random() > 0.2;
    const isSnapdragon = randomDevice;
    const snapdragonSeries = isSnapdragon ? (Math.random() > 0.3 ? "8xx" : "7xx") : "Unknown";
    const isHighEnd = snapdragonSeries === "8xx";
    const performanceScore = isHighEnd ? 85 + Math.floor(Math.random() * 15) : 
                             (snapdragonSeries === "7xx" ? 60 + Math.floor(Math.random() * 20) : 30);
    
    const processorNames = {
      "8xx": [
        "Snapdragon 8 Gen 2",
        "Snapdragon 8+ Gen 1",
        "Snapdragon 888",
        "Snapdragon 865"
      ],
      "7xx": [
        "Snapdragon 780G",
        "Snapdragon 778G",
        "Snapdragon 765G",
        "Snapdragon 750G"
      ],
      "Unknown": [
        "MediaTek Dimensity 8200",
        "Exynos 2200",
        "Unisoc T612"
      ]
    };
    
    const getRandomProcessor = (series: "8xx" | "7xx" | "Unknown") => {
      const processors = processorNames[series];
      return processors[Math.floor(Math.random() * processors.length)];
    };

    // Device models
    const deviceModels = [
      "Samsung Galaxy S23",
      "Xiaomi 13 Pro",
      "OnePlus 11",
      "Motorola Edge 40 Pro",
      "Pixel 7 Pro"
    ];
    
    // RAM sizes
    const ramSizes = ["6 GB", "8 GB", "12 GB", "16 GB"];
    
    const newDeviceInfo = {
      isCompatible: isSnapdragon,
      isSnapdragon,
      isHighEndSnapdragon: isHighEnd,
      processorName: isSnapdragon ? getRandomProcessor(snapdragonSeries as "8xx" | "7xx") : getRandomProcessor("Unknown"),
      checkComplete: true,
      performanceScore,
      deviceModel: deviceModels[Math.floor(Math.random() * deviceModels.length)],
      ram: ramSizes[Math.floor(Math.random() * ramSizes.length)]
    };
    
    setDeviceInfo(newDeviceInfo);
    setContextDeviceInfo(newDeviceInfo);
    setChecking(false);
    
    // If callback is provided, notify parent component
    if (onDeviceCheck) {
      onDeviceCheck(newDeviceInfo);
    }
  };

  const getAlertVariant = () => {
    if (!deviceInfo.isSnapdragon) return "destructive";
    if (deviceInfo.isHighEndSnapdragon) return "default";
    return "default";
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    if (score >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  if (checking) {
    return (
      <div className="p-4 bg-card border border-border rounded-lg flex flex-col items-center justify-center">
        <Cpu className="h-12 w-12 text-ps-blue animate-pulse mb-2" />
        <h3 className="text-lg font-medium mb-2">Checking your device...</h3>
        <CustomProgress value={Math.random() * 100} className="w-full h-2" />
      </div>
    );
  }

  return (
    <Alert variant={getAlertVariant()} className="mb-4">
      <div className="flex items-start">
        {deviceInfo.isSnapdragon ? (
          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
        ) : (
          <AlertCircle className="h-5 w-5 text-destructive mt-0.5 mr-2" />
        )}
        <div className="w-full">
          <AlertTitle>
            {deviceInfo.isSnapdragon
              ? "Compatible Snapdragon Device Detected"
              : "Non-Snapdragon Device Detected"}
          </AlertTitle>
          <AlertDescription>
            <div className="space-y-2">
              <div className="flex items-center">
                <Smartphone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="font-medium mr-1">Device:</span> {deviceInfo.deviceModel}
              </div>
              
              <div className="flex items-center">
                <Cpu className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="font-medium mr-1">Processor:</span> {deviceInfo.processorName}
              </div>
              
              <div className="flex items-center">
                <HardDrive className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="font-medium mr-1">RAM:</span> {deviceInfo.ram}
              </div>
            </div>
            
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span>Estimated Performance</span>
                <span>{deviceInfo.performanceScore}%</span>
              </div>
              <CustomProgress 
                value={deviceInfo.performanceScore} 
                className="h-2"
                indicatorClassName={getScoreColor(deviceInfo.performanceScore)}
              />
            </div>
            
            {!deviceInfo.isSnapdragon && (
              <p className="mt-3 text-sm text-destructive">
                This emulator is optimized for Snapdragon 7xx and 8xx devices. Performance may be poor on your current device.
              </p>
            )}
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
};

export default DeviceChecker;
