// @flow

import { Empty, observePromise } from '@ekz/async-data';
import type { AsyncData } from '@ekz/async-data';
import * as React from 'react';
import useBankPagesData from './useBankPagesData';

type BankPageUrlsApi = {|
    bankPageUrls: AsyncData<string[]>,
    addTemporaryUrl(url: string): void
|};

export default function useBankPageUrls(
    bankId: ?number,
    specificationId: ?number
): BankPageUrlsApi {
    const bankPagesData = useBankPagesData();

    const [bankPageUrls, setBankPageUrls] = React.useState(Empty());

    React.useEffect(() => {
        if (bankId != null && specificationId != null) {
            return observePromise(
                bankPagesData.fetchBankPageLinks(bankId, specificationId),
                setBankPageUrls
            );
        } else {
            setBankPageUrls(Empty());
        }
    }, [bankId, specificationId]);

    const addTemporaryUrl = React.useCallback(url => {
        setBankPageUrls(asyncUrls => asyncUrls.map(urls => [...urls, url]));
    }, []);

    return React.useMemo(
        () => ({
            bankPageUrls,
            addTemporaryUrl
        }),
        [bankPageUrls, addTemporaryUrl]
    );
}
