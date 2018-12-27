import * as React from 'react';
import { observer } from 'mobx-react';
import CSSModules from 'react-css-modules';
import state from 'pages/github/state';


@observer
@CSSModules(require('./styles.scss'), { allowMultiple: true })
export default class Search extends React.Component {
    inputHolder(e, tab) {
        const value = e.target.value;
        state.updateTabSearchQuery(tab.id, value).catch(console.error);
    }

    render() {
        const { tab } = this.props;
        const { searchQuery } = tab.tabData;

        return (
            <div styleName="search">
                <input placeholder="Search" onChange={(e) => this.inputHolder(e, tab)} value={searchQuery || ''} autoComplete="off" />
            </div>
        );
    }
}