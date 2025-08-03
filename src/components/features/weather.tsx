"use client";

import { useState, useEffect, type FC } from 'react';
import { Wind } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getWeatherInfo, type WeatherData, type GeoData } from '@/lib/weather.tsx';
import { useToast } from '@/hooks/use-toast';

const Weather: FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [geoData, setGeoData] = useState<GeoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchWeather = (lat: number, lon: number) => {
      Promise.all([
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m&temperature_unit=celsius&wind_speed_unit=kmh`),
        fetch(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}`)
      ])
      .then(async ([weatherRes, geoRes]) => {
        if (!weatherRes.ok || !geoRes.ok) {
          throw new Error('Failed to fetch weather or location data');
        }
        const weatherJson = await weatherRes.json();
        const geoJson = await geoRes.json();
        setWeatherData(weatherJson);
        setGeoData(geoJson);
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

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
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

  if (error || !weatherData || !geoData) {
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

  const { icon, description } = getWeatherInfo(weatherData.current.weather_code);
  const locationName = geoData.address.city || geoData.address.town || geoData.address.village || 'Current Location';

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Today's Weather</CardTitle>
        <Wind className="h-6 w-6 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-2 text-center pt-6">
        <div className="text-primary">{icon}</div>
        <p className="text-7xl font-bold tracking-tighter">
          {Math.round(weatherData.current.temperature_2m)}°C
        </p>
        <p className="text-xl text-muted-foreground">{description}</p>
        <p className="text-lg font-medium">{locationName}</p>
        <p className="text-sm text-muted-foreground">
          Wind: {weatherData.current.wind_speed_10m} km/h
        </p>
      </CardContent>
    </Card>
  );
};

export default Weather;
