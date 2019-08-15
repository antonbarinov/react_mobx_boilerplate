import * as React from 'react';
import { observer } from 'mobx-react';
import { BaseComponent } from 'components/BaseComponent';
import FormInput from 'components/formItems/Input';
import FormButton from 'components/formItems/Button';
import FormServerErrors from 'components/formItems/ServerErrors';
import Container from 'components/Container';
import { Link } from 'lib/router';

import styles from './styles.module.scss';

import State from './state';
import LoadingAnimationOverlay from 'components/LoadingAntimationOverlay';

const localState = new State();


@observer
export default class LoginPage extends BaseComponent {
    constructor(props) {
        super(props);

        // or this.state = new State(); if we don't want to store last state of this component
        this.state = localState;

        document.title = 'Login Page | Boilerplate';
    }

    render() {
        const state = this.state;

        return (
            <Container className={ styles.container }>
                { state.submitInProgress && <LoadingAnimationOverlay bluredContainerRef={ this.bluredContainer } /> }
                <div ref={ (ref) => this.bluredContainer = ref }>
                    <h1>Login</h1>
                    <div>
                        <FormInput
                            placeholder="Login"
                            name="login"
                            onChange={ state.handleValueChange }
                            value={ state.formFields.login.value }
                            msg={ state.formFields.login.errorMessage }
                        />
                        <FormInput
                            placeholder="Password"
                            type="password"
                            name="password"
                            onChange={ state.handleValueChange }
                            value={ state.formFields.password.value }
                            msg={ state.formFields.password.errorMessage }
                        />
                        <FormServerErrors msg={ state.serverError } />
                        <FormButton onClick={ state.validateAndSubmit } loading={ state.submitInProgress && 'Logging in...' }>Login</FormButton>
                        <div className={ styles.underBtnText }>
                            Doesn't have account? <Link to="/signup">Sing up</Link> instead
                        </div>
                    </div>
                </div>
            </Container>
        );
    }
}
