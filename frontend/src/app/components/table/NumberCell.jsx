// @flow

import React from 'react';

type Props = $Exact<{
    value: ?number,
    decimals: number,
    decimalsSeparator: string,
    thousandsSeparator: string,
    prefix: string,
    postfix: string
}>;

function NumberCell({
    value,
    decimals,
    decimalsSeparator,
    thousandsSeparator,
    prefix,
    postfix
}: Props) {
    if (value == null) {
        return null;
    }

    let [integral, fractional] = value.toFixed(decimals).split('.');
    integral = integral.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
    let formattedNumber =
        fractional == null ? integral : `${integral}${decimalsSeparator}${fractional}`;

    return (
        <div className="cells number-cell">
            {prefix}
            {formattedNumber}
            {postfix}
        </div>
    );
}

NumberCell.defaultProps = {
    decimals: 0,
    decimalsSeparator: '.',
    thousandsSeparator: ',',
    prefix: '',
    postfix: ''
};

export default NumberCell;
