import * as React from 'react';
import { observer } from 'mobx-react';
import CSSModules from 'react-css-modules';
import state from './state';
import userState from 'globalStates/user';
import FormInput from 'components/formItems/input';
import FormButton from 'components/formItems/button';
import FormServerErrors from 'components/formItems/serverErrors';
import * as fv from 'helpers/formValidator';
import { helperRedirect } from 'helpers/redirect';
import { Link } from 'react-router-dom';



@observer
@CSSModules(require('./styles.scss'))
export default class LoginPage extends React.Component {
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

        const isValid = fv.isFieldsValid(state);

        if (!isValid) return false;

        try {
            const data = fv.getFields(state);
            let result = await userState.login(data);
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
                <h1>Login</h1>
                <div>
                    <FormInput placeholder="Login" {...fv.validationFieldParams(state, 'login')} />
                    <FormInput placeholder="Password" type="password" {...fv.validationFieldParams(state, 'password')} />
                    <FormServerErrors msg={state.serverError} />
                    <FormButton onClick={this.validateAndSubmit}>Login</FormButton>
                    <div styleName="underBtnText">Doesn't have account? <Link to="/signup">Sing up</Link> instead</div>
                </div>
            </div>
        );
    }
}