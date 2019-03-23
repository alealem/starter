// @flow

import * as React from 'react';
import { Context } from './Context';
import type { NotificationApi } from './types';

export default function useNotification(): NotificationApi {
    return React.useContext(Context);
}
