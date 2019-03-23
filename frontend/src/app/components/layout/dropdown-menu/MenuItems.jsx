// @flow

import * as React from 'react';
import { Option } from '@ekz/option';
import typeof MenuItem from './MenuItem';

type Props = {
    anchorBounds: Bounds,
    offsetX: ?number,
    offsetY: ?number,
    onCloseRequest: () => mixed,
    children: React.ChildrenArray<React.Element<MenuItem>>
};

type State = {
    width: ?number,
    height: ?number,
    windowWidth: ?number,
    windowHeight: ?number
};

export type Bounds = {
    topLeft: Position,
    bottomRight: Position
};

export type Position = {
    x: number,
    y: number
};

class MenuItems extends React.PureComponent<Props, State> {
    static defaultProps = {
        offsetX: null,
        offsetY: null
    };

    elementRef = React.createRef<HTMLDivElement>();

    get style() {
        if (
            this.state.width == null ||
            this.state.height == null ||
            this.state.windowWidth == null ||
            this.state.windowHeight == null
        ) {
            return {};
        }

        let styles = {};

        if (
            this.state.windowWidth >
            this.props.anchorBounds.topLeft.x + this.props.offsetX + this.state.width
        ) {
            // left
            styles = { ...styles, left: this.props.anchorBounds.topLeft.x + this.props.offsetX };
        } else {
            // right
            styles = {
                ...styles,
                right:
                    this.state.windowWidth -
                    this.props.anchorBounds.bottomRight.x +
                    this.props.offsetX
            };
        }

        if (
            this.state.windowHeight >
            this.props.anchorBounds.topLeft.y + this.props.offsetY + this.state.height
        ) {
            // top
            styles = { ...styles, top: this.props.anchorBounds.topLeft.y + this.props.offsetY };
        } else {
            // bottom
            styles = {
                ...styles,
                bottom:
                    this.state.windowHeight -
                    this.props.anchorBounds.bottomRight.y +
                    this.props.offsetY
            };
        }

        return styles;
    }

    _updateStateFromElement = element => {
        let body = Option.of(element.ownerDocument.body);
        let rect = element.getBoundingClientRect();
        this.setState({
            width: rect.width,
            height: rect.height,
            windowWidth: body.map(b => b.offsetWidth).getOrReturn(null),
            windowHeight: body.map(b => b.offsetHeight).getOrReturn(null)
        });
    };

    componentDidMount() {
        if (this.elementRef.current != null) {
            let element: HTMLDivElement = this.elementRef.current;
            this._updateStateFromElement(element);
        }
    }

    componentDidUpdate() {
        if (this.elementRef.current != null) {
            let element: HTMLDivElement = this.elementRef.current;
            this._updateStateFromElement(element);
        }
    }

    state = {
        width: null,
        height: null,
        windowWidth: null,
        windowHeight: null
    };

    render() {
        return (
            <div
                className="speedcontrol-dropdown-menu-items"
                style={this.style}
                ref={this.elementRef}
                onClick={this.props.onCloseRequest}>
                {React.Children.toArray(this.props.children)}
            </div>
        );
    }
}

export default MenuItems;
