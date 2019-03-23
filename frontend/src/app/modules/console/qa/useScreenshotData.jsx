// @flow

import Bluebird from 'bluebird';
import * as React from 'react';
import type { BankPage } from '@root/domain/screenshots';
import { useApiClient } from '@root/api-client';

type ScreenshotData = {|
    fetchBankPage(bankId: number, url: string): Bluebird<BankPage>,
    listScreenshots(bankId: number, screenshotLinks: string[]): Bluebird<BankPage[]>,
    searchScreenshotsByUrl(
        bankId: number,
        specificationPageId: number,
        searchText: string
    ): Bluebird<BankPage[]>
|};

export default function useScreenshotData(): ScreenshotData {
    const apiClient = useApiClient();

    return React.useMemo(
        () => ({
            fetchBankPage(bankId, url) {
                return apiClient
                    .doGet(`/banks/${bankId}/bank-pages/${encodeURIComponent(url)}`)
                    .then(response => response.data);
            },
            listScreenshots(bankId: number, pageUrls: string[]) {
                return apiClient
                    .doPost(`/banks/${bankId}/bank-pages`, {
                        body: pageUrls
                    })
                    .then(response => response.data);
            },
            searchScreenshotsByUrl(bankId: number, specificationId: number, url: string) {
                return apiClient
                    .doGet(
                        `/screenshots/banks/${bankId}/specification-pages/${specificationId}/screenshots-by-url`,
                        {
                            query: {
                                'search-url': url
                            }
                        }
                    )
                    .then(response => response.data);
            }
        }),
        [apiClient]
    );
}
