// @flow

import * as React from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../form';
import MenuItem from './dropdown-menu/MenuItem';
import MenuItems from './dropdown-menu/MenuItems';
import type { Bounds } from './dropdown-menu/MenuItems';

type Props = {
    icon: string,
    theme?: $ElementType<React.ElementProps<typeof Button>, 'theme'>,
    offsetX?: number,
    offsetY?: number,
    children: React.ChildrenArray<React.Element<typeof MenuItem>>
};

type State = {
    isOpen: boolean,
    position: ?Bounds
};

class DropdownMenu extends React.PureComponent<Props, State> {
    static defaultProps = {
        icon: 'fas fa-ellipsis-v'
    };

    parent: HTMLDivElement;

    anchor: React.Ref<'span'> = React.createRef();

    state = {
        isOpen: false,
        position: null
    };

    constructor() {
        super();
        this.parent = document.createElement('div');
        this.parent.classList.add('speedcontrol-dropdown-menu-portal');
    }

    componentDidMount() {
        if (document.body) {
            document.body.appendChild(this.parent);
        }
    }

    componentWillUnmount() {
        this.parent.remove();
    }

    _handleToggleMenu = () => {
        if (this.anchor.current instanceof HTMLSpanElement) {
            let rect = this.anchor.current.getBoundingClientRect();
            let position = {
                topLeft: { x: rect.left, y: rect.top },
                bottomRight: { x: rect.right, y: rect.bottom }
            };
            this.setState(s => ({ isOpen: !s.isOpen, position }));
        }
    };

    render() {
        return (
            <React.Fragment>
                <span style={{ display: 'inline-block' }} ref={this.anchor}>
                    <Button
                        icon={this.props.icon}
                        theme={this.props.theme}
                        onClick={this._handleToggleMenu}
                    />
                </span>
                {this.state.isOpen &&
                    this.state.position != null &&
                    createPortal(
                        <React.Fragment>
                            <div
                                className="speedcontrol-dropdown-menu-click-catcher"
                                onClick={this._handleToggleMenu}
                            />
                            <MenuItems
                                onCloseRequest={this._handleToggleMenu}
                                anchorBounds={this.state.position}
                                offsetX={this.props.offsetX}
                                offsetY={this.props.offsetY}>
                                {this.props.children}
                            </MenuItems>
                        </React.Fragment>,
                        this.parent
                    )}
            </React.Fragment>
        );
    }

    static Item = MenuItem;
}

export default DropdownMenu;
