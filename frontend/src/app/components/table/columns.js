// @flow

import * as React from 'react';
import { Checkbox } from '../form';
import NumberCell from './NumberCell';

export opaque type Column<Row, Value> = {};

export type Columns<Row> = Column<Row, mixed>[];

type CellComponentProps<Row, Value> = {
    original: Row,
    value: Value
};

type CommonColumnProps = {|
    id: string | number,
    Header?: React.Node,
    width?: number,
    minWidth?: number,
    sortable?: boolean,
    resizable?: boolean,
    className?: string,
    headerClassName?: string
|};

type BasicColumnProps<Row, Value> =
    | {|
          ...CommonColumnProps,
          filterable?: boolean,
          accessor: Row => React.Node
      |}
    | {|
          ...CommonColumnProps,
          filterable?: boolean,
          Cell: (CellComponentProps<Row, void>) => React.Node
      |}
    | {|
          ...CommonColumnProps,
          filterable?: boolean,
          Cell: (CellComponentProps<Row, Value>) => React.Node,
          accessor: Row => Value
      |};

export function column<Row, Value>(props: BasicColumnProps<Row, Value>): Column<Row, Value> {
    return props;
}

type NumberColumnProps<Row> = {|
    ...CommonColumnProps,
    accessor: Row => ?number,
    decimals?: number,
    decimalsSeparator?: string,
    thousandsSeparator?: string,
    prefix?: string,
    postfix?: string
|};

export function numberColumn<Row>(props: NumberColumnProps<Row>): Column<Row, ?number> {
    let {
        decimals,
        decimalsSeparator,
        thousandsSeparator,
        prefix,
        postfix,
        ...columnProps
    } = props;

    return column({
        ...columnProps,
        Cell: ({ value }: { value: ?number }) => {
            return (
                <NumberCell
                    value={value}
                    decimals={decimals}
                    decimalsSeparator={decimalsSeparator}
                    thousandsSeparator={thousandsSeparator}
                    prefix={prefix}
                    postfix={postfix}
                />
            );
        }
    });
}

export function checkboxColumn<Row>(props: {|
    id: string | number,
    accessor: Row => boolean,
    onChange: boolean => mixed
|}): Column<Row, boolean> {
    return column({
        id: 'select',
        Header: '',
        width: 45,
        sortable: false,
        resizable: false,
        className: 'select-column-cell',
        headerClassName: 'select-column-header',
        accessor: props.accessor,
        Cell: ({ value }) => <Checkbox checked={value} onChange={props.onChange} />
    });
}
