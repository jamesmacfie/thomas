declare module '*.css' {
  const content: any;
  export default content;
}

declare module '*.svg' {
  const content: any;
  export default content;
}

declare interface DeviceConfig {
  zoom: number;
  columns: number;
  rowHeight: number;
}

declare interface Device {
  id: string;
  name: string;
  icon: string;
  config: DeviceConfig;
  createdAt: Date;
  updatedAt: Date;
}

declare interface Integration {
  id: string;
  archived: boolean;
  slug: string;
  config: any;
  createdAt: Date;
  updatedAt: Date;
}

declare interface ServerIntegration {
  init: (server: express.Express) => string[];
}

declare interface SystemIntegrationWidget {
  name: string;
  slug: string;
  description?: string;
  layout: {
    initialH: number;
    initialW: number;
    minH?: number;
    minW?: number;
  };
}

declare interface SystemIntegration {
  name: string;
  slug: string;
  widgets: SystemIntegrationWidget[];
  settings?: any[];
}

interface View {
  id: number;
  archived: boolean;
  name: string;
  icon: string;
  createdBy: number;
  createdAt: Date;
  updatedAt: Date;
}

interface DeviceView {
  id: string;
  archived: boolean;
  order: number;
  icon: string;
  name: string;
  viewId: number;
  deviceId: number;
  createdAt: Date;
  updatedAt: Date;
}

interface Page {
  id: string;
  url: string;
  name: string;
  widgets: IntegrationWidget[];
}

interface ServerIntegration {
  id: string;
  slug: string;
  config: object;
}

interface IntegrationWidget {
  id: string;
  archived: boolean;
  widgetSlug: string;
  integrationSlug: string;
  integrationId: number;
  config: any;
  viewId: number;
  createdBy: number;
  createdAt: Date;
  updatedAt: Date;
  integration: {
    id: number;
    name: string;
    config: any;
  };
}

interface WidgetConfig {
  h: number;
  w: number;
  x: number;
  y: number;
  [key: string]: any;
}

interface IntegrationWidgetProps {
  widgetId: number;
  widgetConfig: WidgetConfig;
  integrationId: number;
  integrationConfig: {
    [key: string]: any;
  };
}

type DarkSkyUnits = 'ca' | 'us' | 'si';
type DarkSkyIcons =
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
type DarkSkyPrecip = 'rain' | 'snow' | 'sleet';

interface DarkSkyForecastCurrently {
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

interface DarkSkyForecastDaily {
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

interface DarkSkyForecast {
  currently: DarkSkyForecastCurrently;
  daily: {
    data: DarkSkyForecastDaily[];
  };
}

interface ReactGridLayoutConfig extends WidgetConfig {
  i: any;
}

interface FormConfig {
  key: string;
  type: 'text' | 'number';
  label: string;
  description?: string;
  // TODO - how can I make this type be better? Needs better optional details etc
  validationType?: 'mixed' | 'string' | 'number' | 'boolean';
  validations?: {
    type:
      | 'required'
      | 'length'
      | 'min'
      | 'max'
      | 'matches'
      | 'email'
      | 'url'
      | 'lowercase'
      | 'uppercase'
      | 'lessThan'
      | 'moreThan'
      | 'positive'
      | 'negative';
    params: any[];
  }[];
}
