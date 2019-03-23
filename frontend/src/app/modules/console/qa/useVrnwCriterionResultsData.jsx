// @flow

import Bluebird from 'bluebird';
import * as React from 'react';
import type { VrnwCriterionResult, VrnwResultsRequest } from '@root/domain/vrnwCriterionResults';
import { useApiClient } from '@root/api-client';

type VrnwCriteriumResultsData = {|
    listVrnwCriteriaResults(
        bankId: number,
        specificationId: number
    ): Bluebird<VrnwCriterionResult[]>,
    save(
        vrnwResultsRequest: VrnwResultsRequest,
        specificationId: number
    ): Promise<VrnwCriterionResult>
|};

export default function useVrnwCriteriumResultsData(): VrnwCriteriumResultsData {
    const apiClient = useApiClient();

    return React.useMemo(
        () => ({
            listVrnwCriteriaResults(bankId, specificationId) {
                return apiClient
                    .doGet(`/vrnw-results/banks/${bankId}/specification-pages/${specificationId}`)
                    .then(response => response.data);
            },
            save(vrnwResultsRequest, specificationId) {
                return apiClient
                    .doPost(`/vrnw-results/specification-pages/${specificationId}`, {
                        body: vrnwResultsRequest
                    })
                    .then(response => response.data);
            }
        }),
        [apiClient]
    );
}
