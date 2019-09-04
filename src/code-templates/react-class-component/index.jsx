import * as React from 'react';
import { observer } from 'mobx-react';
import { BaseComponent } from 'components/BaseComponent';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

import State from './state';


@observer
export default class ReactClassComponent extends BaseComponent {
    state = new State(); // Or init new State outside of class if you need to save state after destructing component

    constructor(props) {
        super(props);

        const state = this.state;
    }

    render() {
        const state = this.state;

        return (
            <div className={ styles.ComponentName }>
                <h1>Hello world</h1>
            </div>
        );
    }
}

ReactClassComponent.propTypes = {

};
