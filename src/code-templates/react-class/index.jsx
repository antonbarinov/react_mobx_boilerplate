import * as React from 'react';
import { observer } from 'mobx-react';
import CSSModules from 'react-css-modules';
import state from './state';


@observer
@CSSModules(require('./styles.scss'), { allowMultiple: true })
export default class ReactClass extends React.Component {
    render() {
        return (
            <div styleName="ComponentName">
                <h1>{state.timer}</h1>
            </div>
        );
    }
}