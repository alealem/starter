// @flow

import invariant from 'invariant';
import * as Formix from '@ekz/formix';
import { Option } from '@ekz/option';
import * as React from 'react';
import useVrnwCriterionResults from './useVrnwCriterionResults';
import { AsyncDataRenderer } from '@root/components/async';
import * as Layout from '@root/components/layout';
import * as Table from '@root/components/table';
import BankSelector from './BankSelector';
import type { VrnwIdCriterion, VrnwId } from '@root/domain/vrnwIdCriteria';
import type { Bank } from '@root/domain/banks';
import type { SpecificationPage } from '@root/domain/specificationPage';
import SpecificationPageSelector from './SpecificationPageSelector';
import BankPageTabsViewer from './BankPageTabsViewer';
import useScreenshots from './useScreenshots';
import useBankPageUrls from './useBankPageUrls';
import FulfillmentSelector from './FulfillmentSelector';
import { toVrnwKey } from '@root/domain/vrnwIdCriteria';
import { Button } from '@root/components/form';
import ScreenshotFinderModal from './ScreenshotFinderModal';
import PageViewerDialogProvider from './components/PageViewerDialogProvider';
import useBankPagesData from './useBankPagesData';

export default function QAView() {
    return (
        <Formix.Form fieldsInitializer={defineFields} initialValue={undefined} onSubmit={() => {}}>
            <QAViewMain />
        </Formix.Form>
    );
}

