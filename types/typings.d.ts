/**
 * Ignore
 */
declare module '@browser-bunyan/console-formatted-stream';

/**
 * File types
 */
declare module '*.css' {
  const content: any;
  export default content;
}

declare module '*.svg' {
  const content: any;
  export default content;
}

/**
 * Devices
 */

declare interface DeviceConfig {
  zoom: number;
  columns: number;
  rowHeight: number;
}

declare interface Device {
  id: number;
  name: string;
  icon: string;
  config: DeviceConfig;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Integrations
 */

declare interface Integration {
  id: number;
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

interface ServerIntegration {
  id: number;
  slug: string;
  config: any;
}

interface IntegrationWidget {
  id: number;
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

/**
 * Views / Device views
 */

interface View {
  id: number;
  archived: boolean;
  name: string;
  icon: string;
  widgets: IntegrationWidget[];
  createdBy: number;
  createdAt: Date;
  updatedAt: Date;
}

interface DeviceView {
  id: number;
  archived: boolean;
  order: number;
  icon: string;
  name: string;
  viewId: number;
  deviceId: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * UI
 */
interface Page {
  id: number;
  url: string;
  name: string;
  widgets: IntegrationWidget[];
}

interface ReactGridLayoutConfig extends WidgetConfig {
  i: any;
}

/**
 * Forms
 */

interface FormConfig {
  key: string;
  type: 'text' | 'number';
  label: string;
  description?: string;
  values?: {
    value: string | number | boolean;
    label: string;
  }[];
  defaultValue?: string;
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
