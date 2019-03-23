// @flow

import * as React from 'react';
import { Option } from '@ekz/option';
import { List } from 'immutable';
import cx from 'classnames';
import { Context } from './Context';
import type { NotificationData, NotificationHandler, NotificationApi } from './types';

type Props = $Exact<{
    placement: 'top-right' | 'bottom-center',
    maxNotifications: number,
    defaultTimeout: number,
    defaultType: 'default',
    children: React.Node
}>;

type State = {
    notifications: List<NotificationData>,
    context: NotificationApi
};

class NotificationsProvider extends React.PureComponent<Props, State> {
    static defaultProps = {
        placement: 'top-right',
        maxNotifications: 5,
        defaultTimeout: 5000, // 5 seconds
        defaultType: 'default'
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            notifications: List(),
            context: {
                notify: this.notify
            }
        };
    }

    notify: NotificationHandler = (message, options = {}) => {
        this.setState(state => ({
            notifications: state.notifications.push({
                id: Math.random(),
                message,
                type: Option.of(options.type).getOrElse(() => this.props.defaultType),
                timeout: Option.of(options.timeout).getOrElse(() => this.props.defaultTimeout)
            })
        }));
    };

    dismiss: number => void = notificationId => {
        this.setState(state => ({
            notifications: state.notifications.filter(
                notification => notification.id !== notificationId
            )
        }));
    };

    render() {
        return (
            <Context.Provider value={this.state.context}>
                <React.Fragment>
                    <div className={cx('speedcontrol-notifications', this.props.placement)}>
                        <div className="notifications-container">
                            {this.state.notifications
                                .take(this.props.maxNotifications)
                                .map(notification => (
                                    <NotificationItem
                                        key={notification.id}
                                        notification={notification}
                                        onDismiss={() => this.dismiss(notification.id)}
                                    />
                                ))}
                        </div>
                    </div>
                    {this.props.children}
                </React.Fragment>
            </Context.Provider>
        );
    }
}

type NotificationItemProps = $Exact<{
    notification: NotificationData,
    onDismiss: () => void
}>;

class NotificationItem extends React.PureComponent<NotificationItemProps> {
    timeoutId: ?TimeoutID = null;

    startTimeout = (timeout: number) => {
        if (timeout > 0) {
            this.timeoutId = setTimeout(this.props.onDismiss, timeout);
        }
    };

    stopTimeout = () => {
        if (this.timeoutId != null) {
            clearTimeout(this.timeoutId);
        }
    };

    componentDidMount() {
        this.startTimeout(this.props.notification.timeout);
    }

    componentWillUnmount() {
        this.stopTimeout();
    }

    render() {
        return (
            <div
                key={this.props.notification.id}
                className={cx('notification', this.props.notification.type)}
                onClick={() => this.props.onDismiss()}
                onMouseEnter={this.stopTimeout}
                onMouseLeave={() => this.startTimeout(1500)}>
                <span className="notification-message">{this.props.notification.message}</span>
            </div>
        );
    }
}

export default NotificationsProvider;
