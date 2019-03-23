// @flow
'use strict';

import React from 'react';
import type { Node } from 'react';
import * as Formix from '@ekz/formix';
import HighlightedText from '@root/components/form/HighlightedText';
import type { SpecificationPage } from '@root/domain/specificationPage';
import { FormixSingleSelectAsync } from '@root/components/form/Select';
import useSpecificationPagesData from './useSpecificationPagesData';

type Props = {
    label: Node,
    required?: boolean,
    field: Formix.FieldRef<?SpecificationPage>
};

export default function SpecificationPageSelector(props: Props) {
    const specificationPagesData = useSpecificationPagesData();

    const loadSpecificationPages = ({ inputValue }) =>
        specificationPagesData.searchSpecificationPages(inputValue);

    const renderOption = (specificationPage, { inputValue }) => {
        return (
            <div>
                <span>
                    <HighlightedText text={specificationPage.name} highlight={inputValue} />
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
            loadOptions={loadSpecificationPages}
            filterOption={null}
        />
    );
}

const getValue = specificationPage => specificationPage.name;
