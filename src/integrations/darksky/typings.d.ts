declare type DarkSkyUnits = 'ca' | 'us' | 'si';
declare type DarkSkyIcons =
  | 'clear-day'
  | 'clear-night'
  | 'rain'
  | 'snow'
  | 'sleet'
  | 'wind'
  | 'fog'
  | 'cloudy'
  | 'partly-cloudy-day'
  | 'partly-cloudy-night';
declare type DarkSkyPrecip = 'rain' | 'snow' | 'sleet';

declare interface DarkSkyForecastCurrently {
  time: number;
  summary: string;
  icon: DarkSkyIcons;
  nearestStormDistance: number;
  precipIntensity: number;
  precipProbability: number;
  precipType: DarkSkyPrecip;
  temperature: number;
  apparentTemperature: number;
  dewPoint: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windGust: number;
  windBearing: number;
  cloudCover: number;
  uvIndex: number;
  visibility: number;
  ozone: number;
}

declare interface DarkSkyForecastDaily {
  apparentTemperatureHigh: number;
  apparentTemperatureHighTime: float;
  apparentTemperatureLow: number;
  apparentTemperatureLowTime: number;
  apparentTemperatureMax: number;
  apparentTemperatureMaxTime: number;
  apparentTemperatureMin: number;
  apparentTemperatureMinTime: number;
  cloudCover: number;
  dewPoint: number;
  humidity: number;
  icon: DarkSkyIcons;
  moonPhase: number;
  ozone: number;
  precipIntensity: number;
  precipIntensityMax: number;
  precipIntensityMaxTime: number;
  precipProbability: number;
  precipType: DarkSkyPrecip;
  pressure: number;
  summary: string;
  sunriseTime: number;
  sunsetTime: number;
  temperatureHigh: number;
  temperatureHighTime: number;
  temperatureLow: number;
  temperatureLowTime: number;
  temperatureMax: number;
  temperatureMaxTime: number;
  temperatureMin: number;
  temperatureMinTime: number;
  time: number;
  uvIndex: number;
  uvIndexTime: number;
  visibility: number;
  windBearing: number;
  windGust: number;
  windGustTime: number;
  windSpeed: number;
}

declare interface DarkSkyForecast {
  currently: DarkSkyForecastCurrently;
  daily: {
    data: DarkSkyForecastDaily[];
  };
}
