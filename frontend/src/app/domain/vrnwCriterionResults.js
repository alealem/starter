//@flow

import type { VrnwId, FulfillmentOption } from './vrnwIdCriteria';

export type VrnwCriterionResult = {|
    vrnwId: VrnwId,
    answer: FulfillmentOption,
    screenshotId: ?number
|};

export type VrnwResultsRequest = {|
    bankId: number,
    results: VrnwCriterionResult[]
|};
