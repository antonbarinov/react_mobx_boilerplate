import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import userState from 'globalState/user';
import FormInput from 'components/formItems/input';
import FormButton from 'components/formItems/button';
import FormServerErrors from 'components/formItems/serverErrors';
import FormValidator from 'helpers/formValidator';
import Container from 'components/container';
import { helperRedirect } from 'helpers/redirect';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';


@observer
export default class LoginPage extends React.Component {
    state = {
        validationFields: {
            login: { msg: false },
            password: { msg: false },
        },
        serverError: '',
    };

    inputRefs = {
        login: React.createRef(),
        password: React.createRef(),
    };

    constructor(props) {
        super(props);

        this.fv = new FormValidator(this);
    }

    // Validate form and submit
    validateAndSubmit = async () => {
        // Validate login
        this.fv.validateField('login', (val) => {
            if (val.length < 3) return `Login must contain not less than 3 symbols`;
            if (val === '111') return `This login not allowed`;
        });

        // Validate password
        this.fv.validateField('password', (val) => {
            if (val.length < 3) return `Password must contain not less than 3 symbols`;
        });

        const isValid = this.fv.isFieldsValid();

        if (!isValid) return false;

        try {
            const data = this.fv.getFields();
            let result = await userState.login(data);
            if (result) {
                // Success
                helperRedirect('/profile');
            }
        }
        catch (e) {
            this.setState({
                serverError: e.message,
            });
        }
    }

    render() {
        return (
            <Container className={styles.container}>
                <h1>Login</h1>
                <div>
                    <FormInput placeholder="Login" { ...this.fv.validationFieldParams('login') } />
                    <FormInput placeholder="Password"
                               type="password" { ...this.fv.validationFieldParams('password') } />
                    <FormServerErrors msg={ this.state.serverError } />
                    <FormButton onClick={ this.validateAndSubmit }>Login</FormButton>
                    <div className={ styles.underBtnText }>
                        Doesn't have account? <Link to="/signup">Sing up</Link> instead
                    </div>
                </div>
            </Container>
        );
    }
}