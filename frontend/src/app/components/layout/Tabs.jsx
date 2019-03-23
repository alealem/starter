// @flow

import { Map } from 'immutable';
import cx from 'classnames';
import * as React from 'react';

type TabsProps<Id: string | number> = {|
    selectedTab: Id,
    onChange: Id => mixed,
    children: React.ChildrenArray<React.Element<typeof Tab>>
|};

export function Tabs<Id: string | number>(props: TabsProps<Id>) {
    const [tabContentById, setTabContentById] = React.useState(Map());

    const addTab = React.useCallback((id: string, content: React.Node) => {
        setTabContentById(tabs => tabs.set(id, content));
        return () => setTabContentById(tabs => tabs.delete(id));
    }, []);

    const contextValue = React.useMemo(
        () => ({
            selectedTab: props.selectedTab,
            onChange: props.onChange,
            addTab
        }),
        [props.selectedTab, addTab]
    );

    return (
        // $FlowFixMe
        <Context.Provider value={contextValue}>
            <div className="speedcontrol-tabs">
                <div className="tab-labels">{props.children}</div>
                <div className="tab-content">{tabContentById.get(props.selectedTab)}</div>
            </div>
        </Context.Provider>
    );
}

type TabProps<Id: string | number> = {|
    tabId: Id,
    label: React.Node,
    children: React.Node
|};

export function Tab<Id: string | number>(props: TabProps<Id>) {
    const { selectedTab, onChange, addTab } = React.useContext(Context);

    React.useEffect(() => addTab(props.tabId, props.children), [props.tabId, props.children]);

    const handleClick = React.useCallback(() => onChange(props.tabId), [onChange, props.tabId]);

    return (
        <div
            className={cx('tab-label', { selected: props.tabId === selectedTab })}
            onClick={handleClick}>
            {props.label}
        </div>
    );
}

type ContextType<Id: string | number> = {|
    selectedTab: Id,
    onChange: Id => mixed,
    addTab(id: Id, content: React.Node): () => void
|};

const noop = () => {
    throw new Error('Cannot add tab to empty context. Did you forget <Tabs/>?');
};

const Context = React.createContext<ContextType<string | number>>({
    selectedTab: '',
    onChange: noop,
    addTab: noop
});
