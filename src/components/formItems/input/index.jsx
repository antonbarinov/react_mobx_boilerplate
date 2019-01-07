import * as React from 'react';
import { observer } from 'mobx-react';
import CSSModules from 'react-css-modules';


@observer
@CSSModules(require('./styles.scss'), { allowMultiple: true })
class FormInput extends React.Component {
    render() {
        let { msg, innerRef, ...props } = this.props;

        let classesStr = [ 'inputContainer' ];
        if (msg) classesStr.push('error');

        return (
            <div styleName={classesStr.join(' ')}>
                <input {...props} ref={innerRef}/>
                <div styleName="msg">{msg}</div>
            </div>
        );
    }
}

export default React.forwardRef((props, ref) => <FormInput innerRef={ref} {...props}/>);