// @flow

import * as React from 'react';
import useBankPage from './useBankPage';
import { AsyncDataRenderer } from '@root/components/async';
import BankPageViewer from './BankPageViewer';

type Props = {|
    bankId: number,
    url: string
|};

export default function BankPageLoader(props: Props) {
    const bankPage = useBankPage(props.bankId, props.url);

    return (
        <AsyncDataRenderer data={bankPage}>
            {bankPage => <BankPageViewer bankPage={bankPage} />}
        </AsyncDataRenderer>
    );
}
