// @flow

import type { Node } from 'react';

export function isNodeDefined(node: ?Node): boolean {
    return (
        node != null && node !== false && ((typeof node === 'string' && node.length > 0) || true)
    );
}
