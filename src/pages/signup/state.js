import { observable } from 'mobx';
import FormValidator from 'helpers/formValidator';
import userState from 'globalState/user';
import { smartRedirect } from 'helpers/redirect';
import { ApiReactiveResponse } from 'lib/apiRequest';


export default class State {
    @observable formFields = {
        login: FormValidator.createFormFieldObj(),
        password: FormValidator.createFormFieldObj(),
        full_name: FormValidator.createFormFieldObj(),
    };
    @observable serverError = '';
    @observable submitInProgress = false;

    validateAndSubmit = async () => {
        if (this.submitInProgress) return;

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
            this.submitInProgress = true;
            const data = fv.getFieldsData();
            let result = await userState.signup(data, this.signupRequestState);
            if (result) {
                // Success
                smartRedirect('/profile');
            }
        }
        catch (e) {
            const errorsParsed = fv.applyServerValidationErrors(e.response.data);
            if (!errorsParsed) this.serverError = fv.serverErrorMessage || e.message;
        } finally {
            this.submitInProgress = true;
        }
    };

    handleValueChange = (e) => {
        const { name, value } = e.target;
        this.formFields[name].value = value;
    };
}
