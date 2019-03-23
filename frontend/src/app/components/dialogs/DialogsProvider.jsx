// @flow

import * as React from 'react';
import { List } from 'immutable';
import { Option } from '@ekz/option';
import { Modal } from '../layout';
import { Button } from '../form';

type Props = $Exact<{
    children: React.Node
}>;

type State = $Exact<{
    counter: number,
    modals: List<ModalProps>,
    context: DialogsApi
}>;

type ModalProps = $Exact<{
    id: number,
    header: React.Node,
    actions: $ElementType<React.ElementProps<typeof Modal>, 'actions'>,
    content: () => React.Node
}>;

export type DialogConfig = $Exact<{
    type?: 'default' | 'destructive',
    header?: React.Node,
    content: () => React.Node,
    cancelButtonLabel?: string,
    confirmButtonLabel?: string
}>;

export type DialogsApi = $Exact<{
    confirmOperation: (config: DialogConfig) => Promise<void>
}>;

export class DialogsProvider extends React.PureComponent<Props, State> {
    _defaultConfig = {
        type: 'default',
        header: 'Are you sure?',
        cancelButtonLabel: 'Cancel',
        confirmButtonLabel: 'Confirm'
    };

    _confirmOperation = (config: DialogConfig): Promise<void> => {
        let mergedConfig = {
            ...this._defaultConfig,
            ...config
        };

        return new Promise(resolve => {
            this.setState(s => {
                const id = s.counter + 1;
                const close = this._removeModal(id);
                const confirm = () => {
                    resolve();
                    close();
                };

                return {
                    counter: id,
                    modals: s.modals.push({
                        id,
                        header: mergedConfig.header,
                        actions: [
                            <Button
                                key="cancel"
                                label={mergedConfig.cancelButtonLabel}
                                onClick={close}
                            />,
                            <Button
                                key="confirm"
                                label={mergedConfig.confirmButtonLabel}
                                raised
                                theme={mergedConfig.type === 'destructive' ? 'alert' : 'primary'}
                                onClick={confirm}
                            />
                        ],
                        content: mergedConfig.content
                    })
                };
            });
        });
    };

    _removeModal = id => () =>
        this.setState(s => ({
            modals: s.modals.filter(m => m.id !== id)
        }));

    _renderModal = (modalProps: Option<ModalProps>) => (
        <Modal
            key={modalProps.map(p => p.id).getOrReturn(this.state.counter)}
            isOpen={modalProps.isDefined}
            header={modalProps.map(p => p.header).getOrReturn('')}
            actions={modalProps.map(p => p.actions).getOrReturn([])}
            maxWidth={500}>
            {modalProps.map(p => p.content()).getOrReturn(null)}
        </Modal>
    );

    state = {
        counter: 0,
        modals: List(),
        context: {
            confirmOperation: this._confirmOperation
        }
    };

    render() {
        return (
            <Context.Provider value={this.state.context}>
                {this._renderModal(Option.of(this.state.modals.first()))}
                {this.props.children}
            </Context.Provider>
        );
    }
}

const noop = () => {
    throw new Error('Cannot call method on empty context. Did you forget <DialogsProvider/>?');
};

const Context: React.Context<DialogsApi> = React.createContext({
    confirmOperation: noop
});

export function useDialogs(): DialogsApi {
    return React.useContext(Context);
}
