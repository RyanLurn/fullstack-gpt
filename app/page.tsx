"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Sparkle</h1>
      <Button onClick={() => toast.info("Hello world")}>Click me</Button>
    </div>
  );
}
