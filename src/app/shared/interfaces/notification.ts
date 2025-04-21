export interface Notification {
  id: string;
  icon: string;
  text: string;
  metaData: string;
  link?: string;
  sent?: boolean;
}

export type AddNotification = Omit<Notification, 'id'>;
export type EditNotification = {
  id: Notification['id'];
  data: AddNotification;
};
export type DeleteNotification = Notification['id'];
export type NotificationSentStatus = {
  id: Notification['id'];
  sent: boolean;
};
