// @flow

import * as React from 'react';
import cx from 'classnames';
import InputLabel from './InputLabel';
import { isNodeDefined } from '../utils';

type Props = $Exact<{
    label?: React.Node,
    required: boolean,
    error?: string,
    active: boolean,
    touched: boolean,
    children: React.Node
}>;

function InputWrapper(props: Props) {
    return (
        <div
            className={cx('speedcontrol-input', {
                'is-invalid': props.touched && isNodeDefined(props.error)
            })}>
            <label>
                <InputLabel
                    label={props.label}
                    required={props.required}
                    error={props.error}
                    active={props.active}
                    touched={props.touched}
                />
                {props.children}
            </label>
        </div>
    );
}

InputWrapper.defaultProps = {
    required: false,
    active: false,
    touched: false
};

export default InputWrapper;
