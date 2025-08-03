"use client";

import { useState, useEffect } from 'react';
import { useOrientation, type Orientation } from '@/hooks/use-orientation';
import { AlarmClockIcon, Smartphone, TimerIcon, WindIcon } from 'lucide-react';

import AlarmClock from '@/components/features/alarm-clock';
import Stopwatch from '@/components/features/stopwatch';
import Timer from '@/components/features/timer';
import Weather from '@/components/features/weather';
import { Button } from '@/components/ui/button';

export default function Home() {
  const orientation = useOrientation();
  const [isClient, setIsClient] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const renderFeature = (orientation: Orientation) => {
    switch (orientation) {
      case 'portrait-primary':
        return <AlarmClock />;
      case 'landscape-primary':
        return <Stopwatch />;
      case 'portrait-secondary':
        return <Timer />;
      case 'landscape-secondary':
        return <Weather />;
      default:
        return (
          <div className="flex flex-col items-center justify-center text-center p-8">
            <Smartphone className="w-16 h-16 mb-4 text-primary" />
            <h2 className="text-2xl font-bold">Unsupported Orientation</h2>
            <p className="text-muted-foreground mt-2">
              Please rotate your device to a standard portrait or landscape view.
            </p>
          </div>
        );
    }
  };

  if (!isClient) {
    return null; // or a loading spinner
  }

  if (showWelcome) {
    return (
      <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 text-center">
        <div className="flex flex-col items-center justify-center space-y-6">
          <h1 className="text-5xl font-bold tracking-tighter text-primary font-headline">
            Orientime
          </h1>
          <p className="max-w-md text-muted-foreground">
            A new tool for every angle. Rotate your device to discover what's next.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm text-foreground">
            <div className="flex items-center gap-2 rounded-lg bg-card p-3 shadow-sm">
              <AlarmClockIcon className="h-5 w-5 text-accent" />
              <span>Portrait: Alarm</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-card p-3 shadow-sm">
              <TimerIcon className="h-5 w-5 text-accent" />
              <span>Landscape: Stopwatch</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-card p-3 shadow-sm">
              <TimerIcon className="h-5 w-5 text-accent" />
              <span>Upside-down: Timer</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-card p-3 shadow-sm">
              <WindIcon className="h-5 w-5 text-accent" />
              <span>Landscape (other): Weather</span>
            </div>
          </div>
          <Button onClick={() => setShowWelcome(false)} size="lg">Get Started</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 transition-all duration-300">
      <div
        key={orientation}
        className="w-full max-w-md animate-in fade-in-0 zoom-in-95 duration-500"
      >
        {renderFeature(orientation)}
      </div>
    </main>
  );
}
