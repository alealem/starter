// @flow

import * as React from 'react';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';
import { isNodeDefined } from '../utils';

type CommonProps = $Exact<{
    icon?: string,
    label?: string,
    theme: 'default' | 'primary' | 'secondary' | 'alert',
    raised: boolean,
    disabled: boolean,
    fullWidth: boolean
}>;

type Props =
    | $Exact<{
          ...CommonProps,
          type: 'submit',
          path?: empty,
          onClick?: empty
      }>
    | $Exact<{
          ...CommonProps,
          type?: 'button',
          path?: empty,
          onClick: (SyntheticEvent<HTMLButtonElement>) => mixed
      }>
    | $Exact<{
          ...CommonProps,
          type?: 'button',
          path: string,
          onClick?: empty
      }>
    | $Exact<{
          ...CommonProps,
          type: 'span',
          onClick: (SyntheticEvent<HTMLButtonElement>) => mixed
      }>;

function Button(props: Props) {
    let className = cx(props.theme, {
        'speedcontrol-flat-button': !props.raised,
        'speedcontrol-raised-button': props.raised,
        'full-width': props.fullWidth,
        disabled: props.disabled
    });

    let children = (
        <React.Fragment>
            {isNodeDefined(props.icon) && <i className={props.icon} />}
            {isNodeDefined(props.label) && <span>{props.label}</span>}
        </React.Fragment>
    );

    if (props.type === 'span') {
        return (
            <span
                className={className}
                disabled={props.disabled}
                onClick={props.disabled ? null : props.onClick}>
                {children}
            </span>
        );
    }

    return props.path != null ? (
        <NavLink className={className} to={props.path}>
            {children}
        </NavLink>
    ) : (
        <button
            className={className}
            type={props.type != null ? props.type : 'button'}
            disabled={props.disabled}
            onClick={props.onClick}>
            {children}
        </button>
    );
}

Button.defaultProps = {
    theme: 'default',
    raised: false,
    disabled: false,
    fullWidth: false
};

export default Button;
