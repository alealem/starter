// @flow

import * as React from 'react';
import * as Formix from '@ekz/formix';
import { Modal } from '@root/components/layout';
import { FormixInput, Button } from '@root/components/form';

type Props = {|
    isOpen: boolean,
    addTemporaryUrl: (url: string) => void,
    bankId: ?number,
    searchUrlField: Formix.FieldRef<string>,
    onClose: () => mixed
|};

export default function ScreenshotFinderModal(props: Props) {
    const searchUrl = Formix.useField(props.searchUrlField);

    const handleUrlAdd = () => {
        props.addTemporaryUrl(searchUrl.value);
        props.onClose();
    };

    return (
        <Modal
            isOpen={props.isOpen}
            header="Find BankPage"
            actions={[
                <Button key="cancel" label="Cancel" onClick={() => props.onClose()} />,
                <Button
                    key="festlegen"
                    label="Festlegen"
                    theme="primary"
                    onClick={() => handleUrlAdd()}
                    disabled={!isValidUrl(searchUrl.value) || props.bankId === undefined}
                />
            ]}>
            <FormixInput label="URL" field={props.searchUrlField} />
        </Modal>
    );
}

function isValidUrl(maybeUrl) {
    try {
        let url = new URL(maybeUrl);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (e) {
        return false;
    }
}
