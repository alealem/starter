// @flow

import * as React from 'react';
import { useBanks } from './useBankHooks';
import { AsyncDataRenderer } from '@root/components/async';
import { SectionContainer } from '@root/components/layout';
import { Button } from '@root/components/form';
import * as Table from '@root/components/table';
import * as Icons from '@root/modules/console/icons';
import * as Routes from '@root/modules/console/routes';
import type { Bank } from '@root/domain/banks';

const columns: Table.Columns<Bank> = [
    Table.column({
        id: 'blz',
        Header: 'BLZ',
        width: 200,
        accessor: bank => bank.blz
    }),
    Table.column({
        id: 'bankName',
        Header: 'Bank Name',

        accessor: bank => bank.bankName
    }),
    Table.column({
        id: 'url',
        Header: 'URL',
        accessor: bank => <a href={bank.url}>{bank.url}</a>
    }),
    Table.column({
        id: 'status',
        Header: 'Status',
        width: 100,
        accessor: bank => bank.status
    }),
    Table.column({
        id: 'nlbOverAllScore',
        Header: 'NLB Score',
        width: 100,
        accessor: bank => bank.nlbOverAllScore
    }),
    Table.column({
        id: 'nlbOverAllScore',
        Header: 'LB Score',
        width: 100,
        accessor: bank => bank.lbOverAllScore
    }),
    Table.column({
        id: 'scanDate',
        Header: 'Scan Datum',
        accessor: bank => bank.scanDate.toLocaleString()
    })
];

export default function BanksOverview() {
    const banks = useBanks();
    return (
        <SectionContainer
            title="Übersicht"
            actions={
                <Button
                    label="Bank Erstellen"
                    theme="primary"
                    icon={Icons.Create}
                    path={Routes.BankCreator.resolve()}
                />
            }>
            <AsyncDataRenderer data={banks}>
                {banks => (
                    <Table.Table columns={columns} data={banks} noDataText="No banks found" />
                )}
            </AsyncDataRenderer>
        </SectionContainer>
    );
}
