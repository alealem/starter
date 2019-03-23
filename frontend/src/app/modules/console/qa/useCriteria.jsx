// @flow

import { Empty, observePromise } from '@ekz/async-data';
import type { AsyncData } from '@ekz/async-data';
import * as React from 'react';
import type { VrnwIdCriterion } from '@root/domain/vrnwIdCriteria';
import useCriteriaData from './useCriteriaData';

export default function useVrnwIdCriteria(specificationId: ?number): AsyncData<VrnwIdCriterion[]> {
    const criteriaData = useCriteriaData();

    const [vrnwIdCriteria, setVrnwIdCriteria] = React.useState(Empty());

    React.useEffect(() => {
        if (specificationId != null) {
            return observePromise(
                criteriaData.listVrnwIdCriteria(specificationId),
                setVrnwIdCriteria
            );
        }
    }, [specificationId]);

    return vrnwIdCriteria;
}
