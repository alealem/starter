// @flow

import invariant from 'invariant';

export type VrnwIdCriterion = {|
    vrnwId: VrnwId,
    pointSystem: PointSystem,
    pruefschritt: string
|};

export type VrnwId = {|
    sid: number,
    bereich: string,
    runningNumber: string
|};

export opaque type VrnwKey: string = string;

export function toVrnwKey(vrnwId: VrnwId): VrnwKey {
    const runningNumber = vrnwId.runningNumber === 'ND' ? '' : `-${vrnwId.runningNumber}`;
    return `${vrnwId.bereich}-${vrnwId.sid}${runningNumber}`;
}

export function fromVrnwKey(vrnwKey: VrnwKey): VrnwId {
    const [bereich, sid, maybeRunningNumber] = vrnwKey.split('-');
    const runningNumber = maybeRunningNumber == null ? 'ND' : maybeRunningNumber;
    return { bereich, sid: Number(sid), runningNumber };
}

export function toFulfillmentOption(fulfillmentText: string): FulfillmentOption {
    invariant(
        fulfillmentText === 'NOT_FULFILLED' ||
            fulfillmentText === 'PARTIALLY_FULFILLED' ||
            fulfillmentText === 'COMPLETELY_FULFILLED',
        `Unknown fulfillment ${fulfillmentText}`
    );

    return fulfillmentText;
}

export type PointSystem = 'FULFILLMENT_RESULT' | 'GOOGLE_RANKING_RESULT' | 'BOOLEAN_RESULT';

export type FulfillmentOption = 'NOT_FULFILLED' | 'PARTIALLY_FULFILLED' | 'COMPLETELY_FULFILLED';
