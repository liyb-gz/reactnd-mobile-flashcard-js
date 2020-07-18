import { PermissionStatus } from 'expo-permissions';
export const notification = {
    content: {
        title: 'Daily Reminder',
        body: 'Remember to work on your flashcards!',
        sound: true,
        autoDismiss: false,
    },
    trigger: {
        hour: 20,
        minute: 0,
        repeats: true,
    },
};
export const notificationFlashMessages = {
    on: {
        message: 'Notification is turned on!',
        description: 'You will be notified everyday at 8:00 P.M.',
        type: 'success',
    },
    denied: {
        message: 'Notification permission denied ☹️',
        description: 'We need your permission to notify you.',
        type: 'danger',
    },
    off: {
        message: 'Notification is turned off.',
        description: 'You will no long receive notifications.',
        type: 'warning',
    },
};
export const getNotificationIconString = (status, hasScheduledNotifications) => {
    switch (status) {
        case PermissionStatus.DENIED:
            return 'notifications-none';
        case PermissionStatus.GRANTED:
            if (!hasScheduledNotifications) {
                return 'notifications-off';
            }
            else {
                return 'notifications-active';
            }
        default:
            // case PermissionStatus.UNDETERMINED:
            return 'notifications';
    }
};
