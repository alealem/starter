// @flow

import Bluebird from 'bluebird';
import * as React from 'react';
import type { SpecificationPage } from '@root/domain/specificationPage';
import { useApiClient } from '@root/api-client';

type SpecificationPagesData = {|
    listSpecificationPages(): Bluebird<SpecificationPage[]>,
    searchSpecificationPages(search: string): Bluebird<SpecificationPage[]>
|};

export default function useSpecificationPagesData(): SpecificationPagesData {
    const apiClient = useApiClient();

    return React.useMemo(
        () => ({
            listSpecificationPages() {
                return apiClient.doGet('/specification-pages').then(response => response.data);
            },
            searchSpecificationPages(search: string) {
                return apiClient
                    .doGet('/specification-pages', { query: { search } })
                    .then(response => response.data);
            }
        }),
        [apiClient]
    );
}
