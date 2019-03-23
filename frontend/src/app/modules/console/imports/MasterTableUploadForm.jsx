// @flow

import * as React from 'react';
import * as Formix from '@ekz/formix';
import * as Layout from '@root/components/layout';
import {
    Button,
    useFormixValidators,
    FileSelectFormix,
    FormixCheckbox
} from '@root/components/form';
import { useNotification } from '@root/components/notifications';
import { useApiClient } from '@root/api-client';

export default function MasterTableUploadForm() {
    const apiClient = useApiClient();
    const notification = useNotification();
    const formixValidators = useFormixValidators();

    const onSubmit = React.useCallback(
        form => {
            let skipHeader: boolean = form.getFieldState(form.fields.skipHeader).value;
            let file: ?File = form.getFieldState(form.fields.file).value;

            let formData = new FormData();
            if (file != null) {
                formData.append('file', file);
                formData.append('skip-file-header', skipHeader ? 'true' : 'false');
            }
            let headers = { 'Content-Type': undefined };

            form.setSubmitting(true);

            apiClient
                .doPost('/imports/master-table', { headers, body: formData })
                .then(() => {
                    notification.notify('Master Table File is Uploaded', { type: 'success' });
                    form.setSubmitting(false);
                })
                .catch(() => {
                    notification.notify('Master Table File could not be Uploaded', {
                        type: 'warning'
                    });
                    form.setSubmitting(false);
                });
        },
        [apiClient, notification]
    );

    return (
        <Formix.Form fieldsInitializer={defineFields} onSubmit={onSubmit} initialValue={null}>
            {({ fields, handleSubmit, isValid, isSubmitting }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <Layout.Card
                        header="Datei mit Master-Tabelle zum hochladen auswählen"
                        footer={
                            <Layout.ActionsContainer
                                right={[
                                    <Button
                                        key="upload"
                                        label="Upload"
                                        type="submit"
                                        theme="primary"
                                        raised
                                        fullWidth
                                        disabled={!isValid || isSubmitting}
                                    />
                                ]}
                            />
                        }>
                        <FormixCheckbox label="Datei mit Kopfzeile" field={fields.skipHeader} />
                        <FileSelectFormix
                            field={fields.file}
                            validator={formixValidators.notNull()}
                        />
                    </Layout.Card>
                </form>
            )}
        </Formix.Form>
    );
}

function defineFields() {
    return {
        skipHeader: Formix.defineField(false),
        file: Formix.defineField(null)
    };
}
