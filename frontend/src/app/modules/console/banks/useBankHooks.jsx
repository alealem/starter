// @flow

import { Pending, observePromise } from '@ekz/async-data';
import type { AsyncData } from '@ekz/async-data';
import * as React from 'react';
import type { Bank } from '@root/domain/banks';
import useBanksData from './useBanksData';

export function useBanks(): AsyncData<Bank[]> {
    const banksData = useBanksData();

    const [banks, setBanks] = React.useState(Pending());

    React.useEffect(() => observePromise(banksData.listBanks(), setBanks), []);

    return banks;
}
