// @flow

export type NotificationApi = $Exact<{
    notify: NotificationHandler
}>;

export type NotificationData = $Exact<{
    id: number,
    message: string,
    type: NotificationType,
    timeout: number
}>;

export type NotificationType = 'default' | 'success' | 'warning' | 'alert';

export type NotificationOptions = $Exact<{
    type?: NotificationType,
    timeout?: number
}>;

export type NotificationHandler = (message: string, options?: NotificationOptions) => void;
