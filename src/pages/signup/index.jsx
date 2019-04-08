import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import userState from 'globalState/user';
import FormValidator from 'helpers/formValidator';
import FormInput from 'components/formItems/input';
import FormButton from 'components/formItems/button';
import FormServerErrors from 'components/formItems/serverErrors';
import { helperRedirect } from '../../helpers/redirect';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import Container from 'components/container';


@observer
export default class SignUpPage extends React.Component {
    @observable formFields = {
        login: FormValidator.createFormFieldObj(),
        password: FormValidator.createFormFieldObj(),
        full_name: FormValidator.createFormFieldObj(),
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

        // Validate full name
        promises.push(
            fv.validateField(this.formFields.full_name, (val) => {
                const wordsCount = val.trim().split(' ').length;
                if (wordsCount < 2) return `Full name must contain first name and last name`;
            }),
        );

        // Await for validations
        await Promise.all(promises);

        const isValid = fv.isFieldsValid();

        if (!isValid) return false;

        try {
            const data = fv.getFieldsData();
            let result = await userState.signup(data);
            if (result) {
                // Success
                helperRedirect('/profile');
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
                <h1>Sign up</h1>
                <div>
                    <FormInput
                        placeholder="Full name"
                        name="full_name"
                        onChange={ this.handleValueChange }
                        msg={ this.formFields.full_name.errorMessage }
                    />
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
                    <FormButton onClick={ this.validateAndSubmit }>Sign up</FormButton>
                    <div className={ styles.underBtnText }>
                        Already have account? <Link to="/login">Login</Link> instead
                    </div>
                </div>
            </Container>
        );
    }
}
