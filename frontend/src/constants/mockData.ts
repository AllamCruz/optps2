
import { Game } from "@/components/GameCard";

export const MOCK_GAMES: Game[] = [
  {
    id: "1",
    title: "Final Fantasy X",
    coverImage: "https://upload.wikimedia.org/wikipedia/en/a/a7/FF_X_box.jpg",
    lastPlayed: "2023-04-10T15:30:00",
    compatibility: 95,
    region: "NTSC",
    size: "3.4 GB"
  },
  {
    id: "2",
    title: "Gran Turismo 4",
    coverImage: "https://upload.wikimedia.org/wikipedia/en/8/8e/Gran_Turismo_4.jpg",
    lastPlayed: "2023-04-05T10:15:00",
    compatibility: 85,
    region: "PAL",
    size: "4.2 GB"
  },
  {
    id: "3",
    title: "Metal Gear Solid 3: Snake Eater",
    coverImage: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ac/Metal_Gear_Solid_3_Snake_Eater.jpg/220px-Metal_Gear_Solid_3_Snake_Eater.jpg",
    compatibility: 90,
    region: "NTSC",
    size: "3.8 GB"
  },
  {
    id: "4",
    title: "Shadow of the Colossus",
    coverImage: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ac/Shadow_of_the_colossus.jpg/220px-Shadow_of_the_colossus.jpg",
    compatibility: 88,
    region: "NTSC",
    size: "3.1 GB"
  },
  {
    id: "5",
    title: "God of War II",
    coverImage: "https://upload.wikimedia.org/wikipedia/en/thumb/2/25/God_of_War_II.jpg/220px-God_of_War_II.jpg",
    lastPlayed: "2023-03-15T20:45:00",
    compatibility: 92,
    region: "NTSC",
    size: "4.0 GB"
  },
  {
    id: "6",
    title: "Okami",
    coverImage: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d5/Okami_game_cover.jpg/220px-Okami_game_cover.jpg",
    compatibility: 80,
    region: "NTSC-J",
    size: "3.5 GB"
  },
  {
    id: "7",
    title: "Kingdom Hearts II",
    coverImage: "https://upload.wikimedia.org/wikipedia/en/thumb/8/89/Kingdom_Hearts_II.jpg/220px-Kingdom_Hearts_II.jpg",
    compatibility: 87,
    region: "NTSC",
    size: "3.7 GB"
  },
  {
    id: "8",
    title: "Persona 4",
    coverImage: "https://upload.wikimedia.org/wikipedia/en/thumb/9/91/Shin_Megami_Tensei_Persona_4.jpg/220px-Shin_Megami_Tensei_Persona_4.jpg",
    compatibility: 85,
    region: "NTSC-J",
    size: "3.2 GB"
  }
];

export const PERFORMANCE_PRESETS = [
  {
    name: "Battery Saver",
    description: "Lower settings to preserve battery life",
    resolution: "1x Native (480p)",
    textureQuality: "Low",
    antiAliasing: "Off",
    anisotropicFiltering: "Off",
    cpuCores: "2 Cores",
    rendering: "Software",
    fpsLimit: 30
  },
  {
    name: "Balanced",
    description: "Good balance between performance and quality",
    resolution: "2x Native (960p)",
    textureQuality: "Medium",
    antiAliasing: "FXAA",
    anisotropicFiltering: "2x",
    cpuCores: "4 Cores",
    rendering: "Hardware (Vulkan)",
    fpsLimit: 60
  },
  {
    name: "Performance",
    description: "Prioritize frame rates",
    resolution: "2x Native (960p)",
    textureQuality: "Medium",
    antiAliasing: "Off",
    anisotropicFiltering: "Off",
    cpuCores: "All Cores",
    rendering: "Hardware (Vulkan)",
    fpsLimit: 60
  },
  {
    name: "Quality",
    description: "Best visual quality at cost of performance",
    resolution: "3x Native (1440p)",
    textureQuality: "High",
    antiAliasing: "SMAA",
    anisotropicFiltering: "16x",
    cpuCores: "All Cores",
    rendering: "Hardware (Vulkan)",
    fpsLimit: 60
  },
  {
    name: "Custom",
    description: "User-defined settings",
    resolution: "2x Native (960p)",
    textureQuality: "Medium",
    antiAliasing: "FXAA",
    anisotropicFiltering: "8x",
    cpuCores: "4 Cores",
    rendering: "Hardware (Vulkan)",
    fpsLimit: 60
  }
];

// Add the missing MOCK_PERFORMANCE_DATA that is referenced in Performance.tsx
export const MOCK_PERFORMANCE_DATA = [
  { time: "10:00", cpuUsage: 45, gpuUsage: 60, memoryUsage: 55, fps: 58 },
  { time: "10:01", cpuUsage: 47, gpuUsage: 62, memoryUsage: 56, fps: 57 },
  { time: "10:02", cpuUsage: 50, gpuUsage: 65, memoryUsage: 58, fps: 55 },
  { time: "10:03", cpuUsage: 52, gpuUsage: 68, memoryUsage: 59, fps: 54 },
  { time: "10:04", cpuUsage: 48, gpuUsage: 64, memoryUsage: 57, fps: 56 },
  { time: "10:05", cpuUsage: 46, gpuUsage: 61, memoryUsage: 56, fps: 57 },
  { time: "10:06", cpuUsage: 49, gpuUsage: 63, memoryUsage: 58, fps: 55 },
  { time: "10:07", cpuUsage: 51, gpuUsage: 66, memoryUsage: 59, fps: 53 },
  { time: "10:08", cpuUsage: 47, gpuUsage: 62, memoryUsage: 57, fps: 56 },
  { time: "10:09", cpuUsage: 45, gpuUsage: 60, memoryUsage: 55, fps: 58 }
];
