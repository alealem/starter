// @flow
'use strict';

import React from 'react';
import type { Node } from 'react';
import * as Formix from '@ekz/formix';
import HighlightedText from '@root/components/form/HighlightedText';
import type { Bank } from '@root/domain/banks';
import { FormixSingleSelectAsync } from '@root/components/form/Select';
import useBanksData from '../banks/useBanksData';

type Props = {
    label: Node,
    required?: boolean,
    field: Formix.FieldRef<?Bank>
};

export default function BankSelector(props: Props) {
    const banksData = useBanksData();

    const loadBanks = ({ inputValue }) => banksData.searchBanks(inputValue);

    const renderOption = (bank, { inputValue }) => {
        return (
            <div>
                <span>
                    <HighlightedText text={bank.blz} highlight={inputValue} /> [
                    <HighlightedText text={bank.bankName} highlight={inputValue} />]
                </span>
            </div>
        );
    };

    return (
        <FormixSingleSelectAsync
            field={props.field}
            resetWhenUnmounted={true}
            label={props.label}
            formatOptionLabel={renderOption}
            getOptionValue={getValue}
            required={props.required}
            loadOptions={loadBanks}
            filterOption={null}
        />
    );
}

const getValue = bank => bank.blz;
