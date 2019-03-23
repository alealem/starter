// @flow

import * as React from 'react';
import * as Formix from '@ekz/formix';
import cx from 'classnames';
import Cleave from 'cleave.js/react';
import InputWrapper from './InputWrapper';

type CommonProps = $Exact<{
    label: React.Node,
    required: boolean,
    type: 'text' | 'password',
    options?: FormattingOptions,
    placeholder?: string
}>;

type FormattingOptions = $Exact<{
    // Phone
    phone?: boolean,
    phoneRegionCode?: string,
    // Date
    date?: boolean,
    datePattern?: Array<string>,
    // Numeral
    numeral?: boolean,
    numeralThousandsGroupStyle?: 'thousand' | 'none',
    numeralIntegerScale?: number,
    numeralDecimalScale?: number,
    numeralDecimalMark?: string,
    numeralPositiveOnly?: boolean,
    stripLeadingZeroes?: boolean,
    // General
    blocks?: Array<number>,
    delimiter?: string,
    delimiters?: Array<string>,
    delimiterlazyshow?: boolean,
    prefix?: string,
    noImmediatePrefix?: boolean,
    rawValueTrimPrefix?: boolean,
    numericOnly?: boolean,
    uppercase?: boolean,
    lowercase?: boolean
}>;

type Props = $Exact<{
    ...CommonProps,
    error?: string,
    active: boolean,
    touched: boolean,
    disabled: boolean,
    value: string,
    onChange: string => mixed,
    onFocus?: () => mixed,
    onBlur?: () => mixed
}>;

export class Input extends React.PureComponent<Props> {
    static defaultProps = {
        required: false,
        active: false,
        touched: false,
        disabled: false,
        type: 'text'
    };

    // flowlint-next-line unclear-type:off
    _handleChange = (e: SyntheticInputEvent<any>) => {
        let value =
            e.currentTarget.rawValue != null ? e.currentTarget.rawValue : e.currentTarget.value;
        this.props.onChange(value);
    };

    get inputProps() {
        return {
            className: cx('speedcontrol-input-field', {
                numeric:
                    this.props.options != null &&
                    (this.props.options.numeral === true || this.props.options.numericOnly === true)
            }),
            type: this.props.type,
            required: this.props.required,
            disabled: this.props.disabled,
            placeholder: this.props.placeholder,
            value: this.props.value,
            onChange: this._handleChange,
            onFocus: this.props.onFocus,
            onBlur: this.props.onBlur
        };
    }

    render() {
        return (
            <InputWrapper
                label={this.props.label}
                required={this.props.required}
                error={this.props.error}
                active={this.props.active}
                touched={this.props.touched}>
                {this.props.options != null ? (
                    <Cleave {...this.inputProps} options={this.props.options} />
                ) : (
                    <input {...this.inputProps} />
                )}
            </InputWrapper>
        );
    }
}

type FormixProps = $Exact<{
    ...CommonProps,
    field: Formix.FieldRef<string>,
    validator?: Formix.FieldValidator<string>,
    resetWhenUnmounted?: boolean
}>;

export function FormixInput(props: FormixProps) {
    let { field, validator, resetWhenUnmounted, ...rest } = props;
    return (
        <Formix.Field field={field} validator={validator} resetWhenUnmounted={resetWhenUnmounted}>
            {field => (
                <Input
                    {...rest}
                    value={field.value}
                    disabled={field.disabled}
                    error={field.error.getOrUndefined()}
                    active={field.active}
                    touched={field.touched}
                    onChange={field.setValue}
                    onFocus={field.onFocus}
                    onBlur={field.onBlur}
                />
            )}
        </Formix.Field>
    );
}

FormixInput.defaultProps = {
    required: false,
    type: 'text'
};
