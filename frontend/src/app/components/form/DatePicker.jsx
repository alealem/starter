// @flow

import * as React from 'react';
import * as Formix from '@ekz/formix';
import { DateTime } from 'luxon';
import moment from 'moment';
import type Moment from 'moment';
import ReactDatePicker from 'react-datepicker';
import InputWrapper from './InputWrapper';
import { toDateTime } from '@root/data/time';

type CommonProps = $Exact<{
    label: React.Node,
    required: boolean,
    clearable: boolean,
    placeholder?: string,
    dateFormat: string,
    selectsStart?: boolean,
    selectsEnd?: boolean,
    minDate?: ?DateTime,
    maxDate?: ?DateTime,
    startDate?: ?DateTime,
    endDate?: ?DateTime
}>;

type Props = $Exact<{
    ...CommonProps,
    error?: string,
    active: boolean,
    touched: boolean,
    disabled: boolean,
    date: ?DateTime,
    onChange: (?DateTime) => mixed,
    onFocus?: () => mixed,
    onBlur?: () => mixed
}>;

export class DatePicker extends React.PureComponent<Props> {
    static defaultProps = {
        required: false,
        active: false,
        touched: false,
        disabled: false,
        dateFormat: 'YYYY/MM/DD',
        clearable: false
    };

    _handleChange = (date: ?Moment) => {
        this.props.onChange(date == null ? null : toDateTime(date.format('YYYY-MM-DD')));
    };

    render() {
        return (
            <div className="speedcontrol-date-picker">
                <InputWrapper
                    label={this.props.label}
                    required={this.props.required}
                    error={this.props.error}
                    active={this.props.active}
                    touched={this.props.touched}>
                    <ReactDatePicker
                        className="speedcontrol-date-picker-field"
                        placeholderText={this.props.placeholder}
                        selected={toMoment(this.props.date)}
                        onChange={this._handleChange}
                        onFocus={this.props.onFocus}
                        onBlur={this.props.onBlur}
                        disabled={this.props.disabled}
                        dateFormat={this.props.dateFormat}
                        isClearable={this.props.clearable}
                        selectsStart={this.props.selectsStart}
                        selectsEnd={this.props.selectsEnd}
                        minDate={toMoment(this.props.minDate)}
                        maxDate={toMoment(this.props.maxDate)}
                        startDate={toMoment(this.props.startDate)}
                        endDate={toMoment(this.props.endDate)}
                    />
                </InputWrapper>
            </div>
        );
    }
}

function toMoment(date: ?DateTime): ?moment {
    return date == null ? null : moment.utc(date.toISO());
}

type FormixProps = $Exact<{
    ...CommonProps,
    field: Formix.FieldRef<?DateTime>,
    validator?: Formix.FieldValidator<?DateTime>,
    resetWhenUnmounted?: boolean,
    clearable: boolean
}>;

export function FormixDatePicker(props: FormixProps) {
    let { field, validator, resetWhenUnmounted, ...rest } = props;
    return (
        <Formix.Field field={field} validator={validator} resetWhenUnmounted={resetWhenUnmounted}>
            {field => (
                <DatePicker
                    {...rest}
                    date={field.value}
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

FormixDatePicker.defaultProps = {
    required: false,
    dateFormat: 'YYYY/MM/DD',
    clearable: false
};
