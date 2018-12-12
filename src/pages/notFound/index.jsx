import * as React from 'react';
import CSSModules from 'react-css-modules';


@CSSModules(require('./styles.scss'))
export default class NotFoundPage extends React.Component {
    render() {
        return (
            <div className="container">
                <h1 styleName="h1">OOOPS Page not found</h1>
            </div>
        );
    }
}