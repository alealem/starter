// @flow

import { Option } from '@ekz/option';

export function unreachable(value: mixed): empty {
    const format = JSON.stringify(value);
    throw new TypeError(`Internal error: Encountered impossible value: ${format}`);
}

export function tryParseFloat(value: string): Option<number> {
    let parsed = parseFloat(value);
    return isNaN(parsed) ? Option.None : Option.Some(parsed);
}
