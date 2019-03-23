// @flow

import Bluebird from 'bluebird';
import * as React from 'react';
import type { Bank } from '@root/domain/banks';
import { useApiClient } from '@root/api-client';

type BanksData = {|
    listBanks(): Bluebird<Bank[]>,
    searchBanks(search: string): Bluebird<Bank[]>
|};

export default function useBanksData(): BanksData {
    const apiClient = useApiClient();

    return React.useMemo(
        () => ({
            listBanks() {
                return apiClient.doGet('/banks').then(response => response.data);
            },
            searchBanks(search: string) {
                return apiClient
                    .doGet('/banks', { query: { search } })
                    .then(response => response.data);
            }
        }),
        [apiClient]
    );
}
