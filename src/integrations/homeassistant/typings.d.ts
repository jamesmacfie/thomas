declare interface HomeAssistantEntity {
  attributes: {
    attribution?: string;
    friendly_name?: string;
    battery_level?: number;
    icon?: string;
    unit_of_measurement: string;
    [key: string]: string | number;
  };
  context: {
    id: string;
    user_id?: string;
  };
  entity_id: string;
  last_changed: Date;
  last_updated: Date;
  state: number | string;
  [key: string]: string;
}
