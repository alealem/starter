// @flow

import * as React from 'react';
import * as Layout from '@root/components/layout';
import { Button } from '@root/components/form';
import type { BankPage } from '@root/domain/screenshots';
import { usePageViewerDialog } from './components/PageViewerDialogProvider';

type Props = {|
    bankPage: BankPage
|};

export default function BankPageViewer(props: Props) {
    const pageViewerDialog = usePageViewerDialog();

    return (
        <React.Fragment>
            <Layout.Row withMargin withPadding>
                <Layout.Cell large={6}>
                    <a href={props.bankPage.pageUrl}>{props.bankPage.pageUrl}</a>
                </Layout.Cell>
                <Layout.Cell large={2}>
                    <span>{props.bankPage.createdAt}</span>
                </Layout.Cell>
                <Layout.Cell large={2}>
                    <Button
                        key="scan"
                        label="Scan"
                        theme="primary"
                        onClick={() =>
                            pageViewerDialog.scanBankPage(
                                props.bankPage.bankId,
                                props.bankPage.pageUrl
                            )
                        }
                        fullWidth
                    />
                </Layout.Cell>
            </Layout.Row>
            <Layout.Row>
                <Layout.Cell large={10}>
                    {props.bankPage.screenshotPath !== null && (
                        <img
                            src={props.bankPage.screenshotPath}
                            onClick={() =>
                                pageViewerDialog.addBankPage(
                                    props.bankPage.bankId,
                                    props.bankPage.pageUrl
                                )
                            }
                        />
                    )}
                </Layout.Cell>

                <Layout.Cell large={2}>
                    {props.bankPage.linksOnPage.map(link => (
                        <a
                            key={link.id}
                            onClick={() =>
                                pageViewerDialog.addBankPage(props.bankPage.bankId, link.url)
                            }>
                            {link.linkText}
                        </a>
                    ))}
                </Layout.Cell>
            </Layout.Row>
        </React.Fragment>
    );
}
