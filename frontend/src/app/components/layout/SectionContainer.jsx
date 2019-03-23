// @flow

import * as React from 'react';
import cx from 'classnames';
import { Button } from '../form';
import { Heading } from '../typography';

type Props = $Exact<{
    backTo?: string,
    title: React.Node,
    actions?: React.Node,
    asideOpen: boolean,
    renderAside: () => React.Node,
    children: React.Node
}>;

function SectionContainer(props: Props) {
    return (
        <div className="speedcontrol-section-container">
            <div className="speedcontrol-section-container-header">
                <Heading marginBottom={false}>
                    {props.backTo != null && (
                        <span className="parent-link">
                            <Button icon="fas fa-arrow-left" theme="primary" path={props.backTo} />
                        </span>
                    )}
                    <span>{props.title}</span>
                    <span className="header-actions">{props.actions}</span>
                </Heading>
            </div>
            <div className="speedcontrol-section-container-body">
                <div className="speedcontrol-section-container-body-content">{props.children}</div>
                <div
                    className={cx('speedcontrol-section-container-body-aside', {
                        open: props.asideOpen
                    })}>
                    {props.asideOpen && props.renderAside()}
                </div>
            </div>
        </div>
    );
}

SectionContainer.defaultProps = {
    asideOpen: false,
    renderAside: () => null
};

export default SectionContainer;
