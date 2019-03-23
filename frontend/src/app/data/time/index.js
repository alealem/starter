// @flow

import Moment from 'moment';
import { DateTime } from 'luxon';
import { Option } from '@ekz/option';

export type GenericDateTime = string | Date | DateTime | Moment;

export function toDateTime(value: GenericDateTime): DateTime {
    if (value instanceof DateTime) {
        return value.toUTC();
    }

    if (Moment.isMoment(value) || value instanceof Date) {
        // $FlowFixMe
        return fromISO(value.toISOString());
    }

    try {
        // $FlowFixMe
        return fromISO(new Date(value).toISOString());
    } catch (e) {
        return DateTime.invalid(e.message);
    }
}

export function tryDateTime(value?: GenericDateTime): Option<DateTime> {
    return Option.of(value)
        .map(toDateTime)
        .mapNullable(dateTime => (dateTime.isValid ? dateTime : null));
}

function fromISO(value: string): DateTime {
    return DateTime.fromISO(value, { zone: 'utc' });
}
