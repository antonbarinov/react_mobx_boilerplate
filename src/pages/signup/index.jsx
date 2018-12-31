import * as React from 'react';
import CSSModules from 'react-css-modules';
import userState from 'globalStates/user';
import FormInput from 'components/formItems/input';
import FormButton from 'components/formItems/button';
import FormServerErrors from 'components/formItems/serverErrors';
import FormValidator from 'helpers/formValidator';
import { helperRedirect } from '../../helpers/redirect';
import { Link } from 'react-router-dom';



@CSSModules(require('./styles.scss'))
export default class SignUpPage extends React.Component {
    constructor() {
        super();

        this.state = {
            validationFields: {
                login: { msg: false, },
                password: { msg: false },
                full_name: { msg: false },
            },
            serverError: null,
        };

        this.inputRefs = {
            login: React.createRef(),
            password: React.createRef(),
            full_name: React.createRef(),
        };

        this.fv = new FormValidator(this);
    }

    // Validate form and submit
    async validateAndSubmit() {
        // Validate login
        this.fv.validateField('login', (val) => {
            if (val.length < 3) return `Login must contain not less than 3 symbols`;
            if (val === '111') return `This login not allowed`;
        });

        // Validate password
        this.fv.validateField('password', (val) => {
            if (val.length < 3) return `Password must contain not less than 3 symbols`;
        });

        // Validate full name
        this.fv.validateField('full_name', (val) => {
            const wordsCount = val.trim().split(' ').length;
            if (wordsCount < 2) return `Full name must contain first name and last name`;
        });

        const isValid = this.fv.isFieldsValid();

        if (!isValid) return false;

        try {
            const data = this.fv.getFields();
            let result = await userState.signup(data);
            if (result) {
                // Success
                helperRedirect('/profile');
            }
        } catch (e) {
            this.setState({
                serverError: e.message,
            });
        }
    }

    render() {
        return (
            <div className="container">
                <h1>Sign up</h1>
                <div>
                    <FormInput placeholder="Full name" {...this.fv.validationFieldParams('full_name')} />
                    <FormInput placeholder="Login" {...this.fv.validationFieldParams('login')} />
                    <FormInput placeholder="Password" type="password" {...this.fv.validationFieldParams('password')} />
                    <FormServerErrors msg={this.state.serverError} />
                    <FormButton onClick={this.validateAndSubmit.bind(this)}>Sign up</FormButton>
                    <div styleName="underBtnText">Already have account? <Link to="/login">Login</Link> instead</div>
                </div>
            </div>
        );
    }
}