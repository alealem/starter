// @flow

import * as React from 'react';
import { SignOut, Menu } from './icons';
import { Button } from '@root/components/form';

type Props = {
    toggleSidebar: () => void,
    logout: () => void
};

function ConsoleHeader({ toggleSidebar, logout }: Props) {
    return (
        <div className="speedcontrol-header">
            <div className="speedcontrol-header-left">
                <div className="speedcontrol-header-link" onClick={toggleSidebar}>
                    <i className={Menu} />
                </div>
            </div>
            <div className="speedcontrol-header-right">
                <div className="speedcontrol-header-link has-button">
                    <Button icon={SignOut} label="Logout" onClick={logout} />
                </div>
            </div>
        </div>
    );
}

export default ConsoleHeader;
