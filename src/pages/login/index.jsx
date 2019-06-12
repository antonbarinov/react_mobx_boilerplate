import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import userState from 'globalState/user';
import FormInput from 'components/formItems/input';
import FormButton from 'components/formItems/button';
import FormServerErrors from 'components/formItems/serverErrors';
import FormValidator from 'helpers/formValidator';
import Container from 'components/container';
import { helperRedirect, smartRedirect } from 'helpers/redirect';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';


@observer
export default class LoginPage extends React.Component {
    @observable formFields = {
        login: FormValidator.createFormFieldObj(),
        password: FormValidator.createFormFieldObj(),
    };
    @observable serverError = '';

    constructor(props) {
        super(props);
    }

    // Validate form and submit
    validateAndSubmit = async () => {
        const fv = new FormValidator(this.formFields);
        const promises = [];

        // Validate login
        promises.push(
            fv.validateField(this.formFields.login, (val) => {
                if (val.length < 3) return `Login must contain not less than 3 symbols`;
                if (val === '111') return `This login not allowed`;
            }),
        );

        // Validate password
        promises.push(
            fv.validateField(this.formFields.password, (val) => {
                if (val.length < 3) return `Password must contain not less than 3 symbols`;
            }),
        );

        // Await for validations
        await Promise.all(promises);

        const isValid = fv.isFieldsValid();

        if (!isValid) return false;

        try {
            const data = fv.getFieldsData();
            let result = await userState.login(data);
            if (result) {
                // Success
                smartRedirect('/profile');
            }
        }
        catch (e) {
            const errorsParsed = fv.applyServerValidationErrors(e.response.data);
            if (!errorsParsed) this.serverError = fv.serverErrorMessage || e.message;
        }
    };

    handleValueChange = (e) => {
        const { name, value } = e.target;
        this.formFields[name].value = value;
    };

    render() {
        return (
            <Container className={ styles.container }>
                <h1>Login</h1>
                <div>
                    <FormInput
                        placeholder="Login"
                        name="login"
                        onChange={ this.handleValueChange }
                        msg={ this.formFields.login.errorMessage }
                    />
                    <FormInput
                        placeholder="Password"
                        type="password"
                        name="password"
                        onChange={ this.handleValueChange }
                        msg={ this.formFields.password.errorMessage }
                    />
                    <FormServerErrors msg={ this.serverError } />
                    <FormButton onClick={ this.validateAndSubmit }>Login</FormButton>
                    <div className={ styles.underBtnText }>
                        Doesn't have account? <Link to="/signup">Sing up</Link> instead
                    </div>
                </div>
            </Container>
        );
    }
}
