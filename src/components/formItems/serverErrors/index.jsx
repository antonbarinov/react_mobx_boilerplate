import * as React from 'react';
import { observer } from 'mobx-react';
import CSSModules from 'react-css-modules';


@observer
@CSSModules(require('./styles.scss'), { allowMultiple: true })
export default class FormServerErrors extends React.Component {
    render() {
        let props = { ...this.props };
        delete props.msg;
        delete props.setRef;

        let msg = this.props.msg;
        if (!msg) return null;

        return (
            <div styleName='serverErrorsContainer'>
                <div styleName="msg">{msg}</div>
            </div>
        );
    }
}