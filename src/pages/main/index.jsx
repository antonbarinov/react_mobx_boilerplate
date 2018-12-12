import * as React from 'react';
import { observer } from 'mobx-react';
import CSSModules from 'react-css-modules';
import state from './state';


@observer
@CSSModules(require('./styles.scss'))
export default class MainPage extends React.Component {
    render() {
        return (
            <div className="container">
                <h1>Main page</h1>
                Time is: <b styleName="time">{state.time}</b>
            </div>
        );
    }
}