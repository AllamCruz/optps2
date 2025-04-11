import React, { useState } from "react";
import { Settings as SettingsIcon, Save, RefreshCw } from "lucide-react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { PERFORMANCE_PRESETS } from "@/constants/mockData";
import { toast } from "@/components/ui/toast-utils";

interface SettingsFormValues {
  resolution: string;
  textureQuality: string;
  antiAliasing: string;
  anisotropicFiltering: string;
  renderingBackend: string;
  fpsLimit: number;
  audioBuffering: string;
  audioEnabled: boolean;
  rumbleEnabled: boolean;
  usePhoneStorage: boolean;
  customStoragePath: string;
  useCustomControls: boolean;
  presetName: string;
}

const Settings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState("balanced");

  const { register, setValue, watch, handleSubmit, reset } = useForm<SettingsFormValues>({
    defaultValues: {
      resolution: "2x",
      textureQuality: "medium",
      antiAliasing: "fxaa",
      anisotropicFiltering: "2x",
      renderingBackend: "vulkan",
      fpsLimit: 60,
      audioBuffering: "medium",
      audioEnabled: true,
      rumbleEnabled: true,
      usePhoneStorage: true,
      customStoragePath: "/storage/emulated/0/PS2Emulator",
      useCustomControls: false,
      presetName: "Balanced",
    }
  });

  const fpsLimit = watch("fpsLimit");

  const applyPreset = (presetId: string) => {
    setSelectedPreset(presetId);
    
    const presetMap: Record<string, any> = {
      battery: PERFORMANCE_PRESETS[0],
      balanced: PERFORMANCE_PRESETS[1],
      performance: PERFORMANCE_PRESETS[2],
      quality: PERFORMANCE_PRESETS[3],
      custom: PERFORMANCE_PRESETS[4],
    };
    
    const preset = presetMap[presetId];
    if (preset) {
      setValue("resolution", preset.resolution.startsWith("1x") ? "1x" : 
                            preset.resolution.startsWith("2x") ? "2x" : "3x");
      setValue("textureQuality", preset.textureQuality.toLowerCase());
      setValue("antiAliasing", preset.antiAliasing.toLowerCase() === "off" ? "off" : preset.antiAliasing.toLowerCase());
      setValue("anisotropicFiltering", preset.anisotropicFiltering === "Off" ? "0x" : preset.anisotropicFiltering);
      setValue("renderingBackend", preset.rendering.toLowerCase().includes("vulkan") ? "vulkan" : "software");
      setValue("fpsLimit", preset.fpsLimit);
      setValue("presetName", preset.name);
      
      toast.success(`Applied ${preset.name} preset`, {
        description: preset.description,
      });
    }
  };

  const onSubmit = (data: SettingsFormValues) => {
    console.log("Settings saved:", data);
    toast.success("Settings saved successfully", {
      description: "Your emulation settings have been updated.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 container px-4 py-6 max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold flex items-center">
            <SettingsIcon className="mr-2 h-6 w-6 text-ps-blue" />
            Emulator Settings
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Performance Presets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-3">
                {["battery", "balanced", "performance", "quality", "custom"].map((preset, index) => (
                  <div 
                    key={preset}
                    className={`cursor-pointer border rounded-lg p-4 transition-all ${
                      selectedPreset === preset 
                        ? "border-ps-blue bg-ps-blue/10 shadow-sm" 
                        : "border-border hover:border-ps-blue/50"
                    }`}
                    onClick={() => applyPreset(preset)}
                  >
                    <h3 className="font-medium mb-1">{PERFORMANCE_PRESETS[index].name}</h3>
                    <p className="text-xs text-muted-foreground">{PERFORMANCE_PRESETS[index].description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="graphics">
            <TabsList className="mb-4">
              <TabsTrigger value="graphics">Graphics</TabsTrigger>
              <TabsTrigger value="audio">Audio</TabsTrigger>
              <TabsTrigger value="controls">Controls</TabsTrigger>
              <TabsTrigger value="storage">Storage</TabsTrigger>
            </TabsList>

            <TabsContent value="graphics">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="resolution">Resolution Scaling</Label>
                        <Select 
                          value={watch("resolution")} 
                          onValueChange={(value) => setValue("resolution", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select resolution" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1x">1x Native (480p)</SelectItem>
                            <SelectItem value="2x">2x Native (960p)</SelectItem>
                            <SelectItem value="3x">3x Native (1440p)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="textureQuality">Texture Quality</Label>
                        <Select 
                          value={watch("textureQuality")} 
                          onValueChange={(value) => setValue("textureQuality", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select texture quality" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="antiAliasing">Anti-Aliasing</Label>
                        <Select 
                          value={watch("antiAliasing")} 
                          onValueChange={(value) => setValue("antiAliasing", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select anti-aliasing method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="off">Off</SelectItem>
                            <SelectItem value="fxaa">FXAA</SelectItem>
                            <SelectItem value="smaa">SMAA</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="anisotropicFiltering">Anisotropic Filtering</Label>
                        <Select 
                          value={watch("anisotropicFiltering")} 
                          onValueChange={(value) => setValue("anisotropicFiltering", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select anisotropic filtering" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0x">Off</SelectItem>
                            <SelectItem value="2x">2x</SelectItem>
                            <SelectItem value="4x">4x</SelectItem>
                            <SelectItem value="8x">8x</SelectItem>
                            <SelectItem value="16x">16x</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="renderingBackend">Rendering Backend</Label>
                        <Select 
                          value={watch("renderingBackend")} 
                          onValueChange={(value) => setValue("renderingBackend", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select rendering backend" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vulkan">Hardware (Vulkan)</SelectItem>
                            <SelectItem value="opengl">Hardware (OpenGL)</SelectItem>
                            <SelectItem value="software">Software</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="fpsLimit">FPS Limit: {fpsLimit}</Label>
                        <Slider
                          value={[fpsLimit]}
                          onValueChange={(value) => setValue("fpsLimit", value[0])}
                          max={60}
                          min={15}
                          step={5}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="audio">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid gap-6">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="audioEnabled">Enable Audio</Label>
                      <Switch
                        checked={watch("audioEnabled")}
                        onCheckedChange={(checked) => setValue("audioEnabled", checked)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="audioBuffering">Audio Buffer Size</Label>
                      <Select 
                        value={watch("audioBuffering")} 
                        onValueChange={(value) => setValue("audioBuffering", value)}
                        disabled={!watch("audioEnabled")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select buffer size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small (Lower Latency, More Stuttering)</SelectItem>
                          <SelectItem value="medium">Medium (Balanced)</SelectItem>
                          <SelectItem value="large">Large (Higher Latency, Less Stuttering)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="rumbleEnabled">Enable Vibration</Label>
                      <Switch
                        checked={watch("rumbleEnabled")}
                        onCheckedChange={(checked) => setValue("rumbleEnabled", checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="controls">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid gap-6">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="useCustomControls">Use Custom Control Layout</Label>
                      <Switch
                        checked={watch("useCustomControls")}
                        onCheckedChange={(checked) => setValue("useCustomControls", checked)}
                      />
                    </div>

                    <Button 
                      type="button" 
                      variant="outline"
                      disabled={!watch("useCustomControls")}
                      onClick={() => {
                        toast.info("Control Editor", {
                          description: "The control layout editor would open here",
                        });
                      }}
                    >
                      Edit Control Layout
                    </Button>

                    <div className="text-sm text-muted-foreground">
                      <p>You can customize the position and size of on-screen controls in the editor.</p>
                      <p>External controllers are automatically detected and supported.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="storage">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid gap-6">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="usePhoneStorage">Use Phone Storage</Label>
                      <Switch
                        checked={watch("usePhoneStorage")}
                        onCheckedChange={(checked) => setValue("usePhoneStorage", checked)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="customStoragePath">Custom Storage Path</Label>
                      <Input
                        {...register("customStoragePath")}
                        disabled={watch("usePhoneStorage")}
                      />
                    </div>

                    <Button 
                      type="button" 
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={() => {
                        toast.success("Cache Cleared", {
                          description: "All temporary files have been removed",
                        });
                      }}
                    >
                      <RefreshCw className="h-4 w-4" />
                      Clear Cache
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end mt-6 gap-3">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => {
                reset();
                toast.info("Settings Reset", {
                  description: "All settings have been reset to default values",
                });
              }}
            >
              Reset
            </Button>
            <Button type="submit" className="bg-ps-blue hover:bg-ps-blue/90">
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Settings;
