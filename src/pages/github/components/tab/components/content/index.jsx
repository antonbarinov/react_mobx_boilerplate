import * as React from 'react';
import { observer } from 'mobx-react';
import CSSModules from 'react-css-modules';


@observer
@CSSModules(require('./styles.scss'), { allowMultiple: true })
export default class Content extends React.Component {
    render() {
        const { tab } = this.props;
        const { data, isDataFetching } = tab.tabData;

        if (isDataFetching) return <div>Fetching data from Github...</div>;
        if (tab.isTabVirgin) return <div>Apply some filters to get results</div>;
        if (data.length === 0) return <div>Nothing found</div>;

        return data.map(item => {
            let text = item.login || item.full_name;

            return (
                <div styleName="item" key={item.id}>
                    <a href={item.html_url} target="_blank">{text}</a>
                </div>
            )
        });
    }
}