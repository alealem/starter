// @flow

import * as React from 'react';
import BankPageLoader from '../BankPageLoader';

type Props = {|
    children: React.Node,
    onScanBankPage: (bankId: number, url: string) => void
|};

type PageViewerDialogApi = {|
    addBankPage(bankId: number, url: string): void,
    closeDialog(): void,
    scanBankPage(bankId: number, url: string): void
|};

export default function PageViewerDialogProvider(props: Props) {
    const [bankPagePath, setBankPagePath] = React.useState(null);

    const api = React.useMemo(
        () => ({
            addBankPage(bankId, url) {
                setBankPagePath({ bankId, url });
            },
            closeDialog() {
                setBankPagePath(null);
            },
            scanBankPage(bankId, url) {
                props.onScanBankPage(bankId, url);
            }
        }),
        []
    );

    return (
        <Context.Provider value={api}>
            {bankPagePath != null && (
                <div className="speedcontrol-page-viewer-dialog">
                    <div className="dialog-header">
                        <i className="close-dialog fa fa-times" onClick={api.closeDialog} />
                    </div>
                    <div className="dialog-content">
                        <BankPageLoader bankId={bankPagePath.bankId} url={bankPagePath.url} />
                    </div>
                </div>
            )}
            {props.children}
        </Context.Provider>
    );
}

const noop = () => {
    throw new Error(
        'Cannot call method on empty context. Did you forget <PageViewerDialogProvider/>?'
    );
};

const Context = React.createContext<PageViewerDialogApi>({
    addBankPage: noop,
    closeDialog: noop,
    scanBankPage: noop
});

export function usePageViewerDialog(): PageViewerDialogApi {
    return React.useContext(Context);
}
