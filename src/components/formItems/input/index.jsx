import * as React from 'react';
import { observer } from 'mobx-react';
import CSSModules from 'react-css-modules';


@observer
@CSSModules(require('./styles.scss'), { allowMultiple: true })
export default class FormInput extends React.Component {
    render() {
        let props = { ...this.props };
        delete props.msg;
        delete props.setRef;

        let classesStr = [ 'inputContainer' ];
        if (this.props.msg) classesStr.push('error');

        let msg = this.props.msg || '';


        return (
            <div styleName={classesStr.join(' ')}>
                <input {...props} ref={this.props.setRef}/>
                <div styleName="msg">{msg}</div>
            </div>
        );
    }
}