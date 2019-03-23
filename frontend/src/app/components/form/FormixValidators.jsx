// @flow

import memoize from 'memoize-one';
import * as React from 'react';
import * as Formix from '@ekz/formix';

export type Validators = $ReadOnly<{|
    notEmpty(message?: string): Formix.Validator<string | Array<mixed>>,
    notNull<A>(message?: string): Formix.Validator<?A | void>,
    lessThan(value: number, message?: string): Formix.Validator<?number>,
    greaterThan(value: number, message?: string): Formix.Validator<?number>,
    min(value: number, message?: string): Formix.Validator<?number>,
    max(value: number, message?: string): Formix.Validator<?number>,
    minLength(min: number, message?: string): Formix.Validator<string>,
    maxLength(min: number, message?: string): Formix.Validator<string>,
    email(message?: string): Formix.Validator<string>,
    pattern(pattern: RegExp, explanation: string): Formix.Validator<string>,
    isURL(): Formix.Validator<string>,
    passwordMatches(comparisonField: Formix.FieldRef<string>): Formix.Validator<string>
|}>;

export function useFormixValidators(): Validators {
    function getMessage(message?: string, defaultMessage: string): string {
        return message != null ? message : defaultMessage;
    }

    return React.useMemo(
        () =>
            Object.freeze({
                notEmpty: memoize(message => value => {
                    let sanitizedValue = typeof value === 'string' ? value.trim() : value;
                    return sanitizedValue.length > 0
                        ? null
                        : getMessage(message, 'Field cannot be empty');
                }),

                notNull: memoize(message => value => {
                    return value != null ? null : getMessage(message, 'Field cannot be empty');
                }),

                lessThan: memoize((lt, message) => value => {
                    return value != null && value < lt
                        ? null
                        : getMessage(message, `Field must be less than ${lt}`);
                }),

                max: memoize((max, message) => value => {
                    return value != null && value <= max
                        ? null
                        : getMessage(message, `Field must be at most ${max}`);
                }),

                greaterThan: memoize((gt, message) => value => {
                    return value != null && value > gt
                        ? null
                        : getMessage(message, `Field must be greater than ${gt}`);
                }),

                min: memoize((min, message) => value => {
                    return value != null && value >= min
                        ? null
                        : getMessage(message, `Field must be at least ${min}`);
                }),

                minLength: memoize((min, message) => value => {
                    return typeof value === 'string' && value.trim().length >= min
                        ? null
                        : getMessage(message, `Field must contain at least ${min} characters`);
                }),

                maxLength: memoize((max, message) => value => {
                    return typeof value === 'string' && value.trim().length <= max
                        ? null
                        : getMessage(message, `Field must contain at most ${max} characters`);
                }),

                email: memoize(message => value => {
                    return /[^\s]+@[^\s]+/.exec(value) != null
                        ? null
                        : getMessage(message, 'Please enter a valid email address');
                }),

                pattern: memoize((pattern, explanation) => value => {
                    return typeof value === 'string' && pattern.exec(value) != null
                        ? null
                        : explanation;
                }),

                isURL: memoize(() => value => {
                    if (value.trim().length === 0) {
                        return null;
                    }

                    try {
                        let maybeUrl = new URL(value);
                        return maybeUrl.protocol === 'http:' || maybeUrl.protocol === 'https:'
                            ? null
                            : 'Provide HTTP or HTTPS URLs';
                    } catch (e) {
                        return 'Invalid URL';
                    }
                }),

                passwordMatches: memoize(
                    (comparisonField, message?: string) => (value, context) => {
                        return value === context.getFieldState(comparisonField).value
                            ? null
                            : getMessage(message, 'Passwords do not match');
                    }
                )
            }),
        []
    );
}
