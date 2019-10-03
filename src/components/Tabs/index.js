import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import './styles.css';


class TabListContextState {
    @observable tabs = new Set();
    @observable activeTabId = null;
    onTabClick = null;

    pushTab = (tab) => {
        this.tabs.add(tab);
    };

    removeTab = (tab) => {
        this.tabs.delete(tab);
    };
}


const TabsContext = React.createContext();

const TabList = observer(({ onTabClick = null, context = null, children }) => {
    const contextData = context || useState(() => new TabListContextState())[0];

    useState(() => {
        if (typeof onTabClick === 'function') contextData.onTabClick = onTabClick;
    });

    return (
        <div>
            <TabsContext.Provider value={ contextData }>
                { children }
            </TabsContext.Provider>
        </div>
    );
});

const Tab = observer(
    ({
         title = '',
         disabled = false,
         children = null,
         id = null,
         ...restProps
     }) => {
        const contextData = useContext(TabsContext);

        const [ tab ] = useState({
            id,
            title,
            disabled,
            children,
            ...restProps,
        });

        useState(() => {
            if (contextData.onTabClick) tab.active = false;

            contextData.pushTab(tab);

            return null;
        });

        useEffect(() => {
            tab.title = title;
            tab.disabled = disabled;
            tab.children = children;
            tab.id = id;

            return () => {
                contextData.removeTab(tab);
            };
        });

        return null;
    },
);