import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen">
      <h1 className="text-4xl font-bold">Sparkle</h1>
      <Button>Click me</Button>
    </div>
  );
}
