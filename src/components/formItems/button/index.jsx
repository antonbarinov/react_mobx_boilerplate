import * as React from 'react';
import { observer } from 'mobx-react';
import CSSModules from 'react-css-modules';


@observer
@CSSModules(require('./styles.scss'), { allowMultiple: true })
export default class FormButton extends React.Component {
    render() {
        let props = { ...this.props };
        delete props.setRef;

        return (
            <div styleName="button" {...props} ref={this.props.setRef}>
                {this.props.children}
            </div>
        );
    }
}