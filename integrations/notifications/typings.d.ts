declare interface ThomasNotificationInput {
  color?: 'info' | 'success' | 'danger';
  icon?: IconProp;
  imageSrc?: string;
  title?: string;
  text: string;
}

declare interface ThomasNotification extends ThomasNotificationInput {
  id: string;
}
