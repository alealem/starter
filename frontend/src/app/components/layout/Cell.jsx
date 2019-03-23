// @flow
'use strict';

import * as React from 'react';
import cx from 'classnames';

type Props = {
    className?: string,
    small?: number,
    medium?: number,
    large?: number,
    auto: boolean,
    shrink: boolean,
    block: boolean,
    children: React.Node
};

export default function Cell(props: Props) {
    return (
        <div
            className={cx('cell', props.className, {
                auto: props.auto,
                shrink: props.shrink,
                'cell-block': props.block,
                [`small-${String(props.small)}`]: props.small != null,
                [`medium-${String(props.medium)}`]: props.medium != null,
                [`large-${String(props.large)}`]: props.large != null
            })}>
            {props.children}
        </div>
    );
}

Cell.defaultProps = {
    auto: false,
    shrink: false,
    block: false
};
