
import * as React from "react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface CustomProgressProps {
  value: number;
  className?: string;
  indicatorClassName?: string;
}

const CustomProgress = ({ value, className, indicatorClassName, ...props }: CustomProgressProps) => {
  return (
    <Progress 
      value={value} 
      className={className}
      {...props}
    />
  );
};

export { CustomProgress };
