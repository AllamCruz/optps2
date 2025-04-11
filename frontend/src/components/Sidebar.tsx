
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Gamepad2, Settings, BookOpen, Cpu, Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: <Home size={20} />, label: "Home", path: "/" },
    { icon: <Gamepad2 size={20} />, label: "Games", path: "/games" },
    { icon: <Cpu size={20} />, label: "Performance", path: "/performance" },
    { icon: <BookOpen size={20} />, label: "Compatibility", path: "/compatibility" },
    { icon: <Download size={20} />, label: "Downloads", path: "/downloads" },
    { icon: <Settings size={20} />, label: "Settings", path: "/settings" },
  ];

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center">
          <span className="text-ps-blue font-bold text-xl">Opt</span>
          <span className="text-snapdragon-red font-bold text-xl ml-1">PS2</span>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X size={20} />
        </Button>
      </div>

      <nav className="p-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-md mb-1 transition-colors",
                isActive
                  ? "bg-primary/20 text-primary"
                  : "text-foreground/80 hover:bg-secondary hover:text-foreground"
              )
            }
            onClick={() => {
              if (window.innerWidth < 768) {
                onClose();
              }
            }}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
        <div className="text-xs text-muted-foreground">
          <p>OptPS2 Emulator v0.1</p>
          <p>Optimized for Snapdragon 7xx & 8xx</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
