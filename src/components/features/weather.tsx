
"use client";

import { useState, useEffect, type FC } from 'react';
import { Wind } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

interface WeatherData {
  location: {
    name: string;
    region: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
  };
}

interface CachedWeatherData {
  data: WeatherData;
  timestamp: number;
  coords: {
    latitude: number;
    longitude: number;
  }
}

const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

const Weather: FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchWeather = (lat: number, lon: number) => {
      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      if (!apiKey) {
        setError('Weather API key is not configured.');
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Configuration Error",
          description: "Weather API key is missing.",
        });
        return;
      }

      fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`)
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error.message || 'Failed to fetch weather data');
        }
        return res.json();
      })
      .then((data: WeatherData) => {
        setWeatherData(data);
        const cache: CachedWeatherData = {
          data,
          timestamp: Date.now(),
          coords: { latitude: lat, longitude: lon }
        };
        localStorage.setItem('weatherCache', JSON.stringify(cache));
      })
      .catch((e) => {
        setError(e.message || 'An unknown error occurred.');
        toast({
          variant: "destructive",
          title: "Error fetching weather",
          description: e.message,
        });
      })
      .finally(() => setLoading(false));
    };

    const processLocation = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      
      try {
        const cachedItem = localStorage.getItem('weatherCache');
        if (cachedItem) {
          const cachedData: CachedWeatherData = JSON.parse(cachedItem);
          const isCacheValid = (Date.now() - cachedData.timestamp) < CACHE_DURATION;
          const isSameLocation = 
            cachedData.coords.latitude.toFixed(4) === latitude.toFixed(4) &&
            cachedData.coords.longitude.toFixed(4) === longitude.toFixed(4);

          if (isCacheValid && isSameLocation) {
            setWeatherData(cachedData.data);
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.error("Failed to read weather cache", e);
      }

      fetchWeather(latitude, longitude);
    }
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        processLocation,
        (err) => {
          setError(`Geolocation error: ${err.message}`);
          toast({
            variant: "destructive",
            title: "Location Error",
            description: "Could not get your location. Please enable location services.",
          });
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  }, [toast]);

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4 text-center">
          <Skeleton className="h-24 w-24 rounded-full" />
          <Skeleton className="h-16 w-1/2" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
        </CardContent>
      </Card>
    );
  }

  if (error || !weatherData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Weather</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error || 'Could not load weather data.'}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const { location, current } = weatherData;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Today's Weather</CardTitle>
        <Wind className="h-6 w-6 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-2 text-center pt-6">
        <Image src={`https:${current.condition.icon}`} alt={current.condition.text} width={96} height={96} />
        <p className="text-7xl font-bold tracking-tighter">
          {Math.round(current.temp_c)}°C
        </p>
        <p className="text-xl text-muted-foreground">{current.condition.text}</p>
        <p className="text-lg font-medium">{location.name}, {location.region}</p>
        <p className="text-sm text-muted-foreground">
          Wind: {current.wind_kph} km/h
        </p>
      </CardContent>
    </Card>
  );
};

export default Weather;
