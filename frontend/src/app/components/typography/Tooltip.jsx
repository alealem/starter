// @flow

import * as React from 'react';
import { Tooltip as Tippy } from 'react-tippy';

type Props = $Exact<{
    children: React.Node,
    title: React.Node,
    position: 'left' | 'right' | 'top' | 'bottom',
    size: 'small' | 'regular' | 'big',
    distance: number,
    offset: number,
    arrow: boolean,
    disabled: boolean,
    arrowSize: 'small' | 'regular' | 'big',
    followCursor: boolean,
    onShown?: () => mixed,
    onHidden?: () => mixed
}>;

function Tooltip(props: Props) {
    let { children, title, ...tippyProps } = props;

    let isString = typeof title === 'string';
    let message = isString ? { title } : { html: title };

    return (
        <Tippy {...tippyProps} {...message} unmountHTMLWhenHide>
            {children}
        </Tippy>
    );
}

Tooltip.defaultProps = {
    position: 'top',
    size: 'small',
    distance: 10,
    offset: 0,
    disabled: false,
    arrow: false,
    arrowSize: 'regular',
    followCursor: false
};

export default Tooltip;
