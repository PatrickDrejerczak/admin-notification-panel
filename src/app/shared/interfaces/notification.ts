export interface Notification {
  id: string;
  icon: string;
  text: string;
  metaData: string;
  link?: string;
}

export type AddNotification = Omit<Notification, 'id'>;
export type EditNotification = {
  id: Notification['id'];
  data: AddNotification;
};
export type DeleteNotification = Notification['id'];
