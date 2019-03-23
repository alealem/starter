// @flow

import * as React from 'react';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';
import * as Icons from './icons';
import * as Routes from './routes';

type Props = {
    isOpen: boolean,
    closeSidebar: () => mixed
};

function ConsoleSidebar(props: Props) {
    return (
        <div className={cx('speedcontrol-sidebar', { 'is-open': props.isOpen })}>
            <div className="speedcontrol-sidebar-header">VR-Networld</div>
            <div className="speedcontrol-sidebar-group-header">Allgemein</div>
            <div className="speedcontrol-sidebar-navigation">
                <NavItem
                    label="Übersicht"
                    icon={Icons.Banks}
                    path={Routes.BanksOverview.resolve()}
                    onClick={props.closeSidebar}
                />
            </div>
            <div className="speedcontrol-sidebar-group-header">Qualitätssicherung</div>
            <div className="speedcontrol-sidebar-navigation">
                <NavItem
                    label="QA"
                    icon={Icons.Qa}
                    path={Routes.Qualitätssicherung.resolve()}
                    onClick={props.closeSidebar}
                />
            </div>
            <div className="speedcontrol-sidebar-group-header">Admin</div>
            <div className="speedcontrol-sidebar-navigation">
                <NavItem
                    label="Importieren"
                    icon={Icons.Imports}
                    path={Routes.DataImports.resolve()}
                    onClick={props.closeSidebar}
                />
            </div>
        </div>
    );
}

type NavItemProps = {
    label: string,
    icon: string,
    path: string,
    onClick?: () => mixed
};

function NavItem({ label, icon, path, onClick }: NavItemProps) {
    return (
        <NavLink className="navigation-item" to={path} onClick={onClick}>
            <i className={cx('navigation-item-icon', icon)} />
            <span className="navigation-item-title">{label}</span>
        </NavLink>
    );
}

export default ConsoleSidebar;
