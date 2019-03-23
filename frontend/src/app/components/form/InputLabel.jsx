// @flow

import * as React from 'react';
import { isNodeDefined } from '../utils';

type Props = $Exact<{
    label?: React.Node,
    required: boolean,
    error?: string,
    active: boolean,
    touched: boolean
}>;

function InputLabel(props: Props) {
    let displayError = isNodeDefined(props.error) && props.touched && !props.active;

    return (
        <span className="speedcontrol-input-label">
            {props.label}
            {props.required && <span className="speedcontrol-input-is-required" />}
            {displayError && (
                <span className="speedcontrol-input-invalid-wrapper">
                    <i className="speedcontrol-input-invalid-icon fas fa-exclamation-circle" />
                    <span className="speedcontrol-input-invalid-message">{props.error}</span>
                </span>
            )}
        </span>
    );
}

InputLabel.defaultProps = {
    required: false,
    active: false,
    touched: false
};

export default InputLabel;
