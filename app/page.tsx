import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Sparkle</h1>
      <Button>Click me</Button>
    </div>
  );
}
