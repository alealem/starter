// @flow

import { Empty, observePromise } from '@ekz/async-data';
import type { AsyncData } from '@ekz/async-data';
import * as React from 'react';
import type { BankPage } from '@root/domain/screenshots';
import useScreenshotData from './useScreenshotData';

type ScreenshotApi = {|
    bankPages: AsyncData<BankPage[]>,
    selectedPageUrl: ?string,
    setSelectedPageUrl(pageUrl: string): void,
    selectedScreenshot: ?number
|};

export default function useScreenshots(bankId: ?number, bankUrls: ?Array<string>): ScreenshotApi {
    const screenshotData = useScreenshotData();

    const [bankPages, setBankPages] = React.useState(Empty());
    const [selectedPageUrl, setSelectedPageUrl] = React.useState(null);

    React.useEffect(() => {
        if (bankId != null && bankUrls != null) {
            return observePromise(
                screenshotData.listScreenshots(bankId, bankUrls).tap(bankPages => {
                    setSelectedPageUrl(bankPages.length === 0 ? null : bankPages[0].pageUrl);
                }),
                setBankPages
            );
        } else {
            setBankPages(Empty());
        }
    }, [bankId, bankUrls]);

    return React.useMemo(
        () => ({
            bankPages,
            selectedPageUrl,
            selectedScreenshot: bankPages
                .toOption()
                .mapNullable(pages => pages.find(page => page.pageUrl === selectedPageUrl))
                .map(bankPage => bankPage.screenshotId)
                .getOrUndefined(),
            setSelectedPageUrl
        }),
        [bankPages, selectedPageUrl, setSelectedPageUrl]
    );
}
