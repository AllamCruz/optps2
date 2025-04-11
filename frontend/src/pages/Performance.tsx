
import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { MOCK_PERFORMANCE_DATA } from "@/constants/mockData";
import { CustomProgress } from "@/components/ui/custom-progress";
import { toast } from "@/components/ui/toast-utils";

interface PerformanceData {
  time: string;
  cpuUsage: number;
  gpuUsage: number;
  memoryUsage: number;
  fps: number;
}

const Performance = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [realtimeData, setRealtimeData] = useState<PerformanceData[]>([]);
  const [cpuClockSpeed, setCpuClockSpeed] = useState(1500);
  const [gpuClockSpeed, setGpuClockSpeed] = useState(800);
  const [thermalThrottlingEnabled, setThermalThrottlingEnabled] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = {
        time: new Date().toLocaleTimeString(),
        cpuUsage: Math.floor(Math.random() * 60) + 30,
        gpuUsage: Math.floor(Math.random() * 70) + 20,
        memoryUsage: Math.floor(Math.random() * 40) + 40,
        fps: Math.floor(Math.random() * 30) + 30,
      };
      setRealtimeData(prevData => [...prevData.slice(-9), newData]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleCpuClockSpeedChange = (value: number[]) => {
    setCpuClockSpeed(value[0]);
    toast("CPU Clock Speed Updated", {
      description: `Set to ${value[0]} MHz`,
    });
  };

  const handleGpuClockSpeedChange = (value: number[]) => {
    setGpuClockSpeed(value[0]);
    toast("GPU Clock Speed Updated", {
      description: `Set to ${value[0]} MHz`,
    });
  };

  const getProgressColor = (value: number) => {
    if (value < 50) return "bg-green-500";
    if (value < 80) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getTempColor = (value: number) => {
    if (value < 60) return "bg-green-500";
    if (value < 75) return "bg-yellow-500";
    return "bg-red-500";
  };

  const data = MOCK_PERFORMANCE_DATA;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 container px-4 py-6 max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Performance Monitoring</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle>Real-time Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={realtimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="cpuUsage" stroke="#8884d8" name="CPU Usage (%)" />
                  <Line type="monotone" dataKey="gpuUsage" stroke="#82ca9d" name="GPU Usage (%)" />
                  <Line type="monotone" dataKey="memoryUsage" stroke="#ffc658" name="Memory Usage (%)" />
                  <Line type="monotone" dataKey="fps" stroke="#e45858" name="FPS" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>CPU Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>CPU Clock Speed: {cpuClockSpeed} MHz</span>
                <Label>
                  <Slider
                    defaultValue={[cpuClockSpeed]}
                    min={800}
                    max={2500}
                    step={50}
                    onValueChange={handleCpuClockSpeedChange}
                  />
                </Label>
              </div>
              <CustomProgress 
                value={70} 
                indicatorClassName={getProgressColor(70)} 
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>GPU Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>GPU Clock Speed: {gpuClockSpeed} MHz</span>
                <Label>
                  <Slider
                    defaultValue={[gpuClockSpeed]}
                    min={400}
                    max={1200}
                    step={25}
                    onValueChange={handleGpuClockSpeedChange}
                  />
                </Label>
              </div>
              <CustomProgress 
                value={55} 
                indicatorClassName={getProgressColor(55)} 
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Memory Usage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <span>Total Memory: 8 GB</span>
              <span>Used Memory: 5.2 GB</span>
              <CustomProgress 
                value={65} 
                indicatorClassName={getProgressColor(65)} 
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thermal Throttling</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="thermalThrottling">Enable Thermal Throttling</Label>
                <Switch
                  id="thermalThrottling"
                  checked={thermalThrottlingEnabled}
                  onCheckedChange={(checked) => setThermalThrottlingEnabled(checked)}
                />
              </div>
              <span>Current Temperature: 72°C</span>
              <CustomProgress 
                value={72} 
                indicatorClassName={getTempColor(72)} 
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Performance;
