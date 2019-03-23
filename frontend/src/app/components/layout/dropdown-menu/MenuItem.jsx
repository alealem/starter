// @flow

import * as React from 'react';
import cx from 'classnames';

type ItemProps = $Exact<{
    label: React.Node,
    icon?: string,
    disabled: boolean,
    onClick: () => mixed
}>;

function stopPropagation(e: SyntheticEvent<>): void {
    e.stopPropagation();
}

function MenuItem(props: ItemProps) {
    return (
        <div
            className={cx('speedcontrol-dropdown-menu-item', { disabled: props.disabled })}
            onClick={props.disabled ? stopPropagation : props.onClick}>
            {props.icon != null && <i className={props.icon} />}
            <span>{props.label}</span>
        </div>
    );
}

MenuItem.defaultProps = {
    disabled: false
};

export default MenuItem;
