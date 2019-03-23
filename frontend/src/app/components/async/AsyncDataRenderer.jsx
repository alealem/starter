// @flow

import * as React from 'react';
import * as AD from '@ekz/async-data';
import { Option } from '@ekz/option';
import { Panel } from '../layout';

type Props<A> =
    | $Exact<{
          data: AD.AsyncData<A>,
          children: A => React.Node,
          renderNone?: false
      }>
    | $Exact<{
          data: AD.AsyncData<A>,
          children: (Option<A>) => React.Node,
          renderNone: true
      }>;

class AsyncDataRenderer<A> extends React.PureComponent<Props<A>> {
    render() {
        const maybeValue = this.props.data.toOption();

        if (this.props.data.isPending && this.props.data.isEmpty) {
            return (
                <div className="speedcontrol-async-data-renderer">
                    <i className="loading fas fa-spin fa-spinner" />
                </div>
            );
        }

        if (this.props.data.isFailed) {
            return (
                <div className="speedcontrol-async-data-renderer">
                    <Panel type="warning">
                        <div>An error has prevent the data from being loaded</div>
                        {process.env.NODE_ENV !== 'production' && (
                            <pre>
                                {this.props.data.error.stack || this.props.data.error.message}
                            </pre>
                        )}
                    </Panel>
                </div>
            );
        }

        if (this.props.renderNone === true) {
            return this.props.children(maybeValue);
        } else {
            return maybeValue.isDefined ? this.props.children(maybeValue.get()) : null;
        }
    }
}

export default AsyncDataRenderer;
