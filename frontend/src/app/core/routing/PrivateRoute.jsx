// @flow

import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';
import type { ContextRouter } from 'react-router-dom';
import { useAuthentication } from '@root/core/authentication';

type Props<T> = $Exact<{
    component?: React.ComponentType<T>,
    render?: (router: ContextRouter) => React.Node,
    children?: React.ComponentType<ContextRouter> | React.Node,
    path?: string,
    exact?: boolean,
    strict?: boolean
}>;

export default function PrivateRoute<T>(props: Props<T>) {
    const authentication = useAuthentication();

    return authentication.accessToken
        .map(() => <Route key="private-route" {...props} />)
        .getOrReturn(<Redirect to={authentication.defaultUnauthenticatedRedirect} />);
}
