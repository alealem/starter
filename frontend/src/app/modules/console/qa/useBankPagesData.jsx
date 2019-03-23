// @flow

import Bluebird from 'bluebird';
import * as React from 'react';
import { useApiClient } from '@root/api-client';
import type { BankPage } from '@root/domain/screenshots';
type ScreenshotData = {|
    fetchBankPageLinks(bankId: number, specificationId: number): Bluebird<string[]>,
    scanBankPage(bankId: number, pageUrl: string): Bluebird<BankPage>
|};

export default function useBankPagesData(): ScreenshotData {
    const apiClient = useApiClient();

    return React.useMemo(
        () => ({
            fetchBankPageLinks(bankId: number, specificationId: number) {
                return apiClient
                    .doGet(`/banks/${bankId}/specification-pages/${specificationId}/bank-page-urls`)
                    .then(response => response.data);
            },
            scanBankPage(bankId: number, pageUrl: string) {
                return apiClient
                    .doPost(`/banks/${bankId}/bank-pages/bank-page-urls`, { body: { pageUrl } })
                    .then(response => response.data);
            }
        }),
        [apiClient]
    );
}
