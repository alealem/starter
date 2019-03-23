// @flow

import * as React from 'react';
import * as Formix from '@ekz/formix';
import cx from 'classnames';

type CommonProps = $Exact<{
    label: React.Node,
    inlined: boolean,
    options: ButtonProps[]
}>;

type ButtonProps = {
    value: string,
    label: string
};

type Props = $Exact<{
    ...CommonProps,
    disabled: boolean,
    value: string,
    onChange: string => mixed,
    onFocus?: () => mixed,
    onBlur?: () => mixed
}>;

export class RadioButtons extends React.PureComponent<Props> {
    static defaultProps = {
        disabled: false,
        inlined: false
    };

    _handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
        this.props.onChange(e.currentTarget.value);
    };

    _renderButton = (option: ButtonProps) => (
        <label
            key={option.value}
            className={cx('radio-button', {
                inlined: this.props.inlined,
                disabled: this.props.disabled
            })}
            aria-labelledby={option.label}
            title={option.label}>
            <input
                className="radio-button-input"
                type="radio"
                value={option.value}
                disabled={this.props.disabled}
                checked={option.value === this.props.value}
                onChange={this._handleChange}
            />
            <div
                className={cx('radio-button-circle', {
                    checked: option.value === this.props.value
                })}>
                <div className="radio-button-off" />
                <div className="radio-button-on" />
            </div>
            <span className="radio-button-label">{option.label}</span>
        </label>
    );

    render() {
        return (
            <fieldset className="speedcontrol-radio-buttons">
                <legend>{this.props.label}</legend>
                {this.props.options.map(this._renderButton)}
            </fieldset>
        );
    }
}

type FormixProps = $Exact<{
    ...CommonProps,
    field: Formix.FieldRef<string>,
    resetWhenUnmounted?: boolean
}>;

export function FormixRadioButtons(props: FormixProps) {
    let { field, resetWhenUnmounted, ...rest } = props;
    return (
        <Formix.Field field={field} resetWhenUnmounted={resetWhenUnmounted}>
            {field => (
                <RadioButtons
                    {...rest}
                    value={field.value}
                    disabled={field.disabled}
                    onChange={field.setValue}
                    onFocus={field.onFocus}
                    onBlur={field.onBlur}
                />
            )}
        </Formix.Field>
    );
}

FormixRadioButtons.defaultProps = {
    inlined: false
};
