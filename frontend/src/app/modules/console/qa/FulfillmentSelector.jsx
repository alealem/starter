// @flow

import * as React from 'react';
import type { FulfillmentOption } from '@root/domain/vrnwIdCriteria';
import { toFulfillmentOption } from '@root/domain/vrnwIdCriteria';
type Props = {|
    value: ?FulfillmentOption,
    onChange: (?FulfillmentOption) => mixed
|};

export default function FulfillmentSelector(props: Props) {
    const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
        props.onChange(
            e.currentTarget.value === props.value
                ? null
                : toFulfillmentOption(e.currentTarget.value)
        );
    };

    return (
        <div className="speedcontrol-fulfillment-selector">
            <label className="fulfillment completely-fulfilled">
                <input
                    type="radio"
                    value="COMPLETELY_FULFILLED"
                    checked={props.value === 'COMPLETELY_FULFILLED'}
                    readOnly
                    onClick={handleChange}
                />
                <span>vollständig erfüllt</span>
            </label>
            <label className="fulfillment partially-fulfilled">
                <input
                    type="radio"
                    value="PARTIALLY_FULFILLED"
                    checked={props.value === 'PARTIALLY_FULFILLED'}
                    readOnly
                    onClick={handleChange}
                />
                <span>teilweise erfüllt</span>
            </label>
            <label className="fulfillment not-fulfilled">
                <input
                    type="radio"
                    value="NOT_FULFILLED"
                    checked={props.value === 'NOT_FULFILLED'}
                    readOnly
                    onClick={handleChange}
                />
                <span>nicht erfüllt</span>
            </label>
        </div>
    );
}
