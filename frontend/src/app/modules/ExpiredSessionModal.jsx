// @flow

import * as React from 'react';
import { Authentication } from '@root/core/authentication';
import { Modal } from '@root/components/layout';
import LoginForm from './LoginForm';

type Props = {};

class ExpiredSessionModal extends React.PureComponent<Props> {
    render() {
        return (
            <Authentication>
                {auth => (
                    <Modal
                        isOpen={auth.accessToken.isDefined && auth.isTokenExpired}
                        header="Session expired"
                        maxWidth={500}>
                        <LoginForm
                            defaultLogin={auth.accessTokenContents.map(x => x.sub).getOrReturn('')}
                            loginButtonText="Reauthenticate"
                        />
                    </Modal>
                )}
            </Authentication>
        );
    }
}

export default ExpiredSessionModal;
