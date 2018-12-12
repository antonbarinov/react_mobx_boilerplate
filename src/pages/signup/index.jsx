import * as React from 'react';
import { observer } from 'mobx-react';
import CSSModules from 'react-css-modules';
import state from './state';
import userState from 'globalStates/user';
import FormInput from 'components/formItems/input';
import FormButton from 'components/formItems/button';
import FormServerErrors from 'components/formItems/serverErrors';
import * as fv from 'helpers/formValidator';
import { helperRedirect } from '../../helpers/redirect';
import { Link } from 'react-router-dom';



@observer
@CSSModules(require('./styles.scss'))
export default class SignUpPage extends React.Component {
    componentWillUnmount() {
        state.reset();
    }

    // Validate form and submit
    async validateAndSubmit() {
        // Validate login
        fv.validateField(state, 'login', (val) => {
            if (val.length < 3) return `Login must contain not less than 3 symbols`;
            if (val === '111') return `This login not allowed`;
        });

        // Validate password
        fv.validateField(state, 'password', (val) => {
            if (val.length < 3) return `Password must contain not less than 3 symbols`;
        });

        // Validate full name
        fv.validateField(state, 'full_name', (val) => {
            const wordsCount = val.trim().split(' ').length;
            if (wordsCount < 2) return `Full name must contain first name and last name`;
        });

        const isValid = fv.isFieldsValid(state);

        if (!isValid) return false;

        try {
            const data = fv.getFields(state);
            let result = await userState.signup(data);
            if (result) {
                // Success
                helperRedirect('/profile');
            }
        } catch (e) {
            state.serverError = e.message;
        }
    }

    render() {
        return (
            <div className="container">
                <h1>Sign up</h1>
                <div>
                    <FormInput placeholder="Full name" {...fv.validationFieldParams(state, 'full_name')} />
                    <FormInput placeholder="Login" {...fv.validationFieldParams(state, 'login')} />
                    <FormInput placeholder="Password" type="password" {...fv.validationFieldParams(state, 'password')} />
                    <FormServerErrors msg={state.serverError} />
                    <FormButton onClick={this.validateAndSubmit}>Sign up</FormButton>
                    <div styleName="underBtnText">Already have account? <Link to="/login">Login</Link> instead</div>
                </div>
            </div>
        );
    }
}