// @flow

import * as React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { useAuthentication } from '@root/core/authentication';
import ConsoleSidebar from './ConsoleSidebar';
import ConsoleHeader from './ConsoleHeader';
import BanksOverview from './banks/BanksOverview';
import DataImportView from './imports/DataImportView';
import QAView from './qa/QAView';

function ConsoleRoot() {
    const authentication = useAuthentication();

    const [isSidebarOpen, setSidebarOpen] = React.useState(false);

    const _toggleSidebar = () => setSidebarOpen(isOpen => !isOpen);

    const _closeSidebar = () => setSidebarOpen(false);

    const _logout = () => authentication.setAccessToken(null);

    return (
        <div className="application-container">
            <div className="application-sidebar">
                <ConsoleSidebar isOpen={isSidebarOpen} closeSidebar={_closeSidebar} />
            </div>
            <div className="application-main">
                <ConsoleHeader toggleSidebar={_toggleSidebar} logout={_logout} />
                <div className="application-main-container">
                    <Switch>
                        <Route path="/console/banks" exact component={BanksOverview} />
                    </Switch>
                    <Switch>
                        <Route path="/console/qa" exact component={QAView} />
                    </Switch>
                    <Switch>
                        <Route path="/console/imports" exact component={DataImportView} />
                    </Switch>
                </div>
            </div>
        </div>
    );
}

export default withRouter(ConsoleRoot);
