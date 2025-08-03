"use client";

import { useState, useEffect, useRef, type FC } from 'react';
import { TimerIcon, Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const Timer: FC = () => {
  const [initialTime, setInitialTime] = useState(300); // 5 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setIsFinished(true);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft]);

  const handleStartPause = () => {
    if (timeLeft > 0) {
      setIsRunning(!isRunning);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
  };
  
  const handleTimeChange = (type: 'minutes' | 'seconds', value: string) => {
    const numValue = parseInt(value, 10) || 0;
    const currentMins = Math.floor(initialTime / 60);
    const currentSecs = initialTime % 60;
    let newTotalSeconds;

    if (type === 'minutes') {
      newTotalSeconds = numValue * 60 + currentSecs;
    } else {
      newTotalSeconds = currentMins * 60 + numValue;
    }

    setInitialTime(newTotalSeconds);
    if (!isRunning) {
      setTimeLeft(newTotalSeconds);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Timer</CardTitle>
        <TimerIcon className="h-6 w-6 text-muted-foreground" />
      </CardHeader>
      <CardContent className="text-center">
        <div className="flex justify-center items-center space-x-2 my-4">
          <Input 
            type="number"
            min="0"
            value={String(Math.floor(initialTime / 60)).padStart(2, '0')}
            onChange={(e) => handleTimeChange('minutes', e.target.value)}
            className="w-24 text-2xl font-mono text-center"
            disabled={isRunning}
            aria-label="Minutes"
          />
          <span className="text-2xl font-mono">:</span>
          <Input 
            type="number"
            min="0"
            max="59"
            value={String(initialTime % 60).padStart(2, '0')}
            onChange={(e) => handleTimeChange('seconds', e.target.value)}
            className="w-24 text-2xl font-mono text-center"
            disabled={isRunning}
            aria-label="Seconds"
          />
        </div>

        <p className="text-7xl font-mono tracking-tighter py-4 font-bold text-foreground">
          {formatTime(timeLeft)}
        </p>

        <Progress value={initialTime > 0 ? (timeLeft / initialTime) * 100 : 0} className="mb-6 h-3" />

        <div className="flex justify-center space-x-4">
          <Button variant="outline" size="lg" onClick={handleReset} disabled={isRunning}>
            <RotateCcw className="mr-2 h-5 w-5" /> Reset
          </Button>
          <Button size="lg" onClick={handleStartPause} className="w-32" disabled={timeLeft === 0}>
            {isRunning ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
            {isRunning ? 'Pause' : 'Start'}
          </Button>
        </div>

        <AlertDialog open={isFinished} onOpenChange={() => setIsFinished(false)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Time's Up!</AlertDialogTitle>
              <AlertDialogDescription>
                The timer has finished.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => { setIsFinished(false); handleReset(); }}>Dismiss</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};

export default Timer;
