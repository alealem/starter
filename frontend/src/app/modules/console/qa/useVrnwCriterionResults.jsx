// @flow

import invariant from 'invariant';
import { Seq, Map } from 'immutable';
import { Option } from '@ekz/option';
import { observePromise, Empty } from '@ekz/async-data';
import type { AsyncData } from '@ekz/async-data';
import * as React from 'react';
import type { VrnwCriterionResult } from '@root/domain/vrnwCriterionResults';
import type { VrnwId, VrnwIdCriterion, FulfillmentOption } from '@root/domain/vrnwIdCriteria';
import { toVrnwKey } from '@root/domain/vrnwIdCriteria';
import useVrnwIdCriteria from './useCriteria';
import useVrnwCriterionResultsData from './useVrnwCriterionResultsData';

type VrnwCriteriumResultsApi = {|
    vrnwIdCriteria: AsyncData<VrnwIdCriterion[]>,
    getVrnwResult(vrnwId: VrnwId): Option<VrnwCriterionResult>,
    setVrnwResult(vrnwId: VrnwId, answer: ?FulfillmentOption, screenshotId: ?number): void,
    saveResults(): void
|};

export default function useVrnwCriterionResults(
    bankId: ?number,
    specificationId: ?number
): VrnwCriteriumResultsApi {
    const vrnwIdCriteria = useVrnwIdCriteria(specificationId);

    const vrnwCriterionResultsData = useVrnwCriterionResultsData();

    const [vrnwCriterionResults, setVrnwCriterionResults] = React.useState(Empty());

    React.useEffect(() => {
        if (bankId != null && specificationId != null) {
            return observePromise(
                vrnwCriterionResultsData
                    .listVrnwCriteriaResults(bankId, specificationId)
                    .then(results => keyBy(results, result => toVrnwKey(result.vrnwId))),
                setVrnwCriterionResults
            );
        }
    }, [bankId, specificationId]);

    const setVrnwResult = React.useCallback((vrnwId, answer, screenshotId) => {
        setVrnwCriterionResults(results =>
            results.map(r => {
                if (answer != null) {
                    if (screenshotId != null)
                        return r.set(toVrnwKey(vrnwId), { vrnwId, answer, screenshotId });
                    else {
                        return r;
                    }
                } else {
                    return r.delete(toVrnwKey(vrnwId));
                }
            })
        );
    }, []);

    const getVrnwResult = React.useCallback(
        vrnwId =>
            vrnwCriterionResults.toOption().mapNullable(results => results.get(toVrnwKey(vrnwId))),
        [vrnwCriterionResults]
    );

    const saveResults = React.useCallback(() => {
        const results = vrnwCriterionResults
            .toOption()
            .map(results => results.valueSeq().toArray())
            .get();

        invariant(bankId != null, 'bankId cannot be null');
        invariant(specificationId != null, 'specificationId cannot be null');

        const request = { bankId, results };

        // Fails?
        vrnwCriterionResultsData.save(request, specificationId);
    }, [vrnwCriterionResults, bankId]);

    return React.useMemo(() => ({ vrnwIdCriteria, getVrnwResult, setVrnwResult, saveResults }), [
        vrnwIdCriteria,
        getVrnwResult,
        setVrnwResult,
        saveResults
    ]);
}

function keyBy<T, K>(items: Iterable<T>, mapKey: T => K): Map<K, T> {
    return Seq.Indexed(items)
        .reduce((results, item) => results.set(mapKey(item), item), Map().asMutable())
        .asImmutable();
}
