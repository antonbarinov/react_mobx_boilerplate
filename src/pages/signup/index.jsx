import * as React from 'react';
import { observer } from 'mobx-react';
import FormInput from 'components/formItems/Input';
import FormButton from 'components/formItems/Button';
import FormServerErrors from 'components/formItems/ServerErrors';
import { Link } from 'lib/router';
import Container from 'components/Container';

import styles from './styles.module.scss';

import State from './state';
const localState = new State();



@observer
export default class SignUpPage extends React.Component {
    constructor(props) {
        super(props);

        // or this.state = new State(); if we don't want to store last state of this component
        this.state = localState;

        document.title = 'Signup Page | Boilerplate';
    }

    render() {
        const state = this.state;

        return (
            <Container className={ styles.container }>
                <h1>Sign up</h1>
                <div>
                    <FormInput
                        placeholder="Full name"
                        name="full_name"
                        onChange={ state.handleValueChange }
                        value={ state.formFields.full_name.value }
                        msg={ state.formFields.full_name.errorMessage }
                    />
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
                    <FormButton onClick={ state.validateAndSubmit }>Sign up</FormButton>
                    <div className={ styles.underBtnText }>
                        Already have account? <Link to="/login">Login</Link> instead
                    </div>
                </div>
            </Container>
        );
    }
}
