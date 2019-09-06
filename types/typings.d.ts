declare module '*.css' {
  const content: any;
  export default content;
}

declare module '*.svg' {
  const content: any;
  export default content;
}

declare interface Device {
  name: string;
  icon: string;
  config: {
    zoom: number;
    columns: number;
    rowHeight: number;
  };
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

declare interface SystemIntegration {
  name: string;
  slug: string;
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
  components: IntegrationComponent[];
}

interface ServerIntegration {
  id: string;
  slug: string;
  config: object;
}

interface IntegrationComponent {
  id: string;
  archived: boolean;
  componentSlug: string;
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

interface ComponentConfig {
  h: number;
  w: number;
  x: number;
  y: number;
  [key: string]: any;
}

interface IntegrationComponentProps {
  componentId: number;
  componentConfig: ComponentConfig;
  integrationId: number;
  integrationConfig: {
    [key: string]: any;
  };
}

type DarkSkyUnits = 'ca' | 'us' | 'si';

interface ReactGridLayoutConfig extends ComponentConfig {
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
