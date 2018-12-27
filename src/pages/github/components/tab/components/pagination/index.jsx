import * as React from 'react';
import { observer } from 'mobx-react';
import CSSModules from 'react-css-modules';
import state from 'pages/github/state';


@observer
@CSSModules(require('./styles.scss'), { allowMultiple: true })
export default class Pagination extends React.Component {
    render() {
        const { tab } = this.props;
        const { page, pages } = tab.pagination;

        if (pages <= 1) return null;

        return (
            <div styleName="pagination">
                <div styleName="page-switcher" data-disabled={page === 1 ? 'true' : ''} onClick={() => state.changePage(tab.id, page - 1)}>Prev page</div>
                <div styleName="current-page">{page}</div>
                <div styleName="page-switcher" data-disabled={page === pages ? 'true' : ''} onClick={() => state.changePage(tab.id, page + 1)}>Next page</div>
            </div>
        );
    }
}