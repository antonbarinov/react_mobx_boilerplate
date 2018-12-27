import * as React from 'react';
import { observer } from 'mobx-react';
import CSSModules from 'react-css-modules';
import state from 'pages/github/state';
import Filter from './components/filter';
import Search from './components/search';
import Content from './components/content';
import Pagination from './components/pagination';


@observer
@CSSModules(require('./styles.scss'), { allowMultiple: true })
export default class Tab extends React.Component {
    render() {
        let activeTab = state.tabs.filter(tab => tab.active === true);
        if (activeTab.length === 0) return null;
        activeTab = activeTab[0];

        return (
            <div styleName="Tab" data-tab-id={activeTab.id} >
                <h1>{ activeTab.tabType }</h1>
                <div styleName="tab-holder">
                    <div styleName="filters">
                        <Filter tab={activeTab} />
                    </div>
                    <div styleName="content">
                        <Search tab={activeTab} />
                        <Content tab={activeTab} />
                        <Pagination tab={activeTab} />
                    </div>
                </div>
            </div>
        );
    }
}