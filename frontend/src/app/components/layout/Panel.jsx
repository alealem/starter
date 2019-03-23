// @flow

import * as React from 'react';
import cx from 'classnames';

type Props = {
    className?: string,
    type: 'warning' | 'alert',
    children: React.Node
};

function Panel(props: Props) {
    return <div className={cx(`speedcontrol-panel-${props.type}`, props.className)}>{props.children}</div>;
}

export default Panel;
