// @flow

import * as React from 'react';
import { DateTime } from 'luxon';
import { Buffer } from 'buffer';
import { Option } from '@ekz/option';
import { fromSessionStorage } from '@root/core/storage';
import type { StorageService } from '@root/core/storage';

export type AuthenticationApi = $Exact<{
    defaultAuthenticatedRedirect: string,
    defaultUnauthenticatedRedirect: string,
    isTokenExpired: boolean,
    accessToken: Option<string>,
    accessTokenContents: Option<{ [claim: string]: mixed, ...BasicAccessToken }>,
    setAccessToken(token: ?string): void
}>;

type Props = $Exact<{
    storageKey: string,
    defaultAuthenticatedRedirect: string,
    defaultUnauthenticatedRedirect: string,
    children: React.Node
}>;

type BasicAccessToken = $Exact<{
    sub: string,
    exp: number
}>;

export class AuthenticationProvider extends React.PureComponent<Props, AuthenticationApi> {
    static defaultProps = {
        storageKey: 'accessToken'
    };

    static getDerivedStateFromProps(nextProps: Props) {
        return {
            defaultAuthenticatedRedirect: nextProps.defaultAuthenticatedRedirect,
            defaultUnauthenticatedRedirect: nextProps.defaultUnauthenticatedRedirect
        };
    }

    _timeout: ?TimeoutID;

    _storage: StorageService<Option<string>> = fromSessionStorage(
        this.props.storageKey,
        Option.None,
        value => value.getOrReturn(null),
        value => Option.of(value)
    );

    constructor(props: Props) {
        super(props);

        let accessToken = this._storage.get();
        let { accessTokenContents, isTokenExpired } = extractTokenInfo(accessToken);

        this.state = {
            defaultAuthenticatedRedirect: this.props.defaultAuthenticatedRedirect,
            defaultUnauthenticatedRedirect: this.props.defaultUnauthenticatedRedirect,
            isTokenExpired,
            accessToken: isTokenExpired ? Option.None : accessToken,
            accessTokenContents: isTokenExpired ? Option.None : accessTokenContents,
            setAccessToken: this.setAuthenticationToken
        };
    }

    componentDidMount() {
        this.setExpirationTimeout();
    }

    componentDidUpdate() {
        this.setExpirationTimeout();
    }

    componentWillUnmount() {
        this.clearTimeout();
    }

    setAuthenticationToken = (token: ?string) => {
        let accessToken = Option.of(token);
        let { accessTokenContents, isTokenExpired } = extractTokenInfo(accessToken);
        this._storage.set(accessToken);
        this.setState({ accessToken, accessTokenContents, isTokenExpired });
    };

    setExpirationTimeout() {
        this.clearTimeout();

        let { expirationMillis } = extractTokenInfo(this.state.accessToken);
        expirationMillis.forEach(timeout => {
            this._timeout = setTimeout(() => this.setState({ isTokenExpired: true }), timeout);
        });
    }

    clearTimeout() {
        if (this._timeout != null) {
            clearTimeout(this._timeout);
        }
    }

    render() {
        return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
    }
}

function extractTokenInfo(accessToken: Option<string>) {
    let accessTokenContents = getTokenBody(accessToken);
    let expirationMillis = getExpirationMillis(accessTokenContents);
    let isTokenExpired = expirationMillis.map(millis => millis === 0).getOrReturn(true);
    return { accessTokenContents, expirationMillis, isTokenExpired };
}

function getTokenBody(accessToken: Option<string>): Option<BasicAccessToken> {
    return accessToken.mapNullable(token => {
        try {
            let body = token.split('.')[1];
            return JSON.parse(new Buffer(body, 'base64').toString());
        } catch (error) {
            console.error(error);
        }
    });
}

function getExpirationMillis(accessToken: Option<BasicAccessToken>): Option<number> {
    return accessToken.map(token => {
        let time = DateTime.fromMillis(token.exp * 1000);
        let expirationMillis = time.diffNow('milliseconds').milliseconds - 5000; // Removes 5 seconds as buffer
        return expirationMillis < 0 ? 0 : expirationMillis;
    });
}

const Context: React.Context<AuthenticationApi> = React.createContext({
    defaultAuthenticatedRedirect: '',
    defaultUnauthenticatedRedirect: '',
    isTokenExpired: true,
    accessToken: Option.None,
    accessTokenContents: Option.None,
    setAccessToken: () => {
        throw new Error('Cannot call method on empty context');
    }
});

export const Authentication = Context.Consumer;

export function useAuthentication(): AuthenticationApi {
    return React.useContext(Context);
}
