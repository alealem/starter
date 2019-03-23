// @flow

import * as React from 'react';
import * as Formix from '@ekz/formix';
import { Input } from './Input';

type CommonProps = $Exact<{
    label: React.Node,
    required: boolean,
    placeholder?: string,
    ...FormattingOptions
}>;

type FormattingOptions = $Exact<{
    thousandsGroupStyle: 'thousand' | 'none',
    integerScale?: number,
    decimalScale?: number,
    decimalMark?: string,
    positiveOnly: boolean,
    stripLeadingZeroes: boolean
}>;

type Props = $Exact<{
    ...CommonProps,
    error?: string,
    active: boolean,
    touched: boolean,
    disabled: boolean,
    value: ?number,
    onChange: (?number) => mixed,
    onFocus?: () => mixed,
    onBlur?: () => mixed
}>;

export class NumberInput extends React.PureComponent<Props> {
    static defaultProps = {
        required: false,
        active: false,
        touched: false,
        disabled: false,
        thousandsGroupStyle: 'thousand',
        positiveOnly: false,
        stripLeadingZeroes: true
    };

    _handleChange = onChange => rawValue => {
        let trimmed = rawValue.trim();
        let number = Number(trimmed);

        if (trimmed.length === 0 || isNaN(number)) {
            onChange(null);
        } else {
            onChange(number);
        }
    };

    render() {
        let {
            value,
            onChange,
            thousandsGroupStyle,
            integerScale,
            decimalScale,
            decimalMark,
            positiveOnly,
            stripLeadingZeroes,
            ...inputProps
        } = this.props;

        let options = {
            numeral: true,
            numeralThousandsGroupStyle: thousandsGroupStyle,
            numeralIntegerScale: integerScale,
            numeralDecimalScale: decimalScale,
            numeralDecimalMark: decimalMark,
            numeralPositiveOnly: positiveOnly,
            stripLeadingZeroes: stripLeadingZeroes
        };

        return (
            <Input
                value={value != null ? value.toString() : ''}
                onChange={this._handleChange(onChange)}
                {...inputProps}
                options={options}
            />
        );
    }
}

type FormixProps = $Exact<{
    ...CommonProps,
    field: Formix.FieldRef<?number>,
    validator?: Formix.FieldValidator<?number>,
    resetWhenUnmounted?: boolean
}>;

export function FormixNumberInput(props: FormixProps) {
    let { field, validator, resetWhenUnmounted, ...rest } = props;
    return (
        <Formix.Field field={field} validator={validator} resetWhenUnmounted={resetWhenUnmounted}>
            {field => (
                <NumberInput
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

FormixNumberInput.defaultProps = {
    required: false,
    thousandsGroupStyle: 'thousand',
    positiveOnly: false,
    stripLeadingZeroes: true
};
