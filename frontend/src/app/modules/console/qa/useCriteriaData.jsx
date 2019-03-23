// @flow

import Bluebird from 'bluebird';
import * as React from 'react';
import type { VrnwIdCriterion } from '@root/domain/vrnwIdCriteria';
import { useApiClient } from '@root/api-client';

type VrnwIdCriteriaData = {|
    listVrnwIdCriteria(specificationId: number): Bluebird<VrnwIdCriterion>
|};

export default function useCriteriaData(): VrnwIdCriteriaData {
    const apiClient = useApiClient();

    return React.useMemo(
        () => ({
            listVrnwIdCriteria(specificationId: number) {
                return apiClient
                    .doGet(`/criteria/specification-pages/${specificationId}`)
                    .then(response => response.data);
            }
        }),
        [apiClient]
    );
}
