
import React from 'react';
import { Sun, CloudSun, Cloud, CloudFog, CloudDrizzle, CloudRain, CloudLightning, CloudSnow, Snowflake, Tornado } from 'lucide-react';

export interface WeatherData {
  current: {
    temperature_2m: number;
    weather_code: number;
    wind_speed_10m: number;
  };
}

export interface GeoData {
  address: {
    city?: string;
    town?: string;
    village?: string;
    country: string;
  };
}

export function getWeatherInfo(code: number): { description: string; icon: React.ReactNode } {
  const iconProps = { className: "w-24 h-24" };
  switch (code) {
    case 0:
      return { description: 'Clear sky', icon: <Sun {...iconProps} /> };
    case 1:
      return { description: 'Mainly clear', icon: <Sun {...iconProps} /> };
    case 2:
      return { description: 'Partly cloudy', icon: <CloudSun {...iconProps} /> };
    case 3:
      return { description: 'Overcast', icon: <Cloud {...iconProps} /> };
    case 45:
    case 48:
      return { description: 'Fog', icon: <CloudFog {...iconProps} /> };
    case 51:
    case 53:
    case 55:
      return { description: 'Drizzle', icon: <CloudDrizzle {...iconProps} /> };
    case 56:
    case 57:
      return { description: 'Freezing Drizzle', icon: <CloudDrizzle {...iconProps} /> };
    case 61:
    case 63:
    case 65:
      return { description: 'Rain', icon: <CloudRain {...iconProps} /> };
    case 66:
    case 67:
      return { description: 'Freezing Rain', icon: <CloudRain {...iconProps} /> };
    case 71:
    case 73:
    case 75:
      return { description: 'Snow fall', icon: <CloudSnow {...iconProps} /> };
    case 77:
      return { description: 'Snow grains', icon: <Snowflake {...iconProps} /> };
    case 80:
    case 81:
    case 82:
      return { description: 'Rain showers', icon: <CloudRain {...iconProps} /> };
    case 85:
    case 86:
      return { description: 'Snow showers', icon: <CloudSnow {...iconProps} /> };
    case 95:
      return { description: 'Thunderstorm', icon: <CloudLightning {...iconProps} /> };
    case 96:
    case 99:
      return { description: 'Thunderstorm with hail', icon: <CloudLightning {...iconProps} /> };
    default:
      return { description: 'Unknown', icon: <Cloud {...iconProps} /> };
  }
}
