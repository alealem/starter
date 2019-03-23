// @flow

import StorageService from './StorageService';

export type { StorageService };

type StorageCreator = <A>(
    key: string,
    defaultValue: A,
    serialize?: (A) => ?string,
    deserialize?: (string) => A
) => StorageService<A>;

function makeStorage(storage: Storage): StorageCreator {
    return function<A>(
        key: string,
        defaultValue: A,
        serialize: A => ?string = JSON.stringify,
        deserialize: string => A = JSON.parse
    ): StorageService<A> {
        return new StorageService(storage, key, defaultValue, serialize, deserialize);
    };
}

export const fromLocalStorage: StorageCreator = makeStorage(window.localStorage);

export const fromSessionStorage: StorageCreator = makeStorage(window.sessionStorage);
