"use client";

import { useState, useEffect, type FC } from 'react';
import { AlarmClockIcon, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Alarm {
  id: string;
  time: string;
  isActive: boolean;
}

const AlarmClock: FC = () => {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [newAlarmTime, setNewAlarmTime] = useState('');
  const [ringingAlarm, setRingingAlarm] = useState<Alarm | null>(null);

  useEffect(() => {
    try {
      const storedAlarms = localStorage.getItem('alarms');
      if (storedAlarms) {
        setAlarms(JSON.parse(storedAlarms));
      }
    } catch (error) {
      console.error("Could not load alarms from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('alarms', JSON.stringify(alarms));
    } catch (error) {
      console.error("Could not save alarms to localStorage", error);
    }
  }, [alarms]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      alarms.forEach(alarm => {
        if (alarm.isActive && alarm.time === currentTime) {
          setRingingAlarm(alarm);
          // Optional: Auto-disable alarm after it rings
          toggleAlarm(alarm.id);
        }
      });
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [alarms]);

  const addAlarm = () => {
    if (newAlarmTime && !alarms.some(a => a.time === newAlarmTime)) {
      const newAlarm: Alarm = {
        id: new Date().toISOString(),
        time: newAlarmTime,
        isActive: true,
      };
      setAlarms([...alarms, newAlarm].sort((a, b) => a.time.localeCompare(b.time)));
      setNewAlarmTime('');
    }
  };

  const deleteAlarm = (id: string) => {
    setAlarms(alarms.filter(alarm => alarm.id !== id));
  };

  const toggleAlarm = (id: string) => {
    setAlarms(
      alarms.map(alarm =>
        alarm.id === id ? { ...alarm, isActive: !alarm.isActive } : alarm
      )
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Alarm Clock</CardTitle>
        <AlarmClockIcon className="h-6 w-6 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex w-full items-center space-x-2 mb-4">
          <Input
            type="time"
            value={newAlarmTime}
            onChange={(e) => setNewAlarmTime(e.target.value)}
            aria-label="Set new alarm time"
          />
          <Button onClick={addAlarm}>Add</Button>
        </div>

        <ScrollArea className="h-[250px] pr-4">
          <div className="space-y-4">
            {alarms.length > 0 ? (
              alarms.map(alarm => (
                <div key={alarm.id} className="flex items-center justify-between rounded-lg border p-3">
                  <span className={`text-2xl font-mono ${alarm.isActive ? 'text-foreground' : 'text-muted-foreground line-through'}`}>
                    {alarm.time}
                  </span>
                  <div className="flex items-center space-x-3">
                    <Switch
                      checked={alarm.isActive}
                      onCheckedChange={() => toggleAlarm(alarm.id)}
                      aria-label={`Toggle alarm for ${alarm.time}`}
                    />
                    <Button variant="ghost" size="icon" onClick={() => deleteAlarm(alarm.id)} aria-label={`Delete alarm for ${alarm.time}`}>
                      <Trash2 className="h-5 w-5 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-10">No alarms set.</p>
            )}
          </div>
        </ScrollArea>

        <AlertDialog open={!!ringingAlarm} onOpenChange={() => setRingingAlarm(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Alarm!</AlertDialogTitle>
              <AlertDialogDescription>
                It's {ringingAlarm?.time}. Time to wake up!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setRingingAlarm(null)}>Dismiss</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};

export default AlarmClock;