function QAViewMain() {
    const [showScreenshotFinder, setShowScreenshotFinder] = React.useState(false);

    const form = Formix.useFormix<FormFields>();

    const selectedBankId = Option.of(Formix.useField(form.fields.bank).value)
        .map(sp => sp.id)
        .getOrUndefined();

    const selectedSpecificationPageId = Option.of(
        Formix.useField(form.fields.specificationPage).value
    )
        .map(sp => sp.id)
        .getOrUndefined();

    const { vrnwIdCriteria, getVrnwResult, setVrnwResult, saveResults } = useVrnwCriterionResults(
        selectedBankId,
        selectedSpecificationPageId
    );

    const getScreenshotId = (vrnwId: VrnwId) => {
        return getVrnwResult(vrnwId)
            .map(result => result.screenshotId)
            .getOrUndefined();
    };

    const { bankPageUrls, addTemporaryUrl } = useBankPageUrls(
        selectedBankId,
        selectedSpecificationPageId
    );

    const { bankPages, selectedScreenshot, selectedPageUrl, setSelectedPageUrl } = useScreenshots(
        selectedBankId,
        bankPageUrls.toOption().getOrUndefined()
    );

    const bankPageData = useBankPagesData();

    const scanBankPage = React.useCallback((bankId, pageUrl) => {
        invariant(bankId != null, 'bankId cannot be null');
        invariant(pageUrl != null, 'page url cannot be null');

        bankPageData.scanBankPage(bankId, pageUrl).then();
    }, []);

    const searchUrlField = Formix.useField(form.fields.bankPageUrl);

    const showScreenshotFinderModal = () => {
        setShowScreenshotFinder(true);
    };

    const closeScreenshotFinderModal = () => {
        searchUrlField.setValue('');
        setShowScreenshotFinder(false);
    };

    const columns: Table.Columns<VrnwIdCriterion> = [
        Table.column({
            id: 'vrnwKey',
            Header: 'VRNW-ID',
            width: 150,
            accessor: row => toVrnwKey(row.vrnwId)
        }),
        Table.column({
            id: 'questionText',
            Header: 'KRITERIUM',
            accessor: row => row.pruefschritt
        }),
        Table.column({
            id: 'answer',
            Header: 'ERGEBNIS',
            width: 200,
            Cell: ({ original }) => (
                <FulfillmentSelector
                    value={getVrnwResult(original.vrnwId)
                        .map(result => result.answer)
                        .getOrUndefined()}
                    onChange={answer => setVrnwResult(original.vrnwId, answer, selectedScreenshot)}
                />
            )
        }),
        Table.column({
            id: 'screenshotId',
            Header: 'SCREENSHOT',
            width: 200,
            accessor: row => <a>{getScreenshotId(row.vrnwId)}</a>
        }),
        Table.column({
            id: 'action',
            Header: 'ERGEBNIS',
            width: 200,
            accessor: row =>
                getVrnwResult(row.vrnwId)
                    .filter(result => result.screenshotId !== selectedScreenshot)
                    .map(result => (
                        <a
                            key="screenshot-update"
                            onClick={() =>
                                setVrnwResult(row.vrnwId, result.answer, selectedScreenshot)
                            }>
                            Update screenshot
                        </a>
                    ))
                    .getOrReturn(null)
        })
    ];

    return (
        <PageViewerDialogProvider onScanBankPage={scanBankPage}>
            <Layout.SectionContainer title="Qualitätssicherung">
                <Layout.Row withMargin>
                    <Layout.Cell>
                        <Layout.Card header="" noOverflowHidden>
                            <Layout.Row withMargin>
                                <Layout.Cell large={4} medium={5}>
                                    <BankSelector field={form.fields.bank} label="Bank" />
                                </Layout.Cell>
                                <Layout.Cell large={4} medium={5}>
                                    <SpecificationPageSelector
                                        field={form.fields.specificationPage}
                                        label="Fachliche Seite"
                                    />
                                </Layout.Cell>
                                <Layout.Cell large={1} medium={2}>
                                    <Button
                                        key="save"
                                        label="Save"
                                        theme="primary"
                                        raised
                                        fullWidth
                                        onClick={saveResults}
                                        disabled={vrnwIdCriteria
                                            .toOption()
                                            .map(list => list.length === 0)
                                            .getOrReturn(true)}
                                    />
                                </Layout.Cell>
                            </Layout.Row>
                        </Layout.Card>
                    </Layout.Cell>
                </Layout.Row>
                <Layout.Row withMargin>
                    <Layout.Cell>
                        <AsyncDataRenderer data={vrnwIdCriteria}>
                            {vrnwCriteriaData => (
                                <Table.Table
                                    columns={columns}
                                    showPagination={false}
                                    data={vrnwCriteriaData}
                                    minRows={vrnwCriteriaData.length}
                                    pageSize={vrnwCriteriaData.length}
                                    noDataText="No vrnwIdCriteria found"
                                />
                            )}
                        </AsyncDataRenderer>
                    </Layout.Cell>
                </Layout.Row>
                <Layout.Row withMargin>
                    <Layout.Cell>
                        <AsyncDataRenderer data={bankPages}>
                            {bankPages => (
                                <Layout.Card
                                    header={
                                        <div>
                                            Individuel Seite
                                            <Button
                                                key="scan"
                                                icon="fa fa-plus"
                                                theme="primary"
                                                onClick={showScreenshotFinderModal}
                                            />
                                        </div>
                                    }
                                    noOverflowHidden>
                                    {selectedPageUrl != null && (
                                        <BankPageTabsViewer
                                            bankPages={bankPages}
                                            selectedPageUrl={selectedPageUrl}
                                            onChange={setSelectedPageUrl}
                                        />
                                    )}
                                </Layout.Card>
                            )}
                        </AsyncDataRenderer>
                    </Layout.Cell>
                </Layout.Row>
                <ScreenshotFinderModal
                    isOpen={showScreenshotFinder}
                    addTemporaryUrl={addTemporaryUrl}
                    bankId={selectedBankId}
                    searchUrlField={form.fields.bankPageUrl}
                    onClose={closeScreenshotFinderModal}
                />
            </Layout.SectionContainer>
        </PageViewerDialogProvider>
    );
}

type FormFields = {|
    bank: Formix.FieldRef<?Bank>,
    specificationPage: Formix.FieldRef<?SpecificationPage>,
    searchText: Formix.FieldRef<string>,
    bankPageUrl: Formix.FieldRef<string>
|};

function defineFields() {
    return {
        bank: Formix.defineField(null),
        specificationPage: Formix.defineField(null),
        searchText: Formix.defineField(''),
        bankPageUrl: Formix.defineField('')
    };
}
