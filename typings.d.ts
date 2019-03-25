declare module '*.css' {
  const content: any;
  export default content;
}

declare module '*.svg' {
  const content: any;
  export default content;
}
declare interface Entity {
  attributes: {
    attribution?: string;
    friendly_name?: string;
    icon?: string;
    unit_of_measurement: string;
  };
  context: {
    id: string;
    user_id?: string;
  };
  entity_id: string;
  last_changed: Date;
  last_updated: Date;
  state: number | string;
}
