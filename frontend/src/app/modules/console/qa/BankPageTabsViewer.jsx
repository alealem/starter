// @flow

import * as React from 'react';
import * as Layout from '@root/components/layout';
import type { BankPage } from '@root/domain/screenshots';
import BankPageViewer from './BankPageViewer';

type Props = {|
    bankPages: BankPage[],
    selectedPageUrl: string,
    onChange: string => mixed
|};

export default function BankPagesTabViewer(props: Props) {
    const getTabLabel = (screenshotId: ?number) => {
        return screenshotId != null ? `SCREENSHOT ${screenshotId}` : '(NOT SCANNED)';
    };

    const tabs = React.useMemo(
        () =>
            props.bankPages.map(bankPage => (
                <Layout.Tab
                    tabId={bankPage.pageUrl}
                    label={getTabLabel(bankPage.screenshotId)}
                    key={bankPage.pageUrl}>
                    <BankPageViewer bankPage={bankPage} />
                </Layout.Tab>
            )),
        [props.bankPages]
    );

    return (
        <Layout.Tabs selectedTab={props.selectedPageUrl} onChange={props.onChange}>
            {tabs}
        </Layout.Tabs>
    );
}
