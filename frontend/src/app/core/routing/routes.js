// @flow

import { join } from 'path';
import { Option } from '@ekz/option';
import { Map } from 'immutable';

type RouteParams = { [key: string]: string } | void;

export type Route<Params: RouteParams> = $Exact<{
    path: string,
    resolve(params: Params): string
}>;

export type RouteCreator = <Params: RouteParams>(path: string, params: Params) => Route<Params>;

export function createRouteCreator(prefix: string = ''): RouteCreator {
    return function routeCreator<Params: RouteParams>(
        path: string,
        defaultParams: Params
    ): Route<Params> {
        return {
            path: join(prefix, path),
            resolve(params: Params) {
                let replacedPath = path;

                Map(defaultParams).map((defaultValue, key) => {
                    let substitution = Option.of(params)
                        .mapNullable(params => params[key])
                        .getOrReturn(defaultValue);
                    replacedPath = replacedPath.replace(`:${key}`, substitution);
                });

                return join(prefix, replacedPath);
            }
        };
    };
}
