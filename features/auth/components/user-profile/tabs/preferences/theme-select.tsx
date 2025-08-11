import { useEffect, useState } from "react";
import { MonitorCog, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

function ThemeSelect() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Skeleton className="h-9 w-1/2 rounded-md" />;
  }

  return (
    <Select value={theme || "system"} onValueChange={setTheme}>
      <SelectTrigger className="w-1/2">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">
          <Sun /> Light
        </SelectItem>
        <SelectItem value="dark">
          <Moon /> Dark
        </SelectItem>
        <SelectItem value="system">
          <MonitorCog /> System
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

export { ThemeSelect };
