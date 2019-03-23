// @flow

import * as React from 'react';
import cx from 'classnames';

type Props = $Exact<{
    textAlign: 'left' | 'center' | 'right',
    small: boolean,
    marginBottom: boolean,
    children: React.Node
}>;

function Heading(props: Props) {
    return (
        <h1
            className={cx('speedcontrol-typography-heading', {
                small: props.small
            })}
            style={{
                marginBottom: props.marginBottom ? 10 : undefined,
                textAlign: props.textAlign
            }}>
            {props.children}
        </h1>
    );
}

Heading.defaultProps = {
    textAlign: 'left',
    small: false,
    marginBottom: true
};

export default Heading;
