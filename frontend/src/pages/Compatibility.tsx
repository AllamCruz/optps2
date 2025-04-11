import React, { useState } from "react";
import { BookOpen, Search, Info, Filter, Check, X as XIcon, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CustomProgress } from "@/components/ui/custom-progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { MOCK_GAMES } from "@/constants/mockData";
import { cn } from "@/lib/utils";

interface CompatibilityEntry {
  id: string;
  title: string;
  rating: number;
  issues: string[];
  lastTested: string;
  snapdragonVersion: string;
}

const Compatibility = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Generate compatibility data based on mock games
  const compatibilityList: CompatibilityEntry[] = MOCK_GAMES.map(game => ({
    id: game.id,
    title: game.title,
    rating: game.compatibility,
    issues: game.compatibility > 90 
      ? ["Minor graphical glitches"] 
      : game.compatibility > 80 
      ? ["Some audio stuttering", "Minor graphical glitches"] 
      : game.compatibility > 70 
      ? ["Frequent audio stuttering", "Texture issues", "Occasional slowdowns"] 
      : ["Major graphical glitches", "Severe performance issues", "Audio desync"],
    lastTested: "2023-04-01",
    snapdragonVersion: Math.random() > 0.5 ? "Snapdragon 8xx" : "Snapdragon 7xx"
  }));
  
  const filteredCompatibility = compatibilityList.filter(entry => 
    entry.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getRatingBadge = (rating: number) => {
    if (rating >= 90) return { label: "Perfect", color: "bg-green-500 text-white" };
    if (rating >= 80) return { label: "Playable", color: "bg-blue-500 text-white" };
    if (rating >= 70) return { label: "Has Issues", color: "bg-yellow-500 text-white" };
    return { label: "Problematic", color: "bg-red-500 text-white" };
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 container px-4 py-6 max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold flex items-center">
            <BookOpen className="mr-2 h-6 w-6 text-ps-blue" />
            Game Compatibility
          </h1>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Compatibility Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Perfect (90%+)</span>
                  <span>2 Games</span>
                </div>
                <CustomProgress value={25} className="h-2 bg-gray-300" indicatorClassName="bg-green-500" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Playable (80-89%)</span>
                  <span>4 Games</span>
                </div>
                <CustomProgress value={50} className="h-2 bg-gray-300" indicatorClassName="bg-blue-500" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Has Issues (70-79%)</span>
                  <span>2 Games</span>
                </div>
                <CustomProgress value={25} className="h-2 bg-gray-300" indicatorClassName="bg-yellow-500" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Problematic (&lt;70%)</span>
                  <span>0 Games</span>
                </div>
                <CustomProgress value={0} className="h-2 bg-gray-300" indicatorClassName="bg-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search games..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </div>
        </Card>

        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Games</TabsTrigger>
            <TabsTrigger value="perfect">Perfect</TabsTrigger>
            <TabsTrigger value="playable">Playable</TabsTrigger>
            <TabsTrigger value="issues">Has Issues</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="space-y-4">
              {filteredCompatibility.length > 0 ? (
                filteredCompatibility.map((entry) => (
                  <Card key={entry.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="p-4 flex-grow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                          <h3 className="font-bold text-lg">{entry.title}</h3>
                          <div className="flex items-center mt-2 md:mt-0">
                            <Badge className={getRatingBadge(entry.rating).color}>
                              {getRatingBadge(entry.rating).label}
                            </Badge>
                            <span className="ml-2">{entry.rating}%</span>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <CustomProgress 
                            value={entry.rating} 
                            className="h-2" 
                            indicatorClassName={
                              entry.rating >= 90 ? "bg-green-500" :
                              entry.rating >= 80 ? "bg-blue-500" :
                              entry.rating >= 70 ? "bg-yellow-500" :
                              "bg-red-500"
                            }
                          />
                        </div>
                        
                        <div className="mb-2">
                          <h4 className="text-sm font-medium">Known Issues:</h4>
                          <ul className="list-disc list-inside text-sm text-muted-foreground">
                            {entry.issues.map((issue, index) => (
                              <li key={index}>{issue}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-2 text-xs text-muted-foreground">
                          <span>Last tested: {entry.lastTested}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>Tested on: {entry.snapdragonVersion}</span>
                        </div>
                      </div>
                      
                      <div className={cn(
                        "w-full md:w-16 flex flex-row md:flex-col",
                        entry.rating >= 90 ? "bg-green-100" :
                        entry.rating >= 80 ? "bg-blue-100" :
                        entry.rating >= 70 ? "bg-yellow-100" :
                        "bg-red-100"
                      )}>
                        <div className="flex-1 flex items-center justify-center p-2">
                          {entry.rating >= 90 ? (
                            <Check className="h-6 w-6 text-green-600" />
                          ) : entry.rating >= 80 ? (
                            <Check className="h-6 w-6 text-blue-600" />
                          ) : entry.rating >= 70 ? (
                            <AlertTriangle className="h-6 w-6 text-yellow-600" />
                          ) : (
                            <XIcon className="h-6 w-6 text-red-600" />
                          )}
                        </div>
                        <div className="flex-1 flex items-center justify-center bg-black/5 p-2">
                          <Info className="h-6 w-6 text-slate-600" />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No compatibility data found for "{searchQuery}"</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="perfect">
            <div className="space-y-4">
              {filteredCompatibility.filter(entry => entry.rating >= 90).length > 0 ? (
                filteredCompatibility
                  .filter(entry => entry.rating >= 90)
                  .map((entry) => (
                    <Card key={entry.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="p-4 flex-grow">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                            <h3 className="font-bold text-lg">{entry.title}</h3>
                            <div className="flex items-center mt-2 md:mt-0">
                              <Badge className="bg-green-500 text-white">
                                Perfect
                              </Badge>
                              <span className="ml-2">{entry.rating}%</span>
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <CustomProgress 
                              value={entry.rating} 
                              className="h-2" 
                              indicatorClassName="bg-green-500"
                            />
                          </div>
                          
                          <div className="mb-2">
                            <h4 className="text-sm font-medium">Known Issues:</h4>
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                              {entry.issues.map((issue, index) => (
                                <li key={index}>{issue}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-2 text-xs text-muted-foreground">
                            <span>Last tested: {entry.lastTested}</span>
                            <span className="hidden sm:inline">•</span>
                            <span>Tested on: {entry.snapdragonVersion}</span>
                          </div>
                        </div>
                        
                        <div className="w-full md:w-16 flex flex-row md:flex-col bg-green-100">
                          <div className="flex-1 flex items-center justify-center p-2">
                            <Check className="h-6 w-6 text-green-600" />
                          </div>
                          <div className="flex-1 flex items-center justify-center bg-black/5 p-2">
                            <Info className="h-6 w-6 text-slate-600" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No "Perfect" compatibility games found for "{searchQuery}"</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="playable">
            <div className="space-y-4">
              {filteredCompatibility.filter(entry => entry.rating >= 80 && entry.rating < 90).length > 0 ? (
                filteredCompatibility
                  .filter(entry => entry.rating >= 80 && entry.rating < 90)
                  .map((entry) => (
                    <Card key={entry.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="p-4 flex-grow">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                            <h3 className="font-bold text-lg">{entry.title}</h3>
                            <div className="flex items-center mt-2 md:mt-0">
                              <Badge className="bg-blue-500 text-white">
                                Playable
                              </Badge>
                              <span className="ml-2">{entry.rating}%</span>
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <CustomProgress 
                              value={entry.rating} 
                              className="h-2" 
                              indicatorClassName="bg-blue-500"
                            />
                          </div>
                          
                          <div className="mb-2">
                            <h4 className="text-sm font-medium">Known Issues:</h4>
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                              {entry.issues.map((issue, index) => (
                                <li key={index}>{issue}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-2 text-xs text-muted-foreground">
                            <span>Last tested: {entry.lastTested}</span>
                            <span className="hidden sm:inline">•</span>
                            <span>Tested on: {entry.snapdragonVersion}</span>
                          </div>
                        </div>
                        
                        <div className="w-full md:w-16 flex flex-row md:flex-col bg-blue-100">
                          <div className="flex-1 flex items-center justify-center p-2">
                            <Check className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="flex-1 flex items-center justify-center bg-black/5 p-2">
                            <Info className="h-6 w-6 text-slate-600" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No "Playable" compatibility games found for "{searchQuery}"</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="issues">
            <div className="space-y-4">
              {filteredCompatibility.filter(entry => entry.rating < 80).length > 0 ? (
                filteredCompatibility
                  .filter(entry => entry.rating < 80)
                  .map((entry) => (
                    <Card key={entry.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="p-4 flex-grow">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                            <h3 className="font-bold text-lg">{entry.title}</h3>
                            <div className="flex items-center mt-2 md:mt-0">
                              <Badge className={
                                entry.rating >= 70 ? "bg-yellow-500 text-white" : "bg-red-500 text-white"
                              }>
                                {entry.rating >= 70 ? "Has Issues" : "Problematic"}
                              </Badge>
                              <span className="ml-2">{entry.rating}%</span>
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <CustomProgress 
                              value={entry.rating} 
                              className="h-2" 
                              indicatorClassName={entry.rating >= 70 ? "bg-yellow-500" : "bg-red-500"}
                            />
                          </div>
                          
                          <div className="mb-2">
                            <h4 className="text-sm font-medium">Known Issues:</h4>
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                              {entry.issues.map((issue, index) => (
                                <li key={index}>{issue}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-2 text-xs text-muted-foreground">
                            <span>Last tested: {entry.lastTested}</span>
                            <span className="hidden sm:inline">•</span>
                            <span>Tested on: {entry.snapdragonVersion}</span>
                          </div>
                        </div>
                        
                        <div className={cn(
                          "w-full md:w-16 flex flex-row md:flex-col",
                          entry.rating >= 70 ? "bg-yellow-100" : "bg-red-100"
                        )}>
                          <div className="flex-1 flex items-center justify-center p-2">
                            {entry.rating >= 70 ? (
                              <AlertTriangle className="h-6 w-6 text-yellow-600" />
                            ) : (
                              <XIcon className="h-6 w-6 text-red-600" />
                            )}
                          </div>
                          <div className="flex-1 flex items-center justify-center bg-black/5 p-2">
                            <Info className="h-6 w-6 text-slate-600" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No games with issues found for "{searchQuery}"</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Compatibility;
