// @flow
'use strict';

import * as React from 'react';
import cx from 'classnames';

type Props = {
    header?: React.Node,
    footer?: React.Node,
    theme: 'light' | 'branded',
    noContentPadding: boolean,
    noOverflowHidden: boolean,
    fullHeight: boolean,
    children: React.Node
};

function Card({
    header,
    footer,
    theme,
    noContentPadding,
    noOverflowHidden,
    fullHeight,
    children
}: Props) {
    return (
        <div
            className={cx('speedcontrol-card', `${theme}-theme`, {
                'full-height': fullHeight,
                'no-overflow-hidden': noOverflowHidden
            })}>
            {header != null && <div className="card-header">{header}</div>}
            <div
                className={cx('card-content', {
                    'with-padding': !noContentPadding
                })}>
                {children}
            </div>
            {footer != null && <div className="card-footer">{footer}</div>}
        </div>
    );
}

Card.defaultProps = {
    theme: 'light',
    noContentPadding: false,
    noOverflowHidden: false,
    fullHeight: false
};

export default Card;
