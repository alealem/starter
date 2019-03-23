// @flow

import * as React from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { ApiClientProvider } from '@root/api-client';
import { ApiBaseUrl } from '@root/core/settings';
import { NotificationsProvider } from '@root/components/notifications';
import { DialogsProvider } from '@root/components/dialogs';
import { AuthenticationProvider } from '@root/core/authentication';
import { AnonymousRoute, PrivateRoute } from '@root/core/routing';
import { ConsoleRoot } from '@root/modules/console';
import Login from '@root/modules/Login';
import ExpiredSessionModal from './ExpiredSessionModal';

export default function Root() {
    return (
        <NotificationsProvider>
            <AuthenticationProvider
                defaultAuthenticatedRedirect="/console"
                defaultUnauthenticatedRedirect="/accounts/login">
                <ApiClientProvider baseUrl={ApiBaseUrl}>
                    <DialogsProvider>
                        <Router>
                            <React.Fragment>
                                <Switch>
                                    <AnonymousRoute path="/accounts/login" component={Login} />
                                    <PrivateRoute path="/console" component={ConsoleRoot} />
                                    <Redirect to="/console" />
                                </Switch>
                                <ExpiredSessionModal />
                            </React.Fragment>
                        </Router>
                    </DialogsProvider>
                </ApiClientProvider>
            </AuthenticationProvider>
        </NotificationsProvider>
    );
}
