// @flow

import * as React from 'react';

type Props = {
    children: React.ChildrenArray<React.Element<typeof TabularDataItem>>
};

export function TabularData(props: Props) {
    return <div className="speedcontrol-tabular-data">{React.Children.toArray(props.children)}</div>;
}

type ItemProps = {
    label: React.Node,
    value: React.Node
};

export function TabularDataItem(props: ItemProps) {
    return (
        <div className="speedcontrol-tabular-data-item">
            <div className="speedcontrol-tabular-data-name">{props.label}</div>
            <div className="speedcontrol-tabular-data-value">{props.value}</div>
        </div>
    );
}

TabularData.Item = TabularDataItem;
