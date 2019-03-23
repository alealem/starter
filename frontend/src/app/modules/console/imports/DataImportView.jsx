// @flow

import * as React from 'react';
import * as Layout from '@root/components/layout';
import BankListUploadForm from './BankListUploadForm';
import MasterTableUploadForm from './MasterTableUploadForm';
import MappingTableUploadForm from './MappingTableUploadForm';

export default function DataImportView() {
    const [selectedTab, setSelectedTab] = React.useState('Bankliste');

    return (
        <Layout.SectionContainer title="Data Import">
            <Layout.Tabs selectedTab={selectedTab} onChange={setSelectedTab}>
                <Layout.Tab tabId="Bankliste" label="Bankliste">
                    <Layout.Row>
                        <Layout.Cell large={6}>
                            <BankListUploadForm />
                        </Layout.Cell>
                    </Layout.Row>
                </Layout.Tab>
                <Layout.Tab tabId="Master-Tabelle" label="Master-Tabelle">
                    <Layout.Row>
                        <Layout.Cell large={6}>
                            <MasterTableUploadForm />
                        </Layout.Cell>
                    </Layout.Row>
                </Layout.Tab>
                <Layout.Tab tabId="Brücken-Tabelle" label="Brücken-Tabelle">
                    <Layout.Row>
                        <Layout.Cell large={6}>
                            <MappingTableUploadForm />
                        </Layout.Cell>
                    </Layout.Row>
                </Layout.Tab>
            </Layout.Tabs>
        </Layout.SectionContainer>
    );
}
