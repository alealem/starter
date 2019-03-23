// @flow
'use strict';

import * as React from 'react';

type ActionsProps = {
    left?: React.Element<any>[], // flowlint-line unclear-type:off
    right?: React.Element<any>[] // flowlint-line unclear-type:off
};

function ActionsContainer({ left, right }: ActionsProps) {
    return (
        <div className="speedcontrol-actions-container">
            <div className="left-wrapper">{React.Children.toArray(left)}</div>
            <div className="right-wrapper">{React.Children.toArray(right)}</div>
        </div>
    );
}

export default ActionsContainer;
