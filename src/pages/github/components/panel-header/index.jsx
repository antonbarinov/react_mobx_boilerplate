import * as React from 'react';
import { observer } from 'mobx-react';
import CSSModules from 'react-css-modules';
import state from 'pages/github/state';


@observer
@CSSModules(require('./styles.scss'), { allowMultiple: true })
export default class PanelHeader extends React.Component {

    removeTab(e, tab) {
        e.stopPropagation();
        state.removeTab(tab.id);
    }

    renderTab(tab) {
        let styles = [ 'tab-item' ];
        if (tab.active) styles.push('active');

        return (
            <div styleName={styles.join(' ')} key={tab.id} onClick={() => state.switchTab(tab.id)}>
                { tab.tabType }
                <span onClick={(e) => this.removeTab(e, tab)}>×</span>
            </div>
        )
    }

    render() {
        return (
            <div styleName="PanelHeader">
                <div styleName="tab-menu">
                    <a onClick={() => state.newTab(state.tabTypes.Users)} href="javascript:void(0)">Users</a>
                    <a onClick={() => state.newTab(state.tabTypes.Repositories)} href="javascript:void(0)">Repositories</a>
                </div>
                <div styleName="tabs-list">
                    { state.tabs.map(tab => this.renderTab(tab)) }
                </div>
            </div>
        );
    }
}