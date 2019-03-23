// @flow

import { createRouteCreator } from '@root/core/routing';

const makeRoute = createRouteCreator('/console');

type Blz = $Exact<{ blz: string }>;

export const BanksOverview = makeRoute<void>('/banks');
export const BankCreator = makeRoute<void>('/banks/creator');
export const BankDetails = makeRoute<Blz>('/banks/:blz/details', {
    blz: ''
});

export const DataImports = makeRoute<void>('/imports');

export const Qualitätssicherung = makeRoute<void>('/qa');
