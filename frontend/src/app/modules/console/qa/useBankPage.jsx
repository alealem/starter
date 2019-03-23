// @flow

import { Empty, observePromise } from '@ekz/async-data';
import type { AsyncData } from '@ekz/async-data';
import * as React from 'react';
import type { BankPage } from '@root/domain/screenshots';
import useScreenshotData from './useScreenshotData';

export default function useBankPage(bankId: ?number, url: ?string): AsyncData<BankPage> {
    const bankPageData = useScreenshotData();

    const [bankPage, setBankPage] = React.useState(Empty());

    React.useEffect(() => {
        if (bankId != null && url != null) {
            return observePromise(
                bankPageData.listScreenshots(bankId, [url]).then(bankPages => {
                    if (bankPages.length === 0) {
                        throw new Error('Not found');
                    } else {
                        return bankPages[0];
                    }
                }),
                setBankPage
            );
        } else {
            setBankPage(Empty());
        }
    }, [bankId, url]);

    return bankPage;
}
