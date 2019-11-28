declare interface ThomasNotification {
  id: string;
  color?: 'info' | 'success' | 'danger';
  text: string;
}

declare interface ThomasNotificationInput {
  color?: 'info' | 'success' | 'danger';
  text: string;
}
