// @flow

import * as React from 'react';
import type { NotificationApi } from './types';

export const Context: React.Context<NotificationApi> = React.createContext({
    notify: () => {
        throw new Error(
            'Cannot call #notify on empty context. Did you forget <NotificationsProvider/>?'
        );
    }
});
