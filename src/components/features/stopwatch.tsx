"use client";

import { useState, useRef, useCallback, type FC } from 'react';
import { TimerIcon, Play, Pause, RotateCcw, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const Stopwatch: FC = () => {
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const formatTime = (timeInMillis: number) => {
    const minutes = Math.floor(timeInMillis / 60000);
    const seconds = Math.floor((timeInMillis % 60000) / 1000);
    const milliseconds = timeInMillis % 1000;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(
      milliseconds
    ).padStart(3, '0')}`;
  };

  const start = useCallback(() => {
    setIsRunning(true);
    startTimeRef.current = Date.now() - time;
    timerRef.current = requestAnimationFrame(animate);
  }, [time]);

  const stop = useCallback(() => {
    setIsRunning(false);
    if (timerRef.current) {
      cancelAnimationFrame(timerRef.current);
    }
  }, []);

  const animate = () => {
    setTime(Date.now() - startTimeRef.current);
    timerRef.current = requestAnimationFrame(animate);
  };
  
  const reset = () => {
    stop();
    setTime(0);
    setLaps([]);
  };

  const lap = () => {
    setLaps([time, ...laps]);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Stopwatch</CardTitle>
        <TimerIcon className="h-6 w-6 text-muted-foreground" />
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-7xl font-mono tracking-tighter py-8 font-bold text-foreground">
          {formatTime(time)}
        </p>
        <div className="flex justify-center space-x-4">
          <Button variant="outline" size="lg" onClick={reset} disabled={isRunning || time === 0}>
            <RotateCcw className="mr-2 h-5 w-5" /> Reset
          </Button>
          <Button size="lg" onClick={isRunning ? stop : start} className="w-32">
            {isRunning ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
            {isRunning ? 'Pause' : 'Start'}
          </Button>
           <Button variant="secondary" size="lg" onClick={lap} disabled={!isRunning}>
            <Flag className="mr-2 h-5 w-5" /> Lap
          </Button>
        </div>
      </CardContent>
      {laps.length > 0 && (
        <CardFooter className="flex-col">
          <Separator className="my-4" />
          <h3 className="text-lg font-semibold w-full text-left mb-2">Laps</h3>
          <ScrollArea className="h-32 w-full">
            <div className="space-y-2 font-mono">
              {laps.map((lapTime, index) => (
                <div key={index} className="flex justify-between items-center bg-muted p-2 rounded-md">
                  <span className="text-muted-foreground">Lap {laps.length - index}</span>
                  <span>{formatTime(lapTime - (laps[index+1] || 0))}</span>
                  <span className="text-foreground/80">{formatTime(lapTime)}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardFooter>
      )}
    </Card>
  );
};

export default Stopwatch;
