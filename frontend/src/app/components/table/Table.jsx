// @flow

import * as React from 'react';
import ReactTable from 'react-table';
import cx from 'classnames';
import type { Columns } from './columns';

type Props<A> = $Exact<{
    columns: Columns<A>,
    data: Array<A>,
    minRows?: number,
    pageSize: number,
    defaultSorted?: Array<SortConfig>,
    loading: boolean,
    noDataText?: React.Node,
    showPageJump: boolean,
    showPagination: boolean,
    onRowClick?: (row: A, event: SyntheticEvent<>, handleOriginal: () => void) => mixed,
    isRowSelected?: (row: A) => boolean
}>;

export type SortConfig = $Exact<{
    id: string,
    desc: boolean
}>;

class Table<A> extends React.PureComponent<Props<A>> {
    static defaultProps = {
        pageSize: 10,
        loading: false,
        showPageJump: true,
        showPagination: true
    };

    _getTrProps = (state, rowInfo) => {
        let isSelected =
            this.props.isRowSelected != null &&
            rowInfo != null &&
            this.props.isRowSelected(rowInfo.original);

        return {
            className: cx({
                clickable: this.props.onRowClick != null,
                'selected-row': isSelected
            }),
            onClick: this.props.onRowClick == null ? undefined : this._handleRowClick(rowInfo)
        };
    };

    _handleRowClick = rowInfo => (event, handleOriginal) => {
        if (this.props.onRowClick != null && rowInfo != null) {
            this.props.onRowClick(rowInfo.original, event, handleOriginal);
        }
    };

    render() {
        return (
            <ReactTable
                className="speedcontrol-table -highlight -striped"
                columns={this.props.columns}
                data={this.props.data}
                minRows={this.props.minRows}
                pageSize={this.props.pageSize}
                defaultSorted={this.props.defaultSorted}
                loading={this.props.loading}
                noDataText={this.props.noDataText}
                showPageJump={this.props.showPageJump}
                showPagination={this.props.showPagination}
                showPageSizeOptions={false}
                getTrProps={this._getTrProps}
            />
        );
    }
}

export default Table;
