// @flow

import * as React from 'react';
import { Heading } from '@root/components/typography';
import LoginForm from './LoginForm';

type Props = {};

class Login extends React.PureComponent<Props> {
    render() {
        return (
            <div className="speedcontrol-accounts-login">
                <div className="auth-form">
                    <Heading textAlign="center">Sign in to speedcontrol</Heading>
                    <div className="speedcontrol-card">
                        <div className="speedcontrol-card-body">
                            <LoginForm defaultLogin="" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
