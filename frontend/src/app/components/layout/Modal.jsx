// @flow

import * as React from 'react';
import ReactModal from 'react-modal';

type Props = $Exact<{
    isOpen: boolean,
    header: React.Node,
    children: React.Node,
    actions?: React.ChildrenArray<React.Element<any>>, // flowlint-line unclear-type:off
    shouldCloseOnOverlayClick: boolean,
    shouldCloseOnEsc: boolean,
    maxWidth?: number
}>;

class Modal extends React.PureComponent<Props> {
    static defaultProps = {
        shouldCloseOnOverlayClick: false,
        shouldCloseOnEsc: false
    };

    render() {
        return (
            <ReactModal
                isOpen={this.props.isOpen}
                closeTimeoutMS={300}
                shouldCloseOnOverlayClick={this.props.shouldCloseOnOverlayClick}
                style={{
                    content: {
                        maxWidth: this.props.maxWidth == null ? '' : this.props.maxWidth
                    }
                }}
                className={{
                    base: 'speedcontrol-modal',
                    afterOpen: 'speedcontrol-modal-after-open',
                    beforeClose: 'speedcontrol-modal-before-close'
                }}
                portalClassName="speedcontrol-modal-portal"
                overlayClassName={{
                    base: 'speedcontrol-modal-overlay',
                    afterOpen: 'speedcontrol-modal-overlay-after-open',
                    beforeClose: 'speedcontrol-modal-overlay-before-close'
                }}>
                <div className="speedcontrol-modal-header">{this.props.header}</div>
                <div className="speedcontrol-modal-body">{this.props.children}</div>
                {this.props.actions && (
                    <div className="speedcontrol-modal-actions">
                        {React.Children.toArray(this.props.actions)}
                    </div>
                )}
            </ReactModal>
        );
    }
}

export default Modal;
