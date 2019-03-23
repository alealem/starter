// @flow strict-local

import Bluebird from 'bluebird';
import * as React from 'react';
import { create, CancelToken } from 'axios';
import type { Axios, $AxiosXHR, AxiosXHRConfigBase } from 'axios';
import { useAuthentication } from '@root/core/authentication';

type RequestConfig<Body> = {
    query?: {},
    headers?: {},
    body?: Body,
    responseType?: $PropertyType<AxiosXHRConfigBase<mixed>, 'responseType'>
};

export type ApiClient = {
    // flowlint-next-line unclear-type:off
    doGet(url: string, config?: RequestConfig<void>): Bluebird<$AxiosXHR<void, any>>,
    // flowlint-next-line unclear-type:off
    doPost<B>(url: string, config?: RequestConfig<B>): Bluebird<$AxiosXHR<B, any>>,
    // flowlint-next-line unclear-type:off
    doPut<B>(url: string, config?: RequestConfig<B>): Bluebird<$AxiosXHR<B, any>>,
    // flowlint-next-line unclear-type:off
    doPatch<B>(url: string, config?: RequestConfig<B>): Bluebird<$AxiosXHR<B, any>>,
    // flowlint-next-line unclear-type:off
    doDelete<B>(url: string, config?: RequestConfig<B>): Bluebird<$AxiosXHR<B, any>>
};

type Props = {
    baseUrl: string,
    children: React.Node
};

export function ApiClientProvider(props: Props) {
    const authentication = useAuthentication();

    const withAuthorizationHeader = React.useCallback(
        function(headers: {}) {
            return authentication.accessToken
                .map(token =>
                    Object.assign({}, headers, {
                        Authorization: `Bearer ${token}`
                    })
                )
                .getOrReturn(headers);
        },
        [authentication.accessToken]
    );

    const performRequest = React.useCallback(
        function _performRequest<B, R>(
            axios: Axios,
            url: string,
            method: string,
            config: RequestConfig<B>
        ): Bluebird<$AxiosXHR<B, R>> {
            let cancelTokenSource = CancelToken.source();

            let request = Bluebird.resolve(
                axios({
                    url,
                    baseURL: props.baseUrl,
                    method,
                    headers: withAuthorizationHeader(config.headers != null ? config.headers : {}),
                    params: config.query != null ? config.query : {},
                    responseType: config.responseType || 'json',
                    data: config.body,
                    cancelToken: cancelTokenSource.token
                })
            );

            return request.finally(() => {
                if (request.isCancelled()) {
                    cancelTokenSource.cancel();
                }
            });
        },
        [props.baseUrl]
    );

    const axios = React.useMemo(() => create(), []);

    const api = React.useMemo<ApiClient>(
        () => ({
            doGet: (url, config = {}) => performRequest(axios, url, 'GET', config),

            doPost: (url, config = {}) =>
                // $FlowExpectError
                performRequest(axios, url, 'POST', config),

            doPut: (url, config = {}) =>
                // $FlowExpectError
                performRequest(axios, url, 'PUT', config),

            doPatch: (url, config = {}) =>
                // $FlowExpectError
                performRequest(axios, url, 'PATCH', config),

            doDelete: (url, config = {}) =>
                // $FlowExpectError
                performRequest(axios, url, 'DELETE', config)
        }),
        [axios, performRequest]
    );

    return <Context.Provider value={api}>{props.children}</Context.Provider>;
}

const noop = () => {
    throw new Error('Cannot call method on empty context');
};

const Context: React.Context<ApiClient> = React.createContext({
    doGet: noop,
    doPost: noop,
    doPut: noop,
    doPatch: noop,
    doDelete: noop
});

export function useApiClient(): ApiClient {
    return React.useContext(Context);
}
