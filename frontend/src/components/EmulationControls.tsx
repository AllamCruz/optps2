
import React, { useState } from "react";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Square, Circle, X as XIcon, Triangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmulationControlsProps {
  visible: boolean;
  onButtonPress: (button: string) => void;
}

const EmulationControls: React.FC<EmulationControlsProps> = ({ visible, onButtonPress }) => {
  const [touchActive, setTouchActive] = useState<Record<string, boolean>>({});

  if (!visible) return null;

  const handleButtonTouch = (button: string, isActive: boolean) => {
    setTouchActive(prev => ({ ...prev, [button]: isActive }));
    if (isActive) {
      onButtonPress(button);
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 h-60 bg-black/50 backdrop-blur-sm controller-container">
      <div className="w-full h-full flex items-center justify-between px-6 select-none">
        {/* D-Pad */}
        <div className="grid grid-cols-3 gap-1 w-32 h-32">
          <div className="col-start-1 col-end-2 row-start-2 row-end-3">
            <button
              className={cn("ps-dpad w-10 h-10 flex items-center justify-center", 
                touchActive.left ? "bg-slate-700" : "")}
              onTouchStart={() => handleButtonTouch("left", true)}
              onTouchEnd={() => handleButtonTouch("left", false)}
            >
              <ArrowLeft size={20} />
            </button>
          </div>
          <div className="col-start-2 col-end-3 row-start-1 row-end-2">
            <button
              className={cn("ps-dpad w-10 h-10 flex items-center justify-center", 
                touchActive.up ? "bg-slate-700" : "")}
              onTouchStart={() => handleButtonTouch("up", true)}
              onTouchEnd={() => handleButtonTouch("up", false)}
            >
              <ArrowUp size={20} />
            </button>
          </div>
          <div className="col-start-2 col-end-3 row-start-3 row-end-4">
            <button
              className={cn("ps-dpad w-10 h-10 flex items-center justify-center", 
                touchActive.down ? "bg-slate-700" : "")}
              onTouchStart={() => handleButtonTouch("down", true)}
              onTouchEnd={() => handleButtonTouch("down", false)}
            >
              <ArrowDown size={20} />
            </button>
          </div>
          <div className="col-start-3 col-end-4 row-start-2 row-end-3">
            <button
              className={cn("ps-dpad w-10 h-10 flex items-center justify-center", 
                touchActive.right ? "bg-slate-700" : "")}
              onTouchStart={() => handleButtonTouch("right", true)}
              onTouchEnd={() => handleButtonTouch("right", false)}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2 w-36 h-36">
          <div className="col-start-1 col-end-2 row-start-2 row-end-3">
            <button
              className={cn("ps-button ps-button-square w-12 h-12", 
                touchActive.square ? "opacity-80 transform scale-95" : "")}
              onTouchStart={() => handleButtonTouch("square", true)}
              onTouchEnd={() => handleButtonTouch("square", false)}
            >
              <Square size={24} />
            </button>
          </div>
          <div className="col-start-2 col-end-3 row-start-1 row-end-2">
            <button
              className={cn("ps-button ps-button-triangle w-12 h-12", 
                touchActive.triangle ? "opacity-80 transform scale-95" : "")}
              onTouchStart={() => handleButtonTouch("triangle", true)}
              onTouchEnd={() => handleButtonTouch("triangle", false)}
            >
              <Triangle size={24} />
            </button>
          </div>
          <div className="col-start-2 col-end-3 row-start-3 row-end-4">
            <button
              className={cn("ps-button ps-button-x w-12 h-12", 
                touchActive.x ? "opacity-80 transform scale-95" : "")}
              onTouchStart={() => handleButtonTouch("x", true)}
              onTouchEnd={() => handleButtonTouch("x", false)}
            >
              <XIcon size={24} />
            </button>
          </div>
          <div className="col-start-3 col-end-4 row-start-2 row-end-3">
            <button
              className={cn("ps-button ps-button-circle w-12 h-12", 
                touchActive.circle ? "opacity-80 transform scale-95" : "")}
              onTouchStart={() => handleButtonTouch("circle", true)}
              onTouchEnd={() => handleButtonTouch("circle", false)}
            >
              <Circle size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmulationControls;
