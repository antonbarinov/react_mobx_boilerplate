import * as React from 'react';
import { observer } from 'mobx-react';
import CSSModules from 'react-css-modules';


@observer
@CSSModules(require('./styles.scss'), { allowMultiple: true })
class FormButton extends React.Component {
    render() {
        let { innerRef, ...props } = this.props;

        return (
            <div styleName="button" {...props} ref={innerRef}>
                {props.children}
            </div>
        );
    }
}

export default React.forwardRef((props, ref) => <FormButton innerRef={ref} {...props}/>);