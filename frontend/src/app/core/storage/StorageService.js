// @flow

export default class StorageService<A> {
    _key: string;
    _defaultValue: A;
    _storage: Storage;
    _serialize: A => ?string;
    _deserialize: string => A;

    constructor(
        storage: Storage,
        key: string,
        defaultValue: A,
        serialize: A => ?string,
        deserialize: string => A
    ) {
        this._storage = storage;
        this._key = key;
        this._defaultValue = defaultValue;
        this._serialize = serialize;
        this._deserialize = deserialize;
    }

    get(): A {
        let value = this._storage.getItem(this._key);
        if (value == null) {
            return this._defaultValue;
        }
        return this._deserialize(value);
    }

    set(value: A): void {
        let serialized = this._serialize(value);
        if (serialized != null) {
            this._storage.setItem(this._key, serialized);
        } else {
            this.delete();
        }
    }

    update(updater: A => A): void {
        let value = updater(this.get());
        this.set(value);
    }

    delete(): void {
        this._storage.removeItem(this._key);
    }
}
