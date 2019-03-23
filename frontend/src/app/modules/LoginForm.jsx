// @flow

import * as React from 'react';
import * as Formix from '@ekz/formix';
import { Button, FormixInput, useFormixValidators } from '@root/components/form';
import { useNotification } from '@root/components/notifications';
import { useAuthentication } from '@root/core/authentication';
import { useApiClient } from '@root/api-client';

type Props = {
    defaultLogin: string,
    loginButtonText?: string
};

export default function LoginForm(props: Props) {
    const apiClient = useApiClient();
    const authentication = useAuthentication();
    const notification = useNotification();
    const formixValidators = useFormixValidators();

    const onSubmit = React.useCallback(
        form => {
            let username = form.getFieldState(form.fields.username).value;
            let password = form.getFieldState(form.fields.password).value;

            form.setSubmitting(true);
            apiClient
                .doPost('/authorizations', {
                    body: { username, password }
                })
                .then(result => {
                    authentication.setAccessToken(result.data.accessToken);
                })
                .catch(() => {
                    notification.notify('Username or password invalid', { type: 'warning' });
                    form.setSubmitting(false);
                });
        },
        [apiClient, authentication, notification]
    );

    return (
        <Formix.Form
            fieldsInitializer={defineFields}
            onSubmit={onSubmit}
            initialValue={props.defaultLogin}>
            {({ fields, handleSubmit, isValid, isSubmitting }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <FormixInput
                        label="Username or email address"
                        field={fields.username}
                        validator={formixValidators.notEmpty()}
                    />
                    <FormixInput
                        label="Password"
                        type="password"
                        field={fields.password}
                        validator={formixValidators.notEmpty()}
                    />
                    <Button
                        label={props.loginButtonText == null ? 'Login' : props.loginButtonText}
                        type="submit"
                        theme="primary"
                        raised
                        fullWidth
                        disabled={!isValid || isSubmitting}
                    />
                </form>
            )}
        </Formix.Form>
    );
}

function defineFields(username: string) {
    return {
        username: Formix.defineField(username),
        password: Formix.defineField('')
    };
}
