import * as React from 'react';
import CSSModules from 'react-css-modules';

@CSSModules(require('./styles.scss'))
export default class LayoutFooter extends React.Component {
    render() {
        return (
            <footer styleName="footer">
                <div styleName="tbl">
                    <div styleName="tbc">
                        some footer content
                    </div>
                </div>
            </footer>
        );
    }
}