// @flow
'use strict';

import * as React from 'react';
import cx from 'classnames';
import Cell from './Cell';

type Props = $Exact<{
    className?: string,
    withMargin: boolean,
    marginX: boolean,
    marginY: boolean,
    withPadding: boolean,
    paddingX: boolean,
    paddingY: boolean,
    justifyContent: 'flex-start' | 'flex-end' | 'center' | 'space-around' | 'space-between',
    alignItems: 'flex-start' | 'flex-end' | 'center' | 'baseline',
    children: React.ChildrenArray<React.Element<typeof Cell>>
}>;

type RowProps = $Exact<{
    ...Props,
    useContainer: boolean,
    fullHeight: boolean
}>;

type ColumnProps = $Exact<{
    ...Props,
    useFrame: boolean,
    minHeight?: string | number
}>;

export function Row(props: RowProps): React.Node {
    let gridX = (
        <div
            className={cx('grid-x', props.className, {
                'full-height': props.fullHeight,
                'grid-margin-x': props.withMargin || props.marginX,
                'grid-margin-y': props.withMargin || props.marginY,
                'grid-padding-x': props.withPadding || props.paddingX,
                'grid-padding-y': props.withPadding || props.paddingY
            })}
            style={{ justifyContent: props.justifyContent, alignItems: props.alignItems }}>
            {React.Children.toArray(props.children)}
        </div>
    );

    return props.useContainer ? (
        <div
            className={cx('grid-container', {
                'full-height': props.fullHeight
            })}>
            {gridX}
        </div>
    ) : (
        gridX
    );
}

Row.defaultProps = {
    withMargin: false,
    marginX: false,
    marginY: false,
    withPadding: false,
    paddingX: false,
    paddingY: false,
    useContainer: false,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    fullHeight: false
};

export function Column(props: ColumnProps): React.Node {
    return (
        <div
            className={cx('grid-y', props.className, {
                'grid-frame': props.useFrame,
                'grid-margin-x': props.withMargin || props.marginX,
                'grid-margin-y': props.withMargin || props.marginY,
                'grid-padding-x': props.withPadding || props.paddingX,
                'grid-padding-y': props.withPadding || props.paddingY
            })}
            style={{ justifyContent: props.justifyContent, minHeight: props.minHeight }}>
            {React.Children.toArray(props.children)}
        </div>
    );
}

Column.defaultProps = {
    withMargin: false,
    marginX: false,
    marginY: false,
    withPadding: false,
    paddingX: false,
    paddingY: false,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    useFrame: false
};
